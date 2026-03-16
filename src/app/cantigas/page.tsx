'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cantigas, Cantiga } from '@/src/data/cantigas'
import PageHeader from '@/src/components/PageHeader'
import BottomNav from '@/src/components/BottomNav'

const tipoColors: Record<string, string> = {
  'Ponto Cantado': 'bg-purple-900/60 text-purple-300 border-purple-500/30',
  'Ponto Riscado': 'bg-blue-900/60 text-blue-300 border-blue-500/30',
  'Oração': 'bg-yellow-900/60 text-yellow-300 border-yellow-500/30',
}

export default function CantigasPage() {
  const [selected, setSelected] = useState<Cantiga | null>(null)

  return (
    <div className="mobile-container min-h-screen pb-24">
      <div className="stars-bg" />
      <div className="relative z-10">
        <PageHeader
          title="Cantigas"
          subtitle="Pontos Cantados & Orações"
          icon="🎵"
        />

        <div className="px-4 pb-4 space-y-3">
          {cantigas.map((cantiga, i) => (
            <motion.div
              key={cantiga.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(cantiga)}
            >
              <div
                className="glass-card glass-card-hover p-4 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${cantiga.gradientFrom}80 0%, ${cantiga.gradientTo}60 100%)`,
                  borderColor: `${cantiga.gradientTo}50`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${cantiga.gradientFrom}80` }}
                  >
                    {cantiga.icone}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-cinzel font-bold text-white text-sm">{cantiga.titulo}</h3>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-cinzel ${tipoColors[cantiga.tipo] || tipoColors['Ponto Cantado']}`}>
                      {cantiga.tipo}
                    </span>
                    <p className="text-purple-300/70 text-xs mt-1.5 truncate">{cantiga.descricao}</p>
                    <p className="text-purple-400/50 text-xs mt-0.5">Orixá: {cantiga.orixaRelacionado}</p>
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
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
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
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <div className="px-5 pb-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{selected.icone}</span>
                  <div>
                    <h2 className="font-cinzel font-bold text-white text-xl">{selected.titulo}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-cinzel ${tipoColors[selected.tipo] || ''}`}>
                        {selected.tipo}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-purple-300/70 text-sm mb-4">{selected.descricao}</p>
                <p className="text-purple-400/60 text-xs mb-4 font-cinzel">Orixá: {selected.orixaRelacionado}</p>

                <div className="ornament-divider mb-4 text-purple-500/40 text-xs">✦ LETRA ✦</div>

                <div
                  className="glass-card p-5 rounded-2xl"
                  style={{ borderColor: `${selected.gradientTo}30` }}
                >
                  <pre className="text-purple-100 text-sm leading-loose whitespace-pre-wrap font-lato italic">
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
