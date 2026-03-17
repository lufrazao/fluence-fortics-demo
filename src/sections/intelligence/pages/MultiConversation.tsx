import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { JOAO_EVOLUTION, JOAO_CONV3_NO_FLUENCE } from '@/data/profileEvolution'
import { PERSONAS } from '@/data/customerPersonas'
import { joaoConv3Generic } from '@/data/conversationScripts'
import { ConversationEngine } from '@/simulation/ConversationEngine'
import type { EngineState, EngineCallbacks } from '@/simulation/ConversationEngine'
import type { ConversationMessage, SimulationEvent } from '@/data/types'
import ConversationTimeline from '../components/ConversationTimeline'
import PhoneMockup from '../components/PhoneMockup'
import WhatsAppMockup from '../components/WhatsAppMockup'
import EventStream from '../components/EventStream'
import AgentBriefingCard from '@/components/intelligence/AgentBriefingCard'
import { useFluence } from '../IntelligenceApp'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function MultiConversation() {
  const fluenceEnabled = useFluence()
  const [activeIndex, setActiveIndex] = useState(0)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [events, setEvents] = useState<SimulationEvent[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingSender, setTypingSender] = useState<string>()
  const [engineState, setEngineState] = useState<EngineState>('idle')
  const [speed, setSpeed] = useState(2)

  const joao = PERSONAS[0]

  // Build evolution snapshots based on toggle
  const evolution = fluenceEnabled
    ? JOAO_EVOLUTION
    : [...JOAO_EVOLUTION.slice(0, 2), JOAO_CONV3_NO_FLUENCE]

  // For conv 3, use appropriate messages based on toggle
  const getConvMessages = (index: number) => {
    if (index === 2 && !fluenceEnabled) {
      return joaoConv3Generic
    }
    return joao.conversations[index].messages
  }

  const conv = joao.conversations[activeIndex]
  const currentMessages = getConvMessages(activeIndex)
  const isConv3Fluence = activeIndex === 2 && fluenceEnabled
  const engineRef = useRef<ConversationEngine | null>(null)

  const initEngine = useCallback(() => {
    engineRef.current?.destroy()
    const callbacks: EngineCallbacks = {
      onMessage: (msg) => setMessages((prev) => [...prev, msg]),
      onEvent: (evt) => setEvents((prev) => [evt, ...prev]),
      onStateChange: (s) => setEngineState(s),
      onComplete: () => {},
      onTypingStart: (s) => { setIsTyping(true); setTypingSender(s) },
      onTypingEnd: () => setIsTyping(false),
    }
    const engine = new ConversationEngine(currentMessages, callbacks)
    engine.setSpeed(speed)
    engineRef.current = engine
  }, [currentMessages, speed])

  useEffect(() => {
    setMessages([])
    setEvents([])
    setIsTyping(false)
    setEngineState('idle')
    initEngine()
    return () => engineRef.current?.destroy()
  }, [activeIndex, fluenceEnabled, initEngine])

  // Reset to conv 1 when toggle changes
  useEffect(() => {
    setActiveIndex(0)
  }, [fluenceEnabled])

  const play = () => engineRef.current?.play()
  const pause = () => engineRef.current?.pause()
  const reset = () => {
    setMessages([])
    setEvents([])
    setIsTyping(false)
    setEngineState('idle')
    initEngine()
  }

  const showFinalOutcome = activeIndex === 2 && engineState === 'complete'

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Profile Evolution — João across 3 conversations</h1>
        <p className="text-sm text-gray-400 mb-6">
          {fluenceEnabled
            ? 'The same customer. Three conversations. By the third, Fluence knows João better than any human agent could.'
            : 'Without Fluence: three conversations, same cold start every time. Watch the customer churn.'}
        </p>

        {/* Timeline */}
        <ConversationTimeline
          snapshots={evolution}
          activeIndex={activeIndex}
          onSelect={(i) => setActiveIndex(i)}
        />

        {/* Active conversation playback */}
        <div className="mt-8 grid grid-cols-[375px_1fr] gap-6">
          {/* Phone */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${engineState === 'playing' ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {conv.label} — {conv.day}
                {isConv3Fluence && <span className="text-fluence-400 ml-1">+ Fluence</span>}
              </span>
            </div>
            <PhoneMockup>
              <WhatsAppMockup
                contactName="Suporte TeleCom"
                contactAvatar="📞"
                messages={messages}
                isTyping={isTyping}
                typingSender={typingSender}
                hasFluence={isConv3Fluence}
              />
            </PhoneMockup>

            {/* Playback controls */}
            <div className="flex items-center gap-3">
              {engineState === 'playing' ? (
                <button onClick={pause} className="w-10 h-10 rounded-full bg-fluence-500 hover:bg-fluence-600 text-white flex items-center justify-center">
                  <Pause className="w-5 h-5" />
                </button>
              ) : (
                <button onClick={play} disabled={engineState === 'complete'} className="w-10 h-10 rounded-full bg-fluence-500 hover:bg-fluence-600 disabled:bg-gray-700 text-white flex items-center justify-center">
                  <Play className="w-5 h-5 ml-0.5" />
                </button>
              )}
              <button onClick={reset} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                {[1, 2, 4].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSpeed(s); engineRef.current?.setSpeed(s) }}
                    className={`px-2.5 py-1 rounded text-xs font-medium ${speed === s ? 'bg-white/15 text-white' : 'text-gray-400'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events + Briefing */}
          <div className="flex flex-col gap-4">
            <div className="h-[400px]">
              <EventStream events={events} />
            </div>
            <AnimatePresence>
              {isConv3Fluence && conv.briefing && messages.length > 0 && (
                <AgentBriefingCard briefing={conv.briefing} />
              )}
            </AnimatePresence>

            {engineState === 'complete' && activeIndex < 2 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setActiveIndex(activeIndex + 1)}
                className="px-6 py-3 rounded-xl bg-fluence-500 hover:bg-fluence-600 text-white font-medium text-sm"
              >
                Next conversation: {joao.conversations[activeIndex + 1]?.label} →
              </motion.button>
            )}

            {/* Final outcome card */}
            <AnimatePresence>
              {showFinalOutcome && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border text-center ${
                    fluenceEnabled
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className={`text-lg font-bold ${fluenceEnabled ? 'text-green-400' : 'text-red-400'}`}>
                    {fluenceEnabled ? 'Customer Retained' : 'Customer Churned'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {fluenceEnabled
                      ? 'CSAT trajectory: 3 → 2 → 4. Fluence identified churn risk and adapted the experience.'
                      : 'CSAT trajectory: 3 → 2 → 1. Same cold start three times. Customer left for a competitor.'}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
