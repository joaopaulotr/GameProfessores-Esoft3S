<template>
  <div class="commands-screen">
    <audio
      src="@/assets/music/musicaMapa.mp3"
      autoplay
      loop
      volume="0.5"
      id="bg-music"
    ></audio>
    <div class="pokemon-window">
      <h1>Comandos e Controles</h1>
      <div class="commands-container">
        <div class="command-section">
          <h2>Controles de Teclado</h2>
          <ul>
            <li><span class="command-key">Setas</span>: Movimentação</li>
            <li><span class="command-key">Espaço</span>: Atacar</li>
            <li><span class="command-key">E</span>: Interagir</li>
          </ul>
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
.commands-screen {
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
  max-width: 700px;
  background-color: white;
  border: 4px solid #931e30; /* Vermelho escuro do seu projeto */
  border-radius: 0;
  padding: 20px 30px;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30; /* Borda amarela externa */
  position: relative;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
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

.commands-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1.5rem 0;
}

.command-section {
  background-color: transparent;
  padding: 0.8rem;
  margin-bottom: 1.2rem;
  border-top: 2px dashed #ffce1c;
  border-bottom: 2px dashed #ffce1c;
}

h1 {
  font-size: 1.8rem;
  color: #ffce1c; /* Amarelo do seu projeto */
  text-shadow: 1px 1px 0 #931e30, 2px 2px 0 #931e30;
  text-align: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: #931e30; /* Vermelho escuro do seu projeto */
  margin-bottom: 0.8rem;
  font-size: 1rem;
  text-transform: uppercase;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  position: relative;
  padding-left: 1rem;
}

li::before {
  content: '►';
  position: absolute;
  left: 0;
  color: #931e30;
}

.command-key {
  color: #931e30;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
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
