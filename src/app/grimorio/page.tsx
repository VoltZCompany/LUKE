'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { feiticos, Feitico } from '@/src/data/feiticos'
import PageHeader from '@/src/components/PageHeader'
import BottomNav from '@/src/components/BottomNav'

export default function GrimorioPage() {
  const [selected, setSelected] = useState<Feitico | null>(null)

  return (
    <div className="mobile-container min-h-screen pb-24">
      <div className="stars-bg" />
      <div className="relative z-10">
        <PageHeader
          title="Grimório"
          subtitle="Feitiços & Rituais Sagrados"
          icon="📖"
        />

        <div className="px-4 pb-4 space-y-3">
          {feiticos.map((feitico, i) => (
            <motion.div
              key={feitico.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(feitico)}
            >
              <div
                className="glass-card glass-card-hover p-4 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${feitico.gradientFrom}80 0%, ${feitico.gradientTo}60 100%)`,
                  borderColor: `${feitico.gradientTo}50`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${feitico.gradientFrom}80`, border: `1px solid ${feitico.gradientTo}40` }}
                  >
                    {feitico.icone}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-cinzel font-bold text-white text-sm">{feitico.titulo}</h3>
                    <p className="text-purple-300/70 text-xs mt-0.5">Orixá: {feitico.orixaRelacionado}</p>
                    <p className="text-purple-200/50 text-xs mt-1 truncate">{feitico.objetivo}</p>
                  </div>
                  <span className="text-purple-400/50 text-lg flex-shrink-0">›</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />

            {/* Sheet */}
            <motion.div
              className="relative w-full max-w-[480px] max-h-[88vh] overflow-y-auto rounded-t-3xl"
              style={{
                background: `linear-gradient(180deg, ${selected.gradientFrom} 0%, #0d0626 40%)`,
                border: `1px solid ${selected.gradientTo}30`,
                borderBottom: 'none',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <div className="px-5 pb-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl">{selected.icone}</span>
                  <div>
                    <h2 className="font-cinzel font-bold text-white text-xl">{selected.titulo}</h2>
                    <p className="text-purple-300/70 text-sm">Orixá: {selected.orixaRelacionado}</p>
                  </div>
                </div>

                <div className="ornament-divider mb-4 text-purple-500/40 text-xs">✦ OBJETIVO ✦</div>
                <p className="text-purple-200 text-sm leading-relaxed mb-5">{selected.objetivo}</p>

                <div className="ornament-divider mb-4 text-purple-500/40 text-xs">✦ INGREDIENTES ✦</div>
                <ul className="space-y-2 mb-5">
                  {selected.ingredientes.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 text-purple-200 text-sm">
                      <span className="text-purple-400">✦</span>
                      {ing}
                    </li>
                  ))}
                </ul>

                <div className="ornament-divider mb-4 text-purple-500/40 text-xs">✦ MODO DE FAZER ✦</div>
                <p className="text-purple-200 text-sm leading-relaxed mb-5">{selected.modo}</p>

                <div className="glass-card p-4" style={{ borderColor: `${selected.gradientTo}30` }}>
                  <p className="text-xs text-purple-400/80 font-cinzel font-semibold mb-1">⚠ Observações</p>
                  <p className="text-purple-200/70 text-xs leading-relaxed">{selected.observacoes}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  )
}
