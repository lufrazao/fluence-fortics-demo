import { useState, createContext, useContext } from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const FluenceContext = createContext(true)
export const useFluence = () => useContext(FluenceContext)

const tabs = [
  { to: '', label: 'Smart Inbox', end: true },
  { to: 'cross-channel', label: 'Cross-Channel', end: false },
  { to: 'response-ai', label: 'Response AI', end: false },
  { to: 'live-mood', label: 'Live Mood', end: false },
  { to: 'supervisor', label: 'Supervisor', end: false },
]

export default function WorkspaceApp() {
  const [fluenceEnabled, setFluenceEnabled] = useState(true)

  return (
    <FluenceContext.Provider value={fluenceEnabled}>
      <div className="flex-1 flex flex-col bg-gray-950 text-white overflow-hidden min-h-0">
        {/* Internal section nav */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 flex-shrink-0">
          <span className="text-xs text-gray-500">Agent Workspace Demo</span>

          {/* Scenario tabs */}
          <div className="flex bg-white/5 rounded-lg p-0.5 gap-0.5">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
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

          {/* Fluence toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Fluence</span>
            <button
              onClick={() => setFluenceEnabled(!fluenceEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                fluenceEnabled ? 'bg-fluence-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  fluenceEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
            <div className={`w-2 h-2 rounded-full ${fluenceEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="text-center py-1.5 border-t border-white/5 flex-shrink-0">
          <p className="text-[10px] text-gray-600">
            Demo data — simulated agent workflow &nbsp;|&nbsp; Powered by Fluence
          </p>
        </div>
      </div>
    </FluenceContext.Provider>
  )
}
