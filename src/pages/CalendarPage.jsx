import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import Reveal from '../components/Reveal'
import { useHabits } from '../context/HabitContext'
import { getToday, toDateString } from '../utils/dateUtils'
import { getDaySummary } from '../utils/habitUtils'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function CalendarPage() {
  const { habits, logs } = useHabits()
  const today = getToday()
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })

  const activeHabits = habits.filter((habit) => habit.status === 'active')

  const firstOfMonth = new Date(viewDate.year, viewDate.month, 1)
  const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate()
  const startWeekday = firstOfMonth.getDay()

  const cells = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)

  function goToMonth(offset) {
    setViewDate((prev) => {
      let month = prev.month + offset
      let year = prev.year
      if (month < 0) { month = 11; year -= 1 }
      if (month > 11) { month = 0; year += 1 }
      return { year, month }
    })
  }

  return (
    <div className="photo-panel px-6 py-16">
      <Reveal className="mx-auto max-w-4xl rounded-3xl bg-white/90 p-8">
        <Link to="/dashboard" className="text-sm font-semibold text-brand-700">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-4 flex items-center justify-center gap-2 text-center text-3xl font-extrabold text-brand-700">
          <Calendar size={26} /> Habit Calendar View
        </h1>
        <p className="mt-1 text-center text-ink-soft">Visualize your daily habit completions.</p>

        <div className="mt-6 flex items-center justify-between">
          <button onClick={() => goToMonth(-1)} className="btn btn-secondary">&lt; Prev</button>
          <p className="text-xl font-bold">{monthNames[viewDate.month]} {viewDate.year}</p>
          <button onClick={() => goToMonth(1)} className="btn btn-secondary">Next &gt;</button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm font-bold text-brand-700">
          {weekdayLabels.map((label) => <div key={label}>{label}</div>)}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {cells.map((day, index) => {
            if (day === null) return <div key={`blank-${index}`} />

            const dateString = toDateString(new Date(viewDate.year, viewDate.month, day))
            const isToday = dateString === today

            return (
              <div
                key={dateString}
                className={`flex h-16 items-center justify-center rounded-xl border text-sm ${
                  isToday ? 'border-brand-600 bg-brand-100 font-bold' : 'border-transparent bg-brand-50'
                }`}
              >
                {day}
              </div>
            )
          })}
        </div>
      </Reveal>
    </div>
  )
}

export default CalendarPage