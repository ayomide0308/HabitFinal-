import { Link } from 'react-router-dom'
import { useHabits } from '../context/HabitContext'
import { getToday } from '../utils/dateUtils'
import { isScheduledOn, isCompletedOn, getCompletionStats, getCurrentStreak } from '../utils/habitUtils'
import { Target } from 'lucide-react'
import HabitIcon from '../components/HabitIcon'

const quickLinks = [
  { to: '/habit', title: 'Habit Tracker', text: 'Track your daily habits.' },
  { to: '/notifications', title: 'Notifications', text: 'Stay updated with reminders.' },
  { to: '/calendar', title: 'Calendar View', text: 'View habits on a monthly calendar.' },
]

function Analytics() {
  const { habits, logs, goals } = useHabits()
  const today = getToday()

  const activeHabits = habits.filter((habit) => habit.status === 'active')
  const dueToday = activeHabits.filter((habit) => isScheduledOn(habit, today))
  const completedToday = dueToday.filter((habit) => isCompletedOn(logs, habit, today))
  const stats = getCompletionStats(activeHabits, logs, today, today)

  return (
    <div className="photo-panel px-6 py-16 text-white">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-extrabold">📊 Habit Analytics</h1>
          <p className="mt-2 text-stone-200">
            Quick stats for your habits and progress towards your goals.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-4 text-center text-ink">
              <p className="text-sm text-brand-700">Total Habits</p>
              <p className="mt-1 text-3xl font-extrabold">{activeHabits.length}</p>
            </div>
            <div className="rounded-xl bg-white p-4 text-center text-ink">
              <p className="text-sm text-brand-700">Completed Today</p>
              <p className="mt-1 text-3xl font-extrabold">{completedToday.length}</p>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-white p-4 text-center text-ink">
            <p className="text-sm text-brand-700">Overall Rate</p>
            <p className="mt-1 text-3xl font-extrabold">{stats.percent}%</p>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-5 text-ink">
            <p className="flex items-center gap-2 font-bold text-brand-700">
                <Target size={20} className="inline" />
                 Goal Progress Overview</p>
            {goals.length === 0 ? (
              <p className="mt-2 text-sm text-ink-faint">No long-term goals defined yet.</p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm">
                {goals.map((goal) => (
                  <li key={goal.id}>
                    <Target size={20} className="inline" /> {goal.text} — {habits.filter((h) => h.goalId === goal.id).length} linked habit(s)
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 rounded-2xl bg-white p-5 text-ink">
            <p className="font-bold">Individual Habit Status</p>
            {activeHabits.length === 0 ? (
              <p className="mt-2 text-sm text-ink-faint">No habits found yet.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {activeHabits.map((habit) => (
                  <li key={habit.id} className="flex items-center justify-between">
                   <span className="flex items-center gap-2"><HabitIcon icon={habit.icon} /> {habit.name}</span>
                    <span className="text-ink-soft">🔥 {getCurrentStreak(habit, logs, today)} days</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <p className="font-bold text-brand-200">Quick Links</p>
          <div className="mt-3 space-y-3">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block rounded-2xl bg-brand-500 p-5 text-center transition-colors hover:bg-brand-600"
              >
                <p className="font-bold">{link.title}</p>
                <p className="mt-1 text-sm text-brand-50">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics