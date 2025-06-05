<script setup>
// Importamos ref para estado reativo
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  boss: {
    type: Object,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

// Estado para controlar a animação intensificada quando o jogador está próximo
const isPlayerNearby = ref(false);

// Escutar evento personalizado para saber quando o jogador está próximo
function handlePlayerProximity(e) {
  if (e.detail.bossId === props.boss.id) {
    isPlayerNearby.value = e.detail.isNear;
  }
}

onMounted(() => {
  document.addEventListener('professorProximity', handlePlayerProximity);
});

onUnmounted(() => {
  document.removeEventListener('professorProximity', handlePlayerProximity);
});
</script>

<template>
  <div
    class="professor-boss"
    :class="{ 'player-nearby': isPlayerNearby }"
    :style="{
      left: `${x}px`,
      top: `${y}px`
    }"
    title="Desafiar {{ boss.nome }}"
  >
    <img :src="boss.sprite" :alt="boss.nome" class="boss-sprite" />
    <div class="boss-label" :class="{ 'label-highlight': isPlayerNearby }">
      {{ boss.nome }}
    </div>
  </div>
</template>

<style scoped>
.professor-boss {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
}
.boss-sprite {
  width: 64px;
  height: 64px;
  image-rendering: pixelated;
  filter: drop-shadow(0 0 8px #ffce1c);
  transition: all 0.3s ease-in-out;
}

/* Animação padrão para boss */
.boss-sprite {
  animation: float 2s ease-in-out infinite alternate;
}

/* Animação intensificada quando o jogador está próximo */
.player-nearby .boss-sprite {
  animation: float-excited 1s ease-in-out infinite alternate;
  transform: scale(1.1);
  filter: drop-shadow(0 0 12px #ffce1c) brightness(1.2);
}

@keyframes float {
  0% { transform: translateY(0); filter: drop-shadow(0 0 8px #ffce1c); }
  100% { transform: translateY(-5px); filter: drop-shadow(0 0 12px #931e30); }
}

@keyframes float-excited {
  0% { transform: translateY(0) scale(1.1) rotate(-3deg); filter: drop-shadow(0 0 15px #ffce1c); }
  100% { transform: translateY(-8px) scale(1.15) rotate(3deg); filter: drop-shadow(0 0 20px #931e30); }
}

.boss-label {
  margin-top: 4px;
  background: rgba(255, 255, 255, 0.85);
  color: #931e30;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  padding: 2px 8px;
  border: 2px solid #ffce1c;
  border-radius: 4px;
  box-shadow: 0 2px 0 #931e30;
  text-align: center;
  pointer-events: none;
  transition: all 0.3s ease;
}

/* Destacar o rótulo quando o jogador está próximo */
.label-highlight {
  background-color: #ffce1c;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 0 #931e30;
  animation: pulse-label 1s infinite alternate;
}

@keyframes pulse-label {
  0% { transform: translateY(-2px) scale(1); }
  100% { transform: translateY(-2px) scale(1.05); }
}
</style>