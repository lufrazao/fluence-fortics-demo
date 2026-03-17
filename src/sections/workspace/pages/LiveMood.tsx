import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ConversationMessage, MoodState } from '@/data/types'
import { MOOD_CONVERSATION, MOOD_CONVERSATION_FLUENCE } from '@/data/moodSequences'
import { INBOX_CUSTOMERS } from '@/data/inboxCustomers'
import { useFluence } from '../WorkspaceApp'
import MoodDetector from '../components/MoodDetector'

const defaultMood: MoodState = { level: 'neutral', patience: 1.0, label: 'WAITING' }

export default function LiveMood() {
  const fluenceEnabled = useFluence()
  const [messageIndex, setMessageIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const source = fluenceEnabled ? MOOD_CONVERSATION_FLUENCE : MOOD_CONVERSATION
  const visibleMessages: ConversationMessage[] = source.slice(0, messageIndex).map((m) => m.message)
  const currentMood: MoodState = messageIndex > 0 ? source[messageIndex - 1].mood : defaultMood

  const advance = useCallback(() => {
    if (messageIndex < source.length) {
      setMessageIndex((i) => i + 1)
    } else {
      setPlaying(false)
    }
  }, [messageIndex, source.length])

  useEffect(() => {
    if (!playing) return
    if (messageIndex >= source.length) { setPlaying(false); return }
    const delay = source[messageIndex]?.message.delay || 1500
    const timer = setTimeout(advance, Math.max(delay, 1000))
    return () => clearTimeout(timer)
  }, [playing, messageIndex, source, advance])

  // Reset on toggle change
  useEffect(() => {
    setMessageIndex(0)
    setPlaying(false)
  }, [fluenceEnabled])

  const handlePlay = () => {
    if (messageIndex >= source.length) {
      setMessageIndex(0)
    }
    setPlaying(true)
  }

  // Placeholder customer for header display
  const customer = INBOX_CUSTOMERS[1] // Pedro

  return (
    <div className="h-full flex bg-gray-50">
      {/* Conversation side */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-gray-200 flex-shrink-0">
          <span className="text-lg">💬</span>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800">Live Mood Detection</div>
            <div className="text-[10px] text-gray-500">
              {fluenceEnabled
                ? 'Watch how Fluence adapts in real-time to prevent churn'
                : 'Watch how a customer leaves when mood signals are ignored'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlay}
              disabled={playing}
              className="px-3 py-1 rounded-md text-xs font-medium bg-fluence-500 hover:bg-fluence-600 disabled:bg-gray-300 text-white transition-colors"
            >
              {messageIndex >= source.length ? '↻ Replay' : playing ? 'Playing...' : '▶ Play'}
            </button>
            {messageIndex > 0 && (
              <button
                onClick={() => { setMessageIndex(0); setPlaying(false) }}
                className="px-3 py-1 rounded-md text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {visibleMessages.length === 0 && !playing && (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Press Play to start the mood detection scenario
            </div>
          )}
          <AnimatePresence initial={false}>
            {visibleMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === 'customer' ? 'justify-start' : msg.from === 'system' ? 'justify-center' : 'justify-end'}`}
              >
                {msg.from === 'system' ? (
                  <div className="chat-bubble-system">{msg.text}</div>
                ) : msg.from === 'customer' ? (
                  <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[70%] shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</p>
                    <div className="text-[9px] text-gray-400 mt-0.5">Customer</div>
                  </div>
                ) : (
                  <div className={`rounded-lg rounded-tr-none px-3 py-2 max-w-[70%] shadow-sm ${
                    msg.from === 'bot_fluence'
                      ? 'bg-fluence-50 border border-fluence-200'
                      : 'bg-gray-100 border border-gray-200'
                  }`}>
                    <div className="text-[9px] font-semibold mb-0.5 text-gray-500">
                      {msg.from === 'bot_fluence' ? '🧠 Bot + Fluence' : 'Bot'}
                    </div>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Mood panel */}
      <div className="w-[300px] bg-white border-l border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-fluence-400 animate-pulse" />
            <span className="text-xs font-bold text-fluence-700 uppercase tracking-wider">Mood Monitor</span>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          <MoodDetector mood={currentMood} />

          {/* Message count */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Messages</span>
            <span className="text-xs font-medium text-gray-700">{messageIndex} / {source.length}</span>
          </div>

          {/* Mood history */}
          <div>
            <div className="text-[10px] text-gray-400 font-medium mb-2">Mood History</div>
            <div className="space-y-1.5">
              {source.slice(0, messageIndex).map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    entry.mood.level === 'neutral' ? 'bg-green-400' :
                    entry.mood.level === 'slight_frustration' ? 'bg-yellow-400' :
                    entry.mood.level === 'frustrated' ? 'bg-orange-400' :
                    'bg-red-500'
                  }`} />
                  <span className="text-[9px] text-gray-500 truncate flex-1">
                    {entry.message.from === 'customer' ? '👤' : '🤖'} {entry.message.text.slice(0, 40)}...
                  </span>
                  <span className={`text-[8px] font-bold ${
                    entry.mood.level === 'neutral' ? 'text-green-500' :
                    entry.mood.level === 'slight_frustration' ? 'text-yellow-500' :
                    entry.mood.level === 'frustrated' ? 'text-orange-500' :
                    'text-red-500'
                  }`}>
                    {(entry.mood.patience * 100).toFixed(0)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <AnimatePresence>
            {messageIndex >= source.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg border text-center ${
                  fluenceEnabled
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className={`text-sm font-bold ${fluenceEnabled ? 'text-green-600' : 'text-red-600'}`}>
                  {fluenceEnabled ? 'Customer satisfied' : 'Customer lost'}
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  {fluenceEnabled
                    ? 'Fluence adapted bot responses to match communication style'
                    : 'Bot ignored behavioral signals — customer chose competitor'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
