// The ONLY file that knows accounts are kept in localStorage.
// Every function is async on purpose: Firebase's are too, so the rest of
// the app won't need to change when we swap this file out later.
//
// DEMO ONLY: passwords are accepted but never stored or checked.

const USERS_KEY = 'habitly:users'
const SESSION_KEY = 'habitly:session'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

export async function signUp({ name, email }) {
  const cleanEmail = normalizeEmail(email)
  const users = readUsers()

  if (users.some((user) => user.email === cleanEmail)) {
    throw new Error('An account with this email already exists. Try signing in.')
  }

  const user = { id: crypto.randomUUID(), name: name.trim(), email: cleanEmail }
  writeUsers([...users, user])
  localStorage.setItem(SESSION_KEY, user.id)
  return user
}

export async function signIn(email) {
  const cleanEmail = normalizeEmail(email)
  const user = readUsers().find((item) => item.email === cleanEmail)

  if (!user) {
    throw new Error('No account found with that email. Try creating one.')
  }

  localStorage.setItem(SESSION_KEY, user.id)
  return user
}

export async function signOut() {
  localStorage.removeItem(SESSION_KEY)
}

export async function getCurrentUser() {
  const sessionId = localStorage.getItem(SESSION_KEY)
  if (!sessionId) return null
  return readUsers().find((user) => user.id === sessionId) ?? null
}