import { motion, AnimatePresence } from 'framer-motion'

interface ResponseSuggestionProps {
  type: 'shorten' | 'expand' | 'rewrite'
  icon: string
  original: string
  suggested: string
  reason: string
  wordCountOriginal: number
  wordCountSuggested: number
  visible: boolean
  onApply: () => void
  onDismiss: () => void
}

const typeLabels: Record<string, string> = {
  shorten: 'SHORTEN',
  expand: 'EXPAND',
  rewrite: 'REWRITE',
}

const typeColors: Record<string, string> = {
  shorten: 'text-orange-400',
  expand: 'text-blue-400',
  rewrite: 'text-green-400',
}

export default function ResponseSuggestion({
  type, icon, original, suggested, reason,
  wordCountOriginal, wordCountSuggested,
  visible, onApply, onDismiss,
}: ResponseSuggestionProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mx-4 mb-2 fluence-glow rounded-lg overflow-hidden"
        >
          <div className="bg-white border border-fluence-200 rounded-lg p-3 space-y-2.5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">{icon}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${typeColors[type]}`}>
                  {typeLabels[type]}
                </span>
                <span className="text-[10px] text-gray-400">
                  {wordCountOriginal} → {wordCountSuggested} words
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-fluence-400 animate-pulse" />
            </div>

            {/* Original (struck through) */}
            <div className="bg-gray-50 rounded p-2">
              <div className="text-[9px] text-gray-400 font-medium mb-0.5">YOUR DRAFT</div>
              <p className="text-[11px] text-gray-400 line-through">{original}</p>
            </div>

            {/* Suggested */}
            <div className="bg-fluence-50 rounded p-2 border border-fluence-100">
              <div className="text-[9px] text-fluence-600 font-medium mb-0.5">SUGGESTED</div>
              <p className="text-[11px] text-gray-800 whitespace-pre-wrap">{suggested}</p>
            </div>

            {/* Reason */}
            <div className="text-[10px] text-gray-500 italic">
              {reason}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onApply}
                className="flex-1 py-1.5 rounded-md bg-fluence-500 hover:bg-fluence-600 text-white text-[11px] font-semibold transition-colors"
              >
                Apply
              </button>
              <button
                onClick={onDismiss}
                className="flex-1 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-[11px] font-medium transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
