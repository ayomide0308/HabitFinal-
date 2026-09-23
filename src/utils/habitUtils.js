import { addDays, getWeekday, getDateRange } from './dateUtils'

// Is this habit due on this date?
// Every habit stores a list of weekdays (0 = Sunday ... 6 = Saturday) in habit.days,
// so daily, weekdays, weekly and custom all work the same way.
export function isScheduledOn(habit, dateString) {
  if (dateString < habit.startDate) return false
  return habit.days.includes(getWeekday(dateString))
}

// logs looks like: { habitId: { "2026-09-21": 5 } }  (5 glasses that day)
export function getProgressOn(logs, habit, dateString) {
  return logs[habit.id]?.[dateString] ?? 0
}

export function isCompletedOn(logs, habit, dateString) {
  return getProgressOn(logs, habit, dateString) >= habit.target.count
}

// How many scheduled days in a row (counting back from today) were completed.
export function getCurrentStreak(habit, logs, today) {
  let streak = 0
  let date = today

  // Today isn't over yet, so an unfinished today doesn't break the streak.
  if (isScheduledOn(habit, date) && !isCompletedOn(logs, habit, date)) {
    date = addDays(date, -1)
  }

  while (date >= habit.startDate) {
    if (isScheduledOn(habit, date)) {
      if (isCompletedOn(logs, habit, date)) {
        streak++
      } else {
        break
      }
    }
    // Days when the habit isn't scheduled are skipped, not counted as misses.
    date = addDays(date, -1)
  }

  return streak
}

// The longest run of completed scheduled days in the habit's whole history.
export function getLongestStreak(habit, logs, today) {
  let longest = 0
  let current = 0

  for (const date of getDateRange(habit.startDate, today)) {
    if (!isScheduledOn(habit, date)) continue

    if (isCompletedOn(logs, habit, date)) {
      current++
      longest = Math.max(longest, current)
    } else {
      current = 0
    }
  }

  return longest
}

// Completed vs scheduled between two dates, for one habit or many.
// Pass [habit] for a single habit, or a list of habits for an overall rate.
export function getCompletionStats(habits, logs, fromDate, toDate) {
  let scheduled = 0
  let completed = 0

  for (const date of getDateRange(fromDate, toDate)) {
    for (const habit of habits) {
      if (isScheduledOn(habit, date)) {
        scheduled++
        if (isCompletedOn(logs, habit, date)) completed++
      }
    }
  }

  const percent = scheduled === 0 ? 0 : Math.round((completed / scheduled) * 100)
  return { scheduled, completed, percent }
}

// Everything the Dashboard and Calendar need to know about one day.
export function getDaySummary(habits, logs, dateString) {
  const scheduled = habits.filter((habit) => isScheduledOn(habit, dateString))
  const completed = scheduled.filter((habit) => isCompletedOn(logs, habit, dateString))
  const incomplete = scheduled.filter((habit) => !isCompletedOn(logs, habit, dateString))
  const percent =
    scheduled.length === 0 ? 0 : Math.round((completed.length / scheduled.length) * 100)

  return { scheduled, completed, incomplete, percent }
}