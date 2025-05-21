<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'


const props = defineProps({
  map: Array,
  tileSize: Number,
  mapWidth: Number,
  mapHeight: Number,
  viewportWidth: Number,
  viewportHeight: Number,
})

const step = 16
const charW = 50
const charH = 100

const position = ref({
  x: (props.mapWidth * props.tileSize) / 2 - 25,
  y: (props.mapHeight * props.tileSize) / 2 - 50
})

const mapPixelWidth = computed(() => props.mapWidth * props.tileSize)
const mapPixelHeight = computed(() => props.mapHeight * props.tileSize)

const offset = computed(() => {
  let left = props.viewportWidth / 2 - position.value.x - charW / 2
  let top = props.viewportHeight / 2 - position.value.y - charH / 2

  left = Math.min(0, Math.max(props.viewportWidth - mapPixelWidth.value, left))
  top = Math.min(0, Math.max(props.viewportHeight - mapPixelHeight.value, top))

  return { left, top }
})

const canMove = ref(true)

let previousKeyPressed;

function handleKeyPress(event) {
  if (!canMove.value) return

  let newX = position.value.x
  let newY = position.value.y

  if (previousKeyPressed === event.keyCode) {
    switch (event.keyCode) {
      case 37: newX -= step; break // Esquerda
      case 38: newY -= step; break // Cima
      case 39: newX += step; break // Direita
      case 40: newY += step; break // Baixo
      default: return
    }
  } else {
    //trocar sprite do personagem apenas
  }


  if (!isColliding(newX, newY)) {
    position.value = { x: newX, y: newY }
    canMove.value = false

    if (previousKeyPressed === event.keyCode) {
      setTimeout(() => {
        canMove.value = true
      }, 60) // ⏱️ tempo entre passos (ms)
    } else {
      canMove.value = true
    }
  }

  previousKeyPressed = event.keyCode
}

const collisionTolerance = 32

function isColliding(newX, newY) {
  const leftTile = Math.floor(newX / props.tileSize)
  const rightTile = Math.floor((newX + charW - 1) / props.tileSize)
  const topTile = Math.floor(newY / props.tileSize)
  const bottomTile = Math.floor((newY + charH - 1) / props.tileSize)

  if (
    leftTile < 0 || rightTile >= props.mapWidth ||
    topTile < 0 || bottomTile >= props.mapHeight
  ) return true

  for (let y = topTile; y <= bottomTile; y++) {
    for (let x = leftTile; x <= rightTile; x++) {
      if (props.map[y][x] === 1) {
        // Calcular sobreposição com tile de colisão
        const tileX = x * props.tileSize
        const tileY = y * props.tileSize

        const overlapX = Math.min(newX + charW, tileX + props.tileSize) - Math.max(newX, tileX)
        const overlapY = Math.min(newY + charH, tileY + props.tileSize) - Math.max(newY, tileY)

        const overlapArea = overlapX * overlapY

        if (overlapX > 0 && overlapY > 0 && overlapArea > (collisionTolerance)) {
          return true // Só bloqueia se sobrepõe mais do que a tolerância
        }
      }
    }
  }

  return false
}

onMounted(() => window.addEventListener('keydown', handleKeyPress))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeyPress))
</script>

<template>

<div class="map-layer" :style="{ transform: `translate(${offset.left}px, ${offset.top}px)` }">
    <div class="character" :class="{
      'para-cima': previousKeyPressed === 38,
      'para-baixo': previousKeyPressed === 40,
      'para-esquerda': previousKeyPressed === 37,
      'para-direita': previousKeyPressed === 39
    }" :style="{
      top: position.y + 'px',
      left: position.x + 'px'
    }" />
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  position: top;
  
}

.character-1 {
  height: 100px;
  width: 50px;
  background-color: rgb(7, 8, 99);
}
.map-layer {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}

.character {
  position: absolute;
  width: 50px;
  height: 100px;
  background-color: rgb(0, 255, 42);
  transition: all 0.1s linear;
}

.para-cima {
  background-color: blue !important;
  /* Ajustar para o sprite desta posição */
}

.para-baixo {
  background-color: green;
  /* Ajustar para o sprite desta posição */
}

.para-esquerda {
  background-color: yellow;
  /* Ajustar para o sprite desta posição */
}

.para-direita {
  background-color: purple;
  /* Ajustar para o sprite desta posição */
}

.character-2 {
  height: 100px;
  width: 50px;
  background-color: rgb(255, 0, 119);
  
  
}

.carousel-item.active .character-1 {
  z-index: 2;
}

.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  background-color: black;
  margin: auto;
  height: 300px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      text-align: center;
    }


</style>
