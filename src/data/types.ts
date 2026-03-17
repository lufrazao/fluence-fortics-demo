export type MessageSender = 'customer' | 'bot' | 'bot_fluence' | 'agent' | 'agent_briefed' | 'system'

export interface ConversationMessage {
  from: MessageSender
  text: string
  delay: number
  isAudio?: boolean
}

export interface CustomerProfile {
  communicationStyle: string
  patienceThreshold: number
  automationTolerance: number
  frustrationVelocity: string
  churnRisk: string
  channelPreference: string
  resolutionStyle: string
  conversationCount: number
  csatHistory: number[]
}

export interface ProfileSnapshot {
  label: string
  day: string
  profile: Partial<CustomerProfile>
  csat: number
  hasFluence: boolean
  botBehavior: string
  agentBehavior: string
  result: string
}

export interface ConversationOutcome {
  resolutionTimeMin: number
  messageCount: number
  escalations: number
  csat: number
  resolved: boolean
  escalationType?: 'forced' | 'smart'
}

export interface AgentBriefing {
  priority: 'critical' | 'high' | 'normal'
  customerSummary: string
  recommendedTone: string
  recommendedSkill: string
  doList: string[]
  dontList: string[]
  escalationProbability: number
  churnRisk: string
  satisfactionTrend: 'declining' | 'stable' | 'improving' | 'unknown'
}

export interface SimulationEvent {
  id: string
  type: 'message' | 'escalation' | 'frustration' | 'resolution' | 'csat' | 'bot_response' | 'profile_update'
  label: string
  detail?: string
  timestamp: number
}

export interface ImpactMetric {
  label: string
  before: string
  after: string
  change: string
  positive: boolean
}

export interface PersonaConfig {
  id: string
  name: string
  subtitle: string
  avatar: string
  profile: CustomerProfile
  recommendedApproach?: string
  channelAdaptation?: string
  conversations: {
    id: string
    label: string
    day: string
    hasFluence: boolean
    messages: ConversationMessage[]
    outcome: ConversationOutcome
    briefing?: AgentBriefing
    profileSnapshot: Partial<CustomerProfile>
  }[]
}

// ─── Agent Workflow Demo Types ───────────────────────────────────────

export type ChannelType = 'whatsapp' | 'webchat' | 'instagram' | 'email' | 'voice'
export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low' | 'upsell'

export interface ChannelHistoryEntry {
  channel: ChannelType
  date: string
  topic: string
  csat?: number
}

export interface InboxCustomer {
  id: string
  name: string
  channel: ChannelType
  topic: string
  waitTime: string
  priority: PriorityLevel
  churnRisk: number
  unreadMessages: number
  lastMessage: string
  location?: string
  tags: string[]
  fluenceProfile: Partial<CustomerProfile>
  agentBriefing: AgentBriefing
  conversationMessages: ConversationMessage[]
  channelHistory: ChannelHistoryEntry[]
}

export interface AgentProfile {
  id: string
  name: string
  avatar: string
  avgCsat: number
  avgTime: string
  styleMatch: number
  churnSaves: number
  specialties: string[]
}

export interface MoodState {
  level: 'neutral' | 'slight_frustration' | 'frustrated' | 'leaving' | 'critical'
  patience: number
  label: string
  alert?: string
}

export interface MoodMessage {
  message: ConversationMessage
  mood: MoodState
}

export interface ResponseSuggestion {
  type: 'shorten' | 'expand' | 'rewrite'
  icon: string
  original: string
  suggested: string
  reason: string
  wordCountOriginal: number
  wordCountSuggested: number
}

export interface RoutingDecision {
  customerId: string
  customerName: string
  bestAgentId: string
  bestAgentName: string
  reason: string
  confidence: number
}

export interface SupervisorMetric {
  label: string
  before: string
  after: string
  change: string
  trend: 'up' | 'down'
}

export interface BehavioralInsight {
  icon: string
  text: string
  severity: 'info' | 'warning' | 'critical'
}
