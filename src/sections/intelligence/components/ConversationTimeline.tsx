import { motion } from 'framer-motion'
import type { ProfileSnapshot } from '@/data/types'
import StarRating from '@/components/shared/StarRating'

interface ConversationTimelineProps {
  snapshots: ProfileSnapshot[]
  activeIndex: number
  onSelect: (index: number) => void
}

export default function ConversationTimeline({ snapshots, activeIndex, onSelect }: ConversationTimelineProps) {
  return (
    <div className="w-full">
      {/* Timeline line */}
      <div className="relative flex items-center justify-between px-8">
        {/* Connecting line */}
        <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-gray-700 -translate-y-1/2" />

        {snapshots.map((snap, i) => {
          const isActive = i === activeIndex
          const isFluence = snap.hasFluence
          const isCompleted = i < activeIndex

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className="relative z-10 flex flex-col items-center gap-2 group"
            >
              {/* Node */}
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  boxShadow: isFluence ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none',
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  isFluence
                    ? 'bg-fluence-500 border-fluence-400 text-white'
                    : isActive
                      ? 'bg-white border-white text-gray-900'
                      : isCompleted
                        ? 'bg-gray-600 border-gray-500 text-gray-300'
                        : 'bg-gray-800 border-gray-600 text-gray-400 group-hover:border-gray-400'
                }`}
              >
                {i + 1}
              </motion.div>

              {/* Labels */}
              <div className="text-center">
                <div className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {snap.label}
                </div>
                <div className="text-[10px] text-gray-500">{snap.day}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active snapshot detail */}
      {snapshots[activeIndex] && (
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          {/* Profile state */}
          <div className="glass-card p-4">
            <div className="text-xs text-gray-400 mb-2">Profile State</div>
            <div className="space-y-1.5">
              {Object.entries(snapshots[activeIndex].profile).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className={`text-[10px] font-medium ${
                    val === 'unknown' || val === 0.5 ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {typeof val === 'number' ? val.toFixed(2) : String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Behavior */}
          <div className="glass-card p-4">
            <div className="text-xs text-gray-400 mb-2">What happened</div>
            <div className="space-y-2">
              <div>
                <div className="text-[10px] text-gray-500">Bot</div>
                <div className="text-xs text-gray-300">{snapshots[activeIndex].botBehavior}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500">Agent</div>
                <div className="text-xs text-gray-300">{snapshots[activeIndex].agentBehavior}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500">Result</div>
                <div className={`text-xs font-medium ${snapshots[activeIndex].hasFluence ? 'text-green-400' : 'text-gray-300'}`}>
                  {snapshots[activeIndex].result}
                </div>
              </div>
            </div>
          </div>

          {/* CSAT */}
          <div className="glass-card p-4 flex flex-col items-center justify-center">
            <div className="text-xs text-gray-400 mb-2">CSAT</div>
            <StarRating rating={snapshots[activeIndex].csat} size="lg" />
            {snapshots[activeIndex].hasFluence && (
              <div className="text-xs text-fluence-400 mt-2 font-medium">With Fluence ⬆️</div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
