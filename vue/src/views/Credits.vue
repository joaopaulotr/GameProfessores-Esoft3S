<template>
  <div class="credits-screen">
    <div class="pokemon-window">
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
      <div class="button-container">
        <router-link to="/">
          <button class="pixel-button">Voltar ao Menu</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.credits-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background-color: #24b5f8; /* Azul do seu projeto */
  background-image: url('@/assets/images/background.png');
  background-size: cover;
  background-position: center;
}

.pokemon-window {
  width: 90%;
  max-width: 600px;
  background-color: white;
  border: 4px solid #931e30; /* Vermelho escuro do seu projeto */
  border-radius: 0;
  padding: 20px 30px;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30; /* Borda amarela externa */
  position: relative;
  font-family: 'Press Start 2P', monospace;
  image-rendering: pixelated;
}

.pokemon-window::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c; /* Bordas internas amarelas */
  pointer-events: none;
}

.credits-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1.5rem 0;
}

.credit-section {
  margin-bottom: 1.5rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #ffce1c; /* Amarelo do seu projeto */
  text-shadow: 1px 1px 0 #931e30, 2px 2px 0 #931e30;
  text-align: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: #931e30; /* Vermelho escuro do seu projeto */
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

p {
  font-size: 0.9rem;
  color: #000;
  margin-bottom: 0.5rem;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pixel-button {
  background-color: transparent;
  border: none;
  color: #931e30;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  position: relative;
  transition: all 0.2s ease;
}

.pixel-button::before {
  content: '►';
  position: absolute;
  left: -15px;
  opacity: 0;
  transition: all 0.2s ease;
}

.pixel-button:hover::before {
  opacity: 1;
  left: -10px;
}

.pixel-button:hover {
  color: #ffce1c;
  text-shadow: 1px 1px 0 #931e30;
}
</style>