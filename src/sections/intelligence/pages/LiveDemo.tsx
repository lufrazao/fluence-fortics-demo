import { useState, useRef, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { ConversationMessage, SimulationEvent } from '@/data/types'
import { PERSONAS, JOAO_SPLIT } from '@/data/customerPersonas'
import { ConversationEngine } from '@/simulation/ConversationEngine'
import type { EngineState, EngineCallbacks } from '@/simulation/ConversationEngine'
import { calculateProfileFromMessages, generateBriefing } from '@/simulation/ProfileCalculator'
import PhoneMockup from '../components/PhoneMockup'
import WhatsAppMockup from '../components/WhatsAppMockup'
import SimulationControls from '../components/SimulationControls'
import EventStream from '../components/EventStream'
import ProfileBuilder from '../components/ProfileBuilder'
import AgentBriefingCard from '@/components/intelligence/AgentBriefingCard'
import SplitScreen from '../components/SplitScreen'

export default function LiveDemo() {
  const [personaId, setPersonaId] = useState('joao')
  const [convIndex, setConvIndex] = useState(0)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [events, setEvents] = useState<SimulationEvent[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingSender, setTypingSender] = useState<string>()
  const [engineState, setEngineState] = useState<EngineState>('idle')
  const [speed, setSpeed] = useState(1)
  const [showSplit, setShowSplit] = useState(false)

  const engineRef = useRef<ConversationEngine | null>(null)

  const persona = PERSONAS.find((p) => p.id === personaId) || PERSONAS[0]
  const conversation = persona.conversations[convIndex]

  // Compute profile from accumulated messages
  const previousConvMessages = persona.conversations
    .slice(0, convIndex)
    .flatMap((c) => c.messages)
  const allMessages = [...previousConvMessages, ...messages]
  const profile = calculateProfileFromMessages(allMessages, conversation.profileSnapshot, convIndex + 1)
  const briefing = conversation.briefing || generateBriefing(profile, convIndex + 1)
  const showBriefing = conversation.hasFluence && messages.length > 0

  const initEngine = useCallback(() => {
    engineRef.current?.destroy()

    const callbacks: EngineCallbacks = {
      onMessage: (msg) => setMessages((prev) => [...prev, msg]),
      onEvent: (evt) => setEvents((prev) => [evt, ...prev]),
      onStateChange: (s) => setEngineState(s),
      onComplete: () => {},
      onTypingStart: (sender) => { setIsTyping(true); setTypingSender(sender) },
      onTypingEnd: () => setIsTyping(false),
    }

    const engine = new ConversationEngine(conversation.messages, callbacks)
    engine.setSpeed(speed)
    engineRef.current = engine
  }, [conversation.messages, speed])

  useEffect(() => {
    setMessages([])
    setEvents([])
    setIsTyping(false)
    setEngineState('idle')
    setShowSplit(false)
    initEngine()
    return () => engineRef.current?.destroy()
  }, [personaId, convIndex, initEngine])

  const handlePlay = () => engineRef.current?.play()
  const handlePause = () => engineRef.current?.pause()
  const handleReset = () => {
    setMessages([])
    setEvents([])
    setIsTyping(false)
    setShowSplit(false)
    setEngineState('idle')
    initEngine()
  }
  const handleSpeedChange = (s: number) => {
    setSpeed(s)
    engineRef.current?.setSpeed(s)
  }
  const handlePersonaChange = (id: string) => {
    setPersonaId(id)
    setConvIndex(0)
  }
  const handleConvChange = (i: number) => {
    setConvIndex(i)
  }

  // Show split comparison for João conv 3
  const canShowSplit = personaId === 'joao' && convIndex === 2 && engineState === 'complete'
  // Also allow split for Maria and Ana (they have 2 conversations: generic vs fluence)
  const canShowPersonaSplit = (personaId === 'maria' || personaId === 'ana') && persona.conversations.length >= 2

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {!showSplit ? (
        <>
          {/* Main 3-column layout */}
          <div className="flex-1 flex items-start justify-center gap-6 p-6 overflow-y-auto">
            {/* Phone mockup */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  WhatsApp
                  {conversation.hasFluence && <span className="text-fluence-400 ml-1">+ Fluence</span>}
                </span>
              </div>
              <PhoneMockup>
                <WhatsAppMockup
                  contactName="Suporte TeleCom"
                  contactAvatar="📞"
                  messages={messages}
                  isTyping={isTyping}
                  typingSender={typingSender}
                  hasFluence={conversation.hasFluence}
                />
              </PhoneMockup>
            </div>

            {/* Intelligence panel */}
            <div className="flex-1 max-w-2xl min-w-[500px] flex flex-col gap-4">
              {/* Event stream + Profile side by side */}
              <div className="grid grid-cols-2 gap-4 h-[400px]">
                <EventStream events={events} />
                <ProfileBuilder
                  profile={profile}
                  tone={briefing.recommendedTone}
                  satisfactionTrend={briefing.satisfactionTrend}
                  conversationNumber={convIndex + 1}
                />
              </div>

              {/* Agent briefing card */}
              <AnimatePresence>
                {showBriefing && <AgentBriefingCard briefing={briefing} />}
              </AnimatePresence>

              {/* Prompt to see split comparison */}
              {canShowSplit && (
                <button
                  onClick={() => setShowSplit(true)}
                  className="mt-2 px-6 py-3 rounded-xl bg-fluence-500 hover:bg-fluence-600 text-white font-medium text-sm transition-colors"
                >
                  See the comparison: WITHOUT vs WITH Fluence →
                </button>
              )}
              {canShowPersonaSplit && engineState === 'complete' && convIndex === 0 && (
                <button
                  onClick={() => setShowSplit(true)}
                  className="mt-2 px-6 py-3 rounded-xl bg-fluence-500 hover:bg-fluence-600 text-white font-medium text-sm transition-colors"
                >
                  See side-by-side comparison →
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Split screen comparison */
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                Same customer. Same problem. Different understanding.
              </h2>
              <button
                onClick={() => setShowSplit(false)}
                className="text-sm text-gray-400 hover:text-white"
              >
                ← Back to simulation
              </button>
            </div>
            {personaId === 'joao' ? (
              <SplitScreen
                contactName="Suporte TeleCom"
                contactAvatar="📞"
                withoutMessages={JOAO_SPLIT.without.messages}
                withMessages={JOAO_SPLIT.with.messages}
                withoutOutcome={JOAO_SPLIT.without.outcome}
                withOutcome={JOAO_SPLIT.with.outcome}
              />
            ) : (
              <SplitScreen
                contactName="Suporte TeleCom"
                contactAvatar="📞"
                withoutMessages={persona.conversations[0].messages}
                withMessages={persona.conversations[1]?.messages || []}
                withoutOutcome={persona.conversations[0].outcome}
                withOutcome={persona.conversations[1]?.outcome || persona.conversations[0].outcome}
              />
            )}
          </div>
        </div>
      )}

      {/* Simulation controls */}
      <SimulationControls
        state={engineState}
        speed={speed}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onSpeedChange={handleSpeedChange}
        personas={PERSONAS}
        selectedPersona={personaId}
        onPersonaChange={handlePersonaChange}
        selectedConversation={convIndex}
        conversationCount={persona.conversations.length}
        onConversationChange={handleConvChange}
      />
    </div>
  )
}
