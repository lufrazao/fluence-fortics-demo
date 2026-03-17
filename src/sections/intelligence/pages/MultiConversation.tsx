import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { JOAO_EVOLUTION } from '@/data/profileEvolution'
import { PERSONAS } from '@/data/customerPersonas'
import { ConversationEngine } from '@/simulation/ConversationEngine'
import type { EngineState, EngineCallbacks } from '@/simulation/ConversationEngine'
import type { ConversationMessage, SimulationEvent } from '@/data/types'
import ConversationTimeline from '../components/ConversationTimeline'
import PhoneMockup from '../components/PhoneMockup'
import WhatsAppMockup from '../components/WhatsAppMockup'
import EventStream from '../components/EventStream'
import AgentBriefingCard from '@/components/intelligence/AgentBriefingCard'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function MultiConversation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [events, setEvents] = useState<SimulationEvent[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingSender, setTypingSender] = useState<string>()
  const [engineState, setEngineState] = useState<EngineState>('idle')
  const [speed, setSpeed] = useState(2)

  const joao = PERSONAS[0]
  const conv = joao.conversations[activeIndex]
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
    const engine = new ConversationEngine(conv.messages, callbacks)
    engine.setSpeed(speed)
    engineRef.current = engine
  }, [conv.messages, speed])

  useEffect(() => {
    setMessages([])
    setEvents([])
    setIsTyping(false)
    setEngineState('idle')
    initEngine()
    return () => engineRef.current?.destroy()
  }, [activeIndex, initEngine])

  const play = () => engineRef.current?.play()
  const pause = () => engineRef.current?.pause()
  const reset = () => {
    setMessages([])
    setEvents([])
    setIsTyping(false)
    setEngineState('idle')
    initEngine()
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Profile Evolution — João across 3 conversations</h1>
        <p className="text-sm text-gray-400 mb-6">
          The same customer. Three conversations. By the third, Fluence knows João better than any human agent could.
        </p>

        {/* Timeline */}
        <ConversationTimeline
          snapshots={JOAO_EVOLUTION}
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
              </span>
            </div>
            <PhoneMockup>
              <WhatsAppMockup
                contactName="Suporte TeleCom"
                contactAvatar="📞"
                messages={messages}
                isTyping={isTyping}
                typingSender={typingSender}
                hasFluence={conv.hasFluence}
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
              {conv.briefing && messages.length > 0 && (
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
          </div>
        </div>
      </div>
    </div>
  )
}
