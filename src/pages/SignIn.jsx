import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'

function SignIn() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Already signed in? Skip this page.
  if (user) return <Navigate to="/dashboard" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitError('')

    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (!password) {
      newErrors.password = 'Password is required.'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (error) {
      setSubmitError(error.message)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue tracking your habits."
      footer={
        <>
          New to Habitly?{' '}
          <Link to="/signup" className="font-semibold text-black underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <FormField
          label="Password"
          id="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />

        {submitError && (
          <p className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default SignIn