import { Check } from 'lucide-react'
import ProgressBar from './ProgressBar'

const previewHabits = [
  { icon: '💧', name: 'Drink Water', detail: '8 / 8 glasses', done: true },
  { icon: '📚', name: 'Read', detail: '20 minutes', done: true },
  { icon: '🏃', name: 'Exercise', detail: '30 minutes', done: false },
  { icon: '🧘', name: 'Meditate', detail: '10 minutes', done: false },
]

function HabitPreview() {
  const doneCount = previewHabits.filter((habit) => habit.done).length
  const percent = (doneCount / previewHabits.length) * 100

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-line bg-white p-6 text-left shadow-xl shadow-stone-900/5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Today's habits</h2>
        <span className="text-sm font-medium text-ink-soft">
          {doneCount} / {previewHabits.length} done
        </span>
      </div>

     <ProgressBar value={percent} barClass="bg-brand-500" className="mt-3" />x

      <ul className="mt-5 space-y-3">
        {previewHabits.map((habit) => (
          <li
            key={habit.name}
            className="flex items-center gap-4 rounded-2xl border border-line px-4 py-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunken text-lg">
              {habit.icon}
            </span>

            <div className="flex-1">
              <p className="text-sm font-semibold">{habit.name}</p>
              <p className="text-xs text-ink-faint">{habit.detail}</p>
            </div>

            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                habit.done
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-line text-transparent'
              }`}
            >
              <Check size={16} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HabitPreview