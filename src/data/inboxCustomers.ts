import type { InboxCustomer } from './types'

export const INBOX_CUSTOMERS: InboxCustomer[] = [
  {
    id: 'joao',
    name: 'João S.',
    channel: 'whatsapp',
    topic: 'Cobrança duplicada (3º contato)',
    waitTime: '0:45',
    priority: 'critical',
    churnRisk: 0.9,
    unreadMessages: 1,
    lastMessage: 'A cobrança duplicada apareceu de novo',
    location: 'São Paulo, SP',
    tags: ['billing', 'repeat', 'VIP'],
    fluenceProfile: {
      communicationStyle: 'DIRECT',
      patienceThreshold: 0.2,
      automationTolerance: 0.15,
      frustrationVelocity: 'FLASH',
      churnRisk: 'critical',
      channelPreference: 'WhatsApp',
      conversationCount: 3,
      csatHistory: [4, 3, 2],
    },
    agentBriefing: {
      priority: 'critical',
      customerSummary: '3rd contact in 7 days. Direct communicator. Low patience. Previous resolutions didn\'t stick.',
      recommendedTone: 'Solution-first, no filler',
      recommendedSkill: 'billing_specialist',
      doList: [
        'Fix root cause permanently',
        'Be direct — skip pleasantries',
        'Acknowledge this is a repeat contact',
        'Confirm resolution via WhatsApp',
      ],
      dontList: [
        'Send FAQ links',
        'Use templated greetings',
        'Transfer between departments',
        'Offer temporary credits',
      ],
      escalationProbability: 0.95,
      churnRisk: 'critical',
      satisfactionTrend: 'declining',
    },
    conversationMessages: [
      { from: 'customer', text: 'A cobrança duplicada apareceu de novo', delay: 0 },
    ],
    channelHistory: [
      { channel: 'whatsapp', date: 'Mar 13', topic: 'Cobrança duplicada', csat: 2 },
      { channel: 'whatsapp', date: 'Mar 10', topic: 'Cobrança duplicada', csat: 3 },
      { channel: 'email', date: 'Feb 28', topic: 'Dúvida geral', csat: 4 },
    ],
  },
  {
    id: 'pedro',
    name: 'Pedro M.',
    channel: 'webchat',
    topic: 'Primeiro contato — dúvida sobre planos',
    waitTime: '1:20',
    priority: 'medium',
    churnRisk: 0.1,
    unreadMessages: 2,
    lastMessage: 'Oi, gostaria de saber mais sobre os planos de vocês',
    location: 'Rio de Janeiro, RJ',
    tags: ['new_customer', 'exploring'],
    fluenceProfile: {
      communicationStyle: 'unknown',
      patienceThreshold: 0.7,
      automationTolerance: 0.6,
      frustrationVelocity: 'unknown',
      churnRisk: 'stable',
      channelPreference: 'Webchat',
      conversationCount: 1,
      csatHistory: [],
    },
    agentBriefing: {
      priority: 'normal',
      customerSummary: 'New customer. First contact. Exploring plans.',
      recommendedTone: 'Friendly, professional',
      recommendedSkill: 'general',
      doList: [
        'Be welcoming and helpful',
        'Provide clear information about plans',
        'Ask what they need',
      ],
      dontList: [
        'Push sales too early',
        'Assume expertise level',
        'Use jargon without explaining',
      ],
      escalationProbability: 0.1,
      churnRisk: 'stable',
      satisfactionTrend: 'unknown',
    },
    conversationMessages: [
      { from: 'customer', text: 'Oi, gostaria de saber mais sobre os planos de vocês', delay: 0 },
      { from: 'customer', text: 'Principalmente sobre o plano para empresas pequenas', delay: 2000 },
    ],
    channelHistory: [
      { channel: 'webchat', date: 'Mar 16', topic: 'Dúvida sobre planos' },
    ],
  },
  {
    id: 'ana',
    name: 'Ana R.',
    channel: 'whatsapp',
    topic: 'Dúvida sobre entrega',
    waitTime: '2:10',
    priority: 'low',
    churnRisk: 0.15,
    unreadMessages: 1,
    lastMessage: 'Oi, meu pedido está atrasado?',
    location: 'Belo Horizonte, MG',
    tags: ['loyal', 'routine'],
    fluenceProfile: {
      communicationStyle: 'CONCISE',
      patienceThreshold: 0.8,
      automationTolerance: 0.7,
      frustrationVelocity: 'RESILIENT',
      churnRisk: 'stable',
      channelPreference: 'WhatsApp',
      conversationCount: 6,
      csatHistory: [5, 4, 5, 5, 4, 5],
    },
    agentBriefing: {
      priority: 'normal',
      customerSummary: 'Loyal customer. 6 previous contacts. Concise communicator. High patience.',
      recommendedTone: 'Friendly, professional',
      recommendedSkill: 'general',
      doList: [
        'Quick, friendly status check',
        'Provide tracking link',
        'Keep response concise',
      ],
      dontList: [
        'Over-explain',
        'Escalate unnecessarily',
        'Send lengthy responses',
      ],
      escalationProbability: 0.05,
      churnRisk: 'stable',
      satisfactionTrend: 'stable',
    },
    conversationMessages: [
      { from: 'customer', text: 'Oi, meu pedido está atrasado?', delay: 0 },
    ],
    channelHistory: [
      { channel: 'whatsapp', date: 'Mar 16', topic: 'Entrega atrasada' },
      { channel: 'whatsapp', date: 'Mar 5', topic: 'Status do pedido', csat: 5 },
      { channel: 'whatsapp', date: 'Feb 20', topic: 'Troca de produto', csat: 4 },
      { channel: 'whatsapp', date: 'Feb 10', topic: 'Dúvida sobre produto', csat: 5 },
    ],
  },
  {
    id: 'carlos',
    name: 'Carlos D.',
    channel: 'instagram',
    topic: 'Interesse em plano premium',
    waitTime: '3:00',
    priority: 'upsell',
    churnRisk: 0.05,
    unreadMessages: 3,
    lastMessage: 'Qual a diferença entre o plano Pro e o Enterprise?',
    location: 'Curitiba, PR',
    tags: ['premium_interest', 'analytical', 'potential_upsell'],
    fluenceProfile: {
      communicationStyle: 'DETAILED',
      patienceThreshold: 0.85,
      automationTolerance: 0.4,
      frustrationVelocity: 'RESILIENT',
      churnRisk: 'stable',
      channelPreference: 'Instagram',
      conversationCount: 4,
      csatHistory: [5, 5, 4, 5],
    },
    agentBriefing: {
      priority: 'normal',
      customerSummary: 'Engaged customer exploring premium features. Analytical communicator. Values detailed data.',
      recommendedTone: 'Thorough and clear',
      recommendedSkill: 'general',
      doList: [
        'Provide detailed comparison with data',
        'Show ROI numbers',
        'Be thorough — this customer reads everything',
        'Route to sales team when ready',
      ],
      dontList: [
        'Hard sell',
        'Rush the conversation',
        'Be vague about features',
        'Give generic sales pitch',
      ],
      escalationProbability: 0.05,
      churnRisk: 'stable',
      satisfactionTrend: 'stable',
    },
    conversationMessages: [
      { from: 'customer', text: 'Oi! Estou usando o plano Pro há 3 meses e gostaria de entender as vantagens do Enterprise.', delay: 0 },
      { from: 'customer', text: 'Qual a diferença entre o plano Pro e o Enterprise?', delay: 2000 },
      { from: 'customer', text: 'Principalmente em termos de limites de API e suporte.', delay: 3000 },
    ],
    channelHistory: [
      { channel: 'instagram', date: 'Mar 16', topic: 'Plano premium' },
      { channel: 'instagram', date: 'Mar 8', topic: 'Dúvida sobre API', csat: 5 },
      { channel: 'webchat', date: 'Feb 15', topic: 'Integração webhook', csat: 5 },
      { channel: 'email', date: 'Jan 20', topic: 'Onboarding', csat: 4 },
    ],
  },
]

// Priority sort order for Fluence-enabled inbox
export const PRIORITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  upsell: 3,
  low: 4,
}

// Chronological sort (by wait time, longest first)
export function sortByChronological(customers: InboxCustomer[]): InboxCustomer[] {
  return [...customers].sort((a, b) => {
    const timeA = a.waitTime.split(':').reduce((acc, v) => acc * 60 + parseInt(v), 0)
    const timeB = b.waitTime.split(':').reduce((acc, v) => acc * 60 + parseInt(v), 0)
    return timeB - timeA
  })
}

export function sortByPriority(customers: InboxCustomer[]): InboxCustomer[] {
  return [...customers].sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9))
}
