import { motion } from 'framer-motion'
import type { ConversationMessage } from '../../data/types'
import { Mic } from 'lucide-react'

interface ChatBubbleProps {
  message: ConversationMessage
  index: number
}

export default function ChatBubble({ message, index }: ChatBubbleProps) {
  const { from, text, isAudio } = message

  // System messages
  if (from === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="flex justify-center px-4 py-1"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-gray-600 text-center max-w-[90%] shadow-sm">
          {text}
        </div>
      </motion.div>
    )
  }

  // Customer messages (outbound — right aligned, green)
  if (from === 'customer') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 0.05, type: 'spring', stiffness: 300, damping: 25 }}
        className="flex justify-end px-4 py-0.5"
      >
        <div className="whatsapp-bubble-out">
          {isAudio && (
            <div className="flex items-center gap-2 mb-1">
              <Mic className="w-4 h-4 text-green-600" />
              <div className="flex-1 h-1 bg-green-300 rounded-full" />
            </div>
          )}
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{text}</p>
          <div className="text-[10px] text-gray-500 text-right mt-0.5">
            {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            <span className="ml-1 text-blue-500">✓✓</span>
          </div>
        </div>
      </motion.div>
    )
  }

  // Bot / Agent messages (inbound — left aligned)
  const isFluence = from === 'bot_fluence' || from === 'agent_briefed'
  const isAgent = from === 'agent' || from === 'agent_briefed'

  let bubbleClasses = 'whatsapp-bubble-in'
  let accentBorder = ''
  if (isFluence) {
    accentBorder = 'border-l-2 border-l-fluence-500'
  } else if (isAgent) {
    accentBorder = 'border-l-2 border-l-blue-400'
  }

  const senderLabel = isFluence
    ? (isAgent ? '🧠 Agent (Fluence-briefed)' : '🧠 GOgenier + Fluence')
    : (isAgent ? '👤 Agent' : '🤖 Bot')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: 0.05, type: 'spring', stiffness: 300, damping: 25 }}
      className="flex justify-start px-4 py-0.5"
    >
      <div className={`${bubbleClasses} ${accentBorder}`}>
        <div className={`text-[10px] font-semibold mb-1 ${isFluence ? 'text-fluence-600' : isAgent ? 'text-blue-600' : 'text-gray-500'}`}>
          {senderLabel}
        </div>
        {isAudio && (
          <div className="flex items-center gap-2 mb-1">
            <Mic className={`w-4 h-4 ${isFluence ? 'text-fluence-500' : 'text-gray-400'}`} />
            <div className={`flex-1 h-1 rounded-full ${isFluence ? 'bg-fluence-200' : 'bg-gray-200'}`} />
          </div>
        )}
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{text}</p>
        <div className="text-[10px] text-gray-400 text-right mt-0.5">
          {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  )
}
