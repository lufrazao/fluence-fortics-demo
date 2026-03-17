import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedValueProps {
  value: string | number
  className?: string
}

export default function AnimatedValue({ value, className = '' }: AnimatedValueProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={String(value)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  )
}
