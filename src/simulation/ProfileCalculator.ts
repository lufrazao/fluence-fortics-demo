import type { ConversationMessage, CustomerProfile, AgentBriefing } from '../data/types'

interface ProfileAccumulator {
  messageCount: number
  customerMessageLengths: number[]
  botMessagesBeforeEscalation: number
  hasEscalation: boolean
  escalationSpeed: number // seconds to escalation
  hasFrustration: boolean
  audioMessageCount: number
  totalCustomerMessages: number
  csatHistory: number[]
  contactCount: number
}

export function calculateProfileFromMessages(
  messages: ConversationMessage[],
  previousProfile?: Partial<CustomerProfile>,
  conversationNumber = 1,
): Partial<CustomerProfile> {
  const acc: ProfileAccumulator = {
    messageCount: 0,
    customerMessageLengths: [],
    botMessagesBeforeEscalation: 0,
    hasEscalation: false,
    escalationSpeed: Infinity,
    hasFrustration: false,
    audioMessageCount: 0,
    totalCustomerMessages: 0,
    csatHistory: previousProfile?.csatHistory || [],
    contactCount: conversationNumber,
  }

  let botMessagesSeen = 0
  let firstCustomerTime = 0
  let escalationTime = 0
  let cumulativeDelay = 0

  for (const msg of messages) {
    cumulativeDelay += msg.delay
    acc.messageCount++

    if (msg.from === 'customer') {
      acc.totalCustomerMessages++
      acc.customerMessageLengths.push(msg.text.length)
      if (acc.totalCustomerMessages === 1) firstCustomerTime = cumulativeDelay
      if (msg.isAudio) acc.audioMessageCount++

      const upper = msg.text.toUpperCase()
      if (upper.includes('ATENDENTE') || upper.includes('AGORA') || upper.includes('ABSURDO') || upper.includes('CANCELAR')) {
        acc.hasFrustration = true
        if (!acc.hasEscalation) {
          acc.hasEscalation = true
          acc.botMessagesBeforeEscalation = botMessagesSeen
          escalationTime = cumulativeDelay
          acc.escalationSpeed = (escalationTime - firstCustomerTime) / 1000
        }
      }
    }

    if (msg.from === 'bot' || msg.from === 'bot_fluence') {
      botMessagesSeen++
    }

    if (msg.from === 'system') {
      const csatMatch = msg.text.match(/(\d)\/5/)
      if (csatMatch) {
        acc.csatHistory = [...acc.csatHistory, parseInt(csatMatch[1])]
      }
    }
  }

  // Determine communication style
  const avgLen = acc.customerMessageLengths.length > 0
    ? acc.customerMessageLengths.reduce((a, b) => a + b, 0) / acc.customerMessageLengths.length
    : 0
  const audioRatio = acc.totalCustomerMessages > 0 ? acc.audioMessageCount / acc.totalCustomerMessages : 0

  let communicationStyle = 'unknown'
  if (audioRatio > 0.5) communicationStyle = 'AUDIO'
  else if (avgLen < 30) communicationStyle = 'DIRECT'
  else if (avgLen < 80) communicationStyle = 'CONCISE'
  else if (avgLen < 150) communicationStyle = 'DETAILED'
  else communicationStyle = 'VERBOSE'

  // Patience threshold
  let patienceThreshold = 0.5
  if (acc.hasEscalation) {
    if (acc.botMessagesBeforeEscalation <= 1) patienceThreshold = 0.2
    else if (acc.botMessagesBeforeEscalation <= 2) patienceThreshold = 0.35
    else patienceThreshold = 0.5
  } else {
    patienceThreshold = 0.7
  }

  // Blend with previous
  if (previousProfile?.patienceThreshold !== undefined && conversationNumber > 1) {
    patienceThreshold = Math.min(patienceThreshold, previousProfile.patienceThreshold)
  }

  // Automation tolerance
  let automationTolerance = 0.5
  if (acc.hasEscalation && acc.botMessagesBeforeEscalation <= 1) {
    automationTolerance = 0.15
  } else if (acc.hasEscalation) {
    automationTolerance = 0.3
  }

  // Frustration velocity
  let frustrationVelocity = 'unknown'
  if (acc.hasFrustration) {
    if (acc.escalationSpeed < 60) frustrationVelocity = 'FLASH'
    else if (acc.escalationSpeed < 180) frustrationVelocity = 'MODERATE'
    else frustrationVelocity = 'SLOW_BURN'
  } else if (acc.totalCustomerMessages > 5) {
    frustrationVelocity = 'RESILIENT'
  }

  // Churn risk
  let churnRisk = 'unknown'
  if (acc.csatHistory.length >= 3) {
    const declining = acc.csatHistory.every((v, i, a) => i === 0 || v <= a[i - 1])
    if (declining && acc.csatHistory[acc.csatHistory.length - 1] <= 2) churnRisk = 'critical'
    else if (declining) churnRisk = 'at_risk'
    else churnRisk = 'stable'
  } else if (acc.csatHistory.length >= 2 && conversationNumber >= 2) {
    if (acc.csatHistory[acc.csatHistory.length - 1] < acc.csatHistory[acc.csatHistory.length - 2]) {
      churnRisk = 'at_risk'
    } else {
      churnRisk = 'stable'
    }
  }

  return {
    communicationStyle,
    patienceThreshold,
    automationTolerance,
    frustrationVelocity,
    churnRisk,
    channelPreference: audioRatio > 0.3 ? 'WhatsApp (voice)' : 'WhatsApp',
    resolutionStyle: avgLen > 80 ? 'Deep understanding' : 'Quick fix',
    conversationCount: conversationNumber,
    csatHistory: acc.csatHistory,
  }
}

