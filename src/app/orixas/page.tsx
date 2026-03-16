'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { orixas, Orixa } from '@/src/data/orixas'
import PageHeader from '@/src/components/PageHeader'
import BottomNav from '@/src/components/BottomNav'

export default function OrixasPage() {
  const [selected, setSelected] = useState<Orixa | null>(null)

  return (
    <div className="mobile-container min-h-screen pb-28">
      <PageHeader title="Orixás" subtitle="As Divindades da Umbanda" icon="⭐" />

      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        {orixas.map((item, i) => (
          <motion.div
            key={item.id}
            className="rounded-2xl p-4 flex flex-col items-center gap-2 text-center cursor-pointer"
            style={{
              background: `${item.gradientFrom}cc`,
              border: `1px solid ${item.corHex}35`,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, type: 'spring' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(item)}
          >
            <motion.span
              className="text-4xl"
              animate={{
                filter: [
                  `drop-shadow(0 0 4px ${item.corHex}60)`,
                  `drop-shadow(0 0 14px ${item.corHex}95)`,
                  `drop-shadow(0 0 4px ${item.corHex}60)`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            >
              {item.icone}
            </motion.span>
            <div>
              <p className="font-cinzel font-bold text-white text-sm">{item.nome}</p>
              <p className="text-xs mt-0.5" style={{ color: item.corHex + 'cc' }}>{item.titulo}</p>
            </div>
            <span
              className="font-cinzel text-[10px] italic px-2 py-0.5 rounded-full"
              style={{ color: item.corHex + 'aa', background: item.corHex + '15', border: `1px solid ${item.corHex}25` }}
            >
              {item.saudacao}
            </span>
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
                background: `linear-gradient(180deg, ${selected.gradientFrom} 0%, #0d0626 45%)`,
                border: `1px solid ${selected.corHex}25`,
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
                <div className="flex items-center gap-4 mb-5">
                  <motion.span
                    className="text-6xl"
                    animate={{
                      filter: [`drop-shadow(0 0 8px ${selected.corHex}60)`, `drop-shadow(0 0 24px ${selected.corHex}95)`, `drop-shadow(0 0 8px ${selected.corHex}60)`],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {selected.icone}
                  </motion.span>
                  <div>
                    <h2 className="font-cinzel font-bold text-white text-2xl">{selected.nome}</h2>
                    <p className="text-sm mt-0.5" style={{ color: selected.corHex + 'cc' }}>{selected.titulo}</p>
                    <p className="font-cinzel text-xs mt-1 italic" style={{ color: selected.corHex + '80' }}>{selected.saudacao}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { l: 'Elemento', v: selected.elemento },
                    { l: 'Dia', v: selected.dia },
                    { l: 'Número', v: String(selected.numero) },
                    { l: 'Cores', v: selected.cores.join(', ') },
                  ].map(({ l, v }) => (
                    <div key={l} className="px-3 py-1.5 rounded-xl" style={{ background: selected.corHex + '15', border: `1px solid ${selected.corHex}25` }}>
                      <span className="text-[10px] font-cinzel" style={{ color: selected.corHex + '80' }}>{l}: </span>
                      <span className="text-xs text-white">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="ornament-divider text-xs">✦ SOBRE ✦</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#e9d5ff' }}>{selected.descricao}</p>

                <div className="ornament-divider text-xs">✦ OFERENDAS ✦</div>
                <ul className="space-y-2">
                  {selected.oferendas.map((o, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#e9d5ff' }}>
                      <span style={{ color: selected.corHex }}>✦</span>{o}
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
