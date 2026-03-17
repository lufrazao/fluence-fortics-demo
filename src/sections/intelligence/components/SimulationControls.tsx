import { Play, Pause, RotateCcw } from 'lucide-react'
import type { EngineState } from '@/simulation/ConversationEngine'
import type { PersonaConfig } from '@/data/types'

interface SimulationControlsProps {
  state: EngineState
  speed: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onSpeedChange: (speed: number) => void
  personas: PersonaConfig[]
  selectedPersona: string
  onPersonaChange: (id: string) => void
  selectedConversation: number
  conversationCount: number
  onConversationChange: (index: number) => void
}

export default function SimulationControls({
  state,
  speed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  personas,
  selectedPersona,
  onPersonaChange,
  selectedConversation,
  conversationCount,
  onConversationChange,
}: SimulationControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 px-6 py-3 bg-gray-900/50 border-t border-white/5">
      {/* Playback controls */}
      <div className="flex items-center gap-2">
        {state === 'playing' ? (
          <button
            onClick={onPause}
            className="w-10 h-10 rounded-full bg-fluence-500 hover:bg-fluence-600 text-white flex items-center justify-center transition-colors"
          >
            <Pause className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onPlay}
            disabled={state === 'complete'}
            className="w-10 h-10 rounded-full bg-fluence-500 hover:bg-fluence-600 disabled:bg-gray-700 disabled:text-gray-500 text-white flex items-center justify-center transition-colors"
          >
            <Play className="w-5 h-5 ml-0.5" />
          </button>
        )}
        <button
          onClick={onReset}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Speed selector */}
      <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
        {[1, 2, 4].map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              speed === s ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>

      {/* Persona selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Persona:</span>
        <select
          value={selectedPersona}
          onChange={(e) => onPersonaChange(e.target.value)}
          className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-fluence-500"
        >
          {personas.map((p) => (
            <option key={p.id} value={p.id} className="bg-gray-900">
              {p.avatar} {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Conversation selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Conv:</span>
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          {Array.from({ length: conversationCount }, (_, i) => (
            <button
              key={i}
              onClick={() => onConversationChange(i)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                selectedConversation === i
                  ? 'bg-white/15 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-600">of {conversationCount}</span>
      </div>

      {/* State indicator */}
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${
          state === 'playing' ? 'bg-green-400 animate-pulse' :
          state === 'paused' ? 'bg-yellow-400' :
          state === 'complete' ? 'bg-blue-400' :
          'bg-gray-600'
        }`} />
        <span className="text-xs text-gray-500 capitalize">{state}</span>
      </div>
    </div>
  )
}
