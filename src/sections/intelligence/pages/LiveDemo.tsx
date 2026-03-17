import { useState, useRef, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { ConversationMessage, SimulationEvent, AgentBriefing } from '@/data/types'
import { PERSONAS } from '@/data/customerPersonas'
import { joaoConv1Generic, joaoConv1Fluence } from '@/data/conversationScripts'
import { ConversationEngine } from '@/simulation/ConversationEngine'
import type { EngineState, EngineCallbacks } from '@/simulation/ConversationEngine'
import { calculateProfileFromMessages, generateBriefing } from '@/simulation/ProfileCalculator'
import { useFluence } from '../IntelligenceApp'
import PhoneMockup from '../components/PhoneMockup'
import WhatsAppMockup from '../components/WhatsAppMockup'
import SimulationControls from '../components/SimulationControls'
import EventStream from '../components/EventStream'
import ProfileBuilder from '../components/ProfileBuilder'
import AgentBriefingCard from '@/components/intelligence/AgentBriefingCard'
import AdaptationCallout from '../components/AdaptationCallout'

// Get the right conversation based on persona and toggle
function getConversationData(personaId: string, fluenceEnabled: boolean) {
  const persona = PERSONAS.find((p) => p.id === personaId) || PERSONAS[0]

  if (personaId === 'joao') {
    if (fluenceEnabled) {
      const conv3 = persona.conversations[2]
      return {
        messages: joaoConv1Fluence,
        hasFluence: true,
        briefing: conv3.briefing,
        profileSnapshot: conv3.profileSnapshot,
      }
    }
    return {
      messages: joaoConv1Generic,
      hasFluence: false,
      briefing: undefined,
      profileSnapshot: persona.conversations[0].profileSnapshot,
    }
  }

  // Maria & Ana: conversations[0] = generic, conversations[1] = fluence
  const conv = fluenceEnabled
    ? persona.conversations[1] || persona.conversations[0]
    : persona.conversations[0]

  return {
    messages: conv.messages,
    hasFluence: conv.hasFluence,
    briefing: conv.briefing,
    profileSnapshot: conv.profileSnapshot,
  }
}

export default function LiveDemo() {
  const fluenceEnabled = useFluence()
  const [personaId, setPersonaId] = useState('joao')
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [events, setEvents] = useState<SimulationEvent[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingSender, setTypingSender] = useState<string>()
  const [engineState, setEngineState] = useState<EngineState>('idle')
  const [speed, setSpeed] = useState(4)

  const engineRef = useRef<ConversationEngine | null>(null)

  const convData = getConversationData(personaId, fluenceEnabled)
  const profile = calculateProfileFromMessages(messages, convData.profileSnapshot, 1)
  const briefing: AgentBriefing = convData.briefing || generateBriefing(profile, 1)
  const showBriefing = convData.hasFluence && messages.length > 0

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

    const engine = new ConversationEngine(convData.messages, callbacks)
    engine.setSpeed(speed)
    engineRef.current = engine
  }, [convData.messages, speed])

  // Reset on persona or toggle change
  useEffect(() => {
    setMessages([])
    setEvents([])
    setIsTyping(false)
    setEngineState('idle')
    initEngine()
    return () => engineRef.current?.destroy()
  }, [personaId, fluenceEnabled, initEngine])

  const handlePlay = () => engineRef.current?.play()
  const handlePause = () => engineRef.current?.pause()
  const handleReset = () => {
    setMessages([])
    setEvents([])
    setIsTyping(false)
    setEngineState('idle')
    initEngine()
  }
  const handleSpeedChange = (s: number) => {
    setSpeed(s)
    engineRef.current?.setSpeed(s)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Main layout */}
      <div className="flex-1 flex items-start justify-center gap-6 p-6 overflow-y-auto">
        {/* Phone mockup */}
        <div className={`flex flex-col items-center gap-3 flex-shrink-0 ${!fluenceEnabled ? 'mx-auto' : ''}`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              WhatsApp
              {convData.hasFluence && <span className="text-fluence-400 ml-1">+ Fluence</span>}
            </span>
          </div>
          <PhoneMockup>
            <WhatsAppMockup
              contactName="Suporte TeleCom"
              contactAvatar="📞"
              messages={messages}
              isTyping={isTyping}
              typingSender={typingSender}
              hasFluence={convData.hasFluence}
            />
          </PhoneMockup>

          {/* Without Fluence: note about what's missing */}
          {!fluenceEnabled && engineState === 'complete' && (
            <div className="max-w-[280px] text-center mt-2">
              <div className="text-xs text-gray-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                No behavioral intelligence applied. Bot used generic template regardless of customer personality.
              </div>
            </div>
          )}
        </div>

        {/* Intelligence panel — only visible with Fluence ON */}
        {fluenceEnabled && (
          <div className="flex-1 max-w-2xl min-w-[500px] flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 h-[400px]">
              <EventStream events={events} />
              <ProfileBuilder
                profile={profile}
                tone={briefing.recommendedTone}
                satisfactionTrend={briefing.satisfactionTrend}
                conversationNumber={1}
              />
            </div>

            {/* Adaptation callouts */}
            <AdaptationCallout
              personaId={personaId}
              visible={messages.length > 2}
            />

            {/* Agent briefing card */}
            <AnimatePresence>
              {showBriefing && <AgentBriefingCard briefing={briefing} />}
            </AnimatePresence>
          </div>
        )}
      </div>

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
        onPersonaChange={(id) => setPersonaId(id)}
        selectedConversation={0}
        conversationCount={1}
        onConversationChange={() => {}}
      />
    </div>
  )
}
