<script setup>
import HealthBar from '../components/HealthBar.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { chefesBatalha, useDadosJogador } from '../utils/dadosBatalha.js'

// Pega os dados do jogador do armazenamento centralizado
const { vida, ataques, vitorias, derrotas, chefesDerrotados, vidaMaxima } = useDadosJogador()

// Estatísticas do jogador para a batalha atual
const playerStats = ref({
   name: 'Professor',
   health: vidaMaxima, // Sempre inicia com vida máxima ao entrar na batalha
   maxHealth: vidaMaxima
})

// Pega o ID do chefe da rota ou usa o primeiro chefe como padrão
const route = useRoute()
const chefeBatalhaId = computed(() => Number(route.query.id) || 1)

// Encontra o chefe com base no ID da rota e inicializa suas estatísticas
const chefeBatalha = ref(null)
const bossStats = ref(null)

const musicaBatalha = new URL('@/assets/music/musicaBatalha.mp3', import.meta.url).href;
const musicaMapa = new URL('@/assets/music/musicaMapa.mp3', import.meta.url).href;

onMounted(() => {
  const audio = document.getElementById('bg-music');
  if (audio) {
    // Para a música atual
    audio.pause();
    // Carrega a música de batalha
    audio.src = musicaBatalha;
    audio.volume = 0.18;
    audio.currentTime = 0;
    audio.loop = true;
    // Toca a nova música
    audio.play().catch(e => console.log('Erro ao tocar música de batalha:', e));
  }

  // Restaura a vida máxima ao entrar na batalha
  vida.value = vidaMaxima;
  playerStats.value.health = vidaMaxima;

  // Inicializa os dados da batalha
  const chefe = chefesBatalha.find(c => c.id === chefeBatalhaId.value) || chefesBatalha[0]

  chefeBatalha.value = {
    id: chefe.id,
    name: chefe.nome,
    ataques: chefe.ataques,
    sprite: chefe.sprite,
    estilo: chefe.estilo,
    falas: chefe.falas
  }

  bossStats.value = {
    health: chefe.vida,
    maxHealth: chefe.vida
  }
})

onUnmounted(() => {
  const audio = document.getElementById('bg-music' );
  if (audio) {
    // Para a música de batalha
    audio.pause();
    // Volta para a música do mapa
    audio.src = musicaMapa;
    audio.volume = 0.18;
    audio.currentTime = 0;
    audio.loop = true;
    // Toca a música do mapa
    audio.play().catch(e => console.log('Erro ao tocar música do mapa:', e));
  }
});

// Importa o router para navegação
import { useRouter } from 'vue-router';
const router = useRouter();

// Adiciona os ataques do jogador
const realizarAtaque = (ataque) => {
  // Verifica se a batalha já acabou
  if (bossStats.value.health <= 0 || playerStats.value.health <= 0) return;

  // Verifica se alguém já foi derrotado
  if (bossStats.value.health <= 0 || playerStats.value.health <= 0) {
    if (bossStats.value.health <= 0) showVictoryModal.value = true;
    if (playerStats.value.health <= 0) showDefeatModal.value = true;
    return;
  }

  if (ataque.tipo === 'cura') {
    // Cura o jogador
    const curaTotal = ataque.dano;
    playerStats.value.health = Math.min(playerStats.value.maxHealth, playerStats.value.health + curaTotal);
    vida.value = playerStats.value.health; // Atualiza o armazenamento
    console.log(`Você usou ${ataque.nome} e recuperou ${curaTotal} de vida! Sua vida: ${playerStats.value.health}`);
  } else {
    // Jogador ataca
    let danoCausado;
    switch (ataque.nome) {
      case 'Sintaxe Certeira':
        danoCausado = 20;
        break;
      case 'Debug Relâmpago':
        danoCausado = 25;
        break;
      case 'Stack Overflow':
        danoCausado = 30;
        break;
      default:
        danoCausado = ataque.dano;
    }

    // Aplica o dano ao boss
    const vidaAnterior = bossStats.value.health;
    bossStats.value.health = Math.max(0, bossStats.value.health - danoCausado);
    console.log(`Você usou ${ataque.nome} causando ${danoCausado} de dano! Vida do chefe: ${bossStats.value.health}`);

    // O boss só é derrotado se a vida chegar exatamente a 0
    if (vidaAnterior > 0 && bossStats.value.health <= 0) {
      // Redireciona para a tela de vitória
      router.push({
        path: '/victory',
        query: {
          bossId: chefeBatalha.value.id,
          final: chefesDerrotados.length === chefesBatalha.length
        }
      });
      return;
    }

    // Boss contra-ataca apenas se ainda estiver vivo
    const ataquesChefe = chefeBatalha.value.ataques;
    const ataqueChefe = ataquesChefe[Math.floor(Math.random() * ataquesChefe.length)];

    playerStats.value.health = Math.max(0, playerStats.value.health - ataqueChefe.dano);
    vida.value = playerStats.value.health; // Atualiza o armazenamento

    console.log(`${chefeBatalha.value.name} usou ${ataqueChefe.nome} causando ${ataqueChefe.dano} de dano! Sua vida: ${playerStats.value.health}`);

    // Verifica se o jogador foi derrotado após o contra-ataque
    if (playerStats.value.health <= 0) {
      // Redireciona para a tela de derrota
      router.push({
        path: '/defeat',
        query: {
          bossId: chefeBatalha.value.id,
          damage: danoCausado,
          time: '2:30' // Você pode adicionar um timer real aqui se desejar
        }
      });
    }
  }
}

