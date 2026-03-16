'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const menuItems = [
  { href: '/grimorio', icon: '📖', label: 'Grimório', sublabel: 'Feitiços & Rituais', color: 'rgba(139,61,255,0.2)', border: 'rgba(139,61,255,0.4)' },
  { href: '/cantigas', icon: '🎵', label: 'Cantigas', sublabel: 'Pontos & Orações', color: 'rgba(0,119,182,0.2)', border: 'rgba(0,180,216,0.4)' },
  { href: '/orixas', icon: '⭐', label: 'Orixás', sublabel: 'Divindades', color: 'rgba(180,130,0,0.2)', border: 'rgba(251,191,36,0.4)' },
  { href: '/conhecimentos', icon: '📚', label: 'Saber', sublabel: 'Conhecimentos', color: 'rgba(0,100,80,0.2)', border: 'rgba(20,184,166,0.4)' },
]

export default function HomePage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="mobile-container min-h-screen flex flex-col items-center justify-between px-5 pb-12 pt-16">
      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              className="flex flex-col items-center gap-5 mt-8"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-7xl animate-float"
                animate={{
                  filter: [
                    'drop-shadow(0 0 10px rgba(139,61,255,0.5))',
                    'drop-shadow(0 0 25px rgba(139,61,255,0.9))',
                    'drop-shadow(0 0 10px rgba(139,61,255,0.5))',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌙
              </motion.div>

              <div className="text-center">
                <h1 className="font-cinzel text-5xl font-bold text-gradient-gold tracking-widest">
                  GRIMÓRIO
                </h1>
                <p className="font-cinzel text-lg tracking-[0.5em] mt-1" style={{ color: '#c084fc' }}>
                  UMBANDA
                </p>
                <div className="ornament-divider mt-2 text-xs">✦ PORTAL MÍSTICO ✦</div>
              </div>
            </motion.div>

            <motion.div
              className="w-full grid grid-cols-2 gap-4 mt-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link href={item.href} style={{ display: 'block' }}>
                    <div
                      className="rounded-2xl p-5 flex flex-col items-center gap-2 text-center"
                      style={{ background: item.color, border: `1px solid ${item.border}` }}
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="font-cinzel font-bold text-white text-sm">{item.label}</span>
                      <span className="text-xs" style={{ color: 'rgba(196,168,255,0.8)' }}>{item.sublabel}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              className="font-cinzel text-xs tracking-widest italic mt-8"
              style={{ color: 'rgba(196,168,255,0.4)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              ✦ Saravá todos os Orixás ✦
            </motion.p>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
