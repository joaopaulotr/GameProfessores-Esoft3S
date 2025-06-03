<script setup>
import HealthBar from '../components/HealthBar.vue'
import { ref, watch, onMounted, onUnmounted } from 'vue'

const playerStats = ref({
   name: 'Aluno',
   health: 100,
   maxHealth: 100,
   xp: 0,
   maxXp: 100,
   level: 1
})

// Funções de teste
const damagePlayer = () => {
   if (playerStats.value.health > 10) {
      playerStats.value.health -= 10
   }
}

const healPlayer = () => {
   if (playerStats.value.health < playerStats.value.maxHealth) {
      playerStats.value.health = Math.min(playerStats.value.maxHealth, playerStats.value.health + 10)
   }
}

const addXP = () => {
   if (playerStats.value.xp < playerStats.value.maxXp) {
      playerStats.value.xp = Math.min(playerStats.value.maxXp, playerStats.value.xp + 10)
   }
}

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

// Troca a música para a de batalha ao entrar e volta para a do mapa ao sair
onMounted(() => {
  const audio = document.getElementById('bg-music');
  if (audio) {
    // Para a música atual
    audio.pause();
    // Carrega a música de batalha
    audio.src = require('@/assets/music/musicaBatalha.mp3');
    audio.volume = 0.18;
    audio.currentTime = 0;
    audio.loop = true;
    // Toca a nova música
    audio.play().catch(e => console.log('Erro ao tocar música de batalha:', e));
  }
});

onUnmounted(() => {
  const audio = document.getElementById('bg-music');
  if (audio) {
    // Para a música de batalha
    audio.pause(); 
    // Volta para a música do mapa
    audio.src = require('@/assets/music/musicaMapa.mp3');
    audio.volume = 0.18;
    audio.currentTime = 0;
    audio.loop = true;
    // Toca a música do mapa
    audio.play().catch(e => console.log('Erro ao tocar música do mapa:', e));
  }
});
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
        
        <div class="test-buttons">
          <button @click="damagePlayer" class="damage-btn">
            <span class="btn-icon">💔</span>
            Tomar Dano (-10)
          </button>
          <button @click="healPlayer" class="heal-btn">
            <span class="btn-icon">💖</span>
            Curar (+10)
          </button>
          <button @click="addXP" class="xp-btn">
            <span class="btn-icon">⭐</span>
            Ganhar XP (+10)
          </button>
        </div>

        <div class="battle-arena">
          <div class="arena-container">
            <!-- Área de batalha -->
          </div>
        </div>
      </div>

      <div class="bottom-controls">
        <div class="action-buttons">
          <button class="action-btn">
            <span class="btn-icon">⚔️</span>
            Atacar
          </button>
          <button class="action-btn">
            <span class="btn-icon">🛡️</span>
            Defender
          </button>
          <button class="action-btn">
            <span class="btn-icon">📚</span>
            Habilidades
          </button>
        </div>

        <div class="menu-buttons">
          <router-link to="/">
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

button:hover {
  transform: translateY(-2px) scale(1.02);
  background-color: rgba(185, 38, 57, 0.9);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
}

button:active {
  transform: translateY(1px);
}

.btn-icon {
  font-size: 1.2em;
}

.test-buttons {
  position: fixed;
  top: 200px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 10;
}

.damage-btn { background-color: rgba(231, 76, 60, 0.9); }
.heal-btn { background-color: rgba(46, 204, 113, 0.9); }
.xp-btn { background-color: rgba(52, 152, 219, 0.9); }

.damage-btn:hover { background-color: rgba(231, 76, 60, 1); }
.heal-btn:hover { background-color: rgba(46, 204, 113, 1); }
.xp-btn:hover { background-color: rgba(52, 152, 219, 1); }

.action-btn {
  background-color: rgba(147, 30, 48, 0.9);
  min-width: 180px;
}

.menu-btn {
  background-color: rgba(44, 62, 80, 0.9);
  min-width: 250px;
}

@keyframes glow {
  0% { box-shadow: 0 0 20px #ffce1c; }
  50% { box-shadow: 0 0 20px #ffc; }
  100% { box-shadow: 0 0 20px yellow; }
}

.arena-container {
  animation: glow 3s infinite;
}
</style>
