// The ONLY file that knows habits are saved in localStorage.
// When we move to Firebase later, this is the file we rewrite.

function makeKey(userId) {
  return `habitly:${userId}:data`
}

export function loadHabitData(userId) {
  try {
    const raw = localStorage.getItem(makeKey(userId))
    if (!raw) return null

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed.habits) || typeof parsed.logs !== 'object') return null
    return parsed
  } catch {
    return null // saved data was damaged: act as if nothing was saved
  }
}

export function saveHabitData(userId, data) {
  try {
    localStorage.setItem(makeKey(userId), JSON.stringify(data))
  } catch {
    // storage is full or blocked: the app keeps working, it just can't save
  }
}

export function clearHabitData(userId) {
  localStorage.removeItem(makeKey(userId))
}