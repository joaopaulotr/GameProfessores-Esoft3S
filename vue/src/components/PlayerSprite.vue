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

<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active d-flex justify-content-center">
      <div class="character-1"></div>
   
    </div>
    <div class="carousel-item d-flex justify-content-center">
      <div class="character-2"></div>
    </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
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
