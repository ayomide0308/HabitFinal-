import { Outlet } from 'react-router-dom'
import SiteNavbar from './SiteNavbar'
import Footer from './Footer'

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default SiteLayout