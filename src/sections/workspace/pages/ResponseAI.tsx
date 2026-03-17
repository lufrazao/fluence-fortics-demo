import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RESPONSE_SUGGESTIONS } from '@/data/responseSuggestions'
import { INBOX_CUSTOMERS } from '@/data/inboxCustomers'
import { useFluence } from '../WorkspaceApp'
import ResponseSuggestion from '../components/ResponseSuggestion'
import ConversationPanel from '../components/ConversationPanel'
import FluencePanel from '../components/FluencePanel'

const scenarioKeys = ['joao', 'maria', 'pedro', 'carlos'] as const
const scenarioLabels: Record<string, string> = {
  joao: 'João — Shorten',
  maria: 'Maria — Expand',
  pedro: 'Pedro — Rewrite',
  carlos: 'Carlos — Expand',
}

export default function ResponseAI() {
  const fluenceEnabled = useFluence()
  const [activeScenario, setActiveScenario] = useState<string>('joao')
  const [applied, setApplied] = useState<Record<string, boolean>>({})
  const [inputValues, setInputValues] = useState<Record<string, string>>(() => {
    const values: Record<string, string> = {}
    for (const key of scenarioKeys) {
      values[key] = RESPONSE_SUGGESTIONS[key].original
    }
    return values
  })

  const suggestion = RESPONSE_SUGGESTIONS[activeScenario]
  const customer = INBOX_CUSTOMERS.find((c) => c.id === activeScenario) ?? INBOX_CUSTOMERS[0]
  const isApplied = applied[activeScenario]

  const handleApply = () => {
    setApplied((prev) => ({ ...prev, [activeScenario]: true }))
    setInputValues((prev) => ({ ...prev, [activeScenario]: suggestion.suggested }))
  }

  const handleDismiss = () => {
    setApplied((prev) => ({ ...prev, [activeScenario]: true }))
  }

  const handleReset = () => {
    setApplied({})
    setInputValues(() => {
      const values: Record<string, string> = {}
      for (const key of scenarioKeys) {
        values[key] = RESPONSE_SUGGESTIONS[key].original
      }
      return values
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Scenario selector */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-white/10 flex-shrink-0">
        <span className="text-xs text-gray-400 mr-2">Scenario:</span>
        {scenarioKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveScenario(key)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeScenario === key
                ? 'bg-fluence-500/20 text-fluence-300'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            {scenarioLabels[key]}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={handleReset} className="text-[10px] text-gray-500 hover:text-gray-300">
          Reset all
        </button>
      </div>

      {/* Workspace */}
      <div className="flex-1 flex min-h-0">
        {/* Conversation */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScenario}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <ConversationPanel
                customer={customer}
                messages={customer.conversationMessages}
                fluenceEnabled={fluenceEnabled}
                inputValue={inputValues[activeScenario]}
                onInputChange={(v) => setInputValues((prev) => ({ ...prev, [activeScenario]: v }))}
                suggestionSlot={
                  fluenceEnabled && !isApplied ? (
                    <ResponseSuggestion
                      type={suggestion.type}
                      icon={suggestion.icon}
                      original={suggestion.original}
                      suggested={suggestion.suggested}
                      reason={suggestion.reason}
                      wordCountOriginal={suggestion.wordCountOriginal}
                      wordCountSuggested={suggestion.wordCountSuggested}
                      visible={true}
                      onApply={handleApply}
                      onDismiss={handleDismiss}
                    />
                  ) : undefined
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fluence panel */}
        <FluencePanel customer={customer} visible={fluenceEnabled} />
      </div>
    </div>
  )
}
