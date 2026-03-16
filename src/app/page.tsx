'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Types ───────────────────────────────────────────────
type ID = string
const uid = () => Math.random().toString(36).slice(2)

interface Entry {
  id: ID
  titulo: string
  conteudo: string
  createdAt: number
}

interface Afazer {
  id: ID
  texto: string
  feito: boolean
  createdAt: number
}

type Tab = 'cantigas' | 'feiticos' | 'conhecimentos' | 'afazeres'

// ─── Storage helpers ──────────────────────────────────────
function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback }
  catch { return fallback }
}
function save(key: string, val: unknown) {
  localStorage.setItem(key, JSON.stringify(val))
}

// ─── Icons (inline SVG strings as components) ─────────────
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
)
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

// ─── Tab config ───────────────────────────────────────────
const TABS: { key: Tab; label: string }[] = [
  { key: 'cantigas',       label: 'Cantigas' },
  { key: 'feiticos',       label: 'Feitiços' },
  { key: 'conhecimentos',  label: 'Conhecimentos' },
  { key: 'afazeres',       label: 'Afazeres' },
]

// ─── Entry form ───────────────────────────────────────────
function EntryForm({ onSave, initial }: {
  onSave: (titulo: string, conteudo: string) => void
  initial?: Entry
}) {
  const [titulo, setTitulo] = useState(initial?.titulo ?? '')
  const [conteudo, setConteudo] = useState(initial?.conteudo ?? '')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!titulo.trim()) return
    onSave(titulo.trim(), conteudo.trim())
    if (!initial) { setTitulo(''); setConteudo('') }
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        placeholder="Título"
        required
      />
      <textarea
        value={conteudo}
        onChange={e => setConteudo(e.target.value)}
        placeholder="Conteúdo..."
        rows={4}
      />
      <button type="submit" style={styles.btnPrimary}>
        {initial ? 'Salvar' : <><PlusIcon /> Adicionar</>}
      </button>
    </form>
  )
}

// ─── Entry card ───────────────────────────────────────────
function EntryCard({ entry, onDelete, onEdit }: {
  entry: Entry
  onDelete: () => void
  onEdit: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={styles.card}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', gap: 8 }}
        onClick={() => setExpanded(x => !x)}
      >
        <span style={{ fontWeight: 500, color: '#e0e0e0', lineHeight: 1.4 }}>{entry.titulo}</span>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginTop: 1 }}>
          <button onClick={e => { e.stopPropagation(); onEdit() }} style={styles.iconBtn} title="Editar">
            <EditIcon />
          </button>
          <button onClick={e => { e.stopPropagation(); onDelete() }} style={{ ...styles.iconBtn, color: '#666' }} title="Deletar">
            <TrashIcon />
          </button>
        </div>
      </div>
      {expanded && entry.conteudo && (
        <p style={{ marginTop: 10, color: '#888', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', borderTop: '1px solid #1e1e1e', paddingTop: 10 }}>
          {entry.conteudo}
        </p>
      )}
    </div>
  )
}

