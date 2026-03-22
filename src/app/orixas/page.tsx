'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { orixas, Orixa } from '@/src/data/orixas'
import PageHeader from '@/src/components/PageHeader'
import BottomNav from '@/src/components/BottomNav'

export default function OrixasPage() {
  const [selected, setSelected] = useState<Orixa | null>(null)

  return (
    <div className="mobile-container min-h-screen pb-24">
      <div className="stars-bg" />
      <div className="relative z-10">
        <PageHeader
          title="Orixás"
          subtitle="As Divindades da Umbanda"
          icon="⭐"
        />

        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {orixas.map((orixa, i) => (
              <motion.div
                key={orixa.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07, duration: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(orixa)}
              >
                <div
                  className="glass-card cursor-pointer p-4 flex flex-col items-center gap-2 text-center transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${orixa.gradientFrom}90 0%, ${orixa.gradientTo}70 100%)`,
                    borderColor: `${orixa.corHex}30`,
                  }}
                >
                  <motion.div
                    className="text-4xl"
                    animate={{
                      filter: [
                        `drop-shadow(0 0 4px ${orixa.corHex}60)`,
                        `drop-shadow(0 0 12px ${orixa.corHex}90)`,
                        `drop-shadow(0 0 4px ${orixa.corHex}60)`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {orixa.icone}
                  </motion.div>
                  <div>
                    <h3 className="font-cinzel font-bold text-white text-sm">{orixa.nome}</h3>
                    <p className="text-[11px] mt-0.5" style={{ color: `${orixa.corHex}cc` }}>{orixa.titulo}</p>
                  </div>
                  <div className="glass-card px-2 py-0.5 mt-1" style={{ borderColor: `${orixa.corHex}20` }}>
                    <p className="text-[10px] font-cinzel" style={{ color: `${orixa.corHex}aa` }}>
                      {orixa.saudacao}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative w-full max-w-[480px] max-h-[88vh] overflow-y-auto rounded-t-3xl"
              style={{
                background: `linear-gradient(180deg, ${selected.gradientFrom} 0%, #0d0626 35%)`,
                border: `1px solid ${selected.corHex}20`,
                borderBottom: 'none',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <div className="px-5 pb-10">
                {/* Orixa header */}
                <div className="flex items-center gap-4 mb-5">
                  <motion.div
                    className="text-6xl"
                    animate={{
                      filter: [
                        `drop-shadow(0 0 8px ${selected.corHex}60)`,
                        `drop-shadow(0 0 24px ${selected.corHex}90)`,
                        `drop-shadow(0 0 8px ${selected.corHex}60)`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {selected.icone}
                  </motion.div>
                  <div>
                    <h2 className="font-cinzel font-bold text-white text-2xl">{selected.nome}</h2>
                    <p className="text-sm mt-0.5" style={{ color: `${selected.corHex}cc` }}>{selected.titulo}</p>
                    <p className="font-cinzel text-xs mt-1 italic" style={{ color: `${selected.corHex}80` }}>
                      {selected.saudacao}
                    </p>
                  </div>
                </div>

                {/* Info pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { label: 'Elemento', value: selected.elemento },
                    { label: 'Dia', value: selected.dia },
                    { label: 'Número', value: String(selected.numero) },
                    { label: 'Cores', value: selected.cores.join(', ') },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="glass-card px-3 py-1.5"
                      style={{ borderColor: `${selected.corHex}20` }}
                    >
                      <span className="text-[10px] font-cinzel" style={{ color: `${selected.corHex}80` }}>
                        {item.label}:{' '}
                      </span>
                      <span className="text-xs text-white">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="ornament-divider mb-3 text-purple-500/40 text-xs">✦ SOBRE ✦</div>
                <p className="text-purple-200 text-sm leading-relaxed mb-5">{selected.descricao}</p>

                <div className="ornament-divider mb-3 text-purple-500/40 text-xs">✦ OFERENDAS ✦</div>
                <ul className="space-y-2">
                  {selected.oferendas.map((o, i) => (
                    <li key={i} className="flex items-center gap-2 text-purple-200 text-sm">
                      <span style={{ color: selected.corHex }}>✦</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  )
}
