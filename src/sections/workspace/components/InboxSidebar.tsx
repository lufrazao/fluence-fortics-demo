import { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { InboxCustomer } from '@/data/types'
import { sortByPriority, sortByChronological } from '@/data/inboxCustomers'
import InboxItem from './InboxItem'

interface InboxSidebarProps {
  customers: InboxCustomer[]
  activeCustomerId: string | null
  onSelectCustomer: (id: string) => void
  fluenceEnabled: boolean
}

export default function InboxSidebar({ customers, activeCustomerId, onSelectCustomer, fluenceEnabled }: InboxSidebarProps) {
  const sortedCustomers = useMemo(
    () => fluenceEnabled ? sortByPriority(customers) : sortByChronological(customers),
    [customers, fluenceEnabled]
  )

  return (
    <div className="w-[250px] bg-workspace-sidebar border-r border-white/10 flex flex-col h-full flex-shrink-0">
      {/* Header */}
      <div className="px-3 py-3 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Inbox</h2>
          <span className="text-xs text-gray-500">{customers.length} conversations</span>
        </div>
        <div className="text-[10px] text-gray-500">
          Sort: <span className="text-gray-300 font-medium">{fluenceEnabled ? 'Behavioral Urgency' : 'Chronological'}</span>
        </div>
      </div>

      {/* Customer list */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {sortedCustomers.map((customer) => (
            <InboxItem
              key={customer.id}
              customer={customer}
              isActive={customer.id === activeCustomerId}
              onClick={() => onSelectCustomer(customer.id)}
              fluenceEnabled={fluenceEnabled}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-white/10">
        <div className="text-xs text-gray-600 text-center">
          + 21 more in queue
        </div>
      </div>
    </div>
  )
}