export function generateBriefing(
  profile: Partial<CustomerProfile>,
  conversationNumber: number,
  topic = 'billing',
): AgentBriefing {
  // Priority
  let priority: AgentBriefing['priority'] = 'normal'
  if (profile.churnRisk === 'critical' || conversationNumber >= 3) priority = 'critical'
  else if (profile.churnRisk === 'at_risk' || profile.frustrationVelocity === 'FLASH' || (profile.patienceThreshold ?? 1) < 0.3) priority = 'high'

  // Tone
  let recommendedTone = 'Friendly, professional'
  if (profile.communicationStyle === 'DIRECT' && (profile.patienceThreshold ?? 1) < 0.3) {
    recommendedTone = 'Solution-first, no filler'
  } else if (profile.communicationStyle === 'DETAILED') {
    recommendedTone = 'Thorough and clear'
  } else if (profile.communicationStyle === 'AUDIO') {
    recommendedTone = 'Warm, conversational voice'
  } else if (profile.churnRisk === 'critical' || profile.churnRisk === 'at_risk') {
    recommendedTone = 'Empathetic and proactive'
  }

  // DO list
  const doList: string[] = []
  if (conversationNumber > 1) doList.push('Acknowledge this is a repeat contact')
  if (profile.communicationStyle === 'DIRECT') doList.push('Be concise — skip pleasantries')
  if (profile.communicationStyle === 'DETAILED') doList.push('Provide thorough explanations with data')
  if (profile.churnRisk === 'critical' || profile.churnRisk === 'at_risk') doList.push('Treat as retention priority')
  doList.push('Provide permanent root-cause fix')
  if (profile.channelPreference?.includes('voice') || profile.communicationStyle === 'AUDIO') doList.push('Respond with voice messages')

  // DON'T list
  const dontList: string[] = []
  if ((profile.automationTolerance ?? 1) < 0.3) dontList.push('Send automated/templated responses')
  if (conversationNumber > 1) dontList.push('Send FAQ links')
  if (profile.frustrationVelocity === 'FLASH') dontList.push('Transfer between departments')
  if (profile.communicationStyle === 'DIRECT') dontList.push('Use lengthy scripted greetings')
  if (profile.communicationStyle === 'AUDIO') dontList.push('Send long text responses')

  // Summary
  const parts: string[] = []
  if (conversationNumber > 1) parts.push(`${conversationNumber}${conversationNumber === 2 ? 'nd' : 'rd'} contact in ${(conversationNumber - 1) * 3 + 1} days`)
  if (profile.communicationStyle && profile.communicationStyle !== 'unknown') parts.push(`${profile.communicationStyle.toLowerCase()} communicator`)
  if ((profile.patienceThreshold ?? 1) < 0.3) parts.push('low patience')
  if (profile.frustrationVelocity === 'FLASH') parts.push('flash frustration')
  if (conversationNumber > 2) parts.push('previous resolutions didn\'t stick')

  // Satisfaction trend
  const csatHistory = profile.csatHistory ?? []
  let satisfactionTrend: AgentBriefing['satisfactionTrend'] = 'unknown'
  if (csatHistory.length >= 2) {
    const last = csatHistory[csatHistory.length - 1]
    const prev = csatHistory[csatHistory.length - 2]
    if (last < prev) satisfactionTrend = 'declining'
    else if (last > prev) satisfactionTrend = 'improving'
    else satisfactionTrend = 'stable'
  }

  return {
    priority,
    customerSummary: parts.length > 0 ? parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('. ') + '.' : 'New customer.',
    recommendedTone,
    recommendedSkill: topic.includes('billing') || topic.includes('fatura') ? 'billing_specialist' : 'general',
    doList,
    dontList,
    escalationProbability: priority === 'critical' ? 0.95 : priority === 'high' ? 0.75 : 0.3,
    churnRisk: profile.churnRisk ?? 'unknown',
    satisfactionTrend,
  }
}
