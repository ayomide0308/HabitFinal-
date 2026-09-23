

const columns = [
  { title: 'Resources', links: ['Help Center', 'API Documentation', 'Translate Habitly', 'Zapier Integration', 'IFTTT Integration'] },
  { title: 'Community', links: ['Blog', 'Contact', 'Habit Tracking Apps Review', 'PolyPlan: Daily Planner'] },
  { title: 'Learn More', links: ['Habitly', 'Japanese', 'German', 'Spanish', 'Terms', 'Privacy Policy'] },
]

function Footer() {
  return (
    <footer className="bg-deep-900 px-6 py-16 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {columns.slice(0, 1).map((col) => (
          <div key={col.title}>
            <h3 className="font-bold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((link) => <li key={link}>{link}</li>)}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-bold text-white">Social</h3>
                   <div className="mt-4 flex gap-4 text-lg font-bold">
            <span>𝕏</span>
            <span>f</span>
          </div>
        </div>

        {columns.slice(1).map((col) => (
          <div key={col.title}>
            <h3 className="font-bold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((link) => <li key={link}>{link}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-16 text-center text-sm text-stone-400">
        © {new Date().getFullYear()} Habitly. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer