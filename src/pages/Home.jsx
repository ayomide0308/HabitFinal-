import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Calendar, TrendingUp, CheckCircle2 } from 'lucide-react'

function Home() {
  return (
    <>
      <section
  className="bg-cover bg-center px-6 py-28 text-center text-white"
  style={{ backgroundImage: "linear-gradient(rgba(10,15,13,0.55), rgba(10,15,13,0.55)), url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80')" }}
>
  <h1 className="mx-auto max-w-2xl text-5xl font-extrabold leading-tight sm:text-7xl">
          Build Better Habits, Build a Better Life
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-stone-200">
          Track your habits, stay consistent, and achieve your goals with ease.
        </p>
        <Link to="/signup" className="btn btn-primary mt-8 inline-flex">
          Try Habitly Free
        </Link>
      </section>

      <Reveal>
        <section className="bg-sage-500 px-6 py-20 text-center text-white">
          <h2 className="text-3xl font-extrabold">User Benefits</h2>
          <p className="mx-auto mt-2 max-w-xl text-brand-50">
            Discover how our habit tracker empowers you to stay consistent and reach your goals effortlessly.
          </p>

          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
            { icon: Calendar, title: 'Build Better Habits', text: 'Create routines that help you stay organized, focused, and productive every day.' },
            { icon: TrendingUp, title: 'Track Your Progress', text: 'Visualize your improvements to stay motivated and consistent.' },
            { icon: CheckCircle2, title: 'Stay Consistent', text: 'Develop long-term discipline by checking off your habits daily.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 text-ink">
                <item.icon className="text-brand-600" size={28} />
                <h3 className="mt-3 font-bold text-brand-700">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="px-6 py-20 text-center">
          <h2 className="text-3xl font-extrabold text-brand-700">Habit Categories</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-soft">
            Explore different areas to focus on and track your habits effectively.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
           {[
             { img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', title: 'Fitness', text: 'Set fitness goals and stay consistent with your training.' },
             { img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', title: 'Social', text: 'Stay connected and maintain healthy social habits.' },
             { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', title: 'Mindfulness', text: 'Practice meditation, journaling, and reflection for mental clarity.' },
             { img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80', title: 'Health', text: 'Track your workouts, nutrition, and daily activity.' },
             { img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80', title: 'Learning', text: 'Build a habit of reading, courses, and self-improvement.' },
             { img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80', title: 'Coding', text: 'Practice programming and develop new technical skills.' },
           ].map((item) => (
  <div key={item.title} className="card overflow-hidden text-left">
    <img src={item.img} alt={item.title} className="h-40 w-full object-cover" />
    <div className="p-5">
      <h3 className="text-lg font-bold text-brand-700">{item.title}</h3>
      <p className="mt-1 text-base text-ink-soft">{item.text}</p>
    </div>
  </div>
))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-brand-600 px-6 py-16 text-center text-white">
          <h2 className="text-3xl font-extrabold">Start Building Your Habits Today!</h2>
          <p className="mt-2 text-brand-50">Track, improve, and achieve your goals with ease.</p>
          <Link to="/signup" className="btn mt-6 inline-flex bg-white text-brand-700 hover:bg-brand-50">
            Get Started
          </Link>
        </section>
      </Reveal>
    </>
  )
}

export default Home