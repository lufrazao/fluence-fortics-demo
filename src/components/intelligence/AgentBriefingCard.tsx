import { motion } from 'framer-motion'
import type { AgentBriefing } from '../../data/types'

interface AgentBriefingCardProps {
  briefing: AgentBriefing
}

const priorityConfig = {
  critical: { bg: 'bg-red-500/20', border: 'border-red-500/30', dot: 'bg-red-400', text: 'text-red-400', label: 'CRITICAL' },
  high: { bg: 'bg-orange-500/20', border: 'border-orange-500/30', dot: 'bg-orange-400', text: 'text-orange-400', label: 'HIGH' },
  normal: { bg: 'bg-green-500/20', border: 'border-green-500/30', dot: 'bg-green-400', text: 'text-green-400', label: 'NORMAL' },
}

export default function AgentBriefingCard({ briefing }: AgentBriefingCardProps) {
  const pConfig = priorityConfig[briefing.priority]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="bg-gray-900/90 border border-white/10 rounded-xl p-5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🧠</span>
        <h3 className="text-sm font-bold text-white uppercase tracking-wide">Agent Briefing Card</h3>
        <span className="text-xs text-gray-500 ml-auto">what the human agent sees</span>
      </div>

      {/* Priority + Tone row */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold ${pConfig.bg} ${pConfig.border} ${pConfig.text}`}>
          <div className={`w-2 h-2 rounded-full ${pConfig.dot} ${briefing.priority === 'critical' ? 'animate-pulse' : ''}`} />
          Priority: {pConfig.label}
        </div>
        <div className="text-xs text-gray-400">
          Tone: <span className="text-fluence-300 font-medium">{briefing.recommendedTone}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-300 mb-4 leading-relaxed">
        {briefing.customerSummary}
      </div>

      {/* DO / DON'T */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-bold text-green-400 mb-2">✅ DO</div>
          <ul className="space-y-1">
            {briefing.doList.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-xs text-gray-300 flex items-start gap-1.5"
              >
                <span className="text-green-400 mt-0.5">•</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold text-red-400 mb-2">❌ DON'T</div>
          <ul className="space-y-1">
            {briefing.dontList.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-xs text-gray-300 flex items-start gap-1.5"
              >
                <span className="text-red-400 mt-0.5">•</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
