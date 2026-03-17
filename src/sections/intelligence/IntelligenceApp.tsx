import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import LiveDemo from './pages/LiveDemo'
import Personas from './pages/Personas'
import MultiConversation from './pages/MultiConversation'
import Impact from './pages/Impact'

const tabs = [
  { to: '', label: 'Live Demo', end: true },
  { to: 'personas', label: 'Personas', end: false },
  { to: 'multi', label: 'Multi-Conversation', end: false },
  { to: 'impact', label: 'Impact', end: false },
]

export default function IntelligenceApp() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Internal section nav */}
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-white/10">
        <span className="text-xs text-gray-500">Omnichannel Intelligence Demo</span>
        <div className="flex bg-white/5 rounded-xl p-1 gap-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
        <div className="w-20" />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="" element={<LiveDemo />} />
          <Route path="personas" element={<Personas />} />
          <Route path="multi" element={<MultiConversation />} />
          <Route path="impact" element={<Impact />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>

      <footer className="text-center py-2 border-t border-white/5">
        <p className="text-[10px] text-gray-600">
          Demo data — simulated customer journeys &nbsp;|&nbsp; Powered by Fluence
        </p>
      </footer>
    </div>
  )
}
