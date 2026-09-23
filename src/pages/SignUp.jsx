import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'

function SignUp() {
  const { user, signUp } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Already signed in? Skip this page.
  if (user) return <Navigate to="/dashboard" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitError('')

    const newErrors = {}
    if (!name.trim()) {
      newErrors.name = 'Your name is required.'
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }
    if (confirm !== password) {
      newErrors.confirm = 'Passwords do not match.'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    try {
      await signUp({ name, email, password })
      navigate('/dashboard')
    } catch (error) {
      setSubmitError(error.message)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start building habits that stick."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold text-black underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField
          label="Name"
          id="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
        />
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
          placeholder="At least 6 characters"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <FormField
          label="Confirm password"
          id="confirm"
          type="password"
          placeholder="Repeat your password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          error={errors.confirm}
        />

        {submitError && (
          <p className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default SignUp