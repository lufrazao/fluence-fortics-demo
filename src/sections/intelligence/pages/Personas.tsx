import { motion, AnimatePresence } from 'framer-motion'
import { PERSONAS } from '@/data/customerPersonas'
import PatienceGauge from '@/components/intelligence/PatienceGauge'
import FrustrationMeter from '@/components/intelligence/FrustrationMeter'
import CommunicationStyle from '@/components/intelligence/CommunicationStyle'
import ChurnRiskIndicator from '@/components/intelligence/ChurnRiskIndicator'
import StarRating from '@/components/shared/StarRating'
import { useFluence } from '../IntelligenceApp'

export default function Personas() {
  const fluenceEnabled = useFluence()

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Customer Personas</h1>
        <p className="text-sm text-gray-400 mb-8">
          {fluenceEnabled
            ? 'Behavioral intelligence profiles — Fluence adapts communication to each customer archetype.'
            : 'Basic customer profiles — no behavioral intelligence applied.'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PERSONAS.map((persona, pi) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pi * 0.15 }}
              className="glass-card p-6"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{persona.avatar}</div>
                <div>
                  <h2 className="text-lg font-bold">{persona.name}</h2>
                  <p className="text-xs text-gray-400">{persona.subtitle}</p>
                </div>
              </div>

              {/* Intelligence layer — only with Fluence */}
              <AnimatePresence>
                {fluenceEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {/* Profile traits */}
                    <div className="space-y-3 mb-4">
                      <CommunicationStyle style={persona.profile.communicationStyle} />
                      <PatienceGauge value={persona.profile.patienceThreshold} />
                      <FrustrationMeter velocity={persona.profile.frustrationVelocity} />

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-gray-400">Automation Tolerance</span>
                          <span className={`text-xs font-bold ${
                            persona.profile.automationTolerance < 0.3 ? 'text-red-400' : persona.profile.automationTolerance < 0.5 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {persona.profile.automationTolerance.toFixed(2)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              persona.profile.automationTolerance < 0.3 ? 'bg-red-400' : persona.profile.automationTolerance < 0.5 ? 'bg-yellow-400' : 'bg-green-400'
                            }`}
                            style={{ width: `${persona.profile.automationTolerance * 100}%` }}
                          />
                        </div>
                      </div>

                      <ChurnRiskIndicator risk={persona.profile.churnRisk} />
                    </div>

                    {/* Recommended approach */}
                    {persona.recommendedApproach && (
                      <div className="bg-fluence-500/10 border border-fluence-500/20 rounded-lg p-3 mb-4">
                        <div className="text-[10px] font-bold text-fluence-400 uppercase tracking-wider mb-1">
                          Recommended Approach
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {persona.recommendedApproach}
                        </p>
                      </div>
                    )}

                    {/* Channel adaptation */}
                    {persona.channelAdaptation && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase">Channel:</span>
                        <span className="text-xs text-fluence-300 bg-fluence-500/10 px-2 py-0.5 rounded-full">
                          {persona.channelAdaptation}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick stats — always visible */}
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Channel</span>
                    <div className="text-gray-300">{persona.profile.channelPreference}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Resolution</span>
                    <div className="text-gray-300">{persona.profile.resolutionStyle}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Conversations</span>
                    <div className="text-gray-300">{persona.conversations.length}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">CSAT trend</span>
                    <div className="flex items-center gap-1">
                      {persona.profile.csatHistory.map((c, i) => (
                        <span key={i} className="flex items-center gap-0.5">
                          {i > 0 && <span className="text-gray-600 text-[9px]">→</span>}
                          <span className={`text-xs font-bold ${c <= 2 ? 'text-red-400' : c <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {c}/5
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversations summary */}
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="text-xs text-gray-400 mb-2">Conversations</div>
                {persona.conversations.map((conv) => (
                  <div key={conv.id} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      {conv.hasFluence && (
                        <span className="w-1.5 h-1.5 rounded-full bg-fluence-400" />
                      )}
                      <span className="text-xs text-gray-300">{conv.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={conv.outcome.csat} size="sm" animated={false} />
                      <span className="text-[10px] text-gray-500">{conv.day}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Without Fluence: show placeholder */}
              {!fluenceEnabled && (
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="text-center py-3">
                    <div className="text-xs text-gray-600">
                      Enable Fluence to see behavioral intelligence profile
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
