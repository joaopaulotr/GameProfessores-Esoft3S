<template>
  <div class="menu-screen">
    <div class="menu-container">
      <h1>Syntax Fight</h1>
      <h1 class="subtitle">Batalha no DOM</h1>

      <div class="buttons-container">
        <router-link to="/map"><button>Jogar</button></router-link>
        <button v-if="jogado" @click="resetGame">Novo Jogo</button>
        <router-link to="/credits"><button>Créditos</button></router-link>
        <router-link to="/commands"><button>Comandos</button></router-link>
      </div>
      
    </div>

    <div class="cloud"></div>
  
    <div class="falling-leaves">
      <div class="leaf" style="left: 5%;  animation-duration: 6s;  animation-delay: 0s;"></div>
      <div class="leaf" style="left: 15%; animation-duration: 7s;  animation-delay: 1.5s;"></div>
      <div class="leaf" style="left: 25%; animation-duration: 6.5s; animation-delay: 3s;"></div>
      <div class="leaf" style="left: 35%; animation-duration: 8s;  animation-delay: 2s;"></div>
      <div class="leaf" style="left: 45%; animation-duration: 9s;  animation-delay: 0.5s;"></div>
      <div class="leaf" style="left: 55%; animation-duration: 7.5s; animation-delay: 1s;"></div>
      <div class="leaf" style="left: 65%; animation-duration: 6s;  animation-delay: 3.5s;"></div>
      <div class="leaf" style="left: 75%; animation-duration: 8.5s; animation-delay: 2.5s;"></div>
      <div class="leaf" style="left: 85%; animation-duration: 10s; animation-delay: 4s;"></div>
      <div class="leaf" style="left: 95%; animation-duration: 7s;  animation-delay: 0.8s;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core';

const router = useRouter()
const jogado = ref(false)

onMounted(() => {
  const valorBossDerrotados = useStorage('chefesDerrotados').value;
  jogado.value = Boolean(valorBossDerrotados)
})


function resetGame() {
  localStorage.clear()
  router.replace('/')
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
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow:
    0 0 0 4px rgba(147, 30, 48, 0.8),
    0 0 0 8px rgba(255, 206, 28, 0.5),
    0 0 20px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  max-width: 90%;
  width: 500px;
}

h1 {
  font-size: 4.5rem;
  margin: 0;
  text-align: center;
  color: #ffce1c;
  text-shadow:
    4px 4px 0 #931e30,
    2px 4px 0 #931e30,
    4px 2px 0 #931e30,
    6px 6px 0 rgba(147, 30, 48, 0.6),
    8px 8px 0 rgba(147, 30, 48, 0.4),
    10px 10px 0 rgba(147, 30, 48, 0.2);
}

.subtitle {
  font-size: 1rem;
  margin: 10px 0 25px 0;
  color: #fff;
  text-shadow:
    2px 2px 0 #931e30,
    1px 2px 0 #931e30,
    2px 1px 0 #931e30,
    3px 3px 0 rgba(147, 30, 48, 0.6);
  letter-spacing: 2px;
  font-weight: bold;
  animation: pulse 2s infinite alternate;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

button {
  width: 250px;
  font-size: 1rem;
  padding: 8px 0;
  font-family: 'Press Start 2P', cursive;
  background: transparent;
  border: none;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.2s ease;
  position: relative;
  text-shadow:
    2px 2px 0 rgba(0, 0, 0, 0.5),
    1px 1px 0 rgba(0, 0, 0, 0.5);
}

button:hover {
  cursor: pointer;
  transform: scale(1.05);
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.7),
    1px 1px 0 rgba(0, 0, 0, 0.7);
}

button:hover::before {
  content: "►";
  position: absolute;
  left: 5px;
  bottom: 15px;
  color: #ffce1c;
}

button:active {
  transform: scale(0.98);
}

@keyframes pulse {
  from {
    text-shadow:
      2px 2px 0 #931e30,
      1px 2px 0 #931e30,
      2px 1px 0 #931e30,
      3px 3px 0 rgba(147, 30, 48, 0.6);
  }
  to {
    text-shadow:
      2px 2px 0 #931e30,
      1px 2px 0 #931e30,
      2px 1px 0 #931e30,
      4px 4px 0 rgba(147, 30, 48, 0.4);
  }
}

@keyframes fallLeaf {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateX(50px) translateY(300px) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: translateX(-50px) translateY(600px) rotate(360deg);
    opacity: 0;
  }
}

.leaf {
  position: absolute;
  top: 0;
  width: 50px;
  height: 50px;
  background: url('@/assets/images/leaf.png') no-repeat center;
  background-size: cover;
  animation: fallLeaf ease-in-out infinite;
}
</style>

