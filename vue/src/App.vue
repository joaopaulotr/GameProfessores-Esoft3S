<template>
  <div id="app">
    <audio
      src="@/assets/music/musicaMapa.mp3"
      autoplay
      loop
      volume="0.5"
      id="bg-music"
      style="display:none;"
    ></audio>
    <router-view />
  </div>
</template>

<script setup>
// ...existing code...
</script>

<style>
body{
  margin: 0;
}
</style>
