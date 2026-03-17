import { motion, AnimatePresence } from 'framer-motion'

interface ToneRecommendationProps {
  tone: string
}

const toneIcons: Record<string, string> = {
  'Solution-first, no filler': '🎯',
  'Thorough and clear': '📋',
  'Warm, conversational voice': '🎙️',
  'Empathetic and proactive': '💚',
  'Friendly, professional': '😊',
}

export default function ToneRecommendation({ tone }: ToneRecommendationProps) {
  return (
    <div>
      <div className="text-xs text-gray-400 mb-1.5">Recommended Tone</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tone}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-fluence-500/15 border border-fluence-500/20 text-sm text-fluence-300 font-medium"
        >
          <span>{toneIcons[tone] || '💬'}</span>
          <span>{tone}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
