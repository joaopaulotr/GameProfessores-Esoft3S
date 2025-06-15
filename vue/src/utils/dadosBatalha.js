import { useStorage } from '@vueuse/core';

export const chefesBatalha = [
  {
    id: 1,
    nome: "Moreno (Algoritmos)",
    vida: 120,
    sprite: new URL('@/assets/images/moreno1.png', import.meta.url).href,
    
    estilo: "Algoritmos e lógica",
    chefesNecessarios: 0, // Primeiro boss, sempre disponível
    ataques: [
      { nome: "Laço Infinito", 
        dano: 25,
        sprite:[ new URL('@/assets/images/morenolaço1.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço2.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço3.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço4.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço5.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço6.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço7.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço8.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço9.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço10.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço11.png', import.meta.url).href,
                new URL('@/assets/images/morenolaço12.png', import.meta.url).href
        ]},
      { nome: "Recursão Mortal",
         dano: 30,
        sprite:[ new URL('@/assets/images/morenoexplosao1.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao2.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao3.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao4.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao5.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao6.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao7.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao8.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao9.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao10.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao11.png', import.meta.url).href,
                new URL('@/assets/images/morenoexplosao12.png', import.meta.url).href
        ]
       },
      { nome: "Busca Binária", 
        dano: 20,
      sprite:[ new URL('@/assets/images/moreno busca1.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca2.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca3.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca4.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca5.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca6.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca7.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca8.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca9.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca10.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca11.png', import.meta.url).href,
                new URL('@/assets/images/moreno busca12.png', import.meta.url).href
        ]},
      { nome: "Explosão de Pseudocódigo",
         dano: 35,
        sprite:[ new URL('@/assets/images/morenobomba1.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba2.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba3.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba4.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba5.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba6.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba7.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba8.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba9.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba10.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba11.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba12.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba13.png', import.meta.url).href,
                new URL('@/assets/images/morenobomba14.png', import.meta.url).href
              ]}
    ],
  },
  {
    id: 2,
    nome: "Cidão (Arquitetura de Computadores)",
    vida: 140,
    sprite: new URL('@/assets/images/cidao1.png', import.meta.url).href,
    estilo: "Arquitetura e hardware",
    chefesNecessarios: 1, // Precisa derrotar o Moreno primeiro
    ataques: [
      { nome: "Cache Mortal",
         dano: 27,
        sprite:[ new URL('@/assets/images/cidaocache1.png', import.meta.url).href,
                new URL('@/assets/images/cidaocache2.png', import.meta.url).href,
                new URL('@/assets/images/cidaocache3.png', import.meta.url).href,
                new URL('@/assets/images/cidaocache4.png', import.meta.url).href,
                new URL('@/assets/images/cidaocache5.png', import.meta.url).href,
                new URL('@/assets/images/cidaocache6.png', import.meta.url).href,
                new URL('@/assets/images/cidaocache7.png', import.meta.url).href,
                new URL('@/assets/images/cidaocache8.png', import.meta.url).href
        ]},
      { nome: "Pipeline Quebrado", dano: 33,
        sprite:[ new URL('@/assets/images/cidaopipeline1.png', import.meta.url).href,
                new URL('@/assets/images/cidaopipeline2.png', import.meta.url).href,
                new URL('@/assets/images/cidaopipeline3.png', import.meta.url).href,
                new URL('@/assets/images/cidaopipeline4.png', import.meta.url).href,
                new URL('@/assets/images/cidaopipeline5.png', import.meta.url).href,
                new URL('@/assets/images/cidaopipeline6.png', import.meta.url).href,
                new URL('@/assets/images/cidaopipeline7.png', import.meta.url).href,
                new URL('@/assets/images/cidaopipeline8.png', import.meta.url).href,
                new URL('@/assets/images/cidaopipeline9.png', import.meta.url).href,
                new URL('@/assets/images/cidaopipeline10.png', import.meta.url).href,
        ]},
      { nome: "Overclock Selvagem", 
        dano: 29,
      sprite:[ new URL('@/assets/images/cidaooverclock1.png', import.meta.url).href,
                new URL('@/assets/images/cidaooverclock2.png', import.meta.url).href,
                new URL('@/assets/images/cidaooverclock3.png', import.meta.url).href,
                new URL('@/assets/images/cidaooverclock4.png', import.meta.url).href,
                new URL('@/assets/images/cidaooverclock5.png', import.meta.url).href,
                new URL('@/assets/images/cidaooverclock6.png', import.meta.url).href,
                new URL('@/assets/images/cidaooverclock7.png', import.meta.url).href,
                new URL('@/assets/images/cidaooverclock8.png', import.meta.url).href
        ]},
      { nome: "Tempestade de Barramentos", 
        dano: 38,
      sprite:[ new URL('@/assets/images/cidaotempestade1.png', import.meta.url).href,
                new URL('@/assets/images/cidaotempestade2.png', import.meta.url).href,
                new URL('@/assets/images/cidaotempestade3.png', import.meta.url).href,
                new URL('@/assets/images/cidaotempestade4.png', import.meta.url).href,
                new URL('@/assets/images/cidaotempestade5.png', import.meta.url).href,
                new URL('@/assets/images/cidaotempestade6.png', import.meta.url).href,
                new URL('@/assets/images/cidaotempestade7.png', import.meta.url).href,
                new URL('@/assets/images/cidaotempestade8.png', import.meta.url).href
               
        ]}
    ],
  },
  {
    id: 3,
    nome: "Gostosinho (Redes de Computadores)",
    vida: 150,
    sprite: new URL('@/assets/images/joaoferlini1.png', import.meta.url).href,
    estilo: "Redes e comunicação",
    chefesNecessarios: 2, // Precisa derrotar Moreno e Cidão
    ataques: [
      { nome: "Pacote Perdido",
         dano: 29,
        sprite:[ new URL('@/assets/images/ferlinipacote1.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote2.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote3.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote4.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote5.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote6.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote7.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote8.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote9.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote10.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote11.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote12.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote13.png', import.meta.url).href,
                new URL('@/assets/images/ferlinipacote14.png', import.meta.url).href
        ]},
      { nome: "Broadcast Fatal", dano: 31,
        sprite:[ new URL('@/assets/images/ferlinilutafatal1.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal2.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal3.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal4.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal5.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal6.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal7.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal8.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal9.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal10.png', import.meta.url).href,
                new URL('@/assets/images/ferlinilutafatal11.png', import.meta.url).href
              
        ]
       },
      { nome: "Tempestade de Ping", dano: 26,
        sprite:[ new URL('@/assets/images/ferliniluta.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta1.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta2.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta3.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta4.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta5.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta6.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta7.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta8.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta9.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta10.png', import.meta.url).href,
                new URL('@/assets/images/ferliniluta11.png', import.meta.url).href
                

        ]},
      { nome: "Firewall Implacável",
         dano: 39,
         sprite:[ new URL('@/assets/images/ferlinifirewall1.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall2.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall3.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall4.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall5.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall6.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall7.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall8.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall9.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall10.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall11.png', import.meta.url).href,
                new URL('@/assets/images/ferlinifirewall12.png', import.meta.url).href
               
        ]},
         
    ],
  },
  {
    id: 4,
    nome: "Hugo Fumero (Front-End)",
    vida: 160,
    sprite: new URL('@/assets/images/backplayer4.png', import.meta.url).href,
    estilo: "Front-End Supremo",
    chefesNecessarios: 3, // Precisa derrotar os 3 anteriores
    ataques: [
      { nome: "CSS Caótico", dano: 35 },
      { nome: "React Devastador", dano: 40 },
      { nome: "Bug Visual Fantasma", dano: 30 },
      { nome: "Deploy Apoteótico", dano: 45 }
    ],
  }
];

// Dados iniciais do jogador
export function useDadosJogador() {
  // Vida máxima e ataques podem ser customizados conforme o progresso
  const vidaMaxima = 120;
  const ataquesPadrao = [
    { nome: 'Sintaxe Certeira', dano: 20, tipo: 'ataque', icon: '🐱‍🏍'},
    { nome: 'Refatoração Rápida', dano: 25, tipo: 'ataque' },
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

