<template>
  <div class="victory-screen">
    <h1>Vitória!</h1>
    <div class="victory-message">
      <p>Parabéns! Você derrotou todos os bugs e se tornou o Mestre da Sintaxe!</p>
      <div class="victory-animation">
        <!-- Animação de vitória virá aqui -->
      </div>
    </div>
    <router-link to="/"><button>Voltar ao Menu</button></router-link>
  </div>
</template>

<style scoped>
.victory-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0a2440;
  color: #fff;
  text-align: center;
}

h1 {
  font-size: 4rem;
  color: #ffcc00;
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.8);
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px rgba(255, 204, 0, 0.8);
  }
  to {
    text-shadow: 0 0 20px rgba(255, 204, 0, 1), 0 0 30px rgba(255, 204, 0, 0.8);
  }
}

.victory-message {
  font-size: 1.5rem;
  margin: 2rem 0;
  max-width: 80%;
}

button {
  margin-top: 2rem;
  font-size: 1.2rem;
  padding: 12px 24px;
  background-color: #ffcc00;
  color: #0a2440;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
  background-color: #ffd700;
}
</style>