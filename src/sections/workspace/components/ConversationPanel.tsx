import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { InboxCustomer, ConversationMessage, ChannelType } from '@/data/types'
import { Send } from 'lucide-react'

interface ConversationPanelProps {
  customer: InboxCustomer
  messages: ConversationMessage[]
  fluenceEnabled: boolean
  suggestionSlot?: React.ReactNode
  inputValue?: string
  onInputChange?: (value: string) => void
}

const channelIcons: Record<ChannelType, string> = {
  whatsapp: '📱', webchat: '💬', instagram: '📸', email: '📧', voice: '📞',
}

const channelLabels: Record<ChannelType, string> = {
  whatsapp: 'WhatsApp', webchat: 'Webchat', instagram: 'Instagram', email: 'Email', voice: 'Voice',
}

export default function ConversationPanel({ customer, messages, fluenceEnabled, suggestionSlot, inputValue, onInputChange }: ConversationPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  return (
    <div className="flex flex-col h-full bg-workspace-conversation">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-gray-200 flex-shrink-0">
        <span className="text-lg">{channelIcons[customer.channel]}</span>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800">{customer.name}</div>
          <div className="text-[10px] text-gray-500">{channelLabels[customer.channel]} — {customer.topic}</div>
        </div>
        {fluenceEnabled && customer.priority === 'critical' && (
          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase">Critical</span>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === 'customer' ? 'justify-start' : msg.from === 'system' ? 'justify-center' : 'justify-end'}`}
            >
              {msg.from === 'system' ? (
                <div className="chat-bubble-system">{msg.text}</div>
              ) : msg.from === 'customer' ? (
                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[75%] shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</p>
                  <div className="text-[9px] text-gray-400 mt-0.5">{customer.name}</div>
                </div>
              ) : (
                <div className={`rounded-lg rounded-tr-none px-3 py-2 max-w-[75%] shadow-sm ${
                  msg.from === 'bot_fluence' || msg.from === 'agent_briefed'
                    ? 'bg-fluence-50 border border-fluence-200'
                    : msg.from === 'agent'
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-100 border border-gray-200'
                }`}>
                  <div className="text-[9px] font-semibold mb-0.5 text-gray-500">
                    {msg.from === 'bot_fluence' ? '🧠 Bot + Fluence' : msg.from === 'agent_briefed' ? '🧠 Agent (briefed)' : msg.from === 'agent' ? 'Agent' : 'Bot'}
                  </div>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Previous conversations */}
      {customer.channelHistory.length > 1 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <div className="text-[10px] text-gray-500 mb-1 font-medium">Previous conversations</div>
          <div className="flex gap-3">
            {customer.channelHistory.slice(1).map((h, i) => (
              <div key={i} className="text-[10px] text-gray-400 flex items-center gap-1">
                <span>{channelIcons[h.channel]}</span>
                <span>{h.date}: {h.topic}</span>
                {h.csat && <span className="text-yellow-500">{'★'.repeat(h.csat)}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestion slot */}
      {suggestionSlot}

      {/* Input area */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-200 flex-shrink-0">
        <input
          type="text"
          value={inputValue ?? ''}
          onChange={(e) => onInputChange?.(e.target.value)}
          placeholder="Type a response..."
          className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fluence-300"
        />
        <button className="w-8 h-8 rounded-lg bg-fluence-500 hover:bg-fluence-600 text-white flex items-center justify-center flex-shrink-0">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
