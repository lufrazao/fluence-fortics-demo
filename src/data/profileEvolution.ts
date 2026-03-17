import type { ProfileSnapshot } from './types'

// Conv 3 WITHOUT Fluence — for toggle OFF in MultiConversation
export const JOAO_CONV3_NO_FLUENCE: ProfileSnapshot = {
  label: 'Conversation 3',
  day: 'Day 7',
  profile: {
    communicationStyle: 'DIRECT',
    patienceThreshold: 0.05,
    automationTolerance: 0.05,
    frustrationVelocity: 'FLASH',
    churnRisk: 'critical',
  },
  csat: 1,
  hasFluence: false,
  botBehavior: 'Generic template (3rd time)',
  agentBehavior: 'Cold start — no history',
  result: 'Customer churned — switched to competitor',
}

export const JOAO_EVOLUTION: ProfileSnapshot[] = [
  {
    label: 'Conversation 1',
    day: 'Day 1',
    profile: {
      communicationStyle: 'unknown',
      patienceThreshold: 0.5,
      automationTolerance: 0.5,
      frustrationVelocity: 'unknown',
      churnRisk: 'unknown',
    },
    csat: 3,
    hasFluence: false,
    botBehavior: 'Generic scripted greeting',
    agentBehavior: 'Cold start — no context',
    result: 'Temporary credit (band-aid fix)',
  },
  {
    label: 'Conversation 2',
    day: 'Day 4',
    profile: {
      communicationStyle: 'DIRECT',
      patienceThreshold: 0.3,
      automationTolerance: 0.25,
      frustrationVelocity: 'FLASH',
      churnRisk: 'at_risk',
    },
    csat: 2,
    hasFluence: false,
    botBehavior: 'Same generic greeting (again)',
    agentBehavior: 'Cold start — no history',
    result: 'Another credit (same band-aid)',
  },
  {
    label: 'Conversation 3',
    day: 'Day 7',
    profile: {
      communicationStyle: 'DIRECT',
      patienceThreshold: 0.15,
      automationTolerance: 0.15,
      frustrationVelocity: 'FLASH',
      churnRisk: 'critical',
    },
    csat: 4,
    hasFluence: true,
    botBehavior: 'ADAPTED — immediate escalation',
    agentBehavior: 'Briefed — full context',
    result: 'PERMANENT root-cause fix',
  },
]
