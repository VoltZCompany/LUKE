'use client'

import { motion } from 'framer-motion'

export default function Background() {
  return (
    <>
      {/* Static stars */}
      <div className="stars-bg" />

      {/* Animated orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,61,255,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </>
  )
}