// Função para definir a área da grade com base no índice
const gridAreaByIndex = (idx) => {
  // 0 1
  // 2 3
  const areas = ['a', 'b', 'c', 'd'];
  return areas[idx] || 'd';
};
</script>

<template>
  <div class="battle-screen">
    <div class="battle-overlay">
      <div class="mc-header">
        <h1>Tela de Batalha</h1>
      </div>

      <!-- Barras de vida fora da arena de batalha -->
      <div class="health-bars-container">
        <!-- Barra de vida do jogador -->
        <div class="player-health-bar">
          <div class="health-container">
            <h3>{{ playerStats.name }}</h3>
            <HealthBar
              :name="playerStats.name"
              :health="playerStats.health"
              :maxHealth="playerStats.maxHealth"
            />
          </div>
        </div>

        <!-- Barra de vida do professor -->
        <div v-if="bossStats" class="boss-health-bar">
          <div class="health-container">
            <h3>{{ chefeBatalha?.name }}</h3>
            <HealthBar
              :name="chefeBatalha?.name"
              :health="bossStats.health"
              :maxHealth="bossStats.maxHealth"
            />
          </div>
        </div>
      </div>

      <div class="battle-interface text-center">
        <div class="battle-arena">
          <div class="arena-container">
            <!-- Área de batalha -->
            <div v-if="chefeBatalha" class="battle-sprites">
              <!-- Sprite do jogador -->
              <div class="player-sprite">
                <img src="@/assets/images/Player2.png" alt="Jogador" />
              </div>
              
              <!-- Sprite do professor -->
              <div class="boss-sprite">
                <img :src="chefeBatalha.sprite" :alt="chefeBatalha.name" />
              </div>
            </div>
          </div>
          <div class="botoes-acao">
            <div class="falas">Fala Exemplo</div>
            <div class="action-buttons-grid">
              <button
                v-for="(ataque, idx) in ataques"
                :key="ataque.nome"
                @click="realizarAtaque(ataque)"
                class="pokemon-button"
                :class="{ 'cura-button': ataque.tipo === 'cura' }"
                :style="{ gridArea: gridAreaByIndex(idx) }"
              >
                <span class="btn-icon"></span>
                {{ ataque.nome }}
                <span class="damage-value">({{ ataque.dano }})</span>
              </button>
            </div>
        </div>
      </div>


        <router-link to="/map">
          <button class="pokemon-button menu-button">
            <span class="btn-icon">🏠</span>
            Voltar ao Mapa
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.battle-screen {
  background-image: url('@/assets/images/imgFundo.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.battle-overlay {
  background: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  backdrop-filter: blur(3px);
}

.mc-header {
  text-align: center;
  margin-bottom: 0.5rem;
}

.mc-header h1 {
  font-size: 3rem;
  margin-top: 2rem;
  color: #ffce1c;
  text-shadow:
    4px 4px 0 #931e30,
    2px 4px 0 #931e30,
    4px 2px 0 #931e30,
    6px 6px 0 rgba(147, 30, 48, 0.6),
    8px 8px 0 rgba(147, 30, 48, 0.4),
    10px 10px 0 rgba(147, 30, 48, 0.2);
}

.battle-interface {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
}

.health-bars-container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto 2rem auto;
  position: relative;
  height: 100px;
}

