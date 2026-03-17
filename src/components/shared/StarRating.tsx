import { motion } from 'framer-motion'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const sizes = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
}

export default function StarRating({ rating, maxRating = 5, size = 'md', animated = true }: StarRatingProps) {
  const starColor = rating <= 2 ? 'text-red-400' : rating <= 3 ? 'text-yellow-400' : 'text-yellow-300'

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, i) => (
        <motion.span
          key={i}
          initial={animated ? { opacity: 0, scale: 0 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: animated ? i * 0.1 : 0, type: 'spring', stiffness: 300 }}
          className={`${sizes[size]} ${i < rating ? starColor : 'text-gray-600'}`}
        >
          {i < rating ? '★' : '☆'}
        </motion.span>
      ))}
      <span className="text-sm text-gray-400 ml-1">({rating}/{maxRating})</span>
    </div>
  )
}
