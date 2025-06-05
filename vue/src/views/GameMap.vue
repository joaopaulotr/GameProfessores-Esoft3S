<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PlayerSprite from '../components/PlayerSprite.vue'
import ProfessorBoss from '../components/ProfessorBoss.vue'
import Tile from '../components/Tile.vue'
import DialogBox from '../components/DialogBox.vue'
import { chefesBatalha, useDadosJogador } from '../utils/dadosBatalha.js'

const router = useRouter()
const { chefesDerrotados } = useDadosJogador()

const dialogActiveInicio = ref(true)
const playerPosition = ref({ x: 400, y: 300 })
const bossInteractionActive = ref(false)
const currentBoss = ref(null)

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

// Posicionamento dos bosses no mapa (em pixels)
const bossesPositions = [
  { bossId: 1, x: 200, y: 200 },  // Moreno (Algoritmos) - canto superior esquerdo
  { bossId: 2, x: 800, y: 150 },  // Cidão (Arquitetura) - parte superior
  { bossId: 3, x: 500, y: 400 },  // Gostosinho (Redes) - centro
  { bossId: 4, x: 1300, y: 500 }  // Hugo Fumero (Front-End) - canto inferior direito
]

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

function handleBossInteraction(boss) {
  // Verifica se o boss está disponível (baseado nos chefes já derrotados)
  if (chefesDerrotados.value >= (boss.chefesNecessarios || 0)) {
    currentBoss.value = boss
    bossInteractionActive.value = true
  } else {
    alert(`Você precisa derrotar ${boss.chefesNecessarios} chefes antes de desafiar ${boss.nome}!`)
  }
}

function startBattle() {
  if (bossInteractionActive.value && currentBoss.value) {
    router.push(`/battle?id=${currentBoss.value.id}`)
  }
}

onMounted(() => {
  // Listener para tecla E para iniciar batalha quando perto de um boss
  window.addEventListener('keydown', (e) => {
    if (e.key === 'e' || e.key === 'E') {
      startBattle()
    }
  })
  
  // Atualiza a posição do jogador com base no PlayerSprite
  const updatePlayerPosition = (e) => {
    playerPosition.value = {
      x: e.detail.x,
      y: e.detail.y
    }
    
    // Verifica proximidade com bosses
    const distance = 100 // Distância para interação (pixels)
    
    // Reseta estado de interação
    bossInteractionActive.value = false
    currentBoss.value = null
    
    // Verifica cada boss
    bossesPositions.forEach(bossPos => {
      const boss = chefesBatalha.find(b => b.id === bossPos.bossId)
      if (boss) {
        const dx = Math.abs(playerPosition.value.x - bossPos.x)
        const dy = Math.abs(playerPosition.value.y - bossPos.y)
        
        // Mostra a dica ao chegar perto do boss
        if (dx < distance && dy < distance) {
          currentBoss.value = boss
          bossInteractionActive.value = true
          
          // Verifica se o boss está disponível
          if (chefesDerrotados.value < (boss.chefesNecessarios || 0)) {
            // Se não está disponível, mostra mensagem mas não permite interação
            currentBoss.value = null
            bossInteractionActive.value = false
          }
        }
      }
    })
  }
  
  document.addEventListener('playerMoved', updatePlayerPosition)
})
</script>

<template>
  <div class="game-map">
    <h1>Mapa do Jogo</h1>
    <div class="map-container" ref="mapRef">
      <Tile :map="gameMap" :tile-size="tileSize" />
      <PlayerSprite :map="gameMap" :tile-size="tileSize" :map-width="mapWidth" :map-height="mapHeight" />
      
      <!-- Renderiza os bosses no mapa nas posições definidas -->
      <template v-for="position in bossesPositions" :key="position.bossId">
        <ProfessorBoss 
          v-if="chefesBatalha.find(b => b.id === position.bossId)" 
          :boss="chefesBatalha.find(b => b.id === position.bossId)" 
          :x="position.x" 
          :y="position.y"
          @batalhar="handleBossInteraction"
        />
      </template>

      <DialogBox
        v-if="dialogActiveInicio"
        :messages="dialogMessagesInicio"
        @close="dialogActive = false"
      />
      
      <!-- Mostra dica para pressionar E quando perto de um boss -->
      <div v-if="bossInteractionActive" class="interaction-prompt">
        <span class="key-prompt">E</span> Batalhar com {{ currentBoss?.nome }}
      </div>
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

.interaction-prompt {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: #ffce1c;
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  padding: 12px 24px;
  border: 3px solid #ffce1c;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
  z-index: 100;
  pointer-events: none; /* Evita que o prompt bloqueie interações com o mouse */
  text-shadow: 2px 2px 0 #931e30;
  box-shadow: 0 0 10px rgba(255, 206, 28, 0.5);
}

@keyframes pulse {
  0% { opacity: 0.9; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
  100% { opacity: 0.9; transform: translateX(-50%) scale(1); }
}

.interaction-prompt::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 15px;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.85) transparent;
}

.key-prompt {
  display: inline-block;
  background-color: #ffce1c;
  color: #931e30;
  font-weight: bold;
  padding: 3px 8px;
  margin-right: 10px;
  border: 2px solid #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: glow 1.5s infinite alternate;
}

@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(255, 206, 28, 0.7); }
  100% { box-shadow: 0 0 15px rgba(255, 206, 28, 1); }
}
</style>
