import { motion } from 'framer-motion'
import { PERSONAS } from '@/data/customerPersonas'
import PatienceGauge from '@/components/intelligence/PatienceGauge'
import FrustrationMeter from '@/components/intelligence/FrustrationMeter'
import CommunicationStyle from '@/components/intelligence/CommunicationStyle'
import ChurnRiskIndicator from '@/components/intelligence/ChurnRiskIndicator'
import StarRating from '@/components/shared/StarRating'

export default function Personas() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Customer Personas</h1>
        <p className="text-sm text-gray-400 mb-8">
          Pre-built behavioral profiles showing different customer archetypes and how Fluence adapts to each.
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

              {/* Quick stats */}
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
                    <div className="flex gap-1">
                      {persona.profile.csatHistory.map((c, i) => (
                        <span key={i} className={`text-sm ${c <= 2 ? 'text-red-400' : c <= 3 ? 'text-yellow-400' : 'text-yellow-300'}`}>
                          {'★'.repeat(c)}{'☆'.repeat(5 - c)}
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
