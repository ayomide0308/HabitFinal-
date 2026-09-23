import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { HabitProvider } from '../context/HabitContext'

function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-ink-soft">
        Loading…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  // key={user.id}: if a different person signs in, React starts fresh
  // and loads THEIR habits instead of reusing the previous person's state.
  return (
    <HabitProvider key={user.id} userId={user.id}>
      <Outlet />
    </HabitProvider>
  )
}

export default ProtectedRoute