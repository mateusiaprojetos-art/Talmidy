import { Course } from '../types';

export const ACADEMY_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Introdução à Torá e aos Escritos Sagrados',
    subtitle: 'Fundamentos de leitura e interpretação no contexto hebraico',
    description: 'Aprenda a navegar nos 5 livros de Moisés, entender a divisão do Tanakh e compreender o pano de fundo cultural e histórico dos patriarcas.',
    level: 'Iniciante',
    category: 'Estudos das Escrituras',
    modules: [
      {
        id: 'm1',
        title: 'Módulo 1: A Estrutura do Tanakh',
        lessons: [
          { id: 'l1', title: '1. O que é a Torá, Nevi\'im e Ketuvim?', durationMinutes: 20, contentMarkdown: 'O Tanakh é a acrônimo das três seções da Bíblia Hebraica: Torá (Instrução), Nevi\'im (Profetas) e Ketuvim (Escritos). Cada seção tem seu propósito revelador único.' },
          { id: 'l2', title: '2. A Tradição de Leitura e a Parashá', durationMinutes: 25, contentMarkdown: 'A leitura semanal da Torá (Parashat HaShavua) organiza o ciclo de estudos da comunidade em 54 porções ao longo do ano judaico.' }
        ]
      },
      {
        id: 'm2',
        title: 'Módulo 2: Princípios Hermenêuticos Hebraicos',
        lessons: [
          { id: 'l3', title: '3. A Diferença entre Pensamento Grego e Hebraico', durationMinutes: 30, contentMarkdown: 'Enquanto o pensamento grego foca na abstração e forma, o pensamento hebraico foca na ação, no relacionamento, na dinamismo e na aliança prática.' }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Introdução ao Método Pardes de Hermenêutica',
    subtitle: 'Peshat, Remez, Derash e Sod explicados com clareza',
    description: 'Aprofunde-se nos 4 níveis clássicos de estudo das Escrituras, aprendendo a distinguir texto, tradição, contexto e interpretação.',
    level: 'Intermediário',
    category: 'Métodos de Estudo',
    modules: [
      {
        id: 'm3',
        title: 'Módulo 1: Os Níveis do Pardes',
        lessons: [
          { id: 'l4', title: '1. Peshat: O Sentido Literal e Contextual', durationMinutes: 25, contentMarkdown: 'Peshat é a base insubstituível. Nenhuma interpretação alegórica pode anular o significado direto e gramatical do texto.' },
          { id: 'l5', title: '2. Remez: Alusões e Padrões Numéricos', durationMinutes: 30, contentMarkdown: 'Remez descobre as conexões sutis, repetições de palavras e padrões entre diferentes passagens do Tanakh.' },
          { id: 'l6', title: '3. Derash e Sod: Comentários e Simbolismo', durationMinutes: 35, contentMarkdown: 'Derash aplica o texto à conduta e ética rabínica, enquanto Sod explora as profundezas da alma e dos mistérios da criação.' }
        ]
      }
    ]
  },
  {
    id: 'c3',
    title: 'Hebraico Fácil para Iniciantes',
    subtitle: 'Aprenda o Alef-Bet, vogais e vocabulário bíblico essencial',
    description: 'Aprenda a reconhecer as 22 letras hebraicas, praticar a pronúncia correta com niqqud e ler orações clássicas como o Shema Israel.',
    level: 'Iniciante',
    category: 'Língua Hebraica',
    modules: [
      {
        id: 'm4',
        title: 'Módulo 1: Dominando o Alfabeto (Alef-Bet)',
        lessons: [
          { id: 'l7', title: '1. As Primeiras Letras: Alef a Tav', durationMinutes: 40, contentMarkdown: 'Estudo detalhado das letras, som, valor numérico e palavras de exemplo para fixação diária.' },
          { id: 'l8', title: '2. As Vogais (Niqqud)', durationMinutes: 30, contentMarkdown: 'Entenda os pontos vocálicos introduzidos pelos massoretas para guiar a leitura exata do texto bíblico.' }
        ]
      }
    ]
  },
  {
    id: 'c4',
    title: 'A Brit Hadasha no Contexto do Segundo Templo',
    subtitle: 'Entendendo o Primeiro Século em Jerusalém e na Judeia',
    description: 'Estude o Evangelho de Mateus, João e as epístolas sob a ótica da cultura hebraica, debates das escolas rabínicas e história do Segundo Templo.',
    level: 'Avançado',
    category: 'Estudos Comparativos',
    modules: [
      {
        id: 'm5',
        title: 'Módulo 1: A Sociedade do Primeiro Século',
        lessons: [
          { id: 'l9', title: '1. Fariseus, Saduceus, Essênios e Zelotes', durationMinutes: 45, contentMarkdown: 'Análise das diferentes correntes de pensamento em Israel e como Yeshua dialogou e ensinou nesse ambiente vibrante.' }
        ]
      }
    ]
  }
];
