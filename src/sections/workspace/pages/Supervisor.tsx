import { motion } from 'framer-motion'
import { QUEUE_HEALTH, WEEKLY_TRENDS, CHURN_SAVES, BEHAVIORAL_INSIGHTS } from '@/data/supervisorData'
import { AGENTS } from '@/data/agentProfiles'
import QueueHealth from '../components/QueueHealth'
import AgentPerformanceTable from '../components/AgentPerformanceTable'
import BehavioralInsights from '../components/BehavioralInsights'
import WeeklyTrends from '../components/WeeklyTrends'

interface SupervisorProps {
  fluenceEnabled: boolean
}

export default function Supervisor({ fluenceEnabled }: SupervisorProps) {
  if (!fluenceEnabled) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Supervisor Dashboard</h2>
          <p className="text-sm text-gray-500 mb-4">
            Enable Fluence to see behavioral intelligence insights, queue health monitoring, and agent performance analytics.
          </p>
          <div className="text-xs text-gray-400">
            Toggle Fluence ON in the top bar →
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-lg font-bold text-gray-800">Supervisor Dashboard</h2>
            <p className="text-xs text-gray-500 mt-0.5">Real-time behavioral intelligence across your queue</p>
          </div>
          <div className="flex items-center gap-2 bg-fluence-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-fluence-400 animate-pulse" />
            <span className="text-[10px] font-bold text-fluence-600 uppercase tracking-wider">Live</span>
          </div>
        </motion.div>

        {/* Top row: Queue health + Churn saves */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-4">
            <QueueHealth
              critical={QUEUE_HEALTH.critical}
              atRisk={QUEUE_HEALTH.atRisk}
              healthy={QUEUE_HEALTH.healthy}
              total={QUEUE_HEALTH.total}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-fluence-50 to-fluence-100 rounded-xl border border-fluence-200 p-4 flex flex-col items-center justify-center text-center"
          >
            <div className="text-4xl font-bold text-fluence-600">{CHURN_SAVES.thisWeek}</div>
            <div className="text-xs text-fluence-500 mt-1 font-medium">Customers Retained</div>
            <div className="text-[10px] text-fluence-400 mt-0.5">this week</div>
          </motion.div>
        </div>

        {/* Agent performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <AgentPerformanceTable agents={AGENTS} />
        </div>

        {/* Bottom row: Insights + Trends */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <BehavioralInsights insights={BEHAVIORAL_INSIGHTS} />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <WeeklyTrends trends={WEEKLY_TRENDS} churnSaves={CHURN_SAVES} />
          </div>
        </div>
      </div>
    </div>
  )
}
