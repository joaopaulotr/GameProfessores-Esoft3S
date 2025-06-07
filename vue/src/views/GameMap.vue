<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import PlayerSprite from '../components/PlayerSprite.vue'
import ProfessorBoss from '../components/ProfessorBoss.vue'
import ProximityIndicator from '../components/ProximityIndicator.vue'
import Tile from '../components/Tile.vue'
import DialogBox from '../components/DialogBox.vue'
import { chefesBatalha, useDadosJogador } from '../utils/dadosBatalha.js'
import { playSound } from '../utils/audioUtils.js'

const router = useRouter()
const { chefesDerrotados } = useDadosJogador()

const dialogActiveInicio = ref(true)
const playerPosition = ref({ x: 400, y: 300 })
const bossInteractionActive = ref(false)
const currentBoss = ref(null)
const bossNearButUnavailable = ref(false)
const nearbyUnavailableBoss = ref(null)

// Posição do indicador de proximidade
const showProximityIndicator = ref(false)
const proximityIndicatorPosition = ref({ x: 0, y: 0 })

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

// Função para iniciar a batalha quando perto de um boss
function startBattle() {
  if (bossInteractionActive.value && currentBoss.value) {
    console.log('Iniciando batalha com', currentBoss.value.nome);

    // Toca som de início de batalha
    // playSound('battle-start');

    // Redirecionamento para batalha
    router.push(`/battle?id=${currentBoss.value.id}`);
  } else if (bossNearButUnavailable.value && nearbyUnavailableBoss.value) {
    // Feedback quando tenta batalhar com professor indisponível
    console.log(`Você precisa derrotar ${nearbyUnavailableBoss.value.chefesNecessarios} chefes antes!`);
    // playSound('professor-unavailable');

    // Mostrar uma mensagem temporária
    showUnavailableMessage();
  } else {
    console.log('Não há professor próximo para batalhar');
  }
}

// Controle da mensagem de professor indisponível
const unavailableMessageVisible = ref(false);
let unavailableMessageTimeout = null;

function showUnavailableMessage() {
  unavailableMessageVisible.value = true;

  // Limpa timeout existente se houver
  if (unavailableMessageTimeout) {
    clearTimeout(unavailableMessageTimeout);
  }

  // Define novo timeout
  unavailableMessageTimeout = setTimeout(() => {
    unavailableMessageVisible.value = false;
  }, 3000); // Mensagem some após 3 segundos
}

// Definimos função para verificar proximidade com os bosses
function updatePlayerPosition(e) {
  playerPosition.value = {
    x: e.detail.x,
    y: e.detail.y
  };

  // Verifica proximidade com bosses
  const distance = 100; // Distância para interação (pixels)

  // Reseta estados de interação
  const wasInteractionActive = bossInteractionActive.value;
  bossInteractionActive.value = false;
  currentBoss.value = null;
  bossNearButUnavailable.value = false;
  nearbyUnavailableBoss.value = null;
  showProximityIndicator.value = false;

  // Array para armazenar quais bosses estão próximos
  let proximityStatus = [];

  // Verifica cada boss
  bossesPositions.forEach(bossPos => {
    const boss = chefesBatalha.find(b => b.id === bossPos.bossId);
    if (boss) {
      const dx = Math.abs(playerPosition.value.x - bossPos.x);
      const dy = Math.abs(playerPosition.value.y - bossPos.y);

      // Verifica proximidade
      const isNearby = (dx < distance && dy < distance);

      // Armazenamos o status de proximidade para cada boss
      proximityStatus.push({
        bossId: boss.id,
        isNear: isNearby
      });

      if (isNearby) {
        // Verifica se o boss está disponível baseado nos chefes derrotados
        if (chefesDerrotados.value >= (boss.chefesNecessarios || 0)) {
          // Boss disponível
          currentBoss.value = boss;
          bossInteractionActive.value = true;
          console.log('Perto do professor disponível:', boss.nome);

          // Mostra o indicador de proximidade
          showProximityIndicator.value = true;
          proximityIndicatorPosition.value = { x: bossPos.x, y: bossPos.y };

          // Toca som de aproximação apenas quando acabou de entrar na área
          if (!wasInteractionActive) {
            // Som de aproximação desativado até termos o arquivo
            // playSound('professor-approach');
          }
        } else {
          // Boss indisponível
          bossNearButUnavailable.value = true;
          nearbyUnavailableBoss.value = boss;
          console.log(`Professor ${boss.nome} não disponível ainda. Requer ${boss.chefesNecessarios} chefes derrotados.`);
        }
      }
    }
  });

  // Emite evento personalizado para cada boss com status de proximidade
  proximityStatus.forEach(status => {
    document.dispatchEvent(new CustomEvent('professorProximity', {
      detail: {
        bossId: status.bossId,
        isNear: status.isNear
      }
    }));
  });
}

