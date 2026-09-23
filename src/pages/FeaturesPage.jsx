import { Link } from 'react-router-dom'
import runningImg from '../assets/running.png'

const features = [
  { title: 'Habit Tracker', text: 'Track your daily habits and achieve goals.' },
  { title: 'Analytics', text: 'Visualize progress with charts and reports.' },
  { title: 'Notifications', text: 'Get timely reminders and stay consistent.' },
  { title: 'Calendar View', text: 'View your habits on a monthly calendar.' },
]

function FeaturesPage() {
  return (
    <div className="bg-brand-50 px-6 py-16 text-center">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Our Core Features</h1>
      <p className="mx-auto mt-3 max-w-xl text-ink-soft">
        Everything you need to track, understand, and maintain productive habits.
      </p>

      <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-2xl bg-brand-600 p-6 text-left text-white">
            <h2 className="text-lg font-bold">{feature.title}</h2>
            <p className="mt-2 text-sm text-brand-50">{feature.text}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-xs justify-center">
        <img
          src={runningImg}
          alt="Person building healthy habits"
          className="animate-float w-full"
        />
      </div>

       <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-brand-600 p-10 text-white">
        <h2 className="text-2xl font-extrabold">Start Building Your Habits Today!</h2>
        <p className="mt-2 text-brand-50">Track, improve, and achieve your goals with ease.</p>
        <Link to="/dashboard" className="btn mt-5 inline-flex bg-white text-brand-700 hover:bg-brand-50">Get Started</Link>
      </div>

    </div>
  )
}

export default FeaturesPage