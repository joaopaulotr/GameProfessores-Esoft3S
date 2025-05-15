<template>
  <div class="defeat-screen">
    <h1>Derrota!</h1>
    <div class="defeat-message">
      <p>Os bugs venceram desta vez... Mas você pode tentar novamente!</p>
      <div class="defeat-animation">
        <!-- Animação de derrota virá aqui -->
      </div>
    </div>
    <router-link to="/"><button>Voltar ao Menu</button></router-link>
    <router-link to="/map"><button class="retry-btn">Tentar Novamente</button></router-link>
  </div>
</template>

<style scoped>
.defeat-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #240a0a;
  color: #fff;
  text-align: center;
}

h1 {
  font-size: 4rem;
  color: #cc0000;
  text-shadow: 0 0 10px rgba(204, 0, 0, 0.8);
  animation: flicker 2s infinite alternate;
}

@keyframes flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow: 0 0 10px rgba(204, 0, 0, 0.8);
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}

.defeat-message {
  font-size: 1.5rem;
  margin: 2rem 0;
  max-width: 80%;
}

button {
  margin: 1rem 10px;
  font-size: 1.2rem;
  padding: 12px 24px;
  background-color: #cc0000;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  transform: scale(1.05);
  background-color: #ff0000;
}

.retry-btn {
  background-color: #444;
}

.retry-btn:hover {
  background-color: #666;
}
</style>