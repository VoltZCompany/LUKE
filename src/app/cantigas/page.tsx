'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cantigas, Cantiga } from '@/src/data/cantigas'
import PageHeader from '@/src/components/PageHeader'
import BottomNav from '@/src/components/BottomNav'

const tipoStyle: Record<string, { color: string; bg: string }> = {
  'Ponto Cantado': { color: '#c084fc', bg: 'rgba(139,61,255,0.2)' },
  'Ponto Riscado':  { color: '#67e8f9', bg: 'rgba(0,180,216,0.2)' },
  'Oração':         { color: '#fbbf24', bg: 'rgba(180,130,0,0.2)' },
}

export default function CantigasPage() {
  const [selected, setSelected] = useState<Cantiga | null>(null)

  return (
    <div className="mobile-container min-h-screen pb-28">
      <PageHeader title="Cantigas" subtitle="Pontos Cantados & Orações" icon="🎵" />

      <div className="px-4 pb-4 space-y-3">
        {cantigas.map((item, i) => {
          const ts = tipoStyle[item.tipo] || tipoStyle['Ponto Cantado']
          return (
            <motion.div
              key={item.id}
              className="mystic-card p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(item)}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${item.gradientFrom}60` }}
                >
                  {item.icone}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-cinzel font-bold text-white text-sm">{item.titulo}</h3>
                  <span
                    className="tipo-badge mt-1"
                    style={{ color: ts.color, background: ts.bg, borderColor: ts.color + '50' }}
                  >
                    {item.tipo}
                  </span>
                  <p className="text-xs mt-1.5 truncate" style={{ color: 'rgba(216,180,254,0.6)' }}>{item.descricao}</p>
                </div>
                <span style={{ color: 'rgba(196,168,255,0.4)', fontSize: 20, flexShrink: 0 }}>›</span>
              </div>
            </motion.div>
          )
        })}
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
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{selected.icone}</span>
                  <div>
                    <h2 className="font-cinzel font-bold text-white text-xl">{selected.titulo}</h2>
                    <span
                      className="tipo-badge mt-1"
                      style={{
                        color: tipoStyle[selected.tipo]?.color || '#c084fc',
                        background: tipoStyle[selected.tipo]?.bg || 'rgba(139,61,255,0.2)',
                        borderColor: (tipoStyle[selected.tipo]?.color || '#c084fc') + '50',
                      }}
                    >
                      {selected.tipo}
                    </span>
                  </div>
                </div>

                <p className="text-sm mb-2" style={{ color: 'rgba(196,168,255,0.7)' }}>{selected.descricao}</p>
                <p className="font-cinzel text-xs mb-4" style={{ color: 'rgba(196,168,255,0.5)' }}>Orixá: {selected.orixaRelacionado}</p>

                <div className="ornament-divider text-xs">✦ LETRA ✦</div>

                <div
                  className="rounded-2xl p-5 mt-1"
                  style={{ background: 'rgba(139,61,255,0.08)', border: '1px solid rgba(139,61,255,0.2)' }}
                >
                  <pre className="text-sm leading-8 whitespace-pre-wrap font-lato italic" style={{ color: '#e9d5ff' }}>
                    {selected.letra}
                  </pre>
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
