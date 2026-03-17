import { motion } from 'framer-motion'

interface TypingIndicatorProps {
  sender?: string
}

export default function TypingIndicator({ sender }: TypingIndicatorProps) {
  const isFluence = sender === 'bot_fluence' || sender === 'agent_briefed'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex items-start gap-2 px-4 py-1"
    >
      <div className={`px-3 py-2 rounded-lg rounded-tl-none shadow-sm ${
        isFluence ? 'bg-fluence-100 border border-fluence-200' : 'bg-white'
      }`}>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${isFluence ? 'bg-fluence-400' : 'bg-gray-400'}`}
              animate={{ scale: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
