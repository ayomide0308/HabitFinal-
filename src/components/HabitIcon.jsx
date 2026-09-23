import { Droplet, Footprints, BookOpen, Flower2, Laptop, Moon, PenLine, CheckCircle2 } from 'lucide-react'

const ICON_MAP = {
  '💧': Droplet,
  '🏃': Footprints,
  '📚': BookOpen,
  '🧘': Flower2,
  '💻': Laptop,
  '😴': Moon,
  '✍️': PenLine,
  '✅': CheckCircle2,
  '🎯': CheckCircle2,
}

function HabitIcon({ icon, size = 18, className = '' }) {
  const Icon = ICON_MAP[icon] || CheckCircle2
  return <Icon size={size} className={className} />
}

export default HabitIcon