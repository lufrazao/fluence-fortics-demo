import { motion } from 'framer-motion'
import type { SupervisorMetric } from '@/data/types'

interface WeeklyTrendsProps {
  trends: SupervisorMetric[]
  churnSaves: { thisWeek: number; label: string }
}

export default function WeeklyTrends({ trends, churnSaves }: WeeklyTrendsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-800">Weekly Trends</h3>

      <div className="grid grid-cols-2 gap-3">
        {trends.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-3"
          >
            <div className="text-[10px] text-gray-400 font-medium mb-2">{metric.label}</div>
            <div className="flex items-end justify-between mb-1.5">
              <div>
                <div className="text-[9px] text-gray-400">Before</div>
                <div className="text-sm text-gray-500">{metric.before}</div>
              </div>
              <div className="text-lg text-gray-300">→</div>
              <div className="text-right">
                <div className="text-[9px] text-gray-400">After</div>
                <div className="text-sm font-bold text-gray-800">{metric.after}</div>
              </div>
            </div>
            <div className={`text-[11px] font-bold text-center py-1 rounded-md ${
              metric.label === 'Avg Handling Time' || metric.label === 'Escalation Rate'
                ? 'bg-green-50 text-green-600'
                : 'bg-green-50 text-green-600'
            }`}>
              {metric.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Churn saves highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-fluence-50 border border-fluence-200 rounded-lg p-4 text-center"
      >
        <div className="text-3xl font-bold text-fluence-600">{churnSaves.thisWeek}</div>
        <div className="text-xs text-fluence-500 mt-1">{churnSaves.label}</div>
      </motion.div>
    </div>
  )
}
