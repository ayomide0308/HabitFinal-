import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHabits } from '../context/HabitContext'
import { getToday } from '../utils/dateUtils'
import { isScheduledOn, isCompletedOn } from '../utils/habitUtils'
import { Bell } from 'lucide-react'
import HabitIcon from '../components/HabitIcon'


const quickLinks = [
  { to: '/habit', title: 'Habit Tracker', text: 'Track your daily habits.' },
  { to: '/analytics', title: 'Analytics', text: 'View detailed habit stats.' },
  { to: '/calendar', title: 'Calendar View', text: 'See habits on a monthly calendar.' },
]

function Notifications() {
  const { habits, logs } = useHabits()
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  )
  const [reminderTime, setReminderTime] = useState('')
  const [reminders, setReminders] = useState([])
  const today = getToday()

  async function handleAllow() {
    if (typeof Notification === 'undefined') return
    const result = await Notification.requestPermission()
    setPermission(result)
  }

  function handleTest() {
    if (permission !== 'granted') return
    new Notification('Habitly', { body: 'This is a test notification. 🔥' })
  }

  function handleSetReminder(event) {
    event.preventDefault()
    if (!reminderTime) return
    setReminders((prev) => [...prev, { id: crypto.randomUUID(), time: reminderTime }])
    setReminderTime('')
  }

  const dueReminders = habits.filter(
    (habit) =>
      habit.status === 'active' &&
      habit.reminderTime &&
      isScheduledOn(habit, today) &&
      !isCompletedOn(logs, habit, today)
  )

  return (
    <div className="photo-panel px-6 py-16 text-white">
      <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-extrabold">
            <Bell size={26} /> Habit Reminders
             Habit Reminders</h1>
          <p className="mt-2 text-stone-200">Set daily reminder times and schedule browser notifications.</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={handleAllow}
              className={`btn ${permission === 'granted' ? 'bg-white text-brand-700' : 'btn-secondary border-white text-white hover:bg-white/10'}`}
            >
              {permission === 'granted' ? 'Notifications Allowed' : 'Allow Notifications'}
            </button>
            <button onClick={handleTest} disabled={permission !== 'granted'} className="btn btn-primary">
              Test Notification
            </button>
          </div>

          <form onSubmit={handleSetReminder} className="mt-6 flex gap-2">
            <input
              type="time"
              className="field w-40"
              value={reminderTime}
              onChange={(event) => setReminderTime(event.target.value)}
            />
            <button type="submit" className="btn bg-white text-brand-700 hover:bg-brand-50">
              Set Reminder
            </button>
          </form>

          {reminders.length === 0 ? (
            <p className="mt-4 text-sm text-stone-300">
              No reminders saved yet. Use the input above to set one.
            </p>
          ) : (
            <ul className="mt-4 space-y-1 text-sm">
              {reminders.map((reminder) => <li key={reminder.id}>⏰ Reminder at {reminder.time}</li>)}
            </ul>
          )}

          {dueReminders.length > 0 && (
            <div className="mt-6 rounded-xl bg-white/10 p-4">
              <p className="text-sm font-bold">Due now, from your habits:</p>
              <ul className="mt-2 space-y-1 text-sm text-stone-200">
                {dueReminders.map((habit) => (
                  <li key={habit.id} className="flex items-center gap-2">
                    <HabitIcon icon={habit.icon} />
                     {habit.name} — {habit.reminderTime}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-3">
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
  )
}

export default Notifications