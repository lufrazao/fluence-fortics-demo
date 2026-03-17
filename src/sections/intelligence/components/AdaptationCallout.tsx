import { motion, AnimatePresence } from 'framer-motion'

export interface Adaptation {
  id: string
  icon: string
  title: string
  description: string
}

// Predefined adaptations per persona
export const PERSONA_ADAPTATIONS: Record<string, Adaptation[]> = {
  joao: [
    {
      id: 'joao-style',
      icon: '⚡',
      title: 'Direct communication detected',
      description: 'Response shortened — solution-first, no filler',
    },
    {
      id: 'joao-patience',
      icon: '🎯',
      title: 'Low patience threshold',
      description: 'Skipping pleasantries — immediate action',
    },
  ],
  maria: [
    {
      id: 'maria-style',
      icon: '📊',
      title: 'Detailed communicator detected',
      description: 'Expanded response with data tables and comparisons',
    },
    {
      id: 'maria-anticipate',
      icon: '🔮',
      title: 'Follow-up questions anticipated',
      description: 'Proactively including usage data and cost simulation',
    },
  ],
  ana: [
    {
      id: 'ana-modality',
      icon: '🎤',
      title: 'Audio preference detected',
      description: 'Switched to voice messages matching customer modality',
    },
    {
      id: 'ana-tone',
      icon: '💬',
      title: 'Conversational tone adapted',
      description: 'Warm, informal language — matching customer style',
    },
  ],
}

interface AdaptationCalloutProps {
  personaId: string
  visible: boolean
}

export default function AdaptationCallout({ personaId, visible }: AdaptationCalloutProps) {
  const adaptations = PERSONA_ADAPTATIONS[personaId] ?? []

  return (
    <AnimatePresence>
      {visible && adaptations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-2"
        >
          <div className="text-[10px] font-bold text-fluence-400 uppercase tracking-wider">
            Adaptations Applied
          </div>
          {adaptations.map((adaptation, i) => (
            <motion.div
              key={adaptation.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-fluence-500/10 border border-fluence-500/20 rounded-lg p-2.5"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm">{adaptation.icon}</span>
                <span className="text-[11px] font-semibold text-fluence-300">
                  {adaptation.title}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed pl-5">
                {adaptation.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
