'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import {
  ArrowLeft,
  User,
  Moon,
  Sun,
  ShieldCheck,
  Send as SendIcon,
  Check,
  Palette,
} from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const store = useStore()
  const [localName, setLocalName] = useState('')
  const [localWebhook, setLocalWebhook] = useState('')
  const [saved, setSaved] = useState(false)
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    store.hydrate()
  }, [])

  useEffect(() => {
    setLocalName(store.userName)
    setLocalWebhook(store.discordWebhook)
  }, [store.userName, store.discordWebhook])

  const handleSave = () => {
    store.setUserName(localName)
    store.setDiscordWebhook(localWebhook)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleTestWebhook = async () => {
    if (!localWebhook) return
    try {
      const res = await fetch(localWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '✅ Teste do LUKE App - Webhook funcionando!',
        }),
      })
      setTestResult(res.ok ? 'success' : 'error')
    } catch {
      setTestResult('error')
    }
    setTimeout(() => setTestResult(null), 3000)
  }

  const handleVerificationToggle = () => {
    const newValue = !store.verificationEnabled
    store.setVerificationEnabled(newValue)
    // When turning OFF verification, immediately mark as verified so modal closes
    if (!newValue) {
      store.setIsVerified(true)
    }
    // When turning ON, next app open will require verification
  }

  return (
    <div className="min-h-screen relative">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a2d78] via-[#1e56c9] to-[#5691f5] dark:from-[#0a1628] dark:via-[#0f1f3d] dark:to-[#162a52] -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-30 px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => router.push('/')}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>
          <h1 className="text-xl font-bold text-white">Configurações</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-8 space-y-4">
        {/* User Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-card rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-luke-500/30 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-medium">Nome do Usuário</span>
          </div>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            placeholder="Seu nome"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          />
        </motion.div>

        {/* Theme */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-luke-500/30 flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-white font-medium block">Tema</span>
                <span className="text-white/50 text-xs">
                  {store.theme === 'light' ? 'Claro (Azul)' : 'Escuro'}
                </span>
              </div>
            </div>
            <button
              onClick={store.toggleTheme}
              className={`toggle-switch ${store.theme === 'dark' ? 'active' : ''}`}
            />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Sun className="w-4 h-4 text-white/50" />
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                initial={false}
                animate={{ width: store.theme === 'dark' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <Moon className="w-4 h-4 text-white/50" />
          </div>
        </motion.div>

        {/* Verification */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-luke-500/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-white font-medium block">Verificação ao Abrir</span>
                <span className="text-white/50 text-xs">
                  {store.verificationEnabled ? 'Ativada - pede código ao abrir' : 'Desativada'}
                </span>
              </div>
            </div>
            <button
              onClick={handleVerificationToggle}
              className={`toggle-switch ${store.verificationEnabled ? 'active' : ''}`}
            />
          </div>
        </motion.div>

        {/* Discord Webhook */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#5865F2]/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
            </div>
            <span className="text-white font-medium">Discord Webhook</span>
          </div>
          <input
            type="url"
            value={localWebhook}
            onChange={(e) => setLocalWebhook(e.target.value)}
            placeholder="https://discord.com/api/webhooks/..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-sm mb-3"
          />
          {localWebhook && (
            <motion.button
              onClick={handleTestWebhook}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 rounded-xl bg-[#5865F2]/30 hover:bg-[#5865F2]/50 text-white text-sm font-medium border border-[#5865F2]/30 transition-all flex items-center justify-center gap-2"
            >
              <SendIcon className="w-4 h-4" />
              Testar Webhook
              {testResult === 'success' && <Check className="w-4 h-4 text-green-400" />}
              {testResult === 'error' && <span className="text-red-400 text-xs">Erro!</span>}
            </motion.button>
          )}
        </motion.div>

        {/* Save button */}
        <motion.button
          onClick={handleSave}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold border border-white/15 transition-all flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-400">Salvo!</span>
            </>
          ) : (
            'Salvar Configurações'
          )}
        </motion.button>
      </div>
    </div>
  )
}
