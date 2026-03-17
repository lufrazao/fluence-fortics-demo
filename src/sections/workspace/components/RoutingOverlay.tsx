import { motion, AnimatePresence } from 'framer-motion'

interface RoutingOverlayProps {
  visible: boolean
  customerName: string
  agentName: string
  reason: string
  confidence: number
}

const steps = [
  'Analyzing behavioral profile...',
  'Communication style detected',
  'Matching agent skills...',
  'Best match found',
]

export default function RoutingOverlay({ visible, customerName, agentName, reason, confidence }: RoutingOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-2xl max-w-sm w-full mx-4 space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-fluence-400 animate-pulse" />
              <span className="text-xs font-bold text-fluence-600 uppercase tracking-wider">
                Fluence Routing
              </span>
            </div>

            {/* Steps */}
            <div className="space-y-2">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.4, duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.4, duration: 0.2 }}
                    className="w-4 h-4 rounded-full bg-fluence-100 flex items-center justify-center"
                  >
                    <span className="text-[8px] text-fluence-600">✓</span>
                  </motion.div>
                  <span className="text-xs text-gray-600">{step}</span>
                </motion.div>
              ))}
            </div>

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.4 }}
              className="bg-fluence-50 border border-fluence-200 rounded-lg p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-800">{customerName}</span>
                <span className="text-lg">→</span>
                <span className="text-xs font-semibold text-fluence-700">{agentName}</span>
              </div>
              <div className="text-[10px] text-gray-500">{reason}</div>
              <div className="flex items-center gap-1">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-fluence-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence * 100}%` }}
                    transition={{ delay: 2.2, duration: 0.5 }}
                  />
                </div>
                <span className="text-[9px] text-gray-500">{(confidence * 100).toFixed(0)}%</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
