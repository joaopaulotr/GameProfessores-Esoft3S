<script setup>
import HealthBar from '../components/HealthBar.vue'
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { chefesBatalha, useDadosJogador } from '../utils/dadosBatalha.js'

// Pega os dados do jogador do armazenamento centralizado
const { vida, ataques, vitorias, derrotas, chefesDerrotados, vidaMaxima } = useDadosJogador()

// Estatísticas do jogador para a batalha atual
const playerStats = ref({
   name: 'Professor',
   health: vidaMaxima, // Sempre inicia com vida máxima ao entrar na batalha
   maxHealth: vidaMaxima,
   xp: 0,
   maxXp: 100,
   level: 1
})

// Pega o ID do chefe da rota ou usa o primeiro chefe como padrão
const route = useRoute()
const chefeBatalhaId = computed(() => Number(route.query.id) || 1)

// Encontra o chefe com base no ID da rota e inicializa suas estatísticas
const chefeBatalha = ref(null)
const bossStats = ref(null)

onMounted(() => {
  const audio = document.getElementById('bg-music');
  if (audio) {
    audio.pause();
    audio.src = musicaBatalha;
    audio.volume = 0.18;
    audio.currentTime = 0;
    audio.loop = true;
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

// Removidas funções de teste não utilizadas

// Sistema de level up
watch(() => playerStats.value.xp, (newXP) => {
   if (newXP >= playerStats.value.maxXp) {
      // Level up!
      playerStats.value.level++
      playerStats.value.xp = 0
      // Aumenta o máximo de XP necessário para o próximo nível
      playerStats.value.maxXp += Math.floor(playerStats.value.maxXp * 0.5)
      // Aumenta o HP máximo e cura totalmente
      playerStats.value.maxHealth += 20
      playerStats.value.health = playerStats.value.maxHealth

      // Exibe mensagem de level up (você pode adicionar um componente de notificação depois)
      alert(`Level Up! Você alcançou o nível ${playerStats.value.level}!`)
   }
})

const musicaBatalha = new URL('@/assets/music/musicaBatalha.mp3', import.meta.url).href;
const musicaMapa = new URL('@/assets/music/musicaMapa.mp3', import.meta.url).href;

// Troca a música para a de batalha ao entrar e volta para a do mapa ao sair
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
</script>

<template>
  <div class="battle-screen">
    <div class="battle-overlay">
      <div class="mc-header">
        <h1>Tela de Batalha</h1>
        <div class="level-display">Nível {{ playerStats.level }}</div>
      </div>

      <div class="battle-interface text-center">
        <div class="player-status">
          <HealthBar
            :name="playerStats.name"
            :health="playerStats.health"
            :maxHealth="playerStats.maxHealth"
            :xp="playerStats.xp"
            :maxXp="playerStats.maxXp"
          />
        </div>

        <div class="battle-arena">
          <div class="arena-container">
            <!-- Área de batalha -->
          </div>
        </div>
      </div>

      <div class="bottom-controls">
        <div class="action-buttons">
          <button
            v-for="ataque in ataques"
            :key="ataque.nome"
            @click="realizarAtaque(ataque)"
            class="action-btn"
          >
            <span class="btn-icon">⚔️</span>
            {{ ataque.nome }}
            <span class="damage-value">({{ ataque.dano }})</span>
          </button>
        </div>

        <div class="menu-buttons">
          <router-link to="/map">
            <button class="menu-btn">
              <span class="btn-icon">🏠</span>
              Voltar ao Menu
            </button>
          </router-link>
        </div>
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
  margin-bottom: 2rem;
}

.mc-header h1 {
  font-size: 3rem;
  color: #ffce1c;
  text-shadow:
    4px 4px 0 #931e30,
    2px 4px 0 #931e30,
    4px 2px 0 #931e30,
    6px 6px 0 rgba(147, 30, 48, 0.6),
    8px 8px 0 rgba(147, 30, 48, 0.4),
    10px 10px 0 rgba(147, 30, 48, 0.2);
}

.level-display {
  font-family: 'Press Start 2P', cursive;
  color: #ffce1c;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
  text-shadow: 2px 2px 0 #931e30;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #931e30;
  border-radius: 4px;
  display: inline-block;
}

.battle-interface {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
}

.player-status {
  position: absolute;
  top: 117px;
  left: 1275px;
  z-index: 10;
  background: #103040;
  padding: 15px;
  border: 4px solid #4898d8;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
}

.battle-arena {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}

.arena-container {
  width: 90%;
  height: 500px;
  background: rgba(30, 30, 30, 0.8);
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c,
              inset 0 0 50px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.arena-container::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c;
  border-radius: 4px;
  pointer-events: none;
}

.bottom-controls {
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.action-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

button {
  font-family: 'Press Start 2P', cursive;
  padding: 15px 25px;
  background-color: rgba(147, 30, 48, 0.9);
  color: #ffce1c;
  border: 2px solid #ffce1c;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
  justify-content: center;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

/* Estilo especial para o botão de cura */
button[class="action-btn"]:has(.btn-icon:contains("☕")) {
  background-color: rgba(34, 139, 34, 0.9) !important;
  border-color: #98FB98;
  color: #98FB98;
}

button[class="action-btn"]:has(.btn-icon:contains("☕")):hover {
  background-color: rgba(50, 160, 50, 0.9) !important;
  transform: translateY(-2px) scale(1.02);
}

/* Estilo para o botão de menu */
.menu-btn {
  background-color: rgba(40, 40, 40, 0.9) !important;
  border-color: #808080;
  color: #d3d3d3;
}

.menu-btn:hover {
  background-color: rgba(60, 60, 60, 0.9) !important;
  border-color: #a0a0a0;
}

.damage-value {
  font-size: 0.8em;
  opacity: 0.8;
  margin-left: 5px;
}

@keyframes glow {
  0% { box-shadow: 0 0 20px #ffce1c; }
  50% { box-shadow: 0 0 20px #ffc; }
  100% { box-shadow: 0 0 20px yellow; }
}

.arena-container {
  animation: glow 3s infinite;
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
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.modal h2 {
  color: #ffce1c;
  margin-bottom: 1rem;
}

.modal p {
  color: #fff;
  margin-bottom: 2rem;
}

.modal button {
  padding: 10px 20px;
  background-color: #931e30;
  color: #ffce1c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal button:hover {
  background-color: #b5243a;
}
</style>
