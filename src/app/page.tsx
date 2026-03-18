'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import RadialMenu from '@/components/RadialMenu'
import VerificationModal from '@/components/VerificationModal'
import {
  Zap,
  Settings,
  Camera,
  Activity,
  Clock,
  ChevronRight,
} from 'lucide-react'

const QUICK_ACTIONS = [
  { icon: Camera, label: 'Enviar Foto', desc: 'Enviar foto pro Discord', color: '#3b7df2' },
  { icon: Activity, label: 'Status', desc: 'Ver status do sistema', color: '#10b981' },
  { icon: Clock, label: 'Histórico', desc: 'Ações recentes', color: '#8b5cf6' },
]

export default function HomePage() {
  const router = useRouter()
  const store = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    store.hydrate()
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !store.isLoggedIn) {
      router.push('/login')
    }
  }, [mounted, store.isLoggedIn, router])

  if (!mounted || !store.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a2d78] via-[#1e56c9] to-[#5691f5] flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  const handlePhotoUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'environment'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file && store.discordWebhook) {
        const formData = new FormData()
        formData.append('file', file, file.name)
        formData.append('payload_json', JSON.stringify({
          content: `📸 Foto de ${store.userName || 'LUKE App'}`,
        }))
        try {
          await fetch(store.discordWebhook, { method: 'POST', body: formData })
        } catch (err) {
          console.error('Error:', err)
        }
      } else if (!store.discordWebhook) {
        router.push('/settings')
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen relative">
      {/* Background gradient - blue for light, dark blue for dark */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a2d78] via-[#1e56c9] to-[#5691f5] dark:from-[#0a1628] dark:via-[#0f1f3d] dark:to-[#162a52] -z-10" />

      {/* Animated background orbs */}
      <motion.div
        className="fixed w-72 h-72 rounded-full bg-blue-400/10 blur-3xl -z-5"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ top: '5%', left: '-5%' }}
      />
      <motion.div
        className="fixed w-56 h-56 rounded-full bg-cyan-400/8 blur-3xl -z-5"
        animate={{ x: [0, -30, 15, 0], y: [0, 20, -35, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{ bottom: '15%', right: '-5%' }}
      />

      {/* Verification modal */}
      <VerificationModal />

      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-blue-200/60 text-sm"
            >
              Bem-vindo de volta
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="text-2xl font-bold text-white"
            >
              {store.userName || 'LUKE'}
            </motion.h1>
          </div>
          <motion.button
            onClick={() => router.push('/settings')}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Status card */}
      <div className="px-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Sistema LUKE</h2>
              <p className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/8 rounded-xl p-3 text-center">
              <p className="text-white font-bold text-lg">24</p>
              <p className="text-white/50 text-[10px]">Fotos</p>
            </div>
            <div className="bg-white/8 rounded-xl p-3 text-center">
              <p className="text-white font-bold text-lg">
                {store.discordWebhook ? '✓' : '—'}
              </p>
              <p className="text-white/50 text-[10px]">Discord</p>
            </div>
            <div className="bg-white/8 rounded-xl p-3 text-center">
              <p className="text-white font-bold text-lg">
                {store.verificationEnabled ? '🔒' : '🔓'}
              </p>
              <p className="text-white/50 text-[10px]">Segurança</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <div className="px-5 mb-5">
        <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
          Ações Rápidas
        </h3>
        <div className="space-y-2.5">
          {QUICK_ACTIONS.map((action, i) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                onClick={action.label === 'Enviar Foto' ? handlePhotoUpload : undefined}
                className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${action.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: action.color }} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-medium text-sm">{action.label}</p>
                  <p className="text-white/40 text-xs">{action.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30" />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Radial menu */}
      <RadialMenu />

      {/* Bottom safe area */}
      <div className="h-20" />
    </div>
  )
}
