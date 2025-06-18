<template>
  <div class="victory-screen">
    <!-- Reduzindo o número de fogos de artifício -->
    <div class="fireworks">
      <div class="firework" v-for="n in isFinalVictory ? 6 : 3" :key="n"></div>
    </div>

    <div class="menu-container">
      <div class="victory-header">
        <h1>{{ isFinalVictory ? 'VITÓRIA SUPREMA!' : 'Vitória!' }}</h1>
        <div class="trophy">🏆</div>
      </div>

      <div class="content-wrapper">
        <div class="victory-message">
          <p class="main-message">{{ isFinalVictory ? 'Você é o Mestre da Sintaxe!' : 'Você Dominou a Sintaxe!' }}</p>
          <p class="sub-message">{{ isFinalVictory ? 'Todos os Bugs foram Exterminados!' : 'O Bug foi Derrotado!' }}</p>
          
          <div v-if="isFinalVictory" class="final-victory-message">
            <p>Parabéns! Você derrotou todos os professores e provou ser um verdadeiro mestre da programação!</p>
            <div class="achievement-unlocked">
              <span class="achievement-icon">🌟</span>
              <span class="achievement-text">Conquista Desbloqueada: "Syntax Master"</span>
            </div>
          </div>

          <div class="stats-container">
            <div class="stat-box">
              <div class="stat-header">Estatísticas da Batalha</div>
              <div class="stat-grid">
                <div class="stat-item">
                  <span class="stat-label">XP Ganho:</span>
                  <span class="stat-value">+100 XP</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Dano Total:</span>
                  <span class="stat-value">1337</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Combo Máximo:</span>
                  <span class="stat-value">x3</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Bônus:</span>
                  <span class="stat-value">+50 XP</span>
                </div>
              </div>
            </div>
          </div>

          <div class="rewards-container">
            <div class="reward-item">
              <span class="reward-icon">⭐</span>
              <span class="reward-text">{{ isFinalVictory ? 'Título: "Syntax Master"' : 'Desbloqueado: "Mestre do Debug"' }}</span>
            </div>
            <div class="reward-item" v-if="isFinalVictory">
              <span class="reward-icon">👑</span>
              <span class="reward-text">Forma Final: "Programador Supremo"</span>
            </div>
            <div class="reward-item">
              <span class="reward-icon">🎮</span>
              <span class="reward-text">{{ isFinalVictory ? 'Todas as Habilidades Desbloqueadas!' : 'Nova Habilidade: "Refatoração Supreme"' }}</span>
            </div>
          </div>
        </div>

        <div class="buttons-container">
          <router-link to="/map">
            <button class="continue-btn">
              <span class="btn-icon">🗺️</span>
              Continuar Jornada
            </button>
          </router-link>
          <router-link to="/battle">
            <button class="retry-btn">
              <span class="btn-icon">⚔️</span>
              Nova Batalha
            </button>
          </router-link>
          <router-link to="/">
            <button class="menu-btn">
              <span class="btn-icon">🏠</span>
              Menu Principal
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="confetti-container">
      <div class="confetti" v-for="n in isFinalVictory ? 40 : 20" :key="n" 
           :style="{ '--delay': n * 0.2 + 's', '--color': ['#ffce1c', '#931e30'][n % 2] }">
      </div>
    </div>
  </div>
</template>

<style scoped>
.victory-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #24b5f8;
  background-image: url('@/assets/images/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
}

.menu-container {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  box-shadow: 
    0 0 0 4px rgba(147, 30, 48, 0.8),
    0 0 0 8px rgba(255, 206, 28, 0.5),
    0 0 40px rgba(255, 206, 28, 0.3);
  backdrop-filter: blur(10px);
  width: 90%;
  max-width: 800px;
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.content-wrapper {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 10px;
  margin: 1rem 0;
}

.victory-header {
  text-align: center;
  position: relative;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 4rem;
  margin: 0;
  color: #ffce1c;
  text-shadow:
    4px 4px 0 #931e30,
    2px 4px 0 #931e30,
    4px 2px 0 #931e30;
  animation: victory-pulse 2s infinite;
}

.trophy {
  font-size: 4rem;
  position: absolute;
  top: -20px;
  right: -40px;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.7));
}

