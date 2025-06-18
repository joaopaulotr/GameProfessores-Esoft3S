<template>
  <div class="defeat-screen">
    <div class="blood-vignette"></div>
    
    <div class="defeat-overlay">
      <div class="menu-container">
        <div class="defeat-header">
          <h2>💀 GAME OVER 💀</h2>
          <div class="defeat-effects">
            <div class="glitch"></div>
            <div class="glitch"></div>
            <div class="glitch"></div>
          </div>
        </div>

        <div class="defeat-info">
          <p class="boss-message">O Bug te derrotou!</p>
          
          <div class="stats-container">
            <div class="stat-item">
              <span class="stat-label">Dano Causado:</span>
              <span class="stat-value">{{ battleStats.damageDone }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Tempo de Batalha:</span>
              <span class="stat-value">{{ battleStats.battleTime }}</span>
            </div>
          </div>

          <div class="glitch-container">
            <div class="glitch-text">SYNTAX ERROR</div>
          </div>

          <div class="tip-container">
            <div class="tip-box">
              <span class="tip-icon">💡</span>
              <p class="tip-text">{{ randomTip }}</p>
            </div>
          </div>
        </div>

        <div class="defeat-buttons">
          <router-link :to="'/battle?id=' + bossId">
            <button class="retry-btn">
              <span class="btn-icon">⚔️</span>
              Tentar Novamente
            </button>
          </router-link>
          <router-link to="/menu">
            <button class="menu-btn">
              <span class="btn-icon">🏠</span>
              Menu Principal
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const battleStats = ref({
  damageDone: route.query.damage || 0,
  battleTime: route.query.time || '0:00'
});

const bossId = route.query.bossId;

// Lista de dicas para mostrar quando perder
const tips = [
  "Use o 'Café Restaurador' estrategicamente para recuperar vida durante a batalha!",
  "Alterne entre ataques fortes e fracos para otimizar o dano!",
  "É possivel usar o café restaurador e atacar logo em seguida!",
  "Mantenha sua vida acima de 50% para maior segurança!"
];

// Seleciona uma dica aleatória
const randomTip = tips[Math.floor(Math.random() * tips.length)];
</script>

<style scoped>
.defeat-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #8B0000; /* Vermelho escuro intenso */
  background-image: url('@/assets/images/background.png');
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  position: relative;
  overflow: hidden;
}

.blood-vignette {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    transparent 10%, 
    rgba(128, 0, 0, 0.5) 50%, 
    rgba(80, 0, 0, 0.9) 100%
  );
  pointer-events: none;
  animation: pulse-vignette 4s infinite alternate;
  z-index: 1;
}

.defeat-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at center, 
    rgba(139, 0, 0, 0.85), 
    rgba(80, 0, 0, 0.95)
  );
  backdrop-filter: blur(8px);
  z-index: 2;
}

.menu-container {
  background: rgba(0, 0, 0, 0.9);
  border-radius: 20px;
  border: 4px solid #ff0000;
  box-shadow: 
    0 0 50px rgba(255, 0, 0, 0.5),
    0 0 100px rgba(255, 0, 0, 0.3),
    inset 0 0 30px rgba(255, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
  padding: 0.8rem;
  aspect-ratio: 4/5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;
}

.defeat-header {
  margin-bottom: 0.3rem;
}

.defeat-header h2 {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin: 0.3rem 0;
  color: #ff0000;
  text-shadow: 
    0 0 20px rgba(255, 0, 0, 0.8),
    0 0 40px rgba(255, 0, 0, 0.4),
    0 0 60px rgba(255, 0, 0, 0.2),
    3px 3px 0 #000;
  animation: glitch 0.5s infinite, text-flicker 3s infinite;
  letter-spacing: 4px;
}

.glitch-container {
  margin: 0.3rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.glitch-text {
  font-size: 1.1rem;
  font-family: 'Press Start 2P', monospace;
  color: #ff0000;
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.8),
    -3px -3px 0 rgba(255, 0, 0, 0.7);
  animation: text-flicker 2s infinite;
  letter-spacing: 2px;
  text-align: center;
}

.defeat-info {
  width: 100%;
  gap: 0.3rem;
}

.boss-message {
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  margin: 0.3rem 0;
  text-align: center;
  color: #fff;
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 0, 0, 0.7);
  animation: pulse-text 2s infinite;
  letter-spacing: 1px;
}

.stats-container {
  width: 95%;
  padding: 0.5rem;
  margin: 0.3rem auto;
  background: rgba(255, 0, 0, 0.15);
  border: 3px solid rgba(255, 0, 0, 0.5);
  border-radius: 12px;
  box-shadow: 
    0 0 20px rgba(255, 0, 0, 0.3),
    inset 0 0 10px rgba(255, 0, 0, 0.3);
}

.stat-item {
  margin: 0.2rem 0;
  padding: 0.2rem;
  font-size: 0.8rem;
}

.stat-value {
  font-size: 0.9rem;
  color: #ff3333;
  font-weight: bold;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.tip-box {
  width: 95%;
  padding: 0.5rem;
  margin: 0.3rem auto;
  gap: 0.8rem;
  background: rgba(255, 0, 0, 0.15);
  border: 3px solid #ff0000;
  border-radius: 12px;
  box-shadow: 0 0 25px rgba(255, 0, 0, 0.3);
  animation: pulse-box 3s infinite alternate;
}

.tip-icon {
  font-size: 1.2rem;
  animation: float 3s ease-in-out infinite;
}

.tip-text {
  font-size: clamp(0.65rem, 2vw, 0.8rem);
  color: #fff;
  margin: 0;
  text-align: left;
  line-height: 1.2;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.defeat-buttons {
  margin-top: 0.5rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  min-width: 110px;
  padding: 0.4rem 0.8rem;
  font-size: 0.7rem;
  gap: 0.5rem;
  font-family: 'Press Start 2P', cursive;
  background: rgba(255, 0, 0, 0.2);
  border: 3px solid #ff0000;
  border-radius: 12px;
  color: #fff;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

button:hover {
  transform: translateY(-4px) scale(1.05);
  background: rgba(255, 0, 0, 0.3);
  box-shadow: 
    0 8px 25px rgba(255, 0, 0, 0.4),
    0 0 50px rgba(255, 0, 0, 0.2);
}

button:active {
  transform: translateY(0) scale(0.98);
}

.retry-btn {
  background: rgba(255, 0, 0, 0.3);
  border-color: #ff3333;
}

.menu-btn {
  background: rgba(255, 0, 0, 0.2);
  border-color: #cc0000;
}

.btn-icon {
  font-size: 1rem;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-bg {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}

@keyframes glow-red {
  0% { box-shadow: 
    0 0 50px rgba(255, 0, 0, 0.3),
    0 0 100px rgba(255, 0, 0, 0.2),
    inset 0 0 30px rgba(255, 0, 0, 0.2);
  }
  100% { box-shadow: 
    0 0 60px rgba(255, 0, 0, 0.5),
    0 0 120px rgba(255, 0, 0, 0.3),
    inset 0 0 40px rgba(255, 0, 0, 0.4);
  }
}

@keyframes text-flicker {
  0%, 100% { opacity: 1; }
  10%, 90% { opacity: 0.8; }
  20%, 80% { opacity: 0.9; }
  30%, 70% { opacity: 0.7; }
  40%, 60% { opacity: 0.9; }
  50% { opacity: 0.8; }
}

@keyframes pulse-text {
  0%, 100% { text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.7); }
  50% { text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.9); }
}

@keyframes pulse-box {
  0% { box-shadow: 0 0 25px rgba(255, 0, 0, 0.3); }
  100% { box-shadow: 0 0 40px rgba(255, 0, 0, 0.5); }
}

@keyframes pulse-vignette {
  0% { opacity: 0.7; }
  100% { opacity: 0.9; }
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-4px, 4px); }
  40% { transform: translate(-4px, -4px); }
  60% { transform: translate(4px, 4px); }
  80% { transform: translate(4px, -4px); }
  100% { transform: translate(0); }
}

@keyframes glitch-line {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
</style>