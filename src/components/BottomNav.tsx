'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', icon: '🏠', label: 'Início' },
  { href: '/grimorio', icon: '📖', label: 'Grimório' },
  { href: '/cantigas', icon: '🎵', label: 'Cantigas' },
  { href: '/orixas', icon: '⭐', label: 'Orixás' },
  { href: '/conhecimentos', icon: '📚', label: 'Saber' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="tab-bar fixed bottom-0 left-0 right-0 z-50">
      <div className="mobile-container">
        <div className="flex justify-around items-center py-2 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-purple-900/50 border border-purple-500/30'
                      : 'hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span className={`text-xl ${isActive ? 'animate-float' : ''}`}>{item.icon}</span>
                  <span className={`text-[10px] font-cinzel font-semibold ${isActive ? 'text-purple-300' : 'text-purple-500/60'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="w-1 h-1 rounded-full bg-purple-400"
                      layoutId="navDot"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
