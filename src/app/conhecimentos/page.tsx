'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { conhecimentos, Conhecimento } from '@/src/data/conhecimentos'
import PageHeader from '@/src/components/PageHeader'
import BottomNav from '@/src/components/BottomNav'

const categoriaColors: Record<string, string> = {
  'História': 'text-purple-300 border-purple-500/30 bg-purple-900/40',
  'Orixá': 'text-yellow-300 border-yellow-500/30 bg-yellow-900/40',
  'Ritual': 'text-pink-300 border-pink-500/30 bg-pink-900/40',
  'Ervas': 'text-green-300 border-green-500/30 bg-green-900/40',
  'Elementos': 'text-orange-300 border-orange-500/30 bg-orange-900/40',
}

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={i} className="font-cinzel font-bold text-purple-200 text-sm mt-4 mb-1">
          {line.replace(/\*\*/g, '')}
        </p>
      )
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="flex items-start gap-2 text-purple-200/80 text-sm ml-2">
          <span className="text-purple-400 mt-0.5">✦</span>
          {line.slice(2)}
        </li>
      )
    }
    if (line === '') return <br key={i} />
    return <p key={i} className="text-purple-200/80 text-sm leading-relaxed">{line}</p>
  })
}

export default function ConhecimentosPage() {
  const [selected, setSelected] = useState<Conhecimento | null>(null)

  return (
    <div className="mobile-container min-h-screen pb-24">
      <div className="stars-bg" />
      <div className="relative z-10">
        <PageHeader
          title="Conhecimentos"
          subtitle="Saberes da Umbanda"
          icon="📚"
        />

        <div className="px-4 pb-4 space-y-3">
          {conhecimentos.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(item)}
            >
              <div
                className="glass-card glass-card-hover p-4 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${item.gradientFrom}80 0%, ${item.gradientTo}60 100%)`,
                  borderColor: `${item.gradientTo}50`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${item.gradientFrom}80` }}
                  >
                    {item.icone}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-cinzel font-bold text-white text-sm">{item.titulo}</h3>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-cinzel ${categoriaColors[item.categoria] || ''}`}>
                      {item.categoria}
                    </span>
                    <p className="text-purple-200/50 text-xs mt-1.5 line-clamp-2">{item.resumo}</p>
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
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-cinzel ${categoriaColors[selected.categoria] || ''}`}>
                      {selected.categoria}
                    </span>
                  </div>
                </div>

                <p className="text-purple-300/70 text-sm mb-5 italic">{selected.resumo}</p>

                <div className="ornament-divider mb-4 text-purple-500/40 text-xs">✦ CONHECIMENTO ✦</div>

                <div className="space-y-1">
                  {renderContent(selected.conteudo)}
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
