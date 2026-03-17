import type { AgentProfile } from '@/data/types'

interface AgentPerformanceTableProps {
  agents: AgentProfile[]
}

export default function AgentPerformanceTable({ agents }: AgentPerformanceTableProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-800">Agent Performance</h3>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500">
              <th className="text-left px-3 py-2 font-medium">Agent</th>
              <th className="text-center px-3 py-2 font-medium">Avg CSAT</th>
              <th className="text-center px-3 py-2 font-medium">Avg Time</th>
              <th className="text-center px-3 py-2 font-medium">Style Match</th>
              <th className="text-center px-3 py-2 font-medium">Churn Saves</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{agent.avatar}</span>
                    <div>
                      <div className="font-medium text-gray-800">{agent.name}</div>
                      <div className="text-[9px] text-gray-400">{agent.specialties.join(', ')}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center px-3 py-2.5">
                  <span className={`font-semibold ${
                    agent.avgCsat >= 4.5 ? 'text-green-600' : agent.avgCsat >= 4.0 ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {agent.avgCsat.toFixed(1)}
                  </span>
                </td>
                <td className="text-center px-3 py-2.5 text-gray-600">{agent.avgTime}</td>
                <td className="text-center px-3 py-2.5">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          agent.styleMatch >= 90 ? 'bg-green-400' : agent.styleMatch >= 70 ? 'bg-yellow-400' : 'bg-orange-400'
                        }`}
                        style={{ width: `${agent.styleMatch}%` }}
                      />
                    </div>
                    <span className="text-gray-600">{agent.styleMatch}%</span>
                  </div>
                </td>
                <td className="text-center px-3 py-2.5">
                  {agent.churnSaves > 0 ? (
                    <span className="font-semibold text-fluence-600">{agent.churnSaves}</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
