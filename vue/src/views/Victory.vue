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
                  <span class="stat-value">120</span>
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
              <span class="reward-text">{{ isFinalVictory ? 'Título: "Syntax Master"' : 'Desbloqueado: "Mestre do Debug"'  }}</span>
            </div>
            <div class="reward-item" v-if="isFinalVictory">
              <span class="reward-icon">👑</span>
              <span class="reward-text">Forma Final: "Programador Supremo"</span>
            </div>
            <div class="reward-item">
              <span class="reward-icon">🎮</span>
              <span class="reward-text">{{ isFinalVictory ? 'Todas as Habilidades Desbloqueadas!' : 'Nova Habilidade: "Refatoração Suprema"' }}</span>
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
          <router-link to="/menu">
            <button class="menu-btn">
              <span class="btn-icon">🏠</span>
              Voltar ao Menu
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Aumentando o número de efeitos visuais -->
    <div class="confetti-container">
      <div class="confetti" v-for="n in isFinalVictory ? 60 : 20" :key="n" 
           :style="{ '--delay': n * 0.1 + 's', '--color': getConfettiColor(n) }">
      </div>
    </div>

    <!-- Adicionando círculos de luz -->
    <div class="light-circles">
      <div class="light-circle" v-for="n in 5" :key="'light'+n"></div>
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
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;
}

button {
  background: linear-gradient(45deg, rgba(255, 206, 28, 0.2), rgba(147, 30, 48, 0.2));
  border: 3px solid #ffce1c;
  border-radius: 15px;
  padding: 15px 30px;
  font-size: 1.2rem;
  min-width: 280px;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ffce1c, #931e30, #ffce1c);
  z-index: -1;
  border-radius: 15px;
  animation: border-flow 3s linear infinite;
}

button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 10px 20px rgba(255, 206, 28, 0.3),
    0 0 40px rgba(255, 206, 28, 0.2),
    0 0 80px rgba(255, 206, 28, 0.1);
}

button:active {
  transform: translateY(1px) scale(0.98);
}

.continue-btn {
  background: linear-gradient(45deg, rgba(76, 175, 80, 0.2), rgba(56, 142, 60, 0.2));
}

.continue-btn::before {
  background: linear-gradient(45deg, #4CAF50, #388E3C, #4CAF50);
}

.retry-btn {
  background: linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(25, 118, 210, 0.2));
}

.retry-btn::before {
  background: linear-gradient(45deg, #2196F3, #1976D2, #2196F3);
}

.menu-btn {
  background: linear-gradient(45deg, rgba(255, 206, 28, 0.2), rgba(147, 30, 48, 0.2));
}

.menu-btn::before {
  background: linear-gradient(45deg, #ffce1c, #931e30, #ffce1c);
}

.btn-icon {
  font-size: 1.4rem;
  margin-right: 10px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
  animation: float-icon 2s ease-in-out infinite;
}

@keyframes float-icon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes border-flow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.light-circles {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.light-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 206, 28, 0.3) 0%, transparent 70%);
  animation: light-pulse 4s infinite;
  width: 300px;
  height: 300px;
}

.light-circle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.light-circle:nth-child(2) { top: 20%; right: 10%; animation-delay: 1s; }
.light-circle:nth-child(3) { bottom: 20%; left: 15%; animation-delay: 2s; }
.light-circle:nth-child(4) { bottom: 10%; right: 15%; animation-delay: 3s; }
.light-circle:nth-child(5) { top: 50%; left: 50%; animation-delay: 4s; }

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

@keyframes light-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

@keyframes border-flow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

// Função para gerar cores aleatórias para os confetes
const getConfettiColor = (n) => {
  const colors = ['#ffce1c', '#931e30', '#ffd700', '#ff6b6b', '#4cd964'];
  return colors[n % colors.length];
};

// Limpar timers e animações quando o componente for desmontado
onUnmounted(() => {
  const elements = document.querySelectorAll('.firework, .confetti, .light-circle');
  elements.forEach(el => {
    el.style.animation = 'none';
  });
});
</script>