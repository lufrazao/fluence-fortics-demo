import { motion } from 'framer-motion'

interface QueueHealthProps {
  critical: number
  atRisk: number
  healthy: number
  total: number
}

export default function QueueHealth({ critical, atRisk, healthy, total }: QueueHealthProps) {
  const cards = [
    { label: 'Critical', count: critical, icon: '🔴', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' },
    { label: 'At Risk', count: atRisk, icon: '🟡', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600' },
    { label: 'Healthy', count: healthy, icon: '🟢', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600' },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800">Queue Health</h3>
        <span className="text-xs text-gray-400">{total} total</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${card.bg} border ${card.border} rounded-lg p-3 text-center`}
          >
            <div className="text-lg mb-1">{card.icon}</div>
            <div className={`text-2xl font-bold ${card.text}`}>{card.count}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bar */}
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
        <motion.div
          className="bg-red-400 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${(critical / total) * 100}%` }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="bg-yellow-400 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${(atRisk / total) * 100}%` }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        <motion.div
          className="bg-green-400 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${(healthy / total) * 100}%` }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
    </div>
  )
}
