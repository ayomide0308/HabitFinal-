import { Routes, Route, Navigate } from 'react-router-dom'

import SiteLayout from './components/layout/SiteLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import FeaturesPage from './pages/FeaturesPage'
import Pricing from './pages/Pricing'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import HabitTracker from './pages/HabitTracker'
import Analytics from './pages/Analytics'
import CalendarPage from './pages/CalendarPage'
import Notifications from './pages/Notifications'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/habit" element={<HabitTracker />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App