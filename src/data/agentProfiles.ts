import type { AgentProfile } from './types'

export const AGENTS: AgentProfile[] = [
  {
    id: 'maria',
    name: 'Maria L.',
    avatar: '👩‍💻',
    avgCsat: 4.6,
    avgTime: '6 min',
    styleMatch: 92,
    churnSaves: 3,
    specialties: ['warm communication', 'audio-capable', 'retention'],
  },
  {
    id: 'carlos-agent',
    name: 'Carlos T.',
    avatar: '👨‍💻',
    avgCsat: 4.2,
    avgTime: '8 min',
    styleMatch: 78,
    churnSaves: 1,
    specialties: ['analytical', 'text-focused', 'technical'],
  },
  {
    id: 'ana-agent',
    name: 'Ana P.',
    avatar: '👩‍🔧',
    avgCsat: 3.9,
    avgTime: '11 min',
    styleMatch: 65,
    churnSaves: 0,
    specialties: ['balanced', 'efficient', 'general'],
  },
]
