import { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // When the app first opens, check whether someone is already signed in.
  useEffect(() => {
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  async function signUp(details) {
    const newUser = await authService.signUp(details)
    setUser(newUser)
    return newUser
  }

  async function signIn(email, password) {
    const existingUser = await authService.signIn(email, password)
    setUser(existingUser)
    return existingUser
  }

  async function signOut() {
    await authService.signOut()
    setUser(null)
  }

  const value = { user, loading, signUp, signIn, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return context
}