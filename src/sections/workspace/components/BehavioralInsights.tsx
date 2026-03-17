import { motion } from 'framer-motion'
import type { BehavioralInsight } from '@/data/types'

interface BehavioralInsightsProps {
  insights: BehavioralInsight[]
}

const severityStyles: Record<string, string> = {
  critical: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200',
}

export default function BehavioralInsights({ insights }: BehavioralInsightsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-800">Behavioral Insights</h3>

      <div className="space-y-2">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-start gap-2 p-2.5 rounded-lg border ${severityStyles[insight.severity]}`}
          >
            <span className="text-sm flex-shrink-0">{insight.icon}</span>
            <span className="text-xs text-gray-700">{insight.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
