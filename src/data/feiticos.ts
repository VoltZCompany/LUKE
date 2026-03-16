export interface Feitico {
  id: string;
  titulo: string;
  orixaRelacionado: string;
  objetivo: string;
  ingredientes: string[];
  modo: string;
  observacoes: string;
  cor: string;
  gradientFrom: string;
  gradientTo: string;
  icone: string;
}

export const feiticos: Feitico[] = [
  {
    id: '1',
    titulo: 'Banho de Descarrego',
    orixaRelacionado: 'Ogum',
    objetivo: 'Limpeza espiritual e proteção contra energias negativas',
    ingredientes: ['Alecrim (3 galhos)', 'Arruda (3 folhas)', 'Sal grosso (1 colher)', 'Água de rio ou nascente', 'Vela branca'],
    modo: 'Ferva as ervas em água por 10 minutos. Deixe esfriar. Após o banho normal, despeje o líquido da cabeça para baixo, pedindo proteção a Ogum. Acenda a vela branca e ore por 7 minutos.',
    observacoes: 'Realizar às sextas-feiras pela manhã. O banho deve ser feito com fé e concentração.',
    cor: '#4A90D9',
    gradientFrom: '#1a237e',
    gradientTo: '#283593',
    icone: '🛡️',
  },
  {
    id: '2',
    titulo: 'Trabalho de Prosperidade',
    orixaRelacionado: 'Oxalá',
    objetivo: 'Atrair abundância, prosperidade e paz ao lar',
    ingredientes: ['Mel puro (3 colheres)', 'Canela em pó', 'Moeda de ouro ou prata', 'Vela branca', 'Manjericão', 'Água benta'],
    modo: 'Em um prato branco, coloque o mel, a canela e a moeda. Acenda a vela branca ao lado. Recite sua prece a Oxalá 3 vezes pedindo bênçãos. Deixe a vela consumir-se. Enterre os restos em terra limpa.',
    observacoes: 'Realizar aos domingos, preferencialmente ao amanhecer. Mantenha pensamentos positivos durante todo o ritual.',
    cor: '#F5F5DC',
    gradientFrom: '#4a4000',
    gradientTo: '#6b5900',
    icone: '✨',
  },
  {
    id: '3',
    titulo: 'Proteção do Lar',
    orixaRelacionado: 'Iemanjá',
    objetivo: 'Proteger a casa e os familiares de influências negativas',
    ingredientes: ['Sal grosso', 'Alho (7 dentes)', 'Arruda (7 folhas)', 'Vela azul', 'Água do mar ou com sal'],
    modo: 'Coloque o sal grosso nos quatro cantos da casa. Pendure um ramo de arruda com alho na entrada principal. Acenda a vela azul no centro da casa pedindo proteção a Iemanjá. Aspeje água salgada em todos os cômodos.',
    observacoes: 'Renovar a cada lua nova. Iemanjá é mãe protetora e ouvirá sua prece com amor.',
    cor: '#87CEEB',
    gradientFrom: '#003d6b',
    gradientTo: '#005082',
    icone: '🌊',
  },
  {
    id: '4',
    titulo: 'Abertura de Caminhos',
    orixaRelacionado: 'Exu',
    objetivo: 'Remover obstáculos e abrir novos caminhos na vida',
    ingredientes: ['Vela preta e vermelha', 'Cachaça', 'Charuto', 'Mel', 'Farofa', 'Moedas'],
    modo: 'Prepare uma encruzilhada simbolicamente. Ofereça a Exu com respeito e firmeza. Acenda as velas. Peça a abertura dos seus caminhos com palavras claras e sinceras.',
    observacoes: 'Exu é o mensageiro e guardião das encruzilhadas. Aborde-o sempre com respeito. Realizar às segundas-feiras ou sextas à meia-noite.',
    cor: '#8B0000',
    gradientFrom: '#4a0000',
    gradientTo: '#6b0000',
    icone: '🔑',
  },
  {
    id: '5',
    titulo: 'Cura e Saúde',
    orixaRelacionado: 'Omulu',
    objetivo: 'Cura de doenças e proteção da saúde',
    ingredientes: ['Pipoca branca', 'Azeite de dendê', 'Vela roxa e preta', 'Ervas medicinais', 'Água de chuva'],
    modo: 'Prepare a pipoca sem sal e sem óleo. Espalhe-a em volta do enfermo ou do seu próprio corpo. Acenda as velas e peça cura a Omulu com muita fé. Ao final, recolha a pipoca e enterre-a em terra.',
    observacoes: 'Omulu é o senhor da cura e das doenças. Abordá-lo com humildade e respeito. Este ritual complementa tratamentos médicos convencionais.',
    cor: '#4B0082',
    gradientFrom: '#2d0058',
    gradientTo: '#4b0082',
    icone: '🌿',
  },
  {
    id: '6',
    titulo: 'Amor e Harmonização',
    orixaRelacionado: 'Oxum',
    objetivo: 'Atrair o amor verdadeiro e harmonizar relacionamentos',
    ingredientes: ['Mel (7 colheres)', 'Pétalas de rosa amarela', 'Vela amarela e dourada', 'Espelho pequeno', 'Perfume floral', 'Moedas douradas'],
    modo: 'Em frente a um espelho, coloque o mel, as pétalas e as moedas. Acenda as velas e observe seu reflexo com amor próprio. Peça a Oxum que abençoe seu coração e atraia o amor que merece.',
    observacoes: 'Oxum rege o amor, a beleza e as águas doces. Realizar às sextas-feiras. Use roupas douradas ou amarelas.',
    cor: '#FFD700',
    gradientFrom: '#4a3000',
    gradientTo: '#6b4a00',
    icone: '💛',
  },
];
