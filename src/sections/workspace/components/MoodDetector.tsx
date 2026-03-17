import { motion, AnimatePresence } from 'framer-motion'
import type { MoodState } from '@/data/types'

interface MoodDetectorProps {
  mood: MoodState
}

const moodColors: Record<string, { bg: string; text: string; bar: string }> = {
  neutral: { bg: 'bg-green-50', text: 'text-green-600', bar: 'bg-green-400' },
  slight_frustration: { bg: 'bg-yellow-50', text: 'text-yellow-600', bar: 'bg-yellow-400' },
  frustrated: { bg: 'bg-orange-50', text: 'text-orange-600', bar: 'bg-orange-400' },
  leaving: { bg: 'bg-red-50', text: 'text-red-600', bar: 'bg-red-500' },
  critical: { bg: 'bg-red-100', text: 'text-red-700', bar: 'bg-red-600' },
}

export default function MoodDetector({ mood }: MoodDetectorProps) {
  const colors = moodColors[mood.level] || moodColors.neutral

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Live Mood</span>
        <motion.span
          key={mood.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}
        >
          {mood.label}
        </motion.span>
      </div>

      {/* Patience bar */}
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colors.bar}`}
          animate={{ width: `${mood.patience * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[9px] text-gray-400">Patience</span>
        <motion.span
          key={mood.patience}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-[10px] font-bold ${mood.patience < 0.3 ? 'text-red-500' : 'text-gray-600'}`}
        >
          {(mood.patience * 100).toFixed(0)}%
        </motion.span>
      </div>

      {/* Alert */}
      <AnimatePresence>
        {mood.alert && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`${colors.bg} border ${
              mood.level === 'leaving' || mood.level === 'critical'
                ? 'border-red-300'
                : mood.level === 'frustrated'
                  ? 'border-orange-200'
                  : 'border-yellow-200'
            } rounded-lg p-2`}
          >
            <div className={`text-[9px] font-bold mb-0.5 ${colors.text}`}>
              {mood.level === 'leaving' || mood.level === 'critical' ? '🚨 ALERT' : '⚠️ Notice'}
            </div>
            <div className="text-[10px] text-gray-700">{mood.alert}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
