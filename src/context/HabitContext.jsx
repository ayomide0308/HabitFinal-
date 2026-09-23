import { createContext, useContext, useEffect, useState } from 'react'
import { getToday } from '../utils/dateUtils'
import { isCompletedOn } from '../utils/habitUtils'
import { generateSampleData } from '../data/sampleData'
import { loadHabitData, saveHabitData } from '../services/storageService'

const HabitContext = createContext(null)

export function HabitProvider({ userId, children }) {
  const [data, setData] = useState(() => {
    const saved = loadHabitData(userId)
    if (saved) return { goals: [], ...saved }
    return { ...generateSampleData(getToday()), goals: [] }
  })

  useEffect(() => {
    saveHabitData(userId, data)
  }, [userId, data])

  function addHabit(fields) {
    const habit = {
      ...fields,
      id: crypto.randomUUID(),
      status: 'active',
      createdAt: new Date().toISOString(),
    }
    setData((prev) => ({ ...prev, habits: [...prev.habits, habit] }))
    return habit
  }

  function updateHabit(id, changes) {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) => (habit.id === id ? { ...habit, ...changes } : habit)),
    }))
  }

  function deleteHabit(id) {
    setData((prev) => {
      const logs = { ...prev.logs }
      delete logs[id]
      return { ...prev, habits: prev.habits.filter((habit) => habit.id !== id), logs }
    })
  }

  function logProgress(habitId, date, amount) {
    setData((prev) => {
      const habitLogs = { ...(prev.logs[habitId] || {}) }
      if (amount <= 0) {
        delete habitLogs[date]
      } else {
        habitLogs[date] = amount
      }
      return { ...prev, logs: { ...prev.logs, [habitId]: habitLogs } }
    })
  }

  function toggleComplete(habitId, date) {
    const habit = data.habits.find((item) => item.id === habitId)
    if (!habit) return
    const done = isCompletedOn(data.logs, habit, date)
    logProgress(habitId, date, done ? 0 : habit.target.count)
  }

  function addGoal(text) {
    const goal = { id: crypto.randomUUID(), text }
    setData((prev) => ({ ...prev, goals: [...(prev.goals || []), goal] }))
    return goal
  }

  function resetToSample() {
    setData({ ...generateSampleData(getToday()), goals: [] })
  }

  function clearAll() {
    setData({ habits: [], logs: {}, goals: [] })
  }

  const value = {
    habits: data.habits,
    logs: data.logs,
    goals: data.goals || [],
    addHabit,
    updateHabit,
    deleteHabit,
    logProgress,
    toggleComplete,
    addGoal,
    resetToSample,
    clearAll,
  }

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
}

export function useHabits() {
  const context = useContext(HabitContext)
  if (!context) {
    throw new Error('useHabits must be used inside a HabitProvider')
  }
  return context
}   