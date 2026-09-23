import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Leaf } from 'lucide-react'

const linkClass = ({ isActive }) =>
  `text-sm font-semibold transition-colors ${
    isActive ? 'text-brand-700' : 'text-ink hover:text-brand-700'
  }`

function SiteNavbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    navigate('/')
    await signOut()
  }

  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display flex items-center gap-2 text-2xl font-extrabold tracking-tight text-brand-800">
       <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
         <Leaf size={18} />
        </span>
        HABITLY
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/features" className={linkClass}>Features</NavLink>
          {user && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
          <NavLink to="/pricing" className={linkClass}>Pricing</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          ) : (
            <>
              <Link to="/signin" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default SiteNavbar