// Função para tratar o pressionamento da tecla E
function handleKeyDown(e) {
  if (e.key === 'e' || e.key === 'E') {
    console.log('Tecla E pressionada');
    startBattle();
  }
}

onMounted(() => {
  console.log('GameMap montado, adicionando event listeners');

  // Adiciona listeners
  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('playerMoved', updatePlayerPosition);
});

// Limpeza de eventos quando o componente é desmontado
onUnmounted(() => {
  console.log('GameMap desmontado, removendo event listeners');

  window.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('playerMoved', updatePlayerPosition);
});
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
        />
      </template>

      <!-- Indicador visual de proximidade com professor -->
      <ProximityIndicator
        v-if="showProximityIndicator"
        :x="proximityIndicatorPosition.x"
        :y="proximityIndicatorPosition.y"
      />

      <DialogBox
        v-if="dialogActiveInicio"
        :messages="dialogMessagesInicio"
        @close="dialogActive = false"
      />

      <!-- Mostra dica para pressionar E quando perto de um boss disponível -->
      <div v-if="bossInteractionActive" class="interaction-prompt pokemon-button" :class="{ 'flash': bossInteractionActive }">
        <span class="key-prompt">E</span> Batalhar com {{ currentBoss?.nome }}
      </div>

      <!-- Mostra dica quando está próximo de um professor indisponível -->
      <div v-if="bossNearButUnavailable && nearbyUnavailableBoss" class="interaction-prompt pokemon-button blocked-prompt">
        <span class="lock-icon">🔒</span> Professor {{ nearbyUnavailableBoss.nome }} bloqueado
      </div>

      <!-- Mostra mensagem quando tenta interagir com professor indisponível -->
      <div v-if="unavailableMessageVisible" class="unavailable-message pokemon-button warning-message">
        <span class="warning-icon">⚠️</span> Você precisa derrotar {{ nearbyUnavailableBoss?.chefesNecessarios }} professores antes!
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
  background: url('@/assets/images/MapaDefinitivo.png') no-repeat center;
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
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  animation: float-button 2s ease-in-out infinite;
  /* Removendo sobrescritas para usar exatamente o mesmo estilo do botão de menu */
  text-transform: uppercase;
  color: #222 !important;
  font-family: 'Press Start 2P', cursive !important;
}

@keyframes float-button {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

.flash {
  animation: flash 1.5s infinite;
}

@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Estilo para professor bloqueado */
.blocked-prompt {
  background-color: #f0f0f0;
  color: #777 !important;
  border-color: #999;
  animation: none;
  opacity: 0.9;
  transform: translateX(-50%);
}

.blocked-prompt::before {
  border-color: #aaa;
}

.lock-icon {
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
}

/* Estilo para mensagem de aviso */
.warning-message {
  bottom: 110px;
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404 !important;
  animation: shake 0.5s ease-in-out, fadeOut 3s forwards 2s;
  font-size: 0.7rem;
  padding: 8px 12px;
}

.warning-icon {
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
  font-size: 1rem;
}

@keyframes shake {
  0%, 100% { transform: translateX(-50%); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-52%); }
  20%, 40%, 60%, 80% { transform: translateX(-48%); }
}

@keyframes fadeOut {
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

/* Removendo a seta do prompt já que agora usamos o estilo de botão */

.key-prompt {
  display: inline-block;
  background-color: #ffce1c;
  color: #931e30;
  font-weight: bold;
  padding: 3px 6px;
  margin-right: 10px;
  border: 2px solid #931e30;
  border-radius: 4px;
  animation: pulse-key 1.5s infinite alternate;
  vertical-align: middle;
}

@keyframes pulse-key {
  0% { transform: scale(1); }
  100% { transform: scale(1.2); }
}

.unavailable-message {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 110;
  background-color: #931e30;
  color: #ffce1c !important;
  font-family: 'Press Start 2P', cursive !important;
  font-size: 0.8rem;
  padding: 10px 15px;
  border: 3px solid #ffce1c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  animation: fade-in-out 3s forwards;
  text-align: center;
  max-width: 300px;
}

@keyframes fade-in-out {
  0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

/* Classes para animação adicional */
.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.animate__bounce {
  animation-name: bounce;
  transform-origin: center bottom;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-20px);
  }
  60% {
    transform: translateX(-50%) translateY(-10px);
  }
}
</style>
