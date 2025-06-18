<template>
  <div class="intro-container">
    <div class="text-section">
      <div class="text-content">
        <p v-for="(text, index) in visibleText" :key="index" class="text-line"
           :style="{ animationDelay: `${index * 0.5}s` }">
          {{ text }}
        </p>
      </div>
    </div>
    <div class="skip-container" v-if="showContinue" @click="goToVideo">
      <button class="continue-button">
        <span class="btn-icon">▶</span>
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const showContinue = ref(false);
const visibleText = ref([]);

// Aqui você colocará o texto que vai me passar
const introText = [
  "Achou que poderia escapar facilmente?...",
  "Você passou pelas minhas aulas... mas nunca realmente entendeu o verdadeiro poder do Front-End.",
  "Agora, verá o que acontece quando um componente quebra... e todo o sistema cai junto."
];

let currentIndex = 0;
const textInterval = 2000; // 2 segundos entre cada linha

onMounted(() => {
  const timer = setInterval(() => {
    if (currentIndex < introText.length) {
      visibleText.value.push(introText[currentIndex]);
      currentIndex++;
    } else {
      clearInterval(timer);
      showContinue.value = true;
    }
  }, textInterval);
});

const goToVideo = () => {
  router.push({
    path: '/boss-fight-video',
    query: route.query
  });
};
</script>

<style scoped>
.intro-container {
  background-color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #ffce1c;
  font-family: 'Press Start 2P', cursive;
}

.text-section {
  max-width: 800px;
  width: 100%;
  margin: auto;
}

.text-content {
  text-align: center;
}

.text-line {
  margin: 1.5rem 0;
  font-size: 1.2rem;
  opacity: 0;
  animation: fadeIn 1s forwards;
  text-shadow: 3px 3px 0 #931e30;
}

.skip-container {
  margin-top: 3rem;
  text-align: center;
  animation: pulse 1.5s infinite;
}

.continue-button {
  background-color: transparent;
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c;
  color: #ffce1c;
  padding: 1rem 2rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.continue-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px #ffce1c;
}

.btn-icon {
  font-size: 1.4rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>
