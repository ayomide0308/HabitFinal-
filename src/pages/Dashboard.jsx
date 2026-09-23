import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHabits } from '../context/HabitContext'
import { getToday } from '../utils/dateUtils'
import { isScheduledOn, isCompletedOn, getCompletionStats } from '../utils/habitUtils'
import { Atom, BarChart3, CheckSquare, Users } from 'lucide-react'
import HabitIcon from '../components/HabitIcon'
import { Trash2 } from 'lucide-react'

const quickLinks = [
  { to: '/analytics', title: 'Full Analytics', text: 'Detailed charts and reports.' },
  { to: '/notifications', title: 'Manage Reminders', text: 'Set up push notifications.' },
  { to: '/calendar', title: 'Calendar View', text: 'View monthly progress.' },
]

function Dashboard() {
  const { habits, logs, toggleComplete, addHabit, deleteHabit } = useHabits()
  const [newHabitName, setNewHabitName] = useState('')
  const today = getToday()

  const activeHabits = habits.filter((habit) => habit.status === 'active')
  const dueToday = activeHabits.filter((habit) => isScheduledOn(habit, today))
  const completedToday = dueToday.filter((habit) => isCompletedOn(logs, habit, today))
  const stats = getCompletionStats(activeHabits, logs, today, today)

  function handleAdd(event) {
    event.preventDefault()
    const name = newHabitName.trim()
    if (!name) return

    addHabit({
      name,
      description: '',
      icon: '✅',
      category: 'General',
      color: 'green',
      frequency: 'daily',
      days: [0, 1, 2, 3, 4, 5, 6],
      reminderTime: null,
      target: { count: 1, unit: 'time' },
      startDate: today,
    })
    setNewHabitName('')
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="flex items-center gap-2 text-3xl font-extrabold text-brand-700">
        <Atom size={26} /> Habitly Dashboard
      </h1>
      <hr className="mt-4 border-line" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card p-6">
          <h2 className="font-bold text-brand-700"><BarChart3 size={18} /> Your Habit Stats</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
              <p className="text-sm text-brand-700">Total Habits</p>
              <p className="mt-1 text-3xl font-extrabold text-brand-800">{activeHabits.length}</p>
            </div>
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
              <p className="text-sm text-brand-700">Completed Today</p>
              <p className="mt-1 text-3xl font-extrabold text-brand-800">{completedToday.length}</p>
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
            <p className="text-sm text-brand-700">Completion Rate</p>
            <p className="mt-1 text-3xl font-extrabold text-brand-800">{stats.percent}%</p>
          </div>

          <h2 className="mt-8 font-bold text-brand-700"><CheckSquare size={18} /> Today's Habits</h2>
          <form onSubmit={handleAdd} className="mt-3 flex gap-2">
            <input
              className="field"
              placeholder="Add a new daily habit..."
              value={newHabitName}
              onChange={(event) => setNewHabitName(event.target.value)}
            />
            <button type="submit" className="btn btn-primary shrink-0">Add</button>
          </form>

          {dueToday.length === 0 ? (
            <p className="mt-6 text-center text-sm text-ink-faint">
              Start by adding your first habit above!
            </p>
          ) : (
            <ul className="mt-5 space-y-2">
              {dueToday.map((habit) => {
                const done = isCompletedOn(logs, habit, today)
                return (
         <li key={habit.id} className="flex items-center gap-2">
                    <button
                     onClick={() => toggleComplete(habit.id, today)}
                     className={`flex flex-1 items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      done ? 'border-brand-500 bg-brand-50' : 'border-line hover:bg-sunken'
                         }`}
             >
            <HabitIcon icon={habit.icon} className="text-brand-600" />
             <span className="flex-1 text-sm font-semibold">{habit.name}</span>
            <span>{done ? '✅' : '⬜'}</span>
            </button>
            <button
             onClick={() => {
               if (confirm(`Delete "${habit.name}"?`)) deleteHabit(habit.id)
            }}
             aria-label={`Delete ${habit.name}`}
             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-ink-faint transition-colors hover:bg-rose-50 hover:text-rose-600"
                >
             <Trash2 size={18} />
          </button>
        </li>
                )
              })}
            </ul>
          )}
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-bold text-brand-700">  <Users size={18} /> Go To Features</h2>
          <div className="mt-3 space-y-4">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block rounded-2xl bg-brand-600 p-5 text-center text-white transition-colors hover:bg-brand-700"
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

export default Dashboard