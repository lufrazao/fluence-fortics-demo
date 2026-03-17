import { motion, AnimatePresence } from 'framer-motion'
import type { SimulationEvent } from '../../data/types'

interface EventStreamProps {
  events: SimulationEvent[]
  maxEvents?: number
}

const typeColors: Record<string, string> = {
  message: 'bg-blue-400',
  escalation: 'bg-orange-400',
  frustration: 'bg-red-400',
  resolution: 'bg-green-400',
  csat: 'bg-yellow-400',
  bot_response: 'bg-cyan-400',
  profile_update: 'bg-fluence-400',
}

const typeLabels: Record<string, string> = {
  message: 'MSG',
  escalation: 'ESC',
  frustration: 'FRU',
  resolution: 'RES',
  csat: 'SAT',
  bot_response: 'BOT',
  profile_update: 'SIG',
}

export default function EventStream({ events, maxEvents = 20 }: EventStreamProps) {
  const visibleEvents = events.slice(0, maxEvents)

  return (
    <div className="bg-gray-900/80 rounded-xl border border-white/10 p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-fluence-400 animate-pulse" />
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Event Stream</h3>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0">
        <AnimatePresence initial={false}>
          {visibleEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2"
            >
              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`event-dot ${typeColors[event.type] || 'bg-gray-400'}`}
                />
                <span className={`text-[9px] font-mono font-bold uppercase ${typeColors[event.type]?.replace('bg-', 'text-') || 'text-gray-400'}`}>
                  {typeLabels[event.type] || 'EVT'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-300 font-medium truncate">{event.label}</div>
                {event.detail && (
                  <div className="text-[10px] text-gray-500 truncate">{event.detail}</div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {events.length === 0 && (
          <div className="text-xs text-gray-600 text-center py-8">
            Events will appear here as the conversation progresses...
          </div>
        )}
      </div>
    </div>
  )
}
