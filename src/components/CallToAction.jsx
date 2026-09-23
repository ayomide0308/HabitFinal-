import { Link } from 'react-router-dom'

function CallToAction() {
  return (
    <section className="bg-white px-6 pb-24">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-black px-6 py-20 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Your best self starts with one habit.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-stone-300">
          Create your free account and check in on your first habit today.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/signup"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-stone-200"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="rounded-full border border-stone-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CallToAction