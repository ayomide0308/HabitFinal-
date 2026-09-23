const steps = [
  {
    title: 'Add your habits',
    text: 'Pick what you want to build and how often you want to do it.',
  },
  {
    title: 'Check in every day',
    text: 'Mark each habit done as you go and keep your streak alive.',
  },
  {
    title: 'See your progress',
    text: 'Review your calendar and statistics to spot what works for you.',
  },
]

function HowItWorks() {
  return (
    <section className="bg-[#f3f3ee] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
            Getting started takes a minute.
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks