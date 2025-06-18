<template>
  <div class="menu-screen">
    <div class="menu-container">
      <h1>Syntax Fight</h1>
      <h2 class="subtitle">Batalha no DOM</h2>

      <div class="buttons-container">
        <button v-if="jogado" @click="continuarJogo">Continuar</button>
        <router-link to="/map"><button>Jogar</button></router-link>
        <button v-if="jogado" @click="resetGame">Novo Jogo</button>
        <router-link to="/credits"><button>Créditos</button></router-link>
        <router-link to="/commands"><button>Comandos</button></router-link>
      </div>
    </div>

    <div class="falling-leaves">
      <div
        class="leaf"
        v-for="n in 10"
        :key="n"
        :style="{
          left: `${n * 10}%`,
          animationDuration: `${6 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 3}s`,
        }"
      ></div>
    </div>

    <!-- Áudios -->
    <audio ref="hoverSound" src="@/assets/sounds/hover.mp3"></audio>
    <audio ref="clickSound" src="@/assets/sounds/click.mp3"></audio>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

const router = useRouter()
const jogado = ref(false)
const hoverSound = ref(null)
const clickSound = ref(null)

onMounted(() => {
  const valorBossDerrotados = useStorage('chefesDerrotados').value
  jogado.value = Boolean(valorBossDerrotados)
})

function resetGame() {
  localStorage.clear()
  router.replace('/')
}

function continuarJogo() {
  router.push('/map')
}

function playHoverSound() {
  hoverSound.value?.play()
}

function playClickSound() {
  clickSound.value?.play()
}
</script>

<style scoped>
.menu-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #24b5f8 url('@/assets/images/background.png') center/cover no-repeat fixed;
  color: #fff;
  overflow: hidden;
  animation: fadeIn 1.2s ease-in-out;
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  background: rgba(0, 0, 0, 0.65);
  border-radius: 20px;
  box-shadow:
    0 0 0 4px #931e30cc,
    0 0 0 8px #ffce1c88,
    0 0 40px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  max-width: 95%;
  width: 480px;
  animation: scaleIn 0.8s ease-in-out;
}

h1 {
  font-size: 3.8rem;
  margin: 0;
  text-align: center;
  color: #ffce1c;
  text-shadow: 3px 3px 0 #931e30, 5px 5px 0 rgba(0, 0, 0, 0.4);
}

.subtitle {
  font-size: 1.2rem;
  margin: 12px 0 28px;
  color: #ffffffdd;
  text-shadow: 1px 1px 0 #931e30, 2px 2px 0 rgba(147, 30, 48, 0.6);
  font-weight: bold;
  animation: pulse 2s infinite alternate;
  letter-spacing: 1.5px;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin-top: 20px;
}

button {
  width: 260px;
  font-size: 1rem;
  padding: 12px 0;
  font-family: 'Press Start 2P', cursive;
  background: linear-gradient(to bottom, #ffce1c 0%, #b88b00 100%);
  border: 2px solid #931e30;
  border-radius: 10px;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 0 4px 0 #931e30;
  transition: all 0.3s ease;
  position: relative;
}

button:hover {
  cursor: pointer;
  transform: scale(1.06);
  background: linear-gradient(to bottom, #fff36e, #e7a600);
  box-shadow: 0 0 15px #ffce1caa;
  color: #000;
}

button:active {
  transform: scale(0.97);
  box-shadow: 0 0 8px #931e30aa;
}

button:focus {
  outline: none;
}

button::before {
  content: "▶";
  position: absolute;
  left: 10px;
  color: #931e30;
  opacity: 0;
  transition: opacity 0.2s;
}

button:hover::before {
  opacity: 1;
}

.falling-leaves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.leaf {
  position: absolute;
  top: -60px;
  width: 40px;
  height: 40px;
  background: url('@/assets/images/leaf.png') no-repeat center;
  background-size: cover;
  animation: fallLeaf linear infinite;
  opacity: 0.8;
}

@keyframes fallLeaf {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  50% {
    transform: translateX(50px) translateY(300px) rotate(180deg);
  }
  100% {
    transform: translateX(-50px) translateY(600px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes pulse {
  from {
    text-shadow: 1px 1px 0 #931e30, 2px 2px 0 #931e30;
  }
  to {
    text-shadow: 2px 2px 0 #931e30, 4px 4px 0 rgba(147, 30, 48, 0.5);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
