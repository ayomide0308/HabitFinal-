import { Link } from 'react-router-dom'

const plans = [
  { name: 'Free', price: '$0/mo', features: 'Basic habit tracking, limited tools' },
  { name: 'Pro', price: '$9/mo', features: 'All Free features + Advanced Tools, Mood Tracking, Timer' },
  { name: 'Premium', price: '$19/mo', features: 'All Pro features + Health Sync, Priority Support' },
]

const matrix = [
  { feature: 'Habit Tracking', free: true, pro: true, premium: true },
  { feature: 'Notes & Timer', free: false, pro: true, premium: true },
  { feature: 'Mood Tracking', free: false, pro: true, premium: true },
  { feature: 'Health Sync', free: false, pro: false, premium: true },
  { feature: 'Priority Support', free: false, pro: false, premium: true },
]

const faqs = [
  { q: 'How do I upgrade to Pro?', a: 'Click the "Get Started" button on the Pro plan or in your account settings.' },
  { q: 'Can I cancel anytime?', a: 'Yes, subscriptions can be cancelled at any time with no penalty.' },
  { q: 'Do you offer refunds?', a: 'Refunds are available within 14 days of purchase if unsatisfied.' },
]

function Mark({ yes }) {
  return <span className={yes ? 'text-brand-600' : 'text-ink-faint'}>{yes ? '✓' : '✗'}</span>
}

function Pricing() {
  return (
    <div
      className="bg-cover bg-center px-6 py-16"
      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1517842645767-c639042777db?w=1600&q=80')" }}
    >
      <div className="mx-auto max-w-4xl rounded-3xl bg-white/90 p-8 shadow-xl sm:p-10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-brand-700 sm:text-4xl">Pricing Plans</h1>
          <p className="mt-2 text-ink-soft">Choose the plan that fits your habit tracking journey.</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-brand-600 text-white">
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Features</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.name} className="border-t border-line">
                  <td className="px-4 py-3 font-semibold">{plan.name}</td>
                  <td className="px-4 py-3">{plan.price}</td>
                  <td className="px-4 py-3 text-ink-soft">{plan.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-line">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="bg-brand-600 text-white">
                <th className="px-4 py-3 text-left">Feature</th>
                <th className="px-4 py-3">Free</th>
                <th className="px-4 py-3">Pro</th>
                <th className="px-4 py-3">Premium</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.feature} className="border-t border-line">
                  <td className="px-4 py-3 text-left">{row.feature}</td>
                  <td className="px-4 py-3"><Mark yes={row.free} /></td>
                  <td className="px-4 py-3"><Mark yes={row.pro} /></td>
                  <td className="px-4 py-3"><Mark yes={row.premium} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 space-y-4">
          {faqs.map((item) => (
            <div key={item.q}>
              <p className="font-bold text-brand-700">{item.q}</p>
              <p className="text-sm text-ink-soft">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-brand-600 p-6 text-center text-white">
          <h2 className="text-lg font-bold">Try Pro Free for 7 Days!</h2>
          <Link to="/signup" className="btn mt-4 inline-flex bg-white text-brand-700 hover:bg-brand-50">Get Started</Link>
        </div>
      </div>
    </div>
  )
}

export default Pricing