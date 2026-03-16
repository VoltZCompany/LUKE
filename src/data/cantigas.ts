export interface Cantiga {
  id: string;
  titulo: string;
  letra: string;
  orixaRelacionado: string;
  tipo: 'Ponto Cantado' | 'Ponto Riscado' | 'Oração';
  descricao: string;
  gradientFrom: string;
  gradientTo: string;
  icone: string;
}

export const cantigas: Cantiga[] = [
  {
    id: '1',
    titulo: 'Salve Ogum',
    orixaRelacionado: 'Ogum',
    tipo: 'Ponto Cantado',
    descricao: 'Ponto de abertura para Ogum, o guerreiro que abre caminhos',
    letra: `Ogum, Ogum, Ogum iê
Ogum guerreiro, senhor da batalha
Ogum de lei, vem nos proteger
Com sua espada, mal nenhum nos atalha

Ogum, Ogum, salve Ogum!
Abre os caminhos por onde eu vou
Ogum, Ogum, guerreiro de lei
Que a sua luz ilumine onde estou

Saravá Ogum, saravá!
Guerreiro valente, senhor da guerra
Ogum de lei nos vem guardar
De todo mal que existe na terra`,
    gradientFrom: '#1a237e',
    gradientTo: '#3949ab',
    icone: '⚔️',
  },
  {
    id: '2',
    titulo: 'Iemanjá Rainha do Mar',
    orixaRelacionado: 'Iemanjá',
    tipo: 'Ponto Cantado',
    descricao: 'Ponto de saudação à mãe das águas e rainha do mar',
    letra: `Iemanjá, rainha do mar
Mãe das águas, venha nos guardar
Iemanjá, rainha do mar
Com sua luz, venha nos abençoar

Nas ondas do mar ela mora
No fundo do oceano ela reina
Iemanjá, mãe protetora
Sua benção a todos encaminha

Salve Iemanjá, salve a rainha!
Mãe de todos, mãe do mar
Iemanjá, nossa mãe rainha
Sempre pronta para nos amparar`,
    gradientFrom: '#003d6b',
    gradientTo: '#0077b6',
    icone: '🌊',
  },
  {
    id: '3',
    titulo: 'Laroyê Exu',
    orixaRelacionado: 'Exu',
    tipo: 'Ponto Cantado',
    descricao: 'Ponto de saudação a Exu, mensageiro e guardião das encruzilhadas',
    letra: `Laroyê Exu, laroyê!
Exu guardião das encruzilhadas
Laroyê Exu, laroyê!
Abre os caminhos, fecha as passadas

Exu, Exu, quem é você?
Sou o mensageiro entre dois mundos
Exu, Exu, o que você faz?
Guardo os caminhos nos mais profundos

Laroyê! Salve Exu!
Guardião de toda a humanidade
Laroyê! Salve Exu!
Que nos guie com sabedoria e verdade`,
    gradientFrom: '#1a0000',
    gradientTo: '#3d0000',
    icone: '🔱',
  },
  {
    id: '4',
    titulo: 'Oxalá Pai de Todos',
    orixaRelacionado: 'Oxalá',
    tipo: 'Ponto Cantado',
    descricao: 'Ponto sagrado ao pai maior, senhor da criação',
    letra: `Oxalá, pai de todos nós
Vem nos abençoar com sua paz
Oxalá, ouça nossa voz
Que a sua luz em nós sempre se faça

Branco é seu manto, branca é sua luz
Oxalá caminha entre nós
Com seu opaxorô, ele nos conduz
Ao caminho da paz e do amor

Eparrei Oxalá! Eparrei!
Pai maior de toda criação
Eparrei Oxalá! Eparrei!
Nos cubra com sua benção`,
    gradientFrom: '#2a2a3a',
    gradientTo: '#3a3a4a',
    icone: '☁️',
  },
  {
    id: '5',
    titulo: 'Oxum das Águas Doces',
    orixaRelacionado: 'Oxum',
    tipo: 'Ponto Cantado',
    descricao: 'Ponto de amor e prosperidade para a rainha das águas doces',
    letra: `Oxum, Oxum, ora iê iê ô
Rainha das águas, senhora do amor
Oxum, Oxum, ora iê iê ô
Nos abençoa com seu esplendor

Nos rios e cachoeiras ela dança
Vestida de ouro e amarelo brilhante
Oxum, deusa da esperança
Seu amor por todos é constante

Ora iê iê ô, Oxum!
Nos dê amor, nos dê alegria
Ora iê iê ô, Oxum!
Que sua bênção esteja todos os dias`,
    gradientFrom: '#4a3000',
    gradientTo: '#7a5000',
    icone: '💫',
  },
  {
    id: '6',
    titulo: 'Kawô Xangô',
    orixaRelacionado: 'Xangô',
    tipo: 'Ponto Cantado',
    descricao: 'Ponto ao rei da justiça e dos trovões',
    letra: `Kawô Kabiyesile, Xangô!
Rei da justiça, senhor dos trovões
Kawô Kabiyesile, Xangô!
Nos dê justiça em nossas missões

Com seu machado duplo ele caminha
Xangô, o rei mais poderoso
Sua sabedoria nos ilumina
Seu julgamento é sempre glorioso

Kawô! Salve Xangô!
Que a justiça reine entre nós
Kawô! Salve Xangô!
Que sua voz seja sempre a nossa voz`,
    gradientFrom: '#4a0000',
    gradientTo: '#7a1000',
    icone: '⚡',
  },
  {
    id: '7',
    titulo: 'Atotô Omulu',
    orixaRelacionado: 'Omulu',
    tipo: 'Ponto Cantado',
    descricao: 'Ponto de cura ao senhor das doenças e da morte',
    letra: `Atotô Omulu, atotô!
Senhor da cura, nos vem socorrer
Atotô Omulu, atotô!
Com sua força, nos faz renascer

Coberto de palha ele caminha
Omulu, o curador sagrado
Sua medicina nos ilumina
Seu toque cura o que está enfermado

Atotô! Salve Omulu!
Que a cura venha sobre nós
Atotô! Salve Omulu!
Omulu, atende nossa voz`,
    gradientFrom: '#2d0058',
    gradientTo: '#4b0082',
    icone: '🌿',
  },
  {
    id: '8',
    titulo: 'Oração de Abertura',
    orixaRelacionado: 'Todos os Orixás',
    tipo: 'Oração',
    descricao: 'Oração sagrada de abertura para os trabalhos espirituais',
    letra: `Salve a Deus, Pai Eterno!
Salve Oxalá, pai de todos!
Salve todos os Orixás!
Salve os Guias e Protetores!

Nesta hora sagrada de trabalho espiritual,
Pedimos a presença de luz, amor e paz.
Que os bons espíritos nos guiem,
Que os Orixás nos abençoem,
Que a caridade seja nossa bandeira.

Axé para todos os presentes!
Axé para os que estão ausentes!
Que a Umbanda seja sempre
Um farol de luz para a humanidade.

Saravá!`,
    gradientFrom: '#1a0033',
    gradientTo: '#2d0055',
    icone: '🙏',
  },
];
