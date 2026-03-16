'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon: string
  backHref?: string
}

export default function PageHeader({ title, subtitle, icon, backHref = '/' }: PageHeaderProps) {
  return (
    <motion.div
      className="relative pt-14 pb-6 px-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back button */}
      <Link href={backHref}>
        <motion.button
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full glass-card text-purple-300 hover:text-white hover:border-purple-500/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>
      </Link>

      <div className="text-center">
        <motion.div
          className="text-5xl mb-3 animate-float inline-block"
          animate={{
            filter: [
              'drop-shadow(0 0 6px rgba(139,61,255,0.5))',
              'drop-shadow(0 0 16px rgba(139,61,255,0.9))',
              'drop-shadow(0 0 6px rgba(139,61,255,0.5))',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {icon}
        </motion.div>
        <h1 className="font-cinzel text-2xl font-bold text-gradient-gold tracking-wide">{title}</h1>
        {subtitle && (
          <p className="text-purple-300/70 text-sm mt-1 font-lato">{subtitle}</p>
        )}
        <div className="ornament-divider mt-3 text-purple-500/50 text-xs">✦</div>
      </div>
    </motion.div>
  )
}
