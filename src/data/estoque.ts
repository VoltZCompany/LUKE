export type StatusEstoque = 'disponivel' | 'baixo' | 'esgotado'

export interface ItemEstoque {
  id: string
  nome: string
  categoria: string
  quantidade: number
  unidade: string
  minimo: number
  icone: string
  cor: string
  gradientFrom: string
  gradientTo: string
  descricao: string
  orixaRelacionado?: string
}

export const itensEstoque: ItemEstoque[] = [
  {
    id: '1',
    nome: 'Vela Branca',
    categoria: 'Velas',
    quantidade: 48,
    unidade: 'unidades',
    minimo: 20,
    icone: '🕯️',
    cor: '#F5F5DC',
    gradientFrom: '#4a4000',
    gradientTo: '#6b5900',
    descricao: 'Vela branca para rituais de Oxalá e purificação',
    orixaRelacionado: 'Oxalá',
  },
  {
    id: '2',
    nome: 'Vela Vermelha',
    categoria: 'Velas',
    quantidade: 12,
    unidade: 'unidades',
    minimo: 15,
    icone: '🕯️',
    cor: '#FF4444',
    gradientFrom: '#6b0000',
    gradientTo: '#8b0000',
    descricao: 'Vela vermelha para rituais de Xangô e proteção',
    orixaRelacionado: 'Xangô',
  },
  {
    id: '3',
    nome: 'Alecrim',
    categoria: 'Ervas',
    quantidade: 0,
    unidade: 'maços',
    minimo: 5,
    icone: '🌿',
    cor: '#4CAF50',
    gradientFrom: '#1b4332',
    gradientTo: '#2d6a4f',
    descricao: 'Erva de proteção e limpeza espiritual',
    orixaRelacionado: 'Ogum',
  },
  {
    id: '4',
    nome: 'Arruda',
    categoria: 'Ervas',
    quantidade: 8,
    unidade: 'maços',
    minimo: 5,
    icone: '🌿',
    cor: '#66BB6A',
    gradientFrom: '#1b4332',
    gradientTo: '#40916c',
    descricao: 'Erva sagrada para banhos de limpeza e proteção',
    orixaRelacionado: 'Exu',
  },
  {
    id: '5',
    nome: 'Mel Puro',
    categoria: 'Oferendas',
    quantidade: 6,
    unidade: 'frascos',
    minimo: 3,
    icone: '🍯',
    cor: '#FFC107',
    gradientFrom: '#7b4a00',
    gradientTo: '#a05c00',
    descricao: 'Mel puro para trabalhos de Oxum e prosperidade',
    orixaRelacionado: 'Oxum',
  },
  {
    id: '6',
    nome: 'Sal Grosso',
    categoria: 'Ingredientes',
    quantidade: 3,
    unidade: 'kg',
    minimo: 5,
    icone: '🧂',
    cor: '#B0BEC5',
    gradientFrom: '#263238',
    gradientTo: '#37474f',
    descricao: 'Sal grosso para banhos de descarrego e proteção',
  },
  {
    id: '7',
    nome: 'Incenso de Sândalo',
    categoria: 'Incensos',
    quantidade: 25,
    unidade: 'varetas',
    minimo: 20,
    icone: '🪔',
    cor: '#A1887F',
    gradientFrom: '#3e2723',
    gradientTo: '#5d4037',
    descricao: 'Incenso de sândalo para meditação e rituais sagrados',
    orixaRelacionado: 'Oxalá',
  },
  {
    id: '8',
    nome: 'Vela Azul',
    categoria: 'Velas',
    quantidade: 0,
    unidade: 'unidades',
    minimo: 10,
    icone: '🕯️',
    cor: '#2196F3',
    gradientFrom: '#0d2137',
    gradientTo: '#1565c0',
    descricao: 'Vela azul para rituais de Iemanjá e paz',
    orixaRelacionado: 'Iemanjá',
  },
  {
    id: '9',
    nome: 'Canela em Pó',
    categoria: 'Ingredientes',
    quantidade: 4,
    unidade: 'pacotes',
    minimo: 3,
    icone: '🫙',
    cor: '#8D6E63',
    gradientFrom: '#4e342e',
    gradientTo: '#6d4c41',
    descricao: 'Canela para trabalhos de prosperidade e amor',
    orixaRelacionado: 'Oxum',
  },
  {
    id: '10',
    nome: 'Manjericão',
    categoria: 'Ervas',
    quantidade: 2,
    unidade: 'maços',
    minimo: 5,
    icone: '🌿',
    cor: '#81C784',
    gradientFrom: '#1b4332',
    gradientTo: '#2d6a4f',
    descricao: 'Erva sagrada para abundância e bênçãos do lar',
    orixaRelacionado: 'Oxalá',
  },
]

export function getStatusEstoque(item: ItemEstoque): StatusEstoque {
  if (item.quantidade === 0) return 'esgotado'
  if (item.quantidade < item.minimo) return 'baixo'
  return 'disponivel'
}

export function getResumoEstoque() {
  const total = itensEstoque.length
  const disponiveis = itensEstoque.filter(i => getStatusEstoque(i) === 'disponivel').length
  const baixos = itensEstoque.filter(i => getStatusEstoque(i) === 'baixo').length
  const esgotados = itensEstoque.filter(i => getStatusEstoque(i) === 'esgotado').length
  return { total, disponiveis, baixos, esgotados }
}
