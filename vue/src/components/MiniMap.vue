<!-- MiniMap.vue (exemplo simplificado) -->
<template>
  <div class="mini-map-overlay" @click.self="onClose">
    <div class="mini-map-bg">
      <img v-if="mapMiniSrc" :src="mapMiniSrc" class="mini-map-image" />
      <div v-else class="mini-map-fallback">MapaMini.png não encontrado</div>
      <!-- Player -->
      <div
        class="mini-player"
        :style="playerStyle"
        title="Você"
      ></div>
      <!-- Bosses -->
      <div
        v-for="boss in bosses"
        :key="boss.bossId"
        class="mini-boss"
        :style="bossStyle(boss)"
        title="Boss"
      ></div>
    </div>
    <div class="mini-map-close">Clique fora para fechar</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
let mapMiniSrc = '';
try {
  mapMiniSrc = new URL('@/assets/images/MapaMini.png', import.meta.url).href;
} catch (e) {
  mapMiniSrc = '';
}
const props = defineProps({
  player: { type: Object, required: true },
  bosses: { type: Array, required: true },
  mapWidth: { type: Number, required: true },
  mapHeight: { type: Number, required: true },
  onClose: { type: Function, default: null }
});
const miniWidth = 300;
const miniHeight = 150;
const scaleX = computed(() => miniWidth / props.mapWidth);
const scaleY = computed(() => miniHeight / props.mapHeight);
const playerStyle = computed(() => ({
  left: `${props.player.x * scaleX.value - 6}px`,
  top: `${props.player.y * scaleY.value - 6}px`
}));
function bossStyle(boss) {
  return {
    left: `${boss.x * scaleX.value - 6}px`,
    top: `${boss.y * scaleY.value - 6}px`
  };
}
function onClose() {
  if (props.onClose) props.onClose();
}
</script>

<style scoped>
.mini-map-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.55);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mini-map-bg {
  position: relative;
  width: 300px;
  height: 150px;
  background: #222;
  border: 3px solid #ffce1c;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px #000a;
}
.mini-map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
}
.mini-map-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #444;
  font-size: 1.1rem;
}
.mini-player {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #0f0;
  border: 2px solid #fff;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 8px #0f0;
}
.mini-boss {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #f00;
  border: 2px solid #fff;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 8px #f00;
}
.mini-map-close {
  text-align: center;
  color: #fff;
  font-size: 0.9rem;
  margin-top: 8px;
  text-shadow: 1px 1px 2px #000;
}
</style>