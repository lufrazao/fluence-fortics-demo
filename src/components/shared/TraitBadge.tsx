import { motion } from 'framer-motion'

interface TraitBadgeProps {
  label: string
  value: string
  color?: 'purple' | 'red' | 'green' | 'yellow' | 'blue' | 'gray'
  pulse?: boolean
}

const colorMap = {
  purple: 'bg-fluence-500/20 text-fluence-300 border-fluence-500/30',
  red: 'bg-red-500/20 text-red-300 border-red-500/30',
  green: 'bg-green-500/20 text-green-300 border-green-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  gray: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
}

export default function TraitBadge({ label, value, color = 'purple', pulse = false }: TraitBadgeProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${colorMap[color]} ${pulse ? 'animate-pulse-slow' : ''}`}
    >
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </motion.div>
  )
}
