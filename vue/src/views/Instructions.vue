<template>
  <div class="instructions-screen">
    <h1>Instruções</h1>
    <div class="instructions-content">
      <div class="instruction-section">
        <h2>Como Jogar</h2>
        <p>Explore o mapa usando as setas do teclado. Enfrente inimigos e aprimore suas habilidades de programação.</p>
      </div>
      <div class="instruction-section">
        <h2>Batalhas</h2>
        <p>Nas batalhas, escolha os ataques corretos baseados em princípios de programação para derrotar seus inimigos.</p>
      </div>
      <div class="instruction-section">
        <h2>Objetivo</h2>
        <p>Derrotar o Professor Chefe Final e se tornar o mestre da Sintaxe de Programação!</p>
      </div>
    </div>
    <router-link to="/"><button>Voltar ao Menu</button></router-link>
  </div>
</template>

<style scoped>
.instructions-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  background-color: #121212;
  color: #fff;
}

.instructions-content {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2rem 0;
}

.instruction-section {
  background-color: #1e1e1e;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

h2 {
  color: #5c6bc0;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
}

button {
  margin-top: 2rem;
}
</style>