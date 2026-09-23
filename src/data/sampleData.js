import { addDays, getWeekday } from '../utils/dateUtils'

const HISTORY_DAYS = 60

const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6]
const WEEKDAYS = [1, 2, 3, 4, 5]

// The habits every new account starts with.
// streakLength / reliability / todayProgress only shape the fake history below;
// they are NOT saved on the habit.
const SAMPLE_HABITS = [
  {
    name: 'Drink Water', description: 'Stay hydrated through the day',
    icon: '💧', category: 'Health', color: 'sky',
    frequency: 'daily', days: EVERY_DAY, reminderTime: '09:00',
    target: { count: 8, unit: 'glasses' }, status: 'active',
    streakLength: 12, reliability: 0.85, todayProgress: 5,
  },
  {
    name: 'Exercise', description: '30 minutes of movement',
    icon: '🏃', category: 'Fitness', color: 'green',
    frequency: 'custom', days: [1, 3, 5], reminderTime: '17:30',
    target: { count: 1, unit: 'session' }, status: 'active',
    streakLength: 7, reliability: 0.7, todayProgress: 1,
  },
  {
    name: 'Read', description: 'Read for 20 minutes',
    icon: '📚', category: 'Learning', color: 'violet',
    frequency: 'daily', days: EVERY_DAY, reminderTime: '20:30',
    target: { count: 1, unit: 'session' }, status: 'active',
    streakLength: 5, reliability: 0.75, todayProgress: 1,
  },
  {
    name: 'Meditate', description: '10 quiet minutes to start the day',
    icon: '🧘', category: 'Mindfulness', color: 'amber',
    frequency: 'weekdays', days: WEEKDAYS, reminderTime: '07:00',
    target: { count: 1, unit: 'session' }, status: 'active',
    streakLength: 4, reliability: 0.6, todayProgress: 0,
  },
  {
    name: 'Study', description: 'One focused study block',
    icon: '💻', category: 'Learning', color: 'slate',
    frequency: 'weekdays', days: WEEKDAYS, reminderTime: '19:00',
    target: { count: 1, unit: 'session' }, status: 'active',
    streakLength: 9, reliability: 0.8, todayProgress: 1,
  },
  {
    name: 'Sleep 8 Hours', description: 'Lights out on time',
    icon: '😴', category: 'Health', color: 'rose',
    frequency: 'daily', days: EVERY_DAY, reminderTime: '22:30',
    target: { count: 1, unit: 'night' }, status: 'active',
    streakLength: 3, reliability: 0.65, todayProgress: 0,
  },
  {
    name: 'Journal', description: 'A weekly look back',
    icon: '✍️', category: 'Mindfulness', color: 'amber',
    frequency: 'weekly', days: [0], reminderTime: null,
    target: { count: 1, unit: 'entry' }, status: 'paused',
    streakLength: 0, reliability: 0.5, todayProgress: 0,
  },
]

// A repeatable "random" number between 0 and 1: the same inputs always give
// the same answer, so the sample history looks the same every time.
function pseudoRandom(a, b) {
  const x = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export function generateSampleData(today) {
  const startDate = addDays(today, -HISTORY_DAYS)
  const habits = []
  const logs = {}

  SAMPLE_HABITS.forEach((sample, index) => {
    const { streakLength, reliability, todayProgress, ...details } = sample

    const habit = {
      id: `sample-${index + 1}`,
      ...details,
      startDate,
      createdAt: `${startDate}T08:00:00`,
    }
    habits.push(habit)
    logs[habit.id] = {}

    for (let daysAgo = 1; daysAgo <= HISTORY_DAYS; daysAgo++) {
      const date = addDays(today, -daysAgo)
      if (!habit.days.includes(getWeekday(date))) continue

      const inStreak = daysAgo <= streakLength
      // A few days right after the streak are misses, so the streak really ends there.
      const inBreak = daysAgo > streakLength && daysAgo <= streakLength + 3
      const done = inStreak || (!inBreak && pseudoRandom(index + 1, daysAgo) < reliability)

      if (done) logs[habit.id][date] = habit.target.count
    }

    if (todayProgress > 0 && habit.days.includes(getWeekday(today))) {
      logs[habit.id][today] = todayProgress
    }
  })

  return { habits, logs }
}