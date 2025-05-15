<template>
  <div class="credits-screen">
    <h1>Créditos</h1>
    <div class="credits-content">
      <div class="credit-section">
        <h2>Desenvolvimento</h2>
        <p>João Pedro</p>
      </div>
      <div class="credit-section">
        <h2>Design</h2>
        <p>Equipe SyntaxFight</p>
      </div>
      <div class="credit-section">
        <h2>Música</h2>
        <p>Compositor Original</p>
      </div>
    </div>
    <router-link to="/"><button>Voltar ao Menu</button></router-link>
  </div>
</template>

<style scoped>
.credits-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  background-color: #121212;
  color: #fff;
}

.credits-content {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2rem 0;
}

.credit-section {
  margin-bottom: 2rem;
  text-align: center;
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
}

button {
  margin-top: 2rem;
}
</style>