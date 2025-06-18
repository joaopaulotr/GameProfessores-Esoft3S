<template>
  <div class="commands-screen">
    <div class="pokemon-window">
      <h1 class="commands-title">Comandos</h1>
      <div class="commands-grid">
        <div class="command-section">
          <h2>Movimentação</h2>
          <ul>
            <li><span class="command-key">↑↓←→</span> Mover</li>
          </ul>
        </div>
        <div class="command-section">
          <h2>Interação</h2>
          <ul>
            <li><span class="command-key">E</span> Interagir</li>
          </ul>
        </div>
        <div class="command-section">
          <h2>Batalha</h2>
          <ul>
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
        <router-link to="/menu">
          <button class="pixel-button">
            <span class="button-icon">🏠</span>
            Menu
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Nada necessário por enquanto
</script>

<style scoped>
.commands-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #24b5f8 url('@/assets/images/background.png') center/cover no-repeat fixed;
  overflow: hidden;
  animation: fadeIn 1.2s ease-in-out;
}

.pokemon-window {
  background: rgba(0, 0, 0, 0.65);
  padding: 30px;
  border-radius: 20px;
  box-shadow:
    0 0 0 4px #931e30cc,
    0 0 0 8px #ffce1c88,
    0 0 40px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  width: 95%;
  max-width: 580px;
  animation: scaleIn 0.8s ease-in-out;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.commands-title {
  font-size: 3.2rem;
  color: #ffce1c;
  text-shadow: 3px 3px 0 #931e30, 5px 5px 0 rgba(0, 0, 0, 0.4);
  text-align: center;
  margin-bottom: 0;
}

.commands-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  justify-items: center;
  width: 100%;
}

.command-section {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border: 2px solid #ffce1c;
  border-radius: 10px;
  text-align: center;
  width: 90%;
}

h2 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #ffce1c;
  border-bottom: 2px dashed #931e30;
  padding-bottom: 0.3rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  font-family: 'Press Start 2P', cursive;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.command-key {
  display: inline-block;
  background-color: #931e30;
  color: #ffce1c;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  margin-right: 0.5rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  min-width: 2rem;
  text-align: center;
  box-shadow: 0 2px 0 #630a19;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.pixel-button {
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.pixel-button:hover {
  transform: scale(1.06);
  background: linear-gradient(to bottom, #fff36e, #e7a600);
  box-shadow: 0 0 15px #ffce1caa;
  color: #000;
}

.pixel-button:active {
  transform: scale(0.97);
  box-shadow: 0 0 8px #931e30aa;
}

.pixel-button:focus {
  outline: none;
}

.button-icon {
  font-size: 1.3rem;
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

@media (max-width: 480px) {
  .commands-grid {
    grid-template-columns: 1fr;
  }

  .commands-title {
    font-size: 2.3rem;
  }

  .command-key {
    font-size: 0.6rem;
    min-width: 1.5rem;
  }

  .pixel-button {
    width: 200px;
    font-size: 0.9rem;
  }
}
</style>
