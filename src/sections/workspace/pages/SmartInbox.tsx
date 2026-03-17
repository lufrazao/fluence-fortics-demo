import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { INBOX_CUSTOMERS } from '@/data/inboxCustomers'
import { useFluence } from '../WorkspaceApp'
import InboxSidebar from '../components/InboxSidebar'
import ConversationPanel from '../components/ConversationPanel'
import ContactInfo from '../components/ContactInfo'
import FluencePanel from '../components/FluencePanel'

export default function SmartInbox() {
  const fluenceEnabled = useFluence()
  const [activeCustomerId, setActiveCustomerId] = useState<string>(INBOX_CUSTOMERS[0].id)

  const activeCustomer = INBOX_CUSTOMERS.find((c) => c.id === activeCustomerId) ?? INBOX_CUSTOMERS[0]

  return (
    <div className="flex h-full overflow-hidden">
      {/* Inbox sidebar */}
      <InboxSidebar
        customers={INBOX_CUSTOMERS}
        activeCustomerId={activeCustomerId}
        onSelectCustomer={setActiveCustomerId}
        fluenceEnabled={fluenceEnabled}
      />

      {/* Conversation area */}
      <div className="flex-1 min-w-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCustomerId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="h-full"
          >
            <ConversationPanel
              customer={activeCustomer}
              messages={activeCustomer.conversationMessages}
              fluenceEnabled={fluenceEnabled}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contact info */}
      <ContactInfo customer={activeCustomer} />

      {/* Fluence panel */}
      <FluencePanel customer={activeCustomer} visible={fluenceEnabled} />
    </div>
  )
}
