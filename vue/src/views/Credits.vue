<template>
  <transition name="fade">
    <div class="credits-screen">
      <div class="pokemon-window">
        <h1>Créditos</h1>

        <div class="credits-roller">
          <div class="credits-content">

            <div class="credit-section">
              <h2>Coordenação do Projeto</h2>
              <p>João Paulo</p>
            </div>

            <div class="credit-section">
              <h2>Desenvolvimento</h2>
              <p>João Paulo</p>
              <p>Gustavo Pasquini</p>
              <p>Heitor Ferrari</p>
              <p>Gabriel Santos Furlanette</p>
              <p>Eduardo Barella</p>
            </div>

            <div class="credit-section">
              <h2>Design e Ilustração</h2>
              <p>Maria Eduarda</p>
              <p>João Paulo</p>
              <p>Heitor Ferrari</p>
            </div>

            <div class="credit-section">
              <h2>Trilha Sonora</h2>
              <p>Música 01 – "Battle Loop"</p>
              <p>Música 02 – "Menu Theme"</p>
            </div>
            
            <div class="credit-section">
              <h2>Tecnologias Utilizadas</h2>
              <p>Vue.js</p>
              <p>HTML5</p>
              <p>CSS3</p>
              <p>JavaScript</p>
              <p>Vite</p>
              <p>Pinia</p>
              <p>Fontes em estilo retrô</p>
            </div>

            <div class="credit-section">
              <h2>Agradecimentos Especiais</h2>
              <p>Professor Hugo Fumero</p>
              <p>Professor Moreno</p>
              <p>Professor Cidão</p>
              <p>Professor Ferlini</p>
              <p>Turma Engenharia de Software</p>
            </div>

          </div>
        </div>

        <div class="button-container">
          <router-link to="/menu">
            <button class="pixel-button">Voltar ao Menu</button>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.05s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.credits-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background-color: #24b5f8;
  background-image: url('@/assets/images/background.png');
  background-size: cover;
  background-position: center;
}

.pokemon-window {
  width: 90%;
  max-width: 600px;
  background-color: white;
  border: 4px solid #931e30;
  border-radius: 0;
  padding: 20px 30px;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
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
  border: 2px solid #ffce1c;
  pointer-events: none;
}

.credits-roller {
  height: 300px;
  overflow: hidden;
  position: relative;
  margin: 20px 0;
}

.credits-content {
  animation: initial-appear 1s ease-out forwards, roll-up 25s linear infinite 1s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  opacity: 0;
}

@keyframes initial-appear {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes roll-up {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  95% {
    transform: translateY(-100%);
    opacity: 1;
  }
  96% {
    transform: translateY(100%);
    opacity: 1;
  }
  100% {
    transform: translateY(80%);
    opacity: 1;
  }
}

.credit-section {
  margin-bottom: 1.5rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #ffce1c;
  text-shadow: 1px 1px 0 #931e30, 2px 2px 0 #931e30;
  text-align: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: #931e30;
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
  left: -10px;
  bottom: 13px;
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
