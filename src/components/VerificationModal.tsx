'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, X } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function VerificationModal() {
  const { verificationEnabled, isVerified, setIsVerified } = useStore()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  // Don't show if verification is disabled OR already verified
  if (!verificationEnabled || isVerified) return null

  const handleVerify = () => {
    if (code === '1234' || code === 'luke') {
      setIsVerified(true)
      setError('')
    } else {
      setError('Código inválido')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative z-10 w-full max-w-xs mx-4 bg-gradient-to-br from-[#1e56c9] to-[#3b7df2] rounded-3xl border border-white/15 p-6 shadow-2xl"
        >
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-3">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Verificação</h2>
            <p className="text-blue-200/70 text-sm mt-1">Digite o código para continuar</p>
          </div>

          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError('') }}
            placeholder="Código de verificação"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-center tracking-widest text-lg mb-3"
            autoFocus
          />

          {error && <p className="text-red-300 text-sm text-center mb-2">{error}</p>}

          <motion.button
            onClick={handleVerify}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold border border-white/15 transition-all"
          >
            Verificar
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
