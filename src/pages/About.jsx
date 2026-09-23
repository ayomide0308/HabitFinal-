import { Lightbulb, Monitor, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const team = [
  { name: 'Akeem Kareemah', role: 'Lead Developer' },
  { name: 'Adela Barmore', role: 'UI/UX Designer' },
  { name: 'David Dixon', role: 'Frontend Developer' },
]

function About() {
  return (
    <div className="bg-brand-600 px-6 py-16">
      <div className="mx-auto max-w-3xl text-center text-white">
        <h1 className="text-3xl font-extrabold sm:text-4xl">About Habit Tracker</h1>
        <p className="mt-2 text-brand-50">Helping you build better habits every day</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-6">
        <div className="rounded-2xl bg-sage-500/80 p-6 text-white">
            <h2 className="flex items-center gap-2 text-lg font-bold"><Lightbulb size={20} /> Our Story</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Habit Tracker empowers individuals to reach their goals through simple and consistent habit building.
          </p>
        </div>

        <div className="rounded-2xl bg-sage-500/80 p-6 text-white">
         <h2 className="flex items-center gap-2 text-lg font-bold"><Monitor size={20} /> Vision & Values</h2>
          <p className="mt-2 text-sm leading-relaxed">
            We value simplicity, user empowerment, and steady growth. Our goal is to make habit tracking accessible and effective.
          </p>
        </div>

        <div className="rounded-2xl bg-sage-500/80 p-6 text-white">
          <h2 className="flex items-center gap-2 text-lg font-bold"><User size={20} /> Meet the Team</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="rounded-xl bg-brand-700 p-5 text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-600"><User size={18} /></span>
                <p className="mt-3 text-sm font-bold">{member.name}</p>
                <p className="text-xs text-brand-100">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 text-center">
          <h2 className="text-xl font-extrabold text-brand-700">Start Building Better Habits Today!</h2>
         <Link to="/signup" className="btn btn-primary mt-4 inline-flex">Join Now</Link>
        </div>
      </div>
    </div>
  )
}

export default About