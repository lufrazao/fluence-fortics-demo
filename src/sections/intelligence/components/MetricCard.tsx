import { motion } from 'framer-motion'

interface MetricCardProps {
  label: string
  before: string
  after: string
  change: string
  positive: boolean
  delay?: number
}

export default function MetricCard({ label, before, after, change, positive, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-5"
    >
      <div className="text-sm text-gray-400 mb-3">{label}</div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-gray-500 text-xs mb-1">Before</div>
          <div className="text-lg text-gray-300">{before}</div>
        </div>
        <div className="text-2xl text-gray-600 mx-3">→</div>
        <div>
          <div className="text-gray-500 text-xs mb-1">After</div>
          <div className="text-lg text-white font-semibold">{after}</div>
        </div>
      </div>
      <div className={`mt-3 text-sm font-bold ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </div>
    </motion.div>
  )
}
