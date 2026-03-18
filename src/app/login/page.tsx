'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Eye, EyeOff, Zap } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { setLoggedIn, hydrate } = useStore()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simple password check - in production use a real auth system
    await new Promise(r => setTimeout(r, 800))

    if (password === 'luke2024' || password === 'admin') {
      setLoggedIn(true)
      router.push('/')
    } else {
      setError('Senha incorreta')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2d78] via-[#1e56c9] to-[#3b7df2]" />

      {/* Animated orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-cyan-400/15 blur-3xl"
        animate={{ x: [0, -40, 20, 0], y: [0, 30, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ bottom: '20%', right: '10%' }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-indigo-300/20 blur-2xl"
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ top: '50%', right: '30%' }}
      />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white tracking-tight">LUKE</h1>
          <p className="text-blue-200/80 text-sm mt-1">Sistema de Gerenciamento</p>
        </motion.div>

        {/* Form card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 p-6 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-white/80 text-sm font-medium mb-1.5 block">Senha de Acesso</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-300 text-sm"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading || !password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-white/15"
            >
              {loading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                'Entrar'
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-blue-200/40 text-xs mt-6">v1.0.0</p>
      </motion.div>
    </div>
  )
}
