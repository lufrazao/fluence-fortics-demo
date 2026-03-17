import { motion, AnimatePresence } from 'framer-motion'

interface ChurnRiskIndicatorProps {
  risk: string // 'unknown' | 'stable' | 'at_risk' | 'critical'
  trend?: 'declining' | 'stable' | 'improving' | 'unknown'
}

const riskConfig: Record<string, { color: string; bg: string; border: string; label: string }> = {
  unknown: { color: 'text-gray-400', bg: 'bg-gray-700', border: 'border-gray-600', label: '???' },
  stable: { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', label: 'STABLE' },
  at_risk: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: 'AT RISK' },
  critical: { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: 'CRITICAL' },
}

const trendArrows: Record<string, string> = {
  declining: '↓',
  stable: '→',
  improving: '↑',
  unknown: '',
}

export default function ChurnRiskIndicator({ risk, trend = 'unknown' }: ChurnRiskIndicatorProps) {
  const config = riskConfig[risk] || riskConfig.unknown

  return (
    <div>
      <div className="text-xs text-gray-400 mb-1.5">Churn Risk</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={risk}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold ${config.bg} ${config.border} ${config.color}`}
        >
          <div className={`w-3 h-3 rounded-full ${risk === 'critical' ? 'bg-red-400 animate-pulse' : risk === 'at_risk' ? 'bg-yellow-400' : risk === 'stable' ? 'bg-green-400' : 'bg-gray-500'}`} />
          <span>{config.label}</span>
          {trend !== 'unknown' && (
            <span className={trend === 'declining' ? 'text-red-400' : trend === 'improving' ? 'text-green-400' : 'text-gray-400'}>
              {trendArrows[trend]}
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
