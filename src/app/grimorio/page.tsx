'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { feiticos, Feitico } from '@/src/data/feiticos'
import PageHeader from '@/src/components/PageHeader'
import BottomNav from '@/src/components/BottomNav'

export default function GrimorioPage() {
  const [selected, setSelected] = useState<Feitico | null>(null)

  return (
    <div className="mobile-container min-h-screen pb-28">
      <PageHeader title="Grimório" subtitle="Feitiços & Rituais Sagrados" icon="📖" />

      <div className="px-4 pb-4 space-y-3">
        {feiticos.map((item, i) => (
          <motion.div
            key={item.id}
            className="mystic-card p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(item)}
            style={{ borderColor: `${item.gradientTo}60` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${item.gradientFrom}60`, border: `1px solid ${item.gradientTo}40` }}
              >
                {item.icone}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-cinzel font-bold text-white text-sm">{item.titulo}</h3>
                <p style={{ color: '#c084fc', fontSize: 11 }} className="mt-0.5">Orixá: {item.orixaRelacionado}</p>
                <p className="text-xs mt-1 truncate" style={{ color: 'rgba(216,180,254,0.6)' }}>{item.objetivo}</p>
              </div>
              <span style={{ color: 'rgba(196,168,255,0.4)', fontSize: 20 }}>›</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 flex items-end justify-center"
            style={{ zIndex: 50 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative w-full max-w-[480px] max-h-[88vh] overflow-y-auto rounded-t-3xl"
              style={{
                background: `linear-gradient(180deg, ${selected.gradientFrom}ee 0%, #0d0626 50%)`,
                border: `1px solid ${selected.gradientTo}40`,
                borderBottom: 'none',
                zIndex: 51,
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
              </div>
              <div className="px-5 pb-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl">{selected.icone}</span>
                  <div>
                    <h2 className="font-cinzel font-bold text-white text-xl">{selected.titulo}</h2>
                    <p className="text-sm mt-0.5" style={{ color: '#c084fc' }}>Orixá: {selected.orixaRelacionado}</p>
                  </div>
                </div>

                <div className="ornament-divider text-xs">✦ OBJETIVO ✦</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#e9d5ff' }}>{selected.objetivo}</p>

                <div className="ornament-divider text-xs">✦ INGREDIENTES ✦</div>
                <ul className="space-y-2 mb-4">
                  {selected.ingredientes.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#e9d5ff' }}>
                      <span style={{ color: '#c084fc' }}>✦</span>{ing}
                    </li>
                  ))}
                </ul>

                <div className="ornament-divider text-xs">✦ MODO DE FAZER ✦</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#e9d5ff' }}>{selected.modo}</p>

                <div
                  className="rounded-2xl p-4 mt-2"
                  style={{ background: 'rgba(139,61,255,0.1)', border: '1px solid rgba(139,61,255,0.2)' }}
                >
                  <p className="font-cinzel text-xs font-bold mb-1" style={{ color: '#fbbf24' }}>⚠ Observações</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(233,213,255,0.7)' }}>{selected.observacoes}</p>
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
