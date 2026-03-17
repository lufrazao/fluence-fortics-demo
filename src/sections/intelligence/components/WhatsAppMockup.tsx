import { useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { ConversationMessage } from '@/data/types'
import ChatBubble from '@/components/simulation/ChatBubble'
import TypingIndicator from '@/components/simulation/TypingIndicator'
import { ArrowLeft, Phone, MoreVertical } from 'lucide-react'

interface WhatsAppMockupProps {
  contactName: string
  contactAvatar?: string
  messages: ConversationMessage[]
  isTyping: boolean
  typingSender?: string
  hasFluence?: boolean
  compact?: boolean
}

export default function WhatsAppMockup({
  contactName,
  contactAvatar = '🏢',
  messages,
  isTyping,
  typingSender,
  hasFluence = false,
  compact = false,
}: WhatsAppMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <div className="flex flex-col h-full">
      {/* WhatsApp Header */}
      <div className="bg-whatsapp-header text-white flex items-center gap-3 px-3 py-2 flex-shrink-0" style={{ paddingTop: compact ? '8px' : '44px' }}>
        <ArrowLeft className="w-5 h-5 opacity-80" />
        <div className="w-8 h-8 rounded-full bg-whatsapp-header-light flex items-center justify-center text-sm">
          {contactAvatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">{contactName}</div>
          <div className="text-[10px] opacity-70">
            {isTyping ? 'typing...' : 'online'}
          </div>
        </div>
        <Phone className="w-4 h-4 opacity-70" />
        <MoreVertical className="w-4 h-4 opacity-70" />
        {hasFluence && (
          <div className="absolute top-1 right-2 bg-fluence-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ top: compact ? '4px' : '40px' }}>
            FLUENCE
          </div>
        )}
      </div>

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-whatsapp-bg py-2 space-y-0.5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 20h1v1h-1zM60 60h1v1h-1zM100 30h1v1h-1zM140 80h1v1h-1zM30 120h1v1h-1zM80 140h1v1h-1zM160 160h1v1h-1zM50 180h1v1h-1z\' fill=\'%23d4cfc4\' fill-opacity=\'0.3\'/%3E%3C/svg%3E")',
        }}
      >
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} index={i} />
        ))}
        <AnimatePresence>
          {isTyping && <TypingIndicator sender={typingSender} />}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="bg-gray-100 flex items-center gap-2 px-3 py-2 flex-shrink-0">
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
          Message
        </div>
        <div className="w-8 h-8 rounded-full bg-whatsapp-teal flex items-center justify-center">
          <span className="text-white text-sm">🎤</span>
        </div>
      </div>
    </div>
  )
}
