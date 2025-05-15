<script setup>
import PlayerSprite from '../components/PlayerSprite.vue';
</script>

<template>
  <div class="game-map">
    <router-link to="/"><button>Voltar ao Menu</button></router-link>
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
  background-color: #121212;
  color: #fff;
}

.map-container {
  width: 80%;
  height: 70%;
  background-color: #1e1e1e;
  border: 2px solid #5c6bc0;
  border-radius: 8px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
}

.map-controls {
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>