.player-health-bar {
  position: fixed;
  top: 120px;
  left: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
  image-rendering: pixelated;
}

.player-health-bar::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c;
  pointer-events: none;
}

.boss-health-bar {
  position: fixed;
  top: 120px;
  right: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
  image-rendering: pixelated;
}

.boss-health-bar::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c;
  pointer-events: none;
}

.health-container h3 {
  color: #ffce1c;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 0 #931e30;
}

.battle-sprites {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
}

.player-sprite {
  display: flex;
  align-items: center;
  justify-content: center;
}

.player-sprite img {
  width: 150px;
  height: 150px;
  image-rendering: pixelated;
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5));
}

.boss-sprite {
  display: flex;
  align-items: center;
  justify-content: center;
}

.boss-sprite img {
  width: 200px;
  height: 200px;
  image-rendering: pixelated;
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5));
}

.battle-arena {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}

.arena-container {
  width: 1600px;
  height: 640px;
  background-color: white;
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
  position: relative;
  overflow: hidden;
  margin: 2rem auto;
  background: url('@/assets/images/imgFundo3.png') no-repeat center;
  background-size: 100% 100%;
  image-rendering: pixelated;
}

.arena-container::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c;
  pointer-events: none;
  z-index: 10;
}

.botoes-acao {
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
  gap: 2rem;
  display: flex;
  top: 70%;
  position: absolute;
  justify-content: center;
  align-items: flex-start;
}

.falas {
  width: 100%;
  height: 110px;
  text-align: center;
  color: #222;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  background-color: white;
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  max-height: 110px;
  image-rendering: pixelated;
  z-index: 20;
  position: relative;
}

.falas::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c;
  pointer-events: none;
  border-radius: 4px;
}

.action-buttons-grid {
  display: grid;
  grid-template-areas:
    'a b'
    'c d';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px 8px;
  width: 100%;
  max-height: 110px;
  align-items: stretch;
  justify-items: stretch;
}

.action-buttons-grid .pokemon-button {
  width: 100%;
  height: 100%;
  min-width: 0;
  font-size: 0.75rem;
  padding: 4px 0;
  box-sizing: border-box;
}

@media (max-width: 700px) {
  .botoes-acao {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    position: static;
  }
  .falas, .action-buttons-grid {
    width: 100%;
    max-width: 100vw;
    min-width: 0;
    height: 70px;
    max-height: 70px;
  }
  .action-buttons-grid {
    gap: 4px 4px;
  }
  .action-buttons-grid .pokemon-button {
    font-size: 0.7rem;
    padding: 2px 0;
  }
}

.pokemon-button {
  background-color: white;
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
  position: relative;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  padding: 12px 20px;
  color: #222;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  image-rendering: pixelated;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
  justify-content: center;
}

.pokemon-button::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c;
  pointer-events: none;
}

.pokemon-button:hover {
  transform: scale(1.05);
  background-color: #f0f0f0;
}

.pokemon-button:active {
  transform: scale(0.97);
  background-color: #e0e0e0;
}

/* Estilo especial para o botão de cura */
.cura-button {
  background-color: #98FB98 !important;
  border-color: #228B22;
  color: #006400 !important;
}

.cura-button::before {
  border-color: #228B22;
}

.cura-button:hover {
  background-color: #90EE90 !important;
}

/* Estilo para o botão de menu */
.menu-button {
  background-color: #f5f5f5;
  border-color: #666;
  color: #333 !important;
}

.menu-button::before {
  border-color: #666;
}

.menu-button:hover {
  background-color: #e8e8e8;
}

.damage-value {
  font-size: 0.8em;
  opacity: 0.8;
  margin-left: 5px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #1e1e1e;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 4px solid #931e30;
  image-rendering: pixelated;
}

.modal h2 {
  color: #ffce1c;
  margin-bottom: 1rem;
  font-family: 'Press Start 2P', cursive;
}

.modal p {
  color: #fff;
  margin-bottom: 2rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
}

.modal button {
  padding: 10px 20px;
  background-color: #931e30;
  color: #ffce1c;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Press Start 2P', cursive;
  image-rendering: pixelated;
}

.modal button:hover {
  background-color: #b5243a;
}
</style>