.victory-message {
  text-align: center;
}

.main-message {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  animation: scale-in 0.5s ease-out;
  text-align: center;
  width: 100%;
}

.sub-message {
  font-size: 1.2rem;
  color: #ffce1c;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 100%;
}

.stats-container {
  margin: 1.5rem 0;
}

.stat-box {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffce1c;
  border-radius: 10px;
  padding: 1.5rem;
}

.stat-header {
  color: #ffce1c;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  animation: fade-in 0.3s ease-out;
}

.stat-label {
  color: #fff;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: #ffce1c;
  font-size: 1.2rem;
  font-weight: bold;
}

.rewards-container {
  margin: 2rem 0;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  animation: slide-in 0.3s ease-out;
}

.reward-icon {
  font-size: 2rem;
}

.reward-text {
  color: #fff;
  font-size: 0.9rem;
}

.buttons-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

button {
  width: 100%;
  padding: 12px;
  font-size: 0.9rem;
  font-family: 'Press Start 2P', cursive;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffce1c;
  border-radius: 8px;
  color: #fff;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

button:hover {
  transform: translateY(-2px);
  background-color: rgba(255, 206, 28, 0.2);
  box-shadow: 0 5px 15px rgba(255, 206, 28, 0.3);
}

.continue-btn {
  background-color: rgba(76, 175, 80, 0.3);
}

.retry-btn {
  background-color: rgba(33, 150, 243, 0.3);
}

.menu-btn {
  background-color: rgba(255, 152, 0, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
}

/* Animações */
@keyframes victory-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(5deg); }
  50% { transform: translateY(-20px) rotate(-5deg); }
}

@keyframes scale-in {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes slide-in {
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes glow {
  0% { box-shadow: 0 0 10px rgba(255, 206, 28, 0.3); }
  100% { box-shadow: 0 0 20px rgba(255, 206, 28, 0.6); }
}

/* Efeitos visuais */
.fireworks {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.firework {
  position: absolute;
  width: 10px;
  height: 10px;
  animation: firework 2s infinite;
}

.firework::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #ffce1c, transparent);
  border-radius: 50%;
  animation: explosion 2s infinite;
}

@keyframes firework {
  0% { transform: translate(50vw, 100vh); }
  50% { transform: translate(50vw, 50vh); }
  100% { transform: translate(50vw, 0); }
}

@keyframes explosion {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(20); opacity: 0; }
}

.confetti-container {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: var(--color);
  clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
  animation: confetti-fall 4s var(--delay) infinite;
}

/* Estilização da scrollbar */
.content-wrapper::-webkit-scrollbar {
  width: 8px;
}

.content-wrapper::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.content-wrapper::-webkit-scrollbar-thumb {
  background: #ffce1c;
  border-radius: 4px;
}

.content-wrapper::-webkit-scrollbar-thumb:hover {
  background: #931e30;
}

.final-victory-message {
  background: rgba(255, 206, 28, 0.1);
  border: 2px solid #ffce1c;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: center;
  animation: glow 2s infinite alternate;
}

.achievement-unlocked {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.achievement-icon {
  font-size: 2.5rem;
  animation: rotate 3s infinite linear;
}

.achievement-text {
  color: #ffce1c;
  font-size: 1.2rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}
</style>

<script setup>
import { onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isFinalVictory = computed(() => route.query.final === 'true');

// Limpar timers e animações quando o componente for desmontado
onUnmounted(() => {
  const elements = document.querySelectorAll('.firework, .confetti');
  elements.forEach(el => {
    el.style.animation = 'none';
  });
});
</script>