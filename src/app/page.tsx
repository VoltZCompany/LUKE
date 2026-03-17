'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function SplashPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="mobile-container bg-gradient-to-b from-[#0d0626] via-[#1a0533] to-[#0d1b4b]">
      <div className="stars-bg" />

      {/* Animated orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,61,255,0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-6 pb-12 pt-16">
        <AnimatePresence>
          {showContent && (
            <>
              {/* Logo / Symbol */}
              <motion.div
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <motion.div
                  className="text-8xl animate-float"
                  animate={{ filter: ['drop-shadow(0 0 8px rgba(139,61,255,0.6))', 'drop-shadow(0 0 20px rgba(139,61,255,0.9))', 'drop-shadow(0 0 8px rgba(139,61,255,0.6))'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌙
                </motion.div>

                <div className="text-center">
                  <motion.h1
                    className="font-cinzel text-4xl font-bold text-gradient-gold tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    GRIMÓRIO
                  </motion.h1>
                  <motion.p
                    className="font-cinzel text-xl text-purple-300 tracking-[0.3em] mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                  >
                    UMBANDA
                  </motion.p>
                  <motion.div
                    className="ornament-divider mt-3 text-xs text-purple-400"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    ✦ PORTAL MÍSTICO ✦
                  </motion.div>
                </div>
              </motion.div>

              {/* Menu Cards */}
              <motion.div
                className="w-full grid grid-cols-2 gap-4 mt-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                {[
                  { href: '/grimorio', icon: '📖', label: 'Grimório', sublabel: 'Feitiços & Rituais', gradient: 'from-purple-900/60 to-purple-700/40', border: 'border-purple-500/30', glow: 'hover:shadow-purple-500/20' },
                  { href: '/cantigas', icon: '🎵', label: 'Cantigas', sublabel: 'Pontos & Orações', gradient: 'from-blue-900/60 to-blue-700/40', border: 'border-blue-500/30', glow: 'hover:shadow-blue-500/20' },
                  { href: '/orixas', icon: '⭐', label: 'Orixás', sublabel: 'Divindades', gradient: 'from-yellow-900/60 to-yellow-700/40', border: 'border-yellow-500/30', glow: 'hover:shadow-yellow-500/20' },
                  { href: '/conhecimentos', icon: '📚', label: 'Saber', sublabel: 'Conhecimentos', gradient: 'from-green-900/60 to-teal-700/40', border: 'border-green-500/30', glow: 'hover:shadow-green-500/20' },
                  { href: '/debate', icon: '⚡', label: 'Debate', sublabel: 'Multi-Agente', gradient: 'from-orange-900/60 to-red-700/40', border: 'border-orange-500/30', glow: 'hover:shadow-orange-500/20' },
                ].map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link href={item.href}>
                      <div className={`glass-card bg-gradient-to-br ${item.gradient} border ${item.border} p-5 flex flex-col items-center gap-2 text-center hover:shadow-lg ${item.glow} transition-all duration-300`}>
                        <span className="text-3xl">{item.icon}</span>
                        <span className="font-cinzel font-bold text-white text-sm">{item.label}</span>
                        <span className="text-xs text-purple-300 opacity-80">{item.sublabel}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom quote */}
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
              >
                <p className="font-cinzel text-purple-400/70 text-xs tracking-widest italic">
                  "Saravá todos os Orixás"
                </p>
                <div className="flex justify-center gap-2 mt-3">
                  {['🌙', '⭐', '🌸', '⭐', '🌙'].map((star, i) => (
                    <motion.span
                      key={i}
                      className="text-xs opacity-40"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      {star}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
