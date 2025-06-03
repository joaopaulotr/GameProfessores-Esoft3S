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

const animationSpeed = 120 // em milissegundos
let lastFrameChange = 0
const step = 3
const charW = 30
const charH = 30

const position = ref({
  x: (props.mapWidth * props.tileSize) / 2 - 25,
  y: (props.mapHeight * props.tileSize) / 2 - 50
})

const direction = ref('down')
const frameIndex = ref(0)

const keysPressed = ref({})

let lastTime = performance.now()

const frames = {
  down: [
    new URL('@/assets/images/walkplayer1.png', import.meta.url).href,
    new URL('@/assets/images/walkplayer2.png', import.meta.url).href,
    new URL('@/assets/images/walkplayer3.png', import.meta.url).href,
    new URL('@/assets/images/walkplayer4.png', import.meta.url).href,
    new URL('@/assets/images/walkplayer5.png', import.meta.url).href,
    new URL('@/assets/images/walkplayer6.png', import.meta.url).href
  ],
  up: [
    new URL('@/assets/images/backplayer1.png', import.meta.url).href,
    new URL('@/assets/images/backplayer2.png', import.meta.url).href,
    new URL('@/assets/images/backplayer3.png', import.meta.url).href,
    new URL('@/assets/images/backplayer4.png', import.meta.url).href,
    new URL('@/assets/images/backplayer5.png', import.meta.url).href,
    new URL('@/assets/images/backplayer6.png', import.meta.url).href
  ],
  left: [
     new URL('@/assets/images/walkright1.png', import.meta.url).href,
    new URL('@/assets/images/walkright2.png', import.meta.url).href,
    new URL('@/assets/images/walkright3.png', import.meta.url).href,
    new URL('@/assets/images/walkright4.png', import.meta.url).href,
    new URL('@/assets/images/walkright5.png', import.meta.url).href,
    new URL('@/assets/images/walkright6.png', import.meta.url).href,
    new URL('@/assets/images/walkright7.png', import.meta.url).href,
    new URL('@/assets/images/walkright8.png', import.meta.url).href,
    new URL('@/assets/images/walkright9.png', import.meta.url).href,
    new URL('@/assets/images/walkright10.png', import.meta.url).href,
    new URL('@/assets/images/walkright11.png', import.meta.url).href
  ],
  right: [
    new URL('@/assets/images/walkleft1.png', import.meta.url).href,
    new URL('@/assets/images/walkleft2.png', import.meta.url).href,
    new URL('@/assets/images/walkleft3.png', import.meta.url).href,
    new URL('@/assets/images/walkleft4.png', import.meta.url).href,
    new URL('@/assets/images/walkleft5.png', import.meta.url).href,
    new URL('@/assets/images/walkleft6.png', import.meta.url).href,
    new URL('@/assets/images/walkleft7.png', import.meta.url).href,
    new URL('@/assets/images/walkleft8.png', import.meta.url).href,
    new URL('@/assets/images/walkleft9.png', import.meta.url).href,
    new URL('@/assets/images/walkleft10.png', import.meta.url).href,
    new URL('@/assets/images/walkleft11.png', import.meta.url).href
  ]
}


const mapPixelWidth = computed(() => props.mapWidth * props.tileSize)
const mapPixelHeight = computed(() => props.mapHeight * props.tileSize)

const offset = computed(() => {
  let left = props.viewportWidth / 2 - position.value.x - charW / 2
  let top = props.viewportHeight / 2 - position.value.y - charH / 2

  left = Math.min(0, Math.max(props.viewportWidth - props.mapWidth * props.tileSize, left))
  top = Math.min(0, Math.max(props.viewportHeight - props.mapHeight * props.tileSize, top))

  return { left, top }
})


const canMove = ref(true)
let previousKeyPressed = null
let frameTimer = null

function handleKeyPress(event) {
  if (!canMove.value) return

  let newX = position.value.x
  let newY = position.value.y

  switch (event.keyCode) {
    case 37: direction.value = 'left'; newX -= step; break
    case 38: direction.value = 'up'; newY -= step; break
    case 39: direction.value = 'right'; newX += step; break
    case 40: direction.value = 'down'; newY += step; break
    default: return
  }

  if (!isColliding(newX, newY)) {
    position.value = { x: newX, y: newY }

    if (previousKeyPressed === event.keyCode) {
      if (!frameTimer) {
        frameTimer = setInterval(() => {
          frameIndex.value = (frameIndex.value + 1) % frames[direction.value].length
        }, 120)
      }
    } else {
      frameIndex.value = 0
      clearInterval(frameTimer)
      frameTimer = null
    }

    canMove.value = false
    setTimeout(() => {
      canMove.value = true
    }, 60)
  }

  previousKeyPressed = event.keyCode
}
function gameLoop(timestamp) {
  const delta = timestamp - lastTime
  lastTime = timestamp

  let moved = false
  const newPos = { ...position.value }

  if (keysPressed.value['ArrowLeft']) {
    direction.value = 'left'
    newPos.x -= step
    moved = true
  }
  if (keysPressed.value['ArrowRight']) {
    direction.value = 'right'
    newPos.x += step
    moved = true
  }
  if (keysPressed.value['ArrowUp']) {
    direction.value = 'up'
    newPos.y -= step
    moved = true
  }
  if (keysPressed.value['ArrowDown']) {
    direction.value = 'down'
    newPos.y += step
    moved = true
  }
  if (moved && !isColliding(newPos.x, newPos.y)) {
    position.value = newPos

  if (timestamp - lastFrameChange > animationSpeed) {
    frameIndex.value = (frameIndex.value + 1) % frames[direction.value].length
    lastFrameChange = timestamp
  }
  }

  requestAnimationFrame(gameLoop)
}

// ⌨️ Controla teclas pressionadas
function handleKeyDown(e) {
  keysPressed.value[e.key] = true
}
function handleKeyUp(e) {
  keysPressed.value[e.key] = false
} 

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  requestAnimationFrame(gameLoop)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})


const collisionTolerance = 10

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
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress)
  clearInterval(frameTimer)
})
const scale = computed(() => {
  const minScale = 0.5 // Tamanho mínimo
  const maxScale = 1 // Tamanho máximo
  const range = props.mapHeight * props.tileSize

  const y = position.value.y
  const scaleFactor = minScale + (y / range) * (maxScale - minScale)

  return scaleFactor
})
</script>

<template>
 <div class="map-layer" :style="{ transform: `translate(${offset.left}px, ${offset.top}px)` }">
    <img
      class="character"
      :src="frames[direction][frameIndex]"
      :style="{
        top: position.y + 'px',
        left: position.x + 'px',
        transform: `scale(${scale})`
      }"
    />
  </div>
</template>

<style scoped>
.map-layer {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}

.character {
  position: absolute;
  width: 400px;
  height: 400px;
  image-rendering: pixelated;
}
</style>