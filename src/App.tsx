import { Routes, Route } from 'react-router-dom'
import SectionNav from '@/components/shared/SectionNav'
import IntelligenceApp from '@/sections/intelligence/IntelligenceApp'
import WorkspaceApp from '@/sections/workspace/WorkspaceApp'
import ErrorBoundary from '@/ErrorBoundary'
import LiveDemo from '@/sections/intelligence/pages/LiveDemo'
import Personas from '@/sections/intelligence/pages/Personas'
import MultiConversation from '@/sections/intelligence/pages/MultiConversation'
import Impact from '@/sections/intelligence/pages/Impact'
import SmartInbox from '@/sections/workspace/pages/SmartInbox'
import CrossChannel from '@/sections/workspace/pages/CrossChannel'
import ResponseAI from '@/sections/workspace/pages/ResponseAI'
import LiveMood from '@/sections/workspace/pages/LiveMood'
import Supervisor from '@/sections/workspace/pages/Supervisor'

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <SectionNav />
      <div className="flex-1 min-h-0 flex flex-col">
        <ErrorBoundary>
          <Routes>
            {/* Workspace section */}
            <Route path="/workspace" element={<WorkspaceApp />}>
              <Route index element={<SmartInbox />} />
              <Route path="cross-channel" element={<CrossChannel />} />
              <Route path="response-ai" element={<ResponseAI />} />
              <Route path="live-mood" element={<LiveMood />} />
              <Route path="supervisor" element={<Supervisor />} />
            </Route>

            {/* Intelligence section (default) */}
            <Route path="/" element={<IntelligenceApp />}>
              <Route index element={<LiveDemo />} />
              <Route path="personas" element={<Personas />} />
              <Route path="multi" element={<MultiConversation />} />
              <Route path="impact" element={<Impact />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  )
}
