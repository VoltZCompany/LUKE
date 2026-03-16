export interface Conhecimento {
  id: string;
  titulo: string;
  categoria: 'Orixá' | 'História' | 'Ritual' | 'Ervas' | 'Elementos';
  conteudo: string;
  resumo: string;
  gradientFrom: string;
  gradientTo: string;
  icone: string;
}

export const conhecimentos: Conhecimento[] = [
  {
    id: '1',
    titulo: 'O que é Umbanda?',
    categoria: 'História',
    resumo: 'A religião brasileira que une matriz africana, indígena e espírita',
    conteudo: `A Umbanda é uma religião tipicamente brasileira, nascida no início do século XX, que sintetiza elementos de diversas tradições espirituais: a matriz africana dos Orixás, os ensinamentos indígenas, o espiritismo kardecista e influências do catolicismo popular.

Surgiu oficialmente em 1908, no Rio de Janeiro, quando o médium Zélio Fernandino de Moraes, em uma sessão espírita, recebeu um espírito que se identificou como o "Caboclo das Sete Encruzilhadas", inaugurando uma nova forma de espiritualidade no Brasil.

A Umbanda tem como princípio fundamental a caridade, o amor ao próximo e a busca pela evolução espiritual. Acredita-se que os espíritos de pessoas que já viveram na Terra, especialmente índios (Caboclos) e escravos africanos (Pretos Velhos), trabalham na Umbanda como guias espirituais para ajudar a humanidade.

Os Orixás são as forças da natureza divinizadas, entidades superiores que regem aspectos do universo e da vida humana. Cada pessoa nasce sob a regência de um Orixá, que é como seu "pai" ou "mãe" espiritual.

A Umbanda é uma religião viva, em constante evolução, refletindo a riqueza e a diversidade do povo brasileiro.`,
    gradientFrom: '#1a0033',
    gradientTo: '#2d0055',
    icone: '📚',
  },
  {
    id: '2',
    titulo: 'Os Orixás da Umbanda',
    categoria: 'Orixá',
    resumo: 'As divindades da natureza que regem a vida e o universo',
    conteudo: `Os Orixás são entidades espirituais supremas na Umbanda e no Candomblé, representando as forças da natureza e aspectos da vida humana. Cada Orixá tem características, cores, elementos e dias da semana específicos.

**Oxalá** - O pai maior, senhor da criação. Rege a paz, a pureza e a espiritualidade. Cor: branco. Dia: domingo.

**Iemanjá** - Rainha do mar, mãe das águas salgadas. Rege a maternidade, a proteção e os sonhos. Cor: azul e branco. Dia: sábado.

**Ogum** - Guerreiro, senhor do ferro e das batalhas. Abre caminhos e protege dos perigos. Cor: azul escuro e vermelho. Dia: segunda-feira.

**Xangô** - Rei da justiça e dos trovões. Rege a lei, a ordem e a sabedoria. Cores: vermelho e branco. Dia: quarta-feira.

**Oxum** - Rainha das águas doces, senhora do amor e da beleza. Rege sentimentos, ouro e fertilidade. Cores: amarelo e dourado. Dia: sábado.

**Oxossi** - Caçador, senhor das matas. Rege a caça, a abundância e a intuição. Cores: verde e azul. Dia: quinta-feira.

**Omulu/Obaluaê** - Senhor da saúde e das doenças. Rege a cura, a morte e o renascimento. Cores: preto e branco. Dia: segunda-feira.

**Exu** - Mensageiro dos Orixás, guardião das encruzilhadas. Rege a comunicação e as passagens. Cores: preto e vermelho. Dia: segunda-feira.

Cada pessoa pode descobrir seu Orixá através de um jogo de búzios realizado por um pai ou mãe de santo.`,
    gradientFrom: '#3d1a00',
    gradientTo: '#6b2d00',
    icone: '⭐',
  },
  {
    id: '3',
    titulo: 'Guias Espirituais',
    categoria: 'História',
    resumo: 'Os espíritos que trabalham na Umbanda como mensageiros e curandeiros',
    conteudo: `Na Umbanda, além dos Orixás, existem os chamados "Guias Espirituais" - espíritos de pessoas que já viveram na Terra e que retornam para auxiliar a humanidade em sua evolução.

**Caboclos**
Espíritos de índios brasileiros, representando a força, a sabedoria da natureza e a medicina das matas. São conhecidos por sua bravura, lealdade e conhecimento das ervas. Exemplos: Caboclo das Sete Encruzilhadas, Caboclo Tupinambá, Caboclo Pena Verde.

**Pretos Velhos**
Espíritos de escravos africanos que viveram no Brasil. Representam a humildade, a sabedoria, a paciência e o amor incondicional. São grandes curandeiros e conselheiros espirituais. Exemplos: Pai João, Vovó Maria Conga, Pai Joaquim.

**Exus e Pomba Giras**
Trabalhadores das encruzilhadas que atuam nas questões mais densas da vida material. São espíritos que viveram vidas difíceis e que agora, na caridade, ajudam a resolver problemas e obstáculos.

**Crianças (Ibejis)**
Espíritos de crianças que transmitem alegria, leveza e inocência. Representam a criança interior e a renovação do espírito.

**Marinheiros**
Espíritos que trabalham com as águas e auxiliam em questões de viagem, comércio e aventura.

Cada guia se manifesta através da mediunidade dos médiuns incorporados durante as giras (sessões).`,
    gradientFrom: '#003d3d',
    gradientTo: '#005f5f',
    icone: '👻',
  },
  {
    id: '4',
    titulo: 'Ervas Sagradas',
    categoria: 'Ervas',
    resumo: 'O poder das plantas na cura e nos rituais de Umbanda',
    conteudo: `As ervas ocupam lugar central nos rituais de Umbanda, sendo utilizadas em banhos, defumações, simpatias e trabalhos espirituais. Cada planta possui uma energia específica e está ligada a determinados Orixás.

**Ervas de Ogum (Proteção e Força)**
- Arruda: proteção contra o mau-olhado e energias negativas
- Alecrim: purificação, proteção e boa sorte
- Espada de São Jorge: afasta negatividade e protege o lar

**Ervas de Iemanjá (Limpeza e Paz)**
- Alfazema: paz, tranquilidade e harmonia
- Erva-cidreira: calmante, alivia ansiedade
- Hortelã: purificação e atração de coisas boas

**Ervas de Oxum (Amor e Prosperidade)**
- Manjericão: amor, atração e prosperidade
- Canela: prosperidade e energia amorosa
- Rosa: amor, beleza e harmonia

**Ervas de Oxossi (Abundância)**
- Eucalipto: purificação e saúde
- Guiné: proteção e abertura de caminhos
- Jurema: trabalhos espirituais e visões

**Ervas de Omulu (Cura)**
- Quebra-pedra: saúde e cura
- Capim-limão: purificação e saúde
- Boldo: limpeza do fígado (físico e espiritual)

Os banhos de ervas são feitos com as plantas frescas ou secas, fervidas em água. O líquido é coado e usado após o banho normal, sempre com oração e intenção clara.`,
    gradientFrom: '#1b3a1b',
    gradientTo: '#2e7d32',
    icone: '🌿',
  },
  {
    id: '5',
    titulo: 'A Gira - Sessão Espiritual',
    categoria: 'Ritual',
    resumo: 'Como acontece uma sessão espiritual de Umbanda',
    conteudo: `A "Gira" é o nome dado às sessões espirituais de Umbanda, onde médiuns incorporam os guias espirituais e Orixás para atender as pessoas que buscam ajuda.

**Como acontece:**

1. **Abertura** - A gira começa com orações e pontos cantados para defasar as energias e convidar as entidades de luz. A defumação do terreiro e dos participantes é realizada com ervas e incensos sagrados.

2. **Incorporação** - Os médiuns, que são pessoas com dom mediúnico desenvolvido, entram em transe e recebem os espíritos. Cada entidade tem sua forma característica de se comportar, falar e se vestir.

3. **Consultas** - As pessoas que buscam ajuda conversam com os guias, recebendo conselhos, passes (cura energética) e prescrições de banhos, simpatias ou trabalhos espirituais.

4. **Passes** - Os médiuns realizam passes magnéticos nas pessoas, que consistem em movimentos com as mãos para equilibrar a energia e promover cura.

5. **Fechamento** - A gira é encerrada com pontos de despedida, agradecimentos e uma oração final. As entidades se despedem e os médiuns retornam ao estado normal.

**Etiqueta na Gira:**
- Vista-se de branco quando possível
- Chegue com pontualidade e respeito
- Não atravesse o congá (altar) sem permissão
- Mantenha silêncio durante as incorporações
- Aborde os guias com respeito e sinceridade`,
    gradientFrom: '#1a0033',
    gradientTo: '#3d0066',
    icone: '🌀',
  },
  {
    id: '6',
    titulo: 'Os Elementos na Umbanda',
    categoria: 'Elementos',
    resumo: 'Fogo, água, terra e ar nos rituais e sua conexão com os Orixás',
    conteudo: `Os quatro elementos fundamentais da natureza - fogo, água, terra e ar - têm papel central na Umbanda, cada um regido por Orixás específicos e utilizado de diferentes formas nos rituais.

**FOGO**
Orixás: Xangô, Ogum, Iansã
Simbolismo: transformação, purificação, força
As velas são ferramentas poderosas. Cada cor tem um significado:
- Branca: paz, purificação, Oxalá
- Azul: proteção, cura, Iemanjá
- Amarela: prosperidade, amor, Oxum
- Vermelha: força, proteção, Ogum
- Preta: quebra de negatividade, Exu

**ÁGUA**
Orixás: Iemanjá, Oxum, Oxumarê, Nanã
Simbolismo: vida, cura, emoções, limpeza espiritual
A água é um dos elementos mais utilizados em limpezas e purificações espirituais.

**TERRA**
Orixás: Omulu, Oxóssi, Nanã
Simbolismo: solidez, crescimento, ancestralidade, morte e renascimento
Uso ritual: enterramento de trabalhos, uso de terra, plantio de ervas

**AR**
Orixás: Iansã, Oxumarê
Simbolismo: comunicação, movimento, liberdade, espírito
Uso ritual: defumação com ervas (fumaça), uso de penas, sopros rituais

Os rituais de Umbanda frequentemente combinam todos os elementos para criar um trabalho completo e poderoso, honrando a totalidade da criação.`,
    gradientFrom: '#3d1a00',
    gradientTo: '#5a2800',
    icone: '🔥',
  },
];
