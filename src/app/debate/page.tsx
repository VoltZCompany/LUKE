'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface DebateRound {
  round: number
  logistics: string
  operations: string
}

interface DebateResult {
  rounds: DebateRound[]
  synthesis: string
}

export default function DebatePage() {
  const [problem, setProblem] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DebateResult | null>(null)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState('')
  const [activeRound, setActiveRound] = useState(0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!problem.trim() || !apiKey.trim()) return

    setLoading(true)
    setError('')
    setResult(null)
    setCurrentStep('Iniciando debate entre os agentes...')

    const steps = [
      'Rodada 1: Agentes analisando o problema...',
      'Rodada 2: Agentes debatendo argumentos...',
      'Rodada 3: Agentes convergindo para solução...',
      'Gerando síntese final...',
    ]

    let stepIndex = 0
    const interval = setInterval(() => {
      stepIndex = Math.min(stepIndex + 1, steps.length - 1)
      setCurrentStep(steps[stepIndex])
    }, 8000)

    try {
      const response = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem, apiKey }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar debate')
      }

      setResult(data)
      setActiveRound(0)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
    } finally {
      clearInterval(interval)
      setLoading(false)
      setCurrentStep('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0626] via-[#1a0533] to-[#0d1b4b]">
      <div className="stars-bg" />

      {/* Header */}
      <div className="relative z-10 px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
          >
            ← Voltar
          </Link>
        </div>
        <div className="text-center">
          <h1 className="font-cinzel text-2xl font-bold text-gradient-gold tracking-wider">
            DEBATE MULTI-AGENTE
          </h1>
          <p className="text-purple-300 text-xs mt-1 tracking-wider">
            Logística vs Operações — 3 Rodadas
          </p>
        </div>
      </div>

      <div className="relative z-10 px-4 pb-24 max-w-2xl mx-auto">
        {/* Agent Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass-card bg-gradient-to-br from-blue-900/60 to-blue-700/30 border border-blue-500/30 p-4 text-center">
            <div className="text-3xl mb-2">🚛</div>
            <div className="font-cinzel text-white text-sm font-bold">Logística</div>
            <div className="text-blue-300 text-[10px] mt-1">
              Supply Chain • Transporte • Estoques
            </div>
          </div>
          <div className="glass-card bg-gradient-to-br from-orange-900/60 to-orange-700/30 border border-orange-500/30 p-4 text-center">
            <div className="text-3xl mb-2">⚙️</div>
            <div className="font-cinzel text-white text-sm font-bold">Operações</div>
            <div className="text-orange-300 text-[10px] mt-1">
              Processos • Qualidade • Eficiência
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="text-purple-300 text-xs font-cinzel block mb-2">
              Chave da API (Anthropic)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white text-sm placeholder-purple-400/40 focus:outline-none focus:border-purple-400/60 transition-colors"
            />
          </div>
          <div>
            <label className="text-purple-300 text-xs font-cinzel block mb-2">
              Descreva o Problema
            </label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Ex: Nossa empresa está enfrentando atrasos na entrega de produtos para clientes do Nordeste, com custos logísticos crescentes e reclamações sobre qualidade dos produtos na chegada..."
              rows={4}
              className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white text-sm placeholder-purple-400/40 focus:outline-none focus:border-purple-400/60 transition-colors resize-none"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading || !problem.trim() || !apiKey.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-cinzel font-bold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:from-purple-500 hover:to-blue-500 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Debatendo...' : 'Iniciar Debate'}
          </motion.button>
        </form>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card bg-purple-900/30 border border-purple-500/20 p-6 text-center mb-6"
            >
              <div className="flex justify-center gap-4 mb-4">
                <motion.div
                  className="text-4xl"
                  animate={{ x: [0, 20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚛
                </motion.div>
                <motion.div
                  className="text-2xl text-yellow-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ⚡
                </motion.div>
                <motion.div
                  className="text-4xl"
                  animate={{ x: [0, -20, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚙️
                </motion.div>
              </div>
              <p className="text-purple-200 text-sm">{currentStep}</p>
              <div className="mt-3 flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card bg-red-900/30 border border-red-500/30 p-4 mb-6"
          >
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Round Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {result.rounds.map((r) => (
                  <button
                    key={r.round}
                    onClick={() => setActiveRound(r.round - 1)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-cinzel font-bold transition-all ${
                      activeRound === r.round - 1
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-purple-300 hover:bg-white/10'
                    }`}
                  >
                    Rodada {r.round}
                  </button>
                ))}
                <button
                  onClick={() => setActiveRound(3)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-cinzel font-bold transition-all ${
                    activeRound === 3
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white'
                      : 'bg-white/5 text-yellow-300 hover:bg-white/10'
                  }`}
                >
                  Solução Final
                </button>
              </div>

              {/* Round Content */}
              {activeRound < 3 && result.rounds[activeRound] && (
                <motion.div
                  key={activeRound}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  {/* Logistics Response */}
                  <div className="glass-card bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/20 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🚛</span>
                      <span className="font-cinzel text-blue-300 text-sm font-bold">
                        Agente Logística
                      </span>
                      <span className="text-blue-400/50 text-[10px]">
                        Rodada {activeRound + 1}
                      </span>
                    </div>
                    <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                      {result.rounds[activeRound].logistics}
                    </div>
                  </div>

                  {/* Operations Response */}
                  <div className="glass-card bg-gradient-to-br from-orange-900/40 to-orange-800/20 border border-orange-500/20 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">⚙️</span>
                      <span className="font-cinzel text-orange-300 text-sm font-bold">
                        Agente Operações
                      </span>
                      <span className="text-orange-400/50 text-[10px]">
                        Rodada {activeRound + 1}
                      </span>
                    </div>
                    <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                      {result.rounds[activeRound].operations}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Synthesis */}
              {activeRound === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card bg-gradient-to-br from-yellow-900/40 via-purple-900/30 to-blue-900/40 border border-yellow-500/30 p-5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🏆</span>
                    <span className="font-cinzel text-yellow-300 text-base font-bold">
                      Solução Final Integrada
                    </span>
                  </div>
                  <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                    {result.synthesis}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
