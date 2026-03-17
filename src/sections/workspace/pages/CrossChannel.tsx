import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ConversationMessage } from '@/data/types'
import {
  CROSS_CHANNEL_INSTAGRAM,
  CROSS_CHANNEL_WHATSAPP_GENERIC,
  CROSS_CHANNEL_WHATSAPP_FLUENCE,
} from '@/data/moodSequences'

interface CrossChannelProps {
  fluenceEnabled: boolean
}

const channelIcons = { instagram: '📸', whatsapp: '📱' }

function ChatPanel({ title, icon, messages, highlight }: {
  title: string
  icon: string
  messages: ConversationMessage[]
  highlight?: boolean
}) {
  return (
    <div className={`flex-1 flex flex-col rounded-xl border ${highlight ? 'border-fluence-300 fluence-glow' : 'border-gray-200'} overflow-hidden`}>
      <div className={`px-4 py-2.5 border-b flex items-center gap-2 ${highlight ? 'bg-fluence-50 border-fluence-200' : 'bg-gray-50 border-gray-200'}`}>
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        {highlight && <span className="text-[9px] bg-fluence-100 text-fluence-600 px-1.5 py-0.5 rounded-full font-bold">FLUENCE</span>}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex ${msg.from === 'customer' ? 'justify-start' : msg.from === 'system' ? 'justify-center' : 'justify-end'}`}
          >
            {msg.from === 'system' ? (
              <div className="chat-bubble-system">{msg.text}</div>
            ) : msg.from === 'customer' ? (
              <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm border border-gray-100">
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</p>
              </div>
            ) : (
              <div className={`rounded-lg rounded-tr-none px-3 py-2 max-w-[80%] shadow-sm ${
                msg.from === 'bot_fluence' ? 'bg-fluence-50 border border-fluence-200' : 'bg-gray-100 border border-gray-200'
              }`}>
                <div className="text-[9px] font-semibold mb-0.5 text-gray-500">
                  {msg.from === 'bot_fluence' ? '🧠 Bot + Fluence' : 'Bot'}
                </div>
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function CrossChannel({ fluenceEnabled }: CrossChannelProps) {
  const [step, setStep] = useState<'instagram' | 'whatsapp'>('instagram')
  const [visibleMessages, setVisibleMessages] = useState(0)

  const currentWhatsapp = fluenceEnabled ? CROSS_CHANNEL_WHATSAPP_FLUENCE : CROSS_CHANNEL_WHATSAPP_GENERIC
  const currentSource = step === 'instagram' ? CROSS_CHANNEL_INSTAGRAM : currentWhatsapp

  const advanceMessages = useCallback(() => {
    if (visibleMessages < currentSource.length) {
      setVisibleMessages((v) => v + 1)
    }
  }, [visibleMessages, currentSource.length])

  // Auto-advance messages
  useEffect(() => {
    if (visibleMessages < currentSource.length) {
      const delay = currentSource[visibleMessages]?.delay || 1500
      const timer = setTimeout(advanceMessages, Math.max(delay, 800))
      return () => clearTimeout(timer)
    } else if (step === 'instagram' && visibleMessages >= CROSS_CHANNEL_INSTAGRAM.length) {
      const timer = setTimeout(() => {
        setStep('whatsapp')
        setVisibleMessages(0)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [visibleMessages, step, currentSource, advanceMessages])

  // Reset on toggle
  useEffect(() => {
    setStep('instagram')
    setVisibleMessages(0)
  }, [fluenceEnabled])

  return (
    <div className="h-full flex flex-col p-6 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Cross-Channel Continuity</h2>
        <p className="text-xs text-gray-500 mt-1">
          {fluenceEnabled
            ? 'Fluence remembers context across channels — no repetition needed'
            : 'Without Fluence, each channel starts from zero'}
        </p>
      </div>

      {/* Timeline */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
          step === 'instagram' ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-500'
        }`}>
          📸 Instagram (yesterday)
        </div>
        <div className="text-gray-400">→</div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
          step === 'whatsapp' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
        }`}>
          📱 WhatsApp (today)
        </div>
      </div>

      {/* Chat panels */}
      <div className="flex-1 flex gap-4 min-h-0">
        <ChatPanel
          title="Instagram (yesterday)"
          icon={channelIcons.instagram}
          messages={CROSS_CHANNEL_INSTAGRAM.slice(0, step === 'instagram' ? visibleMessages : CROSS_CHANNEL_INSTAGRAM.length)}
        />
        <AnimatePresence>
          {step === 'whatsapp' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 flex"
            >
              <ChatPanel
                title={fluenceEnabled ? 'WhatsApp (today) — with context' : 'WhatsApp (today) — no context'}
                icon={channelIcons.whatsapp}
                messages={currentWhatsapp.slice(0, visibleMessages)}
                highlight={fluenceEnabled}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Replay */}
      <div className="text-center mt-4">
        <button
          onClick={() => { setStep('instagram'); setVisibleMessages(0) }}
          className="text-xs text-fluence-500 hover:text-fluence-600 font-medium"
        >
          Replay scenario
        </button>
      </div>
    </div>
  )
}