// ─── Afazeres tab ─────────────────────────────────────────
function AfazeresTab() {
  const [items, setItems] = useState<Afazer[]>([])
  const [texto, setTexto] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setItems(load('afazeres', [])) }, [])
  useEffect(() => { save('afazeres', items) }, [items])

  function add(e: React.FormEvent) {
    e.preventDefault()
    if (!texto.trim()) return
    setItems(prev => [{ id: uid(), texto: texto.trim(), feito: false, createdAt: Date.now() }, ...prev])
    setTexto('')
    inputRef.current?.focus()
  }

  function toggle(id: ID) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, feito: !i.feito } : i))
  }

  function remove(id: ID) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function clearDone() {
    setItems(prev => prev.filter(i => !i.feito))
  }

  const pending = items.filter(i => !i.feito)
  const done = items.filter(i => i.feito)

  return (
    <div>
      <form onSubmit={add} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input ref={inputRef} value={texto} onChange={e => setTexto(e.target.value)} placeholder="Nova tarefa..." />
        <button type="submit" style={{ ...styles.btnPrimary, width: 'auto', padding: '0 14px', flexShrink: 0 }}>
          <PlusIcon />
        </button>
      </form>

      {items.length === 0 && <p style={styles.empty}>Nenhuma tarefa.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {pending.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => toggle(item.id)} style={{ ...styles.checkbox }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid #444', flexShrink: 0 }} />
              </button>
              <span style={{ flex: 1, color: '#d4d4d4', fontSize: 14 }}>{item.texto}</span>
              <button onClick={() => remove(item.id)} style={{ ...styles.iconBtn, color: '#444' }}>
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {done.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: '#444', textTransform: 'uppercase', letterSpacing: 1 }}>Concluídos ({done.length})</span>
            <button onClick={clearDone} style={{ fontSize: 11, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>
              Limpar
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {done.map(item => (
              <div key={item.id} style={{ ...styles.card, opacity: 0.45 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => toggle(item.id)} style={styles.checkbox}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: '#333', border: '1.5px solid #444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckIcon />
                    </div>
                  </button>
                  <span style={{ flex: 1, color: '#666', fontSize: 14, textDecoration: 'line-through' }}>{item.texto}</span>
                  <button onClick={() => remove(item.id)} style={{ ...styles.iconBtn, color: '#444' }}>
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Entries tab ──────────────────────────────────────────
function EntriesTab({ storageKey }: { storageKey: string }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [editing, setEditing] = useState<Entry | null>(null)
  const [adding, setAdding] = useState(false)

  useEffect(() => { setEntries(load(storageKey, [])) }, [storageKey])
  useEffect(() => { save(storageKey, entries) }, [storageKey, entries])

  function addEntry(titulo: string, conteudo: string) {
    setEntries(prev => [{ id: uid(), titulo, conteudo, createdAt: Date.now() }, ...prev])
    setAdding(false)
  }

  function saveEdit(titulo: string, conteudo: string) {
    if (!editing) return
    setEntries(prev => prev.map(e => e.id === editing.id ? { ...e, titulo, conteudo } : e))
    setEditing(null)
  }

  function remove(id: ID) {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div>
      {/* Add button or form */}
      {!adding && !editing && (
        <button onClick={() => setAdding(true)} style={{ ...styles.btnGhost, marginBottom: 16 }}>
          <PlusIcon /> Nova entrada
        </button>
      )}

      {adding && (
        <div style={{ ...styles.card, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>Nova entrada</span>
            <button onClick={() => setAdding(false)} style={{ ...styles.iconBtn, color: '#555' }}>✕</button>
          </div>
          <EntryForm onSave={addEntry} />
        </div>
      )}

      {editing && (
        <div style={{ ...styles.card, marginBottom: 16, borderColor: '#333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>Editando</span>
            <button onClick={() => setEditing(null)} style={{ ...styles.iconBtn, color: '#555' }}>✕</button>
          </div>
          <EntryForm onSave={saveEdit} initial={editing} />
        </div>
      )}

      {entries.length === 0 && !adding && (
        <p style={styles.empty}>Nenhuma entrada ainda.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map(entry => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onDelete={() => remove(entry.id)}
            onEdit={() => { setEditing(entry); setAdding(false) }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState<Tab>('cantigas')

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100dvh', display: 'flex', flexDirection: 'column', padding: '0 0 80px' }}>
      {/* Header */}
      <div style={{ padding: '24px 16px 0', borderBottom: '1px solid #1a1a1a' }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: '#e0e0e0', letterSpacing: '-0.3px', marginBottom: 16 }}>
          Grimório
        </h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: tab === t.key ? 600 : 400,
                color: tab === t.key ? '#e0e0e0' : '#555',
                borderBottom: tab === t.key ? '2px solid #e0e0e0' : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px 16px' }}>
        {tab === 'afazeres' ? (
          <AfazeresTab />
        ) : (
          <EntriesTab storageKey={tab} />
        )}
      </div>
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────
const styles = {
  card: {
    background: '#141414',
    border: '1px solid #1e1e1e',
    borderRadius: 10,
    padding: '12px 14px',
  } as React.CSSProperties,
  btnPrimary: {
    background: '#1e1e1e',
    border: '1px solid #2a2a2a',
    borderRadius: 8,
    color: '#d4d4d4',
    padding: '9px 14px',
    fontSize: 13,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    width: '100%',
    justifyContent: 'center',
    transition: 'background 0.15s',
  } as React.CSSProperties,
  btnGhost: {
    background: 'none',
    border: '1px dashed #2a2a2a',
    borderRadius: 8,
    color: '#555',
    padding: '9px 14px',
    fontSize: 13,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    width: '100%',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.15s, color 0.15s',
  } as React.CSSProperties,
  iconBtn: {
    background: 'none',
    border: 'none',
    color: '#555',
    padding: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'color 0.15s',
  } as React.CSSProperties,
  checkbox: {
    background: 'none',
    border: 'none',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  } as React.CSSProperties,
  empty: {
    color: '#3a3a3a',
    fontSize: 13,
    textAlign: 'center' as const,
    paddingTop: 40,
  },
}
