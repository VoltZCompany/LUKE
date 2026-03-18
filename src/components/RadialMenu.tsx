'use client'

import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import {
  Home,
  Settings,
  Camera,
  MessageSquare,
  Moon,
  Sun,
  X,
} from 'lucide-react'

const MENU_ITEMS = [
  { icon: Home, label: 'Início', path: '/', color: '#3b7df2' },
  { icon: Settings, label: 'Config', path: '/settings', color: '#5691f5' },
  { icon: Camera, label: 'Foto', action: 'photo', color: '#74a5f8' },
  { icon: MessageSquare, label: 'Discord', action: 'discord', color: '#2e6be0' },
]

export default function RadialMenu() {
  const router = useRouter()
  const { radialOpen, setRadialOpen, theme, toggleTheme, discordWebhook } = useStore()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setRadialOpen(false)
    }
  }, [setRadialOpen])

  useEffect(() => {
    if (radialOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick as any)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick as any)
    }
  }, [radialOpen, handleOutsideClick])

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRadialOpen(false)
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [setRadialOpen])

  const handleAction = async (item: typeof MENU_ITEMS[0]) => {
    setRadialOpen(false)

    if (item.path) {
      router.push(item.path)
      return
    }

    if (item.action === 'photo') {
      // Open file picker for photo
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.capture = 'environment'
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file && discordWebhook) {
          await sendToDiscord(file)
        }
      }
      input.click()
      return
    }

    if (item.action === 'discord') {
      if (!discordWebhook) {
        router.push('/settings')
      }
    }
  }

  const sendToDiscord = async (file: File) => {
    if (!discordWebhook) return

    try {
      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('payload_json', JSON.stringify({
        content: `📸 Foto enviada via LUKE App`,
      }))

      const response = await fetch(discordWebhook, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        console.error('Discord webhook error:', response.status)
      }
    } catch (err) {
      console.error('Error sending to Discord:', err)
    }
  }

  const radius = 90
  const itemCount = MENU_ITEMS.length + 1 // +1 for theme toggle
  const angleStep = (2 * Math.PI) / itemCount
  const startAngle = -Math.PI / 2

  const getPosition = (index: number) => {
    const angle = startAngle + index * angleStep
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  return (
    <>
      {/* FAB trigger button */}
      <motion.button
        onClick={() => setRadialOpen(!radialOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#1e56c9] to-[#3b7df2] shadow-lg shadow-blue-500/30 flex items-center justify-center border border-white/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        style={{ touchAction: 'manipulation' }}
      >
        <AnimatePresence mode="wait">
          {radialOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <div className="flex flex-col gap-1">
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-5 h-0.5 bg-white rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Radial menu */}
      <AnimatePresence>
        {radialOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            {/* Menu items container */}
            <div
              ref={menuRef}
              className="fixed z-50"
              style={{
                bottom: '32px',
                right: '32px',
              }}
            >
              {/* Menu items */}
              {MENU_ITEMS.map((item, i) => {
                const pos = getPosition(i)
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: 1, x: pos.x - 20, y: pos.y - 20, scale: 1 }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => handleAction(item)}
                    className="absolute w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/20"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                      touchAction: 'manipulation',
                    }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.button>
                )
              })}

              {/* Theme toggle item */}
              {(() => {
                const pos = getPosition(MENU_ITEMS.length)
                return (
                  <motion.button
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: 1, x: pos.x - 20, y: pos.y - 20, scale: 1 }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    transition={{ delay: MENU_ITEMS.length * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => { toggleTheme(); setRadialOpen(false) }}
                    className="absolute w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/20"
                    style={{
                      background: theme === 'light'
                        ? 'linear-gradient(135deg, #0a2d78, #1e56c9)'
                        : 'linear-gradient(135deg, #f59e0b, #f97316)',
                      touchAction: 'manipulation',
                    }}
                    whileTap={{ scale: 0.85 }}
                  >
                    {theme === 'light' ? (
                      <Moon className="w-5 h-5 text-white" />
                    ) : (
                      <Sun className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                )
              })()}

              {/* Labels */}
              {MENU_ITEMS.map((item, i) => {
                const pos = getPosition(i)
                return (
                  <motion.span
                    key={`label-${item.label}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="absolute text-white text-[10px] font-medium whitespace-nowrap pointer-events-none"
                    style={{
                      left: pos.x - 20,
                      top: pos.y + 18,
                      textAlign: 'center',
                      width: 48,
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    }}
                  >
                    {item.label}
                  </motion.span>
                )
              })}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 + MENU_ITEMS.length * 0.05 }}
                className="absolute text-white text-[10px] font-medium whitespace-nowrap pointer-events-none"
                style={{
                  left: getPosition(MENU_ITEMS.length).x - 20,
                  top: getPosition(MENU_ITEMS.length).y + 18,
                  textAlign: 'center',
                  width: 48,
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                }}
              >
                Tema
              </motion.span>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
