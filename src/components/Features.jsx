import { CircleCheck, Flame, CalendarDays, ChartColumn } from 'lucide-react'

const features = [
  {
    icon: CircleCheck,
    title: 'Daily check-ins',
    text: 'Tick off your habits in one tap and watch your day fill up.',
  },
  {
    icon: Flame,
    title: 'Streaks that motivate',
    text: 'Keep your streak alive and try to beat your longest run.',
  },
  {
    icon: CalendarDays,
    title: 'Habit calendar',
    text: 'Look back at any day to see exactly what you completed.',
  },
  {
    icon: ChartColumn,
    title: 'Clear statistics',
    text: 'Weekly and monthly charts show how consistent you really are.',
  },
]

function Features() {
  return (
    <section id="features" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            Features
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
            Everything you need to stay consistent.
          </h2>
          <p className="mt-4 text-ink-soft">
            Simple tools that help you show up every day, without the clutter.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-line p-6 transition-all hover:border-brand-200 hover:shadow-lg hover:shadow-stone-900/5"
            >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600"> 
                <Icon size={20} />
              </span>
              <h3 className="mt-5 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features