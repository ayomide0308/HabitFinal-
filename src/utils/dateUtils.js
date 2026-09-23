// Dates in Habitly are plain text like "2026-09-21", in the user's LOCAL time.
// (We avoid date.toISOString() because it converts to UTC and can give
// the wrong day for a few hours around midnight.)

export function toDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseDateString(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getToday() {
  return toDateString(new Date())
}

export function addDays(dateString, amount) {
  const date = parseDateString(dateString)
  date.setDate(date.getDate() + amount)
  return toDateString(date)
}

// 0 = Sunday, 1 = Monday ... 6 = Saturday
export function getWeekday(dateString) {
  return parseDateString(dateString).getDay()
}

// Every date from start to end, including both ends
export function getDateRange(startString, endString) {
  const dates = []
  let current = startString
  while (current <= endString) {
    dates.push(current)
    current = addDays(current, 1)
  }
  return dates
}

export function formatLongDate(dateString) {
  return parseDateString(dateString).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}