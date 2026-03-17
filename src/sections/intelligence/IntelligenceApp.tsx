import { useState, createContext, useContext } from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const FluenceContext = createContext(true)
export const useFluence = () => useContext(FluenceContext)

const tabs = [
  { to: '', label: 'Live Demo', end: true },
  { to: 'personas', label: 'Personas', end: false },
  { to: 'multi', label: 'Multi-Conversation', end: false },
  { to: 'impact', label: 'Impact', end: false },
]

export default function IntelligenceApp() {
  const [fluenceEnabled, setFluenceEnabled] = useState(true)

  return (
    <FluenceContext.Provider value={fluenceEnabled}>
      <div className="flex-1 bg-gray-950 text-white flex flex-col min-h-0">
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
            <div
              className={`w-2 h-2 rounded-full ${
                fluenceEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
              }`}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </div>

        <footer className="text-center py-2 border-t border-white/5">
          <p className="text-[10px] text-gray-600">
            Demo data — simulated customer journeys &nbsp;|&nbsp; Powered by Fluence
          </p>
        </footer>
      </div>
    </FluenceContext.Provider>
  )
}
