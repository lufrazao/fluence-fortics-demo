import { motion } from 'framer-motion'
import type { InboxCustomer, ChannelType } from '@/data/types'

interface InboxItemProps {
  customer: InboxCustomer
  isActive: boolean
  onClick: () => void
  fluenceEnabled: boolean
}

const channelIcons: Record<ChannelType, string> = {
  whatsapp: '📱',
  webchat: '💬',
  instagram: '📸',
  email: '📧',
  voice: '📞',
}

const priorityColors: Record<string, string> = {
  critical: 'bg-red-400',
  high: 'bg-orange-400',
  medium: 'bg-yellow-400',
  low: 'bg-green-400',
  upsell: 'bg-blue-400',
}

const priorityLabels: Record<string, string> = {
  critical: 'CRITICAL',
  high: 'HIGH',
  medium: 'NEW',
  low: 'ROUTINE',
  upsell: 'UPSELL',
}

export default function InboxItem({ customer, isActive, onClick, fluenceEnabled }: InboxItemProps) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`inbox-item w-full text-left ${isActive ? 'active' : ''}`}
      transition={{ layout: { duration: 0.4, type: 'spring', stiffness: 300, damping: 30 } }}
    >
      {/* Priority dot */}
      <div className={`priority-dot ${fluenceEnabled ? priorityColors[customer.priority] : 'bg-gray-500'} ${
        fluenceEnabled && customer.priority === 'critical' ? 'animate-pulse' : ''
      }`} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-white truncate">{customer.name}</span>
            <span className="text-xs">{channelIcons[customer.channel]}</span>
          </div>
          <span className="text-[10px] text-gray-500 flex-shrink-0">{customer.waitTime}</span>
        </div>

        <div className="text-xs text-gray-400 truncate mb-0.5">{customer.lastMessage}</div>

        <div className="flex items-center justify-between">
          {fluenceEnabled ? (
            <span className={`text-[9px] font-bold uppercase tracking-wider ${
              customer.priority === 'critical' ? 'text-red-400' :
              customer.priority === 'upsell' ? 'text-blue-400' :
              customer.priority === 'medium' ? 'text-yellow-400' :
              'text-gray-500'
            }`}>
              {priorityLabels[customer.priority]}
            </span>
          ) : (
            <span className="text-[9px] text-gray-600">{customer.topic.slice(0, 30)}</span>
          )}

          {customer.unreadMessages > 0 && (
            <span className="w-4 h-4 rounded-full bg-fluence-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
              {customer.unreadMessages}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}
