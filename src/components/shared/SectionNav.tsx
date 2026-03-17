import { NavLink } from 'react-router-dom'
import { MessageSquare, Layout } from 'lucide-react'

const sections = [
  { to: '/', label: 'Conversation Intelligence', icon: MessageSquare, end: true },
  { to: '/workspace', label: 'Agent Workspace', icon: Layout, end: false },
]

export default function SectionNav() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-gray-950 flex-shrink-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-fluence-400 to-fluence-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-fluence-500/30">
          F
        </div>
        <span className="text-sm font-bold tracking-tight text-fluence-400">Fluence</span>
        <span className="text-xs mx-1 text-gray-600">×</span>
        <span className="text-sm font-bold tracking-tight text-white">Fortics</span>
      </div>

      <div className="flex bg-white/5 rounded-lg p-0.5 gap-0.5">
        {sections.map((s) => (
          <NavLink
            key={s.to}
            to={s.to}
            end={s.end}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`
            }
          >
            <s.icon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{s.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="w-24" />
    </nav>
  )
}
