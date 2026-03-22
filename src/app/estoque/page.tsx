'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { itensEstoque, ItemEstoque, getStatusEstoque, getResumoEstoque, StatusEstoque } from '@/src/data/estoque'
import PageHeader from '@/src/components/PageHeader'
import BottomNav from '@/src/components/BottomNav'

const statusConfig: Record<StatusEstoque, { label: string; color: string; bg: string; dot: string }> = {
  disponivel: {
    label: 'Disponível',
    color: 'text-green-400',
    bg: 'bg-green-900/30 border-green-500/30',
    dot: 'bg-green-400',
  },
  baixo: {
    label: 'Estoque Baixo',
    color: 'text-yellow-400',
    bg: 'bg-yellow-900/30 border-yellow-500/30',
    dot: 'bg-yellow-400',
  },
  esgotado: {
    label: 'Esgotado',
    color: 'text-red-400',
    bg: 'bg-red-900/30 border-red-500/30',
    dot: 'bg-red-400',
  },
}

const categorias = ['Todas', ...Array.from(new Set(itensEstoque.map(i => i.categoria)))]

export default function EstoquePage() {
  const [selected, setSelected] = useState<ItemEstoque | null>(null)
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')
  const [filtroStatus, setFiltroStatus] = useState<StatusEstoque | 'todos'>('todos')

  const resumo = getResumoEstoque()

  const itensFiltrados = itensEstoque.filter(item => {
    const matchCategoria = filtroCategoria === 'Todas' || item.categoria === filtroCategoria
    const matchStatus = filtroStatus === 'todos' || getStatusEstoque(item) === filtroStatus
    return matchCategoria && matchStatus
  })

  return (
    <div className="mobile-container min-h-screen pb-24">
      <div className="stars-bg" />
      <div className="relative z-10">
        <PageHeader
          title="Estoque"
          subtitle="Status dos Materiais Sagrados"
          icon="📦"
        />

        {/* Resumo */}
        <div className="px-4 mb-4">
          <div className="grid grid-cols-3 gap-2">
            <motion.button
              className={`glass-card p-3 text-center cursor-pointer transition-all ${filtroStatus === 'disponivel' ? 'border-green-500/60' : ''}`}
              onClick={() => setFiltroStatus(filtroStatus === 'disponivel' ? 'todos' : 'disponivel')}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xl font-bold text-green-400">{resumo.disponiveis}</div>
              <div className="text-[10px] text-green-400/70 font-cinzel">Disponíveis</div>
            </motion.button>
            <motion.button
              className={`glass-card p-3 text-center cursor-pointer transition-all ${filtroStatus === 'baixo' ? 'border-yellow-500/60' : ''}`}
              onClick={() => setFiltroStatus(filtroStatus === 'baixo' ? 'todos' : 'baixo')}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xl font-bold text-yellow-400">{resumo.baixos}</div>
              <div className="text-[10px] text-yellow-400/70 font-cinzel">Estoque Baixo</div>
            </motion.button>
            <motion.button
              className={`glass-card p-3 text-center cursor-pointer transition-all ${filtroStatus === 'esgotado' ? 'border-red-500/60' : ''}`}
              onClick={() => setFiltroStatus(filtroStatus === 'esgotado' ? 'todos' : 'esgotado')}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xl font-bold text-red-400">{resumo.esgotados}</div>
              <div className="text-[10px] text-red-400/70 font-cinzel">Esgotados</div>
            </motion.button>
          </div>
        </div>

        {/* Filtro por categoria */}
        <div className="px-4 mb-4 overflow-x-auto">
          <div className="flex gap-2 pb-1">
            {categorias.map(cat => (
              <motion.button
                key={cat}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-cinzel font-semibold transition-all ${
                  filtroCategoria === cat
                    ? 'bg-purple-600/70 text-white border border-purple-400/50'
                    : 'glass-card text-purple-300/70 border-purple-500/20'
                }`}
                onClick={() => setFiltroCategoria(cat)}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lista de itens */}
        <div className="px-4 space-y-3">
          <AnimatePresence>
            {itensFiltrados.map((item, i) => {
              const status = getStatusEstoque(item)
              const cfg = statusConfig[status]
              const pct = item.minimo > 0 ? Math.min(100, Math.round((item.quantidade / (item.minimo * 2)) * 100)) : 0

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
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
                        style={{ background: `${item.gradientFrom}80`, border: `1px solid ${item.gradientTo}40` }}
                      >
                        {item.icone}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-cinzel font-bold text-white text-sm truncate">{item.nome}</h3>
                          <span className={`flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${cfg.bg} ${cfg.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-purple-300/70 text-xs mt-0.5">{item.categoria}</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-[10px] text-purple-300/60 mb-1">
                            <span>{item.quantidade} {item.unidade}</span>
                            <span>Mín: {item.minimo}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                status === 'disponivel' ? 'bg-green-400' :
                                status === 'baixo' ? 'bg-yellow-400' : 'bg-red-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ delay: i * 0.05 + 0.3, duration: 0.6 }}
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-purple-400/50 text-lg flex-shrink-0">›</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {itensFiltrados.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-purple-400/50"
            >
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-cinzel text-sm">Nenhum item encontrado</p>
            </motion.div>
          )}
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
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              className="relative w-full max-w-sm glass-card rounded-t-3xl p-6 pb-10 mx-4 mb-0"
              style={{
                background: `linear-gradient(135deg, ${selected.gradientFrom}cc 0%, ${selected.gradientTo}99 100%)`,
                borderColor: `${selected.gradientTo}60`,
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-5" />

              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                  style={{ background: `${selected.gradientFrom}80`, border: `1px solid ${selected.gradientTo}40` }}
                >
                  {selected.icone}
                </div>
                <div>
                  <h2 className="font-cinzel text-xl font-bold text-white">{selected.nome}</h2>
                  <p className="text-purple-300/70 text-sm">{selected.categoria}</p>
                  {selected.orixaRelacionado && (
                    <p className="text-purple-400/60 text-xs mt-0.5">Orixá: {selected.orixaRelacionado}</p>
                  )}
                </div>
              </div>

              {(() => {
                const status = getStatusEstoque(selected)
                const cfg = statusConfig[status]
                const pct = selected.minimo > 0 ? Math.min(100, Math.round((selected.quantidade / (selected.minimo * 2)) * 100)) : 0
                return (
                  <>
                    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border mb-4 ${cfg.bg}`}>
                      <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${cfg.dot}`} />
                      <span className={`font-cinzel font-bold text-sm ${cfg.color}`}>{cfg.label}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="glass-card p-3 text-center rounded-xl">
                        <div className="text-2xl font-bold text-white">{selected.quantidade}</div>
                        <div className="text-xs text-purple-300/60">{selected.unidade}</div>
                        <div className="text-[10px] text-purple-400/50 mt-0.5">Em estoque</div>
                      </div>
                      <div className="glass-card p-3 text-center rounded-xl">
                        <div className="text-2xl font-bold text-purple-300">{selected.minimo}</div>
                        <div className="text-xs text-purple-300/60">{selected.unidade}</div>
                        <div className="text-[10px] text-purple-400/50 mt-0.5">Mínimo</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-purple-300/60 mb-1.5">
                        <span>Nível de estoque</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            status === 'disponivel' ? 'bg-gradient-to-r from-green-500 to-green-400' :
                            status === 'baixo' ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' :
                            'bg-gradient-to-r from-red-700 to-red-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </>
                )
              })()}

              <div className="glass-card p-3 rounded-xl">
                <p className="text-purple-200/70 text-sm leading-relaxed">{selected.descricao}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  )
}
