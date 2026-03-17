import type { ImpactMetric } from './types'

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    label: 'First-Contact Resolution',
    before: '45%',
    after: '65%',
    change: '+44%',
    positive: true,
  },
  {
    label: 'Average Handling Time',
    before: '12 min',
    after: '8 min',
    change: '-33%',
    positive: true,
  },
  {
    label: 'Customer Satisfaction',
    before: '3.8/5',
    after: '4.4/5',
    change: '+16%',
    positive: true,
  },
  {
    label: 'Escalation Rate',
    before: '35%',
    after: '20%',
    change: '-43%',
    positive: true,
  },
  {
    label: 'Agent Productivity',
    before: '8 conv/hr',
    after: '12 conv/hr',
    change: '+50%',
    positive: true,
  },
  {
    label: 'Monthly Churn',
    before: '5%',
    after: '3%',
    change: '-40%',
    positive: true,
  },
]
