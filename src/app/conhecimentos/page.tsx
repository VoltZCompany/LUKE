'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { conhecimentos, Conhecimento } from '@/src/data/conhecimentos'
import PageHeader from '@/src/components/PageHeader'
import BottomNav from '@/src/components/BottomNav'

const catStyle: Record<string, { color: string; bg: string }> = {
  'História':   { color: '#c084fc', bg: 'rgba(139,61,255,0.2)' },
  'Orixá':      { color: '#fbbf24', bg: 'rgba(180,130,0,0.2)' },
  'Ritual':     { color: '#f472b6', bg: 'rgba(180,50,100,0.2)' },
  'Ervas':      { color: '#4ade80', bg: 'rgba(30,100,50,0.2)' },
  'Elementos':  { color: '#fb923c', bg: 'rgba(180,80,0,0.2)' },
}

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-cinzel font-bold text-sm mt-4 mb-1" style={{ color: '#c084fc' }}>{line.replace(/\*\*/g, '')}</p>
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="flex items-start gap-2 text-sm ml-2" style={{ color: 'rgba(233,213,255,0.8)' }}>
          <span style={{ color: '#c084fc' }}>✦</span>{line.slice(2)}
        </li>
      )
    }
    if (line === '') return <br key={i} />
    return <p key={i} className="text-sm leading-relaxed" style={{ color: 'rgba(233,213,255,0.8)' }}>{line}</p>
  })
}

export default function ConhecimentosPage() {
  const [selected, setSelected] = useState<Conhecimento | null>(null)

  return (
    <div className="mobile-container min-h-screen pb-28">
      <PageHeader title="Conhecimentos" subtitle="Saberes da Umbanda" icon="📚" />

      <div className="px-4 pb-4 space-y-3">
        {conhecimentos.map((item, i) => {
          const cs = catStyle[item.categoria] || catStyle['História']
          return (
            <motion.div
              key={item.id}
              className="mystic-card p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(item)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${item.gradientFrom}60` }}
                >
                  {item.icone}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-cinzel font-bold text-white text-sm">{item.titulo}</h3>
                  <span className="tipo-badge mt-1" style={{ color: cs.color, background: cs.bg, borderColor: cs.color + '50' }}>
                    {item.categoria}
                  </span>
                  <p className="text-xs mt-1.5 line-clamp-2" style={{ color: 'rgba(216,180,254,0.6)' }}>{item.resumo}</p>
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
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{selected.icone}</span>
                  <div>
                    <h2 className="font-cinzel font-bold text-white text-xl">{selected.titulo}</h2>
                    <span
                      className="tipo-badge mt-1"
                      style={{
                        color: catStyle[selected.categoria]?.color || '#c084fc',
                        background: catStyle[selected.categoria]?.bg || 'rgba(139,61,255,0.2)',
                        borderColor: (catStyle[selected.categoria]?.color || '#c084fc') + '50',
                      }}
                    >
                      {selected.categoria}
                    </span>
                  </div>
                </div>

                <p className="text-sm italic mb-4" style={{ color: 'rgba(196,168,255,0.7)' }}>{selected.resumo}</p>

                <div className="ornament-divider text-xs">✦ CONHECIMENTO ✦</div>

                <div className="space-y-1 mt-2">{renderContent(selected.conteudo)}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  )
}
