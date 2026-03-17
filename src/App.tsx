import { Routes, Route, Navigate } from 'react-router-dom'
import SectionNav from '@/components/shared/SectionNav'
import IntelligenceApp from '@/sections/intelligence/IntelligenceApp'
import WorkspaceApp from '@/sections/workspace/WorkspaceApp'

export default function App() {
  return (
    <>
      <SectionNav />
      <Routes>
        <Route path="/*" element={<IntelligenceApp />} />
        <Route path="/workspace/*" element={<WorkspaceApp />} />
      </Routes>
    </>
  )
}
