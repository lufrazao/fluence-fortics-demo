import { motion, AnimatePresence } from 'framer-motion'
import type { InboxCustomer } from '@/data/types'
import PatienceGauge from '@/components/intelligence/PatienceGauge'
import FrustrationMeter from '@/components/intelligence/FrustrationMeter'
import CommunicationStyle from '@/components/intelligence/CommunicationStyle'
import ChurnRiskIndicator from '@/components/intelligence/ChurnRiskIndicator'
import ToneRecommendation from '@/components/intelligence/ToneRecommendation'

interface FluencePanelProps {
  customer: InboxCustomer
  visible: boolean
  moodOverride?: { patience: number; frustrationVelocity: string; alert?: string }
}

export default function FluencePanel({ customer, visible, moodOverride }: FluencePanelProps) {
  const profile = customer.fluenceProfile
  const briefing = customer.agentBriefing
  const patience = moodOverride?.patience ?? profile.patienceThreshold ?? 0.5
  const frustration = moodOverride?.frustrationVelocity ?? profile.frustrationVelocity ?? 'unknown'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-workspace-fluence-bg border-l border-fluence-200 flex-shrink-0 overflow-hidden"
        >
          <div className="w-[280px] h-full overflow-y-auto px-3 py-3 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-fluence-400 animate-pulse" />
              <span className="text-xs font-bold text-fluence-700 uppercase tracking-wider">Fluence</span>
            </div>

            {/* Behavioral profile */}
            <div className="space-y-3">
              <CommunicationStyle style={profile.communicationStyle || 'unknown'} />
              <PatienceGauge value={patience} />

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Automation Tolerance</span>
                  <span className={`text-[10px] font-bold ${
                    (profile.automationTolerance ?? 0.5) < 0.3 ? 'text-red-500' : 'text-gray-600'
                  }`}>
                    {(profile.automationTolerance ?? 0.5).toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      (profile.automationTolerance ?? 0.5) < 0.3 ? 'bg-red-400' : (profile.automationTolerance ?? 0.5) < 0.5 ? 'bg-yellow-400' : 'bg-green-400'
                    }`}
                    animate={{ width: `${(profile.automationTolerance ?? 0.5) * 100}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              <FrustrationMeter velocity={frustration} />
              <ChurnRiskIndicator risk={profile.churnRisk || 'unknown'} trend={briefing.satisfactionTrend} />
              <ToneRecommendation tone={briefing.recommendedTone} />
            </div>

            {/* Alert */}
            <AnimatePresence>
              {moodOverride?.alert && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-2.5"
                >
                  <div className="text-[10px] font-bold text-red-600 mb-0.5">🔔 Alert</div>
                  <div className="text-[10px] text-red-700">{moodOverride.alert}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* DO / DON'T */}
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-bold text-green-600 mb-1.5">✅ DO</div>
                <ul className="space-y-1">
                  {briefing.doList.map((item, i) => (
                    <li key={i} className="text-[10px] text-gray-600 flex items-start gap-1">
                      <span className="text-green-500 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-bold text-red-600 mb-1.5">❌ DON'T</div>
                <ul className="space-y-1">
                  {briefing.dontList.map((item, i) => (
                    <li key={i} className="text-[10px] text-gray-600 flex items-start gap-1">
                      <span className="text-red-500 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
