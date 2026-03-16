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
      className="pt-12 pb-5 px-5 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={backHref}>
        <motion.button
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full text-purple-300"
          style={{ background: 'rgba(139,61,255,0.15)', border: '1px solid rgba(139,61,255,0.3)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>
      </Link>

      <motion.div
        className="text-5xl mb-3 animate-float inline-block"
        animate={{
          filter: ['drop-shadow(0 0 6px rgba(139,61,255,0.5))', 'drop-shadow(0 0 18px rgba(139,61,255,0.9))', 'drop-shadow(0 0 6px rgba(139,61,255,0.5))'],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {icon}
      </motion.div>

      <h1 className="font-cinzel text-2xl font-bold text-gradient-gold tracking-wide">{title}</h1>
      {subtitle && <p className="text-sm mt-1" style={{ color: 'rgba(196,168,255,0.6)' }}>{subtitle}</p>}
      <div className="ornament-divider mt-3 text-xs">✦</div>
    </motion.div>
  )
}
