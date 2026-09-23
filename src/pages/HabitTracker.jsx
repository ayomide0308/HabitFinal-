import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHabits } from '../context/HabitContext'
import { getToday } from '../utils/dateUtils'
import { Target } from 'lucide-react'

const quickLinks = [
  { to: '/analytics', title: 'Check Analytics', text: 'Visualize your progress with detailed charts.' },
  { to: '/notifications', title: 'Check Notifications', text: 'Stay updated with timely reminders.' },
  { to: '/calendar', title: 'Check Calendar View', text: 'View habits on a monthly calendar.' },
]

function HabitTracker() {
  const { goals, addGoal, addHabit } = useHabits()
  const [goalText, setGoalText] = useState('')
  const [habitName, setHabitName] = useState('')
  const [selectedGoal, setSelectedGoal] = useState('')

  function handleAddGoal(event) {
    event.preventDefault()
    const text = goalText.trim()
    if (!text) return
    addGoal(text)
    setGoalText('')
  }

  function handleAddHabit(event) {
    event.preventDefault()
    const name = habitName.trim()
    if (!name) return

    addHabit({
      name,
      description: '',
      icon: '<Target size={20} className="inline" />',
      category: 'General',
      color: 'green',
      frequency: 'daily',
      days: [0, 1, 2, 3, 4, 5, 6],
      reminderTime: null,
      target: { count: 1, unit: 'time' },
      startDate: getToday(),
      goalId: selectedGoal || null,
    })
    setHabitName('')
    setSelectedGoal('')
  }

  return (
    <div className="photo-panel px-6 py-16 text-white">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-extrabold">Habit Tracker</h1>
          <p className="mt-2 text-stone-200">
            Easily create and monitor daily habits linked to your long-term goals.
          </p>

          <form onSubmit={handleAddHabit} className="mt-6 rounded-2xl bg-brand-50 p-5 text-ink">
            <p className="font-bold text-brand-700">
                <Target size={20} className="inline" /> Link New Habit to Goal:</p>
            <select
              className="field mt-3"
              value={selectedGoal}
              onChange={(event) => setSelectedGoal(event.target.value)}
            >
              <option value="">(Optional) Select a Goal</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>{goal.text}</option>
              ))}
            </select>
            <div className="mt-3 flex gap-2">
              <input
                className="field"
                placeholder="Enter a habit..."
                value={habitName}
                onChange={(event) => setHabitName(event.target.value)}
              />
              <button type="submit" className="btn btn-primary shrink-0">Add</button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 text-ink">
            <p className="font-bold text-brand-700">
                <Target size={20} className="inline" />
             Long-Term Goals</p>
            <form onSubmit={handleAddGoal} className="mt-3 flex gap-2">
              <input
                className="field"
                placeholder="Define a major goal..."
                value={goalText}
                onChange={(event) => setGoalText(event.target.value)}
              />
              <button type="submit" className="btn btn-primary shrink-0">+</button>
            </form>

            {goals.length === 0 ? (
              <p className="mt-3 text-sm text-ink-faint">No goals defined yet.</p>
            ) : (
              <ul className="mt-3 space-y-1 text-sm">
                {goals.map((goal) => <li key={goal.id}>
                    <Target size={20} className="inline" />
                 {goal.text}</li>)}
              </ul>
            )}
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
    </div>
  )
}

export default HabitTracker