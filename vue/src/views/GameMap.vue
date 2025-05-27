<script setup>
import { ref } from 'vue'
import PlayerSprite from '../components/PlayerSprite.vue'
import Tile from '../components/Tile.vue'
import DialogBox from '../components/DialogBox.vue';
import HealthBar from '../components/HealthBar.vue'



const dialogActiveInicio = ref(true)

function openDialogInicio() {
  dialogActiveInicio.value = true
}

const dialogMessagesInicio = [
  'Bem-vindo ao SyntaxFIght!',
  'Use as setas para se mover. ⭠ ⭡ ⭢ ⭣',
  'Pressione E para interagir com objetos.'
]


const mapWidth = 25   // número de colunas
const mapHeight = 10  // número de linhas
const tileSize = 64   // pixels por tile

// Exemplo simples de um mapa 16×12
const gameMap = ref([
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
])
</script>

<template>
  <div class="game-map">
    <h1>Mapa do Jogo</h1>
    <div class="map-container" ref="mapRef">

      <Tile :map="gameMap" :tile-size="tileSize" />
      <PlayerSprite :map="gameMap" :tile-size="tileSize" :map-width="mapWidth" :map-height="mapHeight" />
      <DialogBox
      v-if="dialogActiveInicio"
      :messages="dialogMessagesInicio"
      @close="dialogActive = false"
      />
    </div>
    <div class="botoes-acao">
      <router-link to="/">
        <button class="pokemon-button">Voltar ao Menu</button>
      </router-link>
      <router-link to="/battle">
        <button class="pokemon-button battle-button">Ir para Batalha!</button>
      </router-link>
    </div>
    <div class="map-controls">
      <!-- Controles de navegação -->
    </div>
  </div>
</template>

<style scoped>

h1 {
  font-size: 3rem;
  margin-top: 5rem;
  text-align: center;
  color: #ffce1c;
  text-shadow:
    4px 4px 0 #931e30,
    2px 4px 0 #931e30,
    4px 2px 0 #931e30,
    6px 6px 0 rgba(147, 30, 48, 0.6),
    8px 8px 0 rgba(147, 30, 48, 0.4),
    10px 10px 0 rgba(147, 30, 48, 0.2);
}

.game-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #81bcff;
  color: #fff;
}

.map-container {
  width: 1600px;
  height: 640px;
  background-color: white;
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
  position: relative;
  overflow: hidden;
  margin: 2rem auto;
  background: url('@/assets/images/mapa.png') no-repeat center;
  background-size: 100% 100%;
  image-rendering: pixelated;
}

.map-container::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c;
  pointer-events: none;
  z-index: 10;
}


.map-controls {
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-back {
  width: 250px;
  font-size: 1rem;
  padding: 8px 0;
  font-family: 'Press Start 2P', cursive;
  background-color: transparent;
  border: none;
  color: white;
  text-shadow:
    2px 2px 0 rgba(0, 0, 0, 0.5),
    1px 1px 0 rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  transition: all 0.2s ease;
}

.btn-back:hover {
  cursor: pointer;
  transform: scale(1.05);
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.7),
    1px 1px 0 rgba(0, 0, 0, 0.7);
}

.btn-back:active {
  transform: scale(0.98);
}



.botoes-acao {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
}

.pokemon-button {
  background-color: white;
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
  position: relative;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  padding: 12px 20px;
  color: #222;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  image-rendering: pixelated;
  transition: all 0.15s;
}

.pokemon-button::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c;
  pointer-events: none;
}

.pokemon-button:hover {
  transform: scale(1.05);
  background-color: #f0f0f0;
}

.pokemon-button:active {
  transform: scale(0.97);
  background-color: #e0e0e0;
}





</style>
