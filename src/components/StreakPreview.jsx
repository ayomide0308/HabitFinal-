import { Flame, Check } from 'lucide-react'

const week = [
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
  { day: 'T', done: true },
  { day: 'F', done: true },
  { day: 'S', done: false },
  { day: 'S', done: false },
]

function StreakPreview() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">   
            Streaks
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
            Small wins, every day, add up.
          </h2>
          <p className="mt-4 text-ink-soft">
            Every day you complete a habit, your streak grows. Seeing that
            number climb is a simple, powerful reason to show up again tomorrow.
          </p>
        </div>

        <div className="rounded-3xl border border-line p-5 shadow-xl shadow-stone-900/5">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white">
              <Flame size={28} />
            </span>
            <div>
              <p className="text-3xl font-extrabold leading-none">12 days</p>
              <p className="mt-1 text-sm text-ink-soft">Current streak</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            {week.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-ink-faint">{item.day}</span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                    item.done
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'border-line text-transparent'
                  }`}
                >
                  <Check size={16} />
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 border-t border-line pt-4 text-sm text-ink-soft">
            Longest streak: <span className="font-semibold text-ink">21 days</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default StreakPreview