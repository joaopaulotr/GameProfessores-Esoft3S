<script setup>
import PlayerSprite from '../components/PlayerSprite.vue';
</script>

<template>
  <div class="game-map">
    <router-link to="/"><button class="btn btn-back">Voltar ao Menu</button></router-link>
    <h1>Mapa do Jogo</h1>
    <div class="map-container">
      <!-- Área do mapa e personagens -->
      <PlayerSprite/>
    </div>
    <div class="map-controls">
      <!-- Controles de navegação -->
    </div>
  </div>
</template>

<style scoped>

.game-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #81bcff;
  color: #fff;
}

.map-container {
  width: 800px;
  height: 500px;
  background-color: #1e1e1e;
  border: 2px solid #5c6bc0;
  border-radius: 8px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
  top: 90px;
  transform: translateX(65%);
}

.map-controls {
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 20px;
}
.btn-back{
  background-color: #5c6bc0;
}
</style>