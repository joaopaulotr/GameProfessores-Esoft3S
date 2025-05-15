<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const position = ref({ top: 0, left: 0 });
const step = 10;

let containerWidth = 0;
let containerHeight = 0;
const characterWidth = 50;
const characterHeight = 100;

const handleKeyPress = (event) => {
  const newPos = { ...position.value };

  switch (event.keyCode) {
    case 37: // esquerda
      newPos.left -= step;
      break;
    case 38: // cima
      newPos.top -= step;
      break;
    case 39: // direita
      newPos.left += step;
      break;
    case 40: // baixo
      newPos.top += step;
      break;
  }

  // Limites horizontais
  newPos.left = Math.max(0, Math.min(newPos.left, containerWidth - characterWidth));
  // Limites verticais
  newPos.top = Math.max(0, Math.min(newPos.top, containerHeight - characterHeight));

  position.value = newPos;
};

onMounted(() => {
  const container = document.querySelector('.map-container');
  if (container) {
    containerWidth = container.clientWidth;
    containerHeight = container.clientHeight;
  }

  window.addEventListener('keydown', handleKeyPress);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress);
});

</script>

<template>
  <div
    class="character"
    :style="{
      top: position.top + 'px',
      left: position.left + 'px',
      position: 'absolute',
    }"
  />
</template>

<style scoped>
.character {
  height: 100px;
  width: 50px;
  background-color: red;
  transition: all 0.1s ease;
}
</style>
