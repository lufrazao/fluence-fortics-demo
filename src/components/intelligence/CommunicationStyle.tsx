import { motion, AnimatePresence } from 'framer-motion'

interface CommunicationStyleProps {
  style: string
}

const styleColors: Record<string, string> = {
  unknown: 'bg-gray-700 text-gray-400',
  DIRECT: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  CONCISE: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  DETAILED: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  VERBOSE: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
  AUDIO: 'bg-green-500/20 text-green-300 border border-green-500/30',
}

const styleIcons: Record<string, string> = {
  unknown: '❓',
  DIRECT: '⚡',
  CONCISE: '📝',
  DETAILED: '📊',
  VERBOSE: '📖',
  AUDIO: '🎤',
}

export default function CommunicationStyle({ style }: CommunicationStyleProps) {
  return (
    <div>
      <div className="text-xs text-gray-400 mb-1.5">Communication Style</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={style}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold ${styleColors[style] || styleColors.unknown}`}
        >
          <span>{styleIcons[style] || '❓'}</span>
          <span>{style}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
