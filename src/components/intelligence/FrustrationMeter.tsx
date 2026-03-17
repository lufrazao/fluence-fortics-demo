import { motion } from 'framer-motion'

interface FrustrationMeterProps {
  velocity: string // 'unknown' | 'RESILIENT' | 'SLOW_BURN' | 'MODERATE' | 'FLASH'
}

const velocityConfig: Record<string, { fill: number; color: string; bg: string }> = {
  unknown: { fill: 0, color: 'text-gray-500', bg: 'bg-gray-600' },
  RESILIENT: { fill: 15, color: 'text-green-400', bg: 'bg-green-400' },
  SLOW_BURN: { fill: 40, color: 'text-yellow-400', bg: 'bg-yellow-400' },
  MODERATE: { fill: 60, color: 'text-orange-400', bg: 'bg-orange-400' },
  FLASH: { fill: 90, color: 'text-red-400', bg: 'bg-red-400' },
}

export default function FrustrationMeter({ velocity }: FrustrationMeterProps) {
  const config = velocityConfig[velocity] || velocityConfig.unknown

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-gray-400">Frustration</span>
        <span className={`text-xs font-bold ${config.color}`}>
          {velocity === 'FLASH' && '⚡ '}{velocity === 'unknown' ? '???' : velocity}
        </span>
      </div>
      <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${config.bg}`}
          initial={{ width: 0 }}
          animate={{ width: `${config.fill}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
