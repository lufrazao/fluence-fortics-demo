import type { SupervisorMetric, BehavioralInsight } from './types'

export const QUEUE_HEALTH = {
  critical: 3,
  atRisk: 8,
  healthy: 24,
  total: 35,
}

export const WEEKLY_TRENDS: SupervisorMetric[] = [
  { label: 'CSAT', before: '3.8/5', after: '4.2/5', change: '+11%', trend: 'up' },
  { label: 'Avg Handling Time', before: '12 min', after: '8 min', change: '-33%', trend: 'down' },
  { label: 'Escalation Rate', before: '35%', after: '22%', change: '-37%', trend: 'down' },
  { label: 'First-Contact Resolution', before: '45%', after: '63%', change: '+40%', trend: 'up' },
]

export const CHURN_SAVES = {
  thisWeek: 14,
  label: 'customers retained this week',
}

export const BEHAVIORAL_INSIGHTS: BehavioralInsight[] = [
  {
    icon: '🔴',
    text: '3 customers flagged as churn risk (all billing-related)',
    severity: 'critical',
  },
  {
    icon: '🎤',
    text: '12 customers prefer audio but getting text-only responses',
    severity: 'warning',
  },
  {
    icon: '⏰',
    text: 'Peak frustration hour: 14:00-15:00 (post-lunch, longer wait times)',
    severity: 'warning',
  },
  {
    icon: '💡',
    text: 'Recommendation: Add 1 agent to billing queue 14:00-16:00',
    severity: 'info',
  },
  {
    icon: '📈',
    text: '5 upsell opportunities identified — route to sales team',
    severity: 'info',
  },
]
