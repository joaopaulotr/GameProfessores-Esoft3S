<template>
  <div class="commands-screen">
    <div class="pokemon-window">
      <h1>Comandos</h1>
      <div class="commands-grid">
        <div class="command-section">
          <h2>Movimentação</h2>
          <ul>
            <br>
            <li><span class="command-key">↑↓←→</span> Mover</li>
          </ul>
        </div>

        <div class="command-section">
          <h2>Interação</h2>
          <ul>
            <br>
            <li><span class="command-key">E</span> Interagir</li>
          </ul>
        </div>

        <div class="command-section">
          <h2>Batalha</h2>
          <ul>
            <br>
            <li><span class="command-key">1-4</span> Ataques</li>
          </ul>
        </div>

        <div class="command-section">
          <h2>Dicas</h2>
          <ul>
            <li>Use ataques sabiamente</li>
            <li>Observe padrões</li>
          </ul>
        </div>
      </div>

      <div class="button-container">
        <router-link to="/">
          <button class="pixel-button">
            <span class="button-icon">🏠</span>
            Menu
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.commands-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #24b5f8 0%, #1a8ac7 100%);
  background-image: url('@/assets/images/background.png');
  background-size: cover;
  background-position: center;
  position: relative;
}

.pokemon-window {
  width: 90%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.95);
  border: 4px solid #931e30;
  padding: 1.5rem;
  box-shadow: 0 0 0 4px #ffce1c, 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 2;
  animation: window-appear 0.5s ease-out;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0;
}

.command-section {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border: 2px solid #ffce1c;
  border-radius: 8px;
}

h1 {
  font-size: 1.8rem;
  color: #931e30;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 0 #ffce1c;
}

h2 {
  color: #931e30;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px dashed #ffce1c;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.command-key {
  display: inline-block;
  background-color: #931e30;
  color: #ffce1c;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  min-width: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 0 #630a19;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pixel-button {
  background-color: #931e30;
  border: 2px solid #ffce1c;
  color: #ffce1c;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.9rem;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.pixel-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(147, 30, 48, 0.3);
  background-color: #a52235;
}

.button-icon {
  font-size: 1.2rem;
}

@keyframes window-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .commands-grid {
    grid-template-columns: 1fr;
  }
  
  .pokemon-window {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  .command-key {
    font-size: 0.7rem;
  }
}
</style>

<script setup>
// Lógica do componente aqui se necessário
</script>
