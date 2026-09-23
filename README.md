# Habitly 🔥

A modern habit-tracking web app built as a final project. Habitly helps you build daily habits, track streaks, link habits to long-term goals, and visualize your consistency over time.

## Features

- **Landing page** — hero, user benefits, habit categories, and a call to action
- **Authentication** — simulated sign up / sign in (demo only, not secure)
- **Dashboard** — live stats (total habits, completed today, completion rate), quick-add habits, daily check-off
- **Habit Tracker** — create habits and link them to long-term goals
- **Analytics** — completion rate, per-habit streaks, and goal progress
- **Calendar** — month view of habit activity with month navigation
- **Notifications** — browser notification permission, test notifications, and reminder times
- **Pricing / About / Features** — supporting marketing-style pages

All habit and account data is saved to the browser's `localStorage`, so your habits persist across page refreshes and browser sessions.

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- Context API (`AuthContext`, `HabitContext`) for shared app state
- `localStorage`, wrapped behind a small service layer, so it can later be swapped for a real backend (e.g. Firebase) with minimal changes elsewhere

## Getting started

\`\`\`bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build
\`\`\`

Then open the local address Vite prints (usually `http://localhost:5173`).

## Project structure

\`\`\`
src/
├── components/      # Reusable UI pieces (cards, forms, icons, layout)
├── context/         # AuthContext and HabitContext (shared app state)
├── data/            # Sample data generation
├── pages/           # One file per route/page
├── services/        # localStorage-backed auth and storage services
├── utils/           # Date and habit calculation helpers (streaks, completion rates, etc.)
├── App.jsx          # Route definitions
└── main.jsx         # App entry point
\`\`\`

## Notes

- Authentication is simulated for demo purposes: it checks that an account exists by email, but does not store or verify passwords. It is **not** intended to be secure.
- The `services/` folder is the only place that touches `localStorage` directly, so swapping in a real backend later would mean rewriting that layer rather than the rest of the app.