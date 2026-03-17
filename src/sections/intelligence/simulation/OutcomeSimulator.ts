import type { ConversationOutcome, ConversationMessage } from '@/data/types'

export function calculateOutcome(messages: ConversationMessage[], hasFluence: boolean): ConversationOutcome {
  let totalDelay = 0
  let messageCount = 0
  let escalations = 0
  let csat = 3
  let resolved = true

  for (const msg of messages) {
    totalDelay += msg.delay
    if (msg.from !== 'system') messageCount++

    if (msg.from === 'system') {
      // Count escalations
      if (msg.text.toLowerCase().includes('waiting') || msg.text.toLowerCase().includes('aguardando') || msg.text.toLowerCase().includes('agent connected')) {
        escalations++
      }
      // Extract CSAT
      const csatMatch = msg.text.match(/(\d)\/5/)
      if (csatMatch) {
        csat = parseInt(csatMatch[1])
      }
      // Check resolution
      if (msg.text.toLowerCase().includes('cancel') || msg.text.toLowerCase().includes('procurar outro')) {
        resolved = false
      }
    }
  }

  const resolutionTimeMin = Math.round(totalDelay / 60000 * 3) // scale delay to realistic minutes

  return {
    resolutionTimeMin: hasFluence ? Math.max(3, resolutionTimeMin) : Math.max(12, resolutionTimeMin),
    messageCount,
    escalations,
    csat,
    resolved,
    escalationType: hasFluence ? 'smart' : 'forced',
  }
}
