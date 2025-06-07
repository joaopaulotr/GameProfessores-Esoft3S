<template>
  <div id="app">
    <audio
      src="@/assets/music/musicaMapa.mp3"
      preload="auto"
      loop
      id="bg-music"
      style="display:none;"
    ></audio>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let audioElement = null;

onMounted(() => {
  audioElement = document.getElementById('bg-music');
  if (audioElement) {
    audioElement.volume = 0.18;
  }

  const startMusic = () => {
    if (audioElement) {
      audioElement.play().catch(() => {});
    }
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener('click', startMusic);
    window.removeEventListener('keydown', startMusic);
  };

  window.addEventListener('click', startMusic);
  window.addEventListener('keydown', startMusic);

  // Limpar os event listeners quando o componente for desmontado
  onUnmounted(() => {
    cleanup();
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
      audioElement = null;
    }
  });
});
</script>

<style>
body {
  margin: 0;
  overscroll-behavior: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
