<template>
  <div id="app">
    <audio
      src="@/assets/music/musicaMapa.mp3"
      autoplay
      loop
      id="bg-music"
      style="display:none;"
    ></audio>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const audio = document.getElementById('bg-music');
  
  // Inicia a música após o primeiro clique/interação (para contornar bloqueio do navegador)
  const startMusic = () => {
    if (audio) {
      audio.volume = 0.18;
      audio.play().catch(() => {});
    }
    window.removeEventListener('click', startMusic);
    window.removeEventListener('keydown', startMusic);
  };
  
  window.addEventListener('click', startMusic);
  window.addEventListener('keydown', startMusic);
});
</script>

<style>
body{
  margin: 0;
}
</style>
