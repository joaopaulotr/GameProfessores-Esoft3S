import { useStorage } from '@vueuse/core';

export const chefesBatalha = [
  {
    id: 1,
    nome: "Moreno (Algoritmos)",
    vida: 120,
    sprite: ('@/assets/professores/moreno-sprite.png'),
    estilo: "Algoritmos e lógica",
    chefesNecessarios: 0, // Primeiro boss, sempre disponível
    ataques: [
      { nome: "Laço Infinito", dano: 25 },
      { nome: "Recursão Mortal", dano: 30 },
      { nome: "Busca Binária", dano: 20 },
      { nome: "Explosão de Pseudocódigo", dano: 35 }
    ],
    falas: [
      "Bem-vindo ao mundo dos algoritmos!",
      "Se perder nos meus loops é fácil, sair... nem tanto!",
      "A lógica é a chave, mas será que você tem a senha?"
    ]
  },
  {
    id: 2,
    nome: "Cidão (Arquitetura de Computadores)",
    vida: 140,
    sprite: ('@/assets/professores/cidao-sprite.png'),
    estilo: "Arquitetura e hardware",
    chefesNecessarios: 1, // Precisa derrotar o Moreno primeiro
    ataques: [
      { nome: "Cache Mortal", dano: 27 },
      { nome: "Pipeline Quebrado", dano: 33 },
      { nome: "Overclock Selvagem", dano: 29 },
      { nome: "Tempestade de Barramentos", dano: 38 }
    ],
    falas: [
      "Aqui é arquitetura raiz!",
      "Se não entende o hardware, não passa daqui!",
      "Vou te dar um deadlock que você nunca mais esquece!"
    ]
  },
  {
    id: 3,
    nome: "Gostosinho (Redes de Computadores)",
    vida: 135,
    sprite: ('@/assets/professores/gostosinho-sprite.png'),
    estilo: "Redes e comunicação",
    chefesNecessarios: 2, // Precisa derrotar Moreno e Cidão
    ataques: [
      { nome: "Pacote Perdido", dano: 29 },
      { nome: "Broadcast Fatal", dano: 31 },
      { nome: "Tempestade de Ping", dano: 26 },
      { nome: "Firewall Implacável", dano: 39 }
    ],
    falas: [
      "Rede lenta? Aqui não!",
      "Vou congestionar sua mente com meus pacotes!",
      "Se não souber roteamento, vai ficar sem conexão!"
    ]
  },
  {
    id: 4,
    nome: "Hugo Fumero (Front-End)",
    vida: 160,
    sprite: ('@/assets/professores/fumero-sprite.png'),
    estilo: "Front-End Supremo",
    chefesNecessarios: 3, // Precisa derrotar os 3 anteriores
    ataques: [
      { nome: "CSS Caótico", dano: 35 },
      { nome: "React Devastador", dano: 40 },
      { nome: "Bug Visual Fantasma", dano: 30 },
      { nome: "Deploy Apoteótico", dano: 45 }
    ],
    falas: [
      "Chegou ao topo do front-end!",
      "Aqui até o botão some do layout!",
      "Se não passar por mim, seu deploy nunca será estável!"
    ]
  }
];

// Dados iniciais do jogador
export function useDadosJogador() {
  // Vida máxima e ataques podem ser customizados conforme o progresso
  const vidaMaxima = 120;
  const ataquesPadrao = [
    { nome: 'Sintaxe Certeira', dano: 22, tipo: 'ataque' },
    { nome: 'Refatoração Rápida', dano: 18, tipo: 'ataque' },
    { nome: 'Stack Overflow', dano: 35, tipo: 'ataque' },
    { nome: 'Café Restaurador', dano: 25, tipo: 'cura', icon: '☕' }
  ];

  // Armazenamento persistente dos dados do jogador
  const vida = useStorage('jogadorVida', vidaMaxima);
  const ataques = useStorage('jogadorAtaques', ataquesPadrao);
  const vitorias = useStorage('jogadorVitorias', 0);
  const derrotas = useStorage('jogadorDerrotas', 0);
  const chefesDerrotados = useStorage('chefesDerrotados', 0);

  return {
    vida,
    ataques,
    vitorias,
    derrotas,
    chefesDerrotados,
    vidaMaxima
  };
}

