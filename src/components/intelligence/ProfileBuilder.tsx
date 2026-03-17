import { motion } from 'framer-motion'
import type { CustomerProfile } from '../../data/types'
import PatienceGauge from './PatienceGauge'
import FrustrationMeter from './FrustrationMeter'
import CommunicationStyle from './CommunicationStyle'
import ChurnRiskIndicator from './ChurnRiskIndicator'
import ToneRecommendation from './ToneRecommendation'

interface ProfileBuilderProps {
  profile: Partial<CustomerProfile>
  tone?: string
  satisfactionTrend?: 'declining' | 'stable' | 'improving' | 'unknown'
  conversationNumber?: number
}

export default function ProfileBuilder({
  profile,
  tone,
  satisfactionTrend = 'unknown',
  conversationNumber = 1,
}: ProfileBuilderProps) {
  const hasData = profile.communicationStyle && profile.communicationStyle !== 'unknown'

  return (
    <div className="bg-gray-900/80 rounded-xl border border-white/10 p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-fluence-400 animate-pulse" />
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Behavioral Profile</h3>
        {conversationNumber > 1 && (
          <span className="text-[10px] text-fluence-400 ml-auto">Conv #{conversationNumber}</span>
        )}
      </div>

      {!hasData ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2 opacity-30">🔍</div>
            <div className="text-xs text-gray-600">Profile will emerge as conversation progresses...</div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 flex-1"
        >
          <CommunicationStyle style={profile.communicationStyle || 'unknown'} />

          <PatienceGauge value={profile.patienceThreshold ?? 0.5} />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400">Automation Tolerance</span>
              <span className={`text-xs font-bold ${
                (profile.automationTolerance ?? 0.5) < 0.3 ? 'text-red-400' : (profile.automationTolerance ?? 0.5) < 0.5 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {(profile.automationTolerance ?? 0.5) < 0.3 ? 'VERY LOW' : (profile.automationTolerance ?? 0.5) < 0.5 ? 'LOW' : 'MODERATE'}
              </span>
            </div>
            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  (profile.automationTolerance ?? 0.5) < 0.3 ? 'bg-red-400' : (profile.automationTolerance ?? 0.5) < 0.5 ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                initial={{ width: '50%' }}
                animate={{ width: `${(profile.automationTolerance ?? 0.5) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          <FrustrationMeter velocity={profile.frustrationVelocity || 'unknown'} />

          <ChurnRiskIndicator
            risk={profile.churnRisk || 'unknown'}
            trend={satisfactionTrend}
          />

          {tone && <ToneRecommendation tone={tone} />}

          {profile.channelPreference && (
            <div>
              <div className="text-xs text-gray-400 mb-1">Channel</div>
              <div className="text-xs text-gray-300 font-medium">{profile.channelPreference}</div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
