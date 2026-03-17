import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { ConversationMessage, ConversationOutcome } from '@/data/types'
import { ConversationEngine } from '@/simulation/ConversationEngine'
import type { EngineState, EngineCallbacks } from '@/simulation/ConversationEngine'
import WhatsAppMockup from './WhatsAppMockup'
import StarRating from '@/components/shared/StarRating'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface SplitScreenProps {
  contactName: string
  contactAvatar?: string
  withoutMessages: ConversationMessage[]
  withMessages: ConversationMessage[]
  withoutOutcome: ConversationOutcome
  withOutcome: ConversationOutcome
}

export default function SplitScreen({
  contactName,
  contactAvatar,
  withoutMessages,
  withMessages,
  withoutOutcome,
  withOutcome,
}: SplitScreenProps) {
  const [leftMessages, setLeftMessages] = useState<ConversationMessage[]>([])
  const [rightMessages, setRightMessages] = useState<ConversationMessage[]>([])
  const [leftTyping, setLeftTyping] = useState(false)
  const [rightTyping, setRightTyping] = useState(false)
  const [leftTypingSender, setLeftTypingSender] = useState<string>()
  const [rightTypingSender, setRightTypingSender] = useState<string>()
  const [state, setState] = useState<EngineState>('idle')
  const [showOutcomes, setShowOutcomes] = useState(false)
  const [speed, setSpeed] = useState(1)

  const leftEngineRef = useRef<ConversationEngine | null>(null)
  const rightEngineRef = useRef<ConversationEngine | null>(null)
  const leftDone = useRef(false)
  const rightDone = useRef(false)

  const checkBothComplete = useCallback(() => {
    if (leftDone.current && rightDone.current) {
      setState('complete')
      setTimeout(() => setShowOutcomes(true), 500)
    }
  }, [])

  const initEngines = useCallback(() => {
    leftDone.current = false
    rightDone.current = false

    const leftCallbacks: EngineCallbacks = {
      onMessage: (msg) => setLeftMessages((prev) => [...prev, msg]),
      onEvent: () => {},
      onStateChange: () => {},
      onComplete: () => { leftDone.current = true; checkBothComplete() },
      onTypingStart: (s) => { setLeftTyping(true); setLeftTypingSender(s) },
      onTypingEnd: () => setLeftTyping(false),
    }

    const rightCallbacks: EngineCallbacks = {
      onMessage: (msg) => setRightMessages((prev) => [...prev, msg]),
      onEvent: () => {},
      onStateChange: () => {},
      onComplete: () => { rightDone.current = true; checkBothComplete() },
      onTypingStart: (s) => { setRightTyping(true); setRightTypingSender(s) },
      onTypingEnd: () => setRightTyping(false),
    }

    leftEngineRef.current?.destroy()
    rightEngineRef.current?.destroy()
    leftEngineRef.current = new ConversationEngine(withoutMessages, leftCallbacks)
    rightEngineRef.current = new ConversationEngine(withMessages, rightCallbacks)
    leftEngineRef.current.setSpeed(speed)
    rightEngineRef.current.setSpeed(speed)
  }, [withoutMessages, withMessages, speed, checkBothComplete])

  useEffect(() => {
    initEngines()
    return () => {
      leftEngineRef.current?.destroy()
      rightEngineRef.current?.destroy()
    }
  }, [initEngines])

  const play = () => {
    if (state === 'idle' || state === 'paused') {
      leftEngineRef.current?.play()
      rightEngineRef.current?.play()
      setState('playing')
    }
  }

  const pause = () => {
    leftEngineRef.current?.pause()
    rightEngineRef.current?.pause()
    setState('paused')
  }

  const reset = () => {
    setLeftMessages([])
    setRightMessages([])
    setShowOutcomes(false)
    setState('idle')
    initEngines()
  }

  const handleSpeedChange = (s: number) => {
    setSpeed(s)
    leftEngineRef.current?.setSpeed(s)
    rightEngineRef.current?.setSpeed(s)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Split chat view */}
      <div className="grid grid-cols-2 gap-4">
        {/* WITHOUT Fluence */}
        <div className="rounded-xl overflow-hidden border border-white/10 opacity-80 h-[600px]">
          <div className="bg-gray-800 text-center py-1.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Without Fluence</span>
          </div>
          <div className="h-[calc(100%-32px)] bg-whatsapp-bg">
            <WhatsAppMockup
              contactName={contactName}
              contactAvatar={contactAvatar}
              messages={leftMessages}
              isTyping={leftTyping}
              typingSender={leftTypingSender}
              compact
            />
          </div>
        </div>

        {/* WITH Fluence */}
        <div className="rounded-xl overflow-hidden border border-fluence-500/30 h-[600px]">
          <div className="bg-fluence-500/20 text-center py-1.5">
            <span className="text-xs font-bold text-fluence-300 uppercase tracking-wider">With Fluence</span>
          </div>
          <div className="h-[calc(100%-32px)] bg-whatsapp-bg">
            <WhatsAppMockup
              contactName={contactName}
              contactAvatar={contactAvatar}
              messages={rightMessages}
              isTyping={rightTyping}
              typingSender={rightTypingSender}
              hasFluence
              compact
            />
          </div>
        </div>
      </div>

      {/* Outcome comparison */}
      {showOutcomes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          <OutcomeCard outcome={withoutOutcome} variant="without" />
          <OutcomeCard outcome={withOutcome} variant="with" />
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {state === 'playing' ? (
          <button onClick={pause} className="w-10 h-10 rounded-full bg-fluence-500 hover:bg-fluence-600 text-white flex items-center justify-center">
            <Pause className="w-5 h-5" />
          </button>
        ) : (
          <button onClick={play} disabled={state === 'complete'} className="w-10 h-10 rounded-full bg-fluence-500 hover:bg-fluence-600 disabled:bg-gray-700 text-white flex items-center justify-center">
            <Play className="w-5 h-5 ml-0.5" />
          </button>
        )}
        <button onClick={reset} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center">
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          {[1, 2, 4].map((s) => (
            <button key={s} onClick={() => handleSpeedChange(s)} className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${speed === s ? 'bg-white/15 text-white' : 'text-gray-400'}`}>
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function OutcomeCard({ outcome, variant }: { outcome: ConversationOutcome; variant: 'without' | 'with' }) {
  const isWith = variant === 'with'
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: isWith ? 0.2 : 0 }}
      className={`rounded-xl p-4 border ${isWith ? 'bg-fluence-500/10 border-fluence-500/20' : 'bg-gray-800/50 border-white/10'}`}
    >
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <div className="text-[10px] text-gray-500">Resolution time</div>
          <div className={`text-lg font-bold ${isWith ? 'text-green-400' : 'text-gray-300'}`}>{outcome.resolutionTimeMin} min</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500">Messages</div>
          <div className={`text-lg font-bold ${isWith ? 'text-green-400' : 'text-gray-300'}`}>{outcome.messageCount}</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500">Escalations</div>
          <div className="text-lg font-bold text-gray-300">
            {outcome.escalations} <span className="text-xs text-gray-500">({outcome.escalationType || 'forced'})</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1">CSAT</div>
          <StarRating rating={outcome.csat} size="sm" />
        </div>
      </div>
      <div className={`text-xs font-medium text-center py-1 rounded ${
        outcome.resolved ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
      }`}>
        {outcome.resolved ? 'Customer stays' : 'Customer churns'}
      </div>
    </motion.div>
  )
}
