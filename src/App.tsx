import { Routes, Route } from 'react-router-dom'
import SectionNav from '@/components/shared/SectionNav'
import IntelligenceApp from '@/sections/intelligence/IntelligenceApp'
import WorkspaceApp from '@/sections/workspace/WorkspaceApp'
import ErrorBoundary from '@/ErrorBoundary'

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <SectionNav />
      <div className="flex-1 min-h-0 flex flex-col">
        <ErrorBoundary>
          <Routes>
            <Route path="/workspace/*" element={<WorkspaceApp />} />
            <Route path="/*" element={<IntelligenceApp />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  )
}
