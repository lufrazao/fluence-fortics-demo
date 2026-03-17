import type { ConversationMessage, SimulationEvent } from '../data/types'

export type EngineState = 'idle' | 'playing' | 'paused' | 'complete'

export interface EngineCallbacks {
  onMessage: (message: ConversationMessage, index: number) => void
  onEvent: (event: SimulationEvent) => void
  onStateChange: (state: EngineState) => void
  onComplete: () => void
  onTypingStart: (sender: string) => void
  onTypingEnd: () => void
}

let eventCounter = 0
function nextEventId() {
  return `evt-${++eventCounter}`
}

export function messageToEvent(msg: ConversationMessage, index: number): SimulationEvent {
  if (msg.from === 'system') {
    const text = msg.text.toLowerCase()
    if (text.includes('csat')) {
      return { id: nextEventId(), type: 'csat', label: 'CSAT Submitted', detail: msg.text, timestamp: Date.now() }
    }
    if (text.includes('fluence')) {
      return { id: nextEventId(), type: 'profile_update', label: 'Fluence Signal', detail: msg.text, timestamp: Date.now() }
    }
    if (text.includes('waiting') || text.includes('aguardando')) {
      return { id: nextEventId(), type: 'escalation', label: 'Agent Transfer', detail: msg.text, timestamp: Date.now() }
    }
    if (text.includes('resolved') || text.includes('closed')) {
      return { id: nextEventId(), type: 'resolution', label: 'Conversation Event', detail: msg.text, timestamp: Date.now() }
    }
    return { id: nextEventId(), type: 'message', label: 'System', detail: msg.text, timestamp: Date.now() }
  }

  if (msg.from === 'customer') {
    const text = msg.text.toUpperCase()
    const isFrustrated = text.includes('ATENDENTE') || text.includes('AGORA') || text.includes('ABSURDO') ||
      text.includes('CANCELAR') || text.includes('NÃO ACREDITO') || text.includes('DE NOVO')
    if (isFrustrated) {
      return { id: nextEventId(), type: 'frustration', label: 'Frustration Signal', detail: msg.text, timestamp: Date.now() }
    }
    return { id: nextEventId(), type: 'message', label: 'Message Inbound', detail: `${msg.text.slice(0, 60)}...`, timestamp: Date.now() }
  }

  if (msg.from === 'bot' || msg.from === 'bot_fluence') {
    return { id: nextEventId(), type: 'bot_response', label: msg.from === 'bot_fluence' ? 'Fluence Bot Response' : 'Bot Response', detail: msg.text.slice(0, 60) + '...', timestamp: Date.now() }
  }

  if (msg.from === 'agent' || msg.from === 'agent_briefed') {
    return { id: nextEventId(), type: 'resolution', label: msg.from === 'agent_briefed' ? 'Briefed Agent Response' : 'Agent Response', detail: msg.text.slice(0, 60) + '...', timestamp: Date.now() }
  }

  return { id: nextEventId(), type: 'message', label: 'Event', detail: msg.text, timestamp: Date.now() }
}

export class ConversationEngine {
  private messages: ConversationMessage[]
  private callbacks: EngineCallbacks
  private currentIndex = 0
  private state: EngineState = 'idle'
  private speed = 1
  private timeoutId: ReturnType<typeof setTimeout> | null = null
  private typingTimeoutId: ReturnType<typeof setTimeout> | null = null

  constructor(messages: ConversationMessage[], callbacks: EngineCallbacks) {
    this.messages = messages
    this.callbacks = callbacks
  }

  play() {
    if (this.state === 'complete') return
    this.state = 'playing'
    this.callbacks.onStateChange('playing')
    this.scheduleNext()
  }

  pause() {
    if (this.state !== 'playing') return
    this.state = 'paused'
    this.callbacks.onStateChange('paused')
    if (this.timeoutId) clearTimeout(this.timeoutId)
    if (this.typingTimeoutId) clearTimeout(this.typingTimeoutId)
  }

  reset() {
    this.currentIndex = 0
    this.state = 'idle'
    if (this.timeoutId) clearTimeout(this.timeoutId)
    if (this.typingTimeoutId) clearTimeout(this.typingTimeoutId)
    this.callbacks.onStateChange('idle')
    this.callbacks.onTypingEnd()
  }

  setSpeed(speed: number) {
    this.speed = speed
  }

  getState() {
    return this.state
  }

  destroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId)
    if (this.typingTimeoutId) clearTimeout(this.typingTimeoutId)
  }

  private scheduleNext() {
    if (this.currentIndex >= this.messages.length) {
      this.state = 'complete'
      this.callbacks.onStateChange('complete')
      this.callbacks.onTypingEnd()
      this.callbacks.onComplete()
      return
    }

    const msg = this.messages[this.currentIndex]
    const delay = this.currentIndex === 0 ? 300 : msg.delay / this.speed

    // For non-customer, non-system messages, show typing indicator before the message
    const isTyping = msg.from !== 'customer' && msg.from !== 'system'
    const typingDuration = isTyping ? Math.min(1200, delay * 0.6) / this.speed : 0

    this.timeoutId = setTimeout(() => {
      if (this.state !== 'playing') return

      if (isTyping && typingDuration > 200) {
        this.callbacks.onTypingStart(msg.from)
        this.typingTimeoutId = setTimeout(() => {
          if (this.state !== 'playing') return
          this.callbacks.onTypingEnd()
          this.deliverMessage(msg)
        }, typingDuration)
      } else {
        this.deliverMessage(msg)
      }
    }, delay)
  }

  private deliverMessage(msg: ConversationMessage) {
    const event = messageToEvent(msg, this.currentIndex)
    this.callbacks.onMessage(msg, this.currentIndex)
    this.callbacks.onEvent(event)
    this.currentIndex++
    this.scheduleNext()
  }
}
