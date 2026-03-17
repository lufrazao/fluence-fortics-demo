import { motion } from 'framer-motion'
import { IMPACT_METRICS } from '@/data/impactMetrics'
import MetricCard from '../components/MetricCard'

export default function Impact() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-3">Business Impact</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            What changes when SZ.chat + GOgenier are powered by Fluence behavioral intelligence.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {IMPACT_METRICS.map((metric, i) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              before={metric.before}
              after={metric.after}
              change={metric.change}
              positive={metric.positive}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Side by side comparison summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 grid grid-cols-2 gap-6"
        >
          {/* Without */}
          <div className="rounded-xl border border-white/10 p-6 bg-gray-800/30">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Without Fluence</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Agent knows</span>
                <span className="text-gray-300">nothing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bot response</span>
                <span className="text-gray-300">generic script</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Repeat contacts</span>
                <span className="text-red-400">cold start every time</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Escalation</span>
                <span className="text-red-400">forced by frustrated customer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Outcome</span>
                <span className="text-red-400">band-aid fix, customer churns</span>
              </div>
            </div>
          </div>

          {/* With */}
          <div className="rounded-xl border border-fluence-500/20 p-6 bg-fluence-500/5">
            <h3 className="text-sm font-bold text-fluence-400 uppercase tracking-wider mb-4">With Fluence</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Agent knows</span>
                <span className="text-green-400">everything</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bot response</span>
                <span className="text-green-400">behaviorally adapted</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Repeat contacts</span>
                <span className="text-green-400">full history + profile</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Escalation</span>
                <span className="text-green-400">smart, proactive routing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Outcome</span>
                <span className="text-green-400">root cause fix, customer stays</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center mt-12 mb-8"
        >
          <p className="text-xl text-gray-300 font-medium italic">
            "Same customer. Same problem. Different understanding."
          </p>
        </motion.div>
      </div>
    </div>
  )
}
