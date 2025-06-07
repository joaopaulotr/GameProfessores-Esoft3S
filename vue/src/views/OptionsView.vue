<template>
    <div class="options-screen">
      <div class="options-container">
        <h2>Opções de Áudio</h2>
        <label for="volume">Volume da Música: {{ Math.round(volume * 100) }}%</label>
        <input type="range" id="volume" min="0" max="1" step="0.01" v-model="volume" @input="ajustarVolume" />
  
        <router-link to="/"><button class="back-button">Voltar ao Menu</button></router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const volume = ref(0.18)
  
  onMounted(() => {
    const audio = document.getElementById('bg-music')
    if (audio) {
      volume.value = audio.volume
    }
  })
  
  function ajustarVolume() {
    const audio = document.getElementById('bg-music')
    if (audio) {
      audio.volume = volume.value
    }
  }
  </script>
  
  <style scoped>
  .options-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom, #24b5f8, #1e90ff);
    color: white;
  }
  
  .options-container {
    background: rgba(0, 0, 0, 0.6);
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 0 10px #000;
  }
  
  input[type="range"] {
    width: 100%;
    margin-top: 10px;
  }
  
  .back-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-family: 'Press Start 2P', cursive;
    background-color: transparent;
    border: 2px solid #fff;
    color: white;
    cursor: pointer;
  }
  </style>
  