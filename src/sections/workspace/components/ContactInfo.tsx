import type { InboxCustomer, ChannelType } from '@/data/types'
import StarRating from '@/components/shared/StarRating'

interface ContactInfoProps {
  customer: InboxCustomer
}

const channelIcons: Record<ChannelType, string> = {
  whatsapp: '📱', webchat: '💬', instagram: '📸', email: '📧', voice: '📞',
}

export default function ContactInfo({ customer }: ContactInfoProps) {
  return (
    <div className="w-[200px] bg-white border-l border-gray-200 flex flex-col h-full flex-shrink-0 overflow-y-auto">
      {/* Customer header */}
      <div className="px-3 py-4 border-b border-gray-100 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl mx-auto mb-2">
          {customer.name.charAt(0)}
        </div>
        <div className="text-sm font-semibold text-gray-800">{customer.name}</div>
        <div className="text-[10px] text-gray-400">{customer.location}</div>
      </div>

      {/* Quick stats */}
      <div className="px-3 py-3 border-b border-gray-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500">Channel</span>
          <span className="text-xs text-gray-700">{channelIcons[customer.channel]} {customer.channel}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500">Conversations</span>
          <span className="text-xs text-gray-700">{customer.fluenceProfile.conversationCount ?? 1}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500">Wait time</span>
          <span className="text-xs text-gray-700">{customer.waitTime}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="px-3 py-3 border-b border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5">Tags</div>
        <div className="flex flex-wrap gap-1">
          {customer.tags.map((tag) => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{tag}</span>
          ))}
        </div>
      </div>

      {/* Channel history */}
      <div className="px-3 py-3">
        <div className="text-[10px] text-gray-500 mb-2">Channel History</div>
        <div className="space-y-2">
          {customer.channelHistory.map((entry, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs mt-0.5">{channelIcons[entry.channel]}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-gray-700 truncate">{entry.topic}</div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-gray-400">{entry.date}</span>
                  {entry.csat && (
                    <span className="text-[9px] text-yellow-500">{'★'.repeat(entry.csat)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
