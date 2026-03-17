import { motion } from 'framer-motion'

interface PatienceGaugeProps {
  value: number // 0-1
  label?: string
}

export default function PatienceGauge({ value, label = 'Patience' }: PatienceGaugeProps) {
  const percentage = Math.round(value * 100)
  const color = value > 0.6 ? 'bg-green-400' : value > 0.3 ? 'bg-yellow-400' : 'bg-red-400'
  const textColor = value > 0.6 ? 'text-green-400' : value > 0.3 ? 'text-yellow-400' : 'text-red-400'
  const levelLabel = value > 0.7 ? 'HIGH' : value > 0.4 ? 'MODERATE' : value > 0.2 ? 'LOW' : 'VERY LOW'

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-gray-400">{label}</span>
        <span className={`text-xs font-bold ${textColor}`}>{levelLabel}</span>
      </div>
      <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: '50%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <div className="text-[10px] text-gray-500 mt-0.5 text-right">{value.toFixed(2)}</div>
    </div>
  )
}
