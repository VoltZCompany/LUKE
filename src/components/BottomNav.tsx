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
    <div className="tab-bar fixed bottom-0 left-0 right-0" style={{ zIndex: 40 }}>
      <div className="mobile-container" style={{ minHeight: 'unset' }}>
        <div className="flex justify-around items-center py-2 px-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && (pathname?.startsWith(item.href) ?? false))
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl"
                  style={{
                    background: isActive ? 'rgba(139,61,255,0.2)' : 'transparent',
                    border: isActive ? '1px solid rgba(139,61,255,0.35)' : '1px solid transparent',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span
                    className="font-cinzel font-semibold"
                    style={{
                      fontSize: 9,
                      color: isActive ? '#c084fc' : 'rgba(139,61,255,0.5)',
                    }}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="w-1 h-1 rounded-full"
                      style={{ background: '#c084fc' }}
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
