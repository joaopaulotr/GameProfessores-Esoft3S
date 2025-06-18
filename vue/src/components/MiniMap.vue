<!-- MiniMap.vue (otimizado e dinâmico) -->
<template>
  <div class="mini-map-fixed">
    <div class="mini-map-bg">
      <img src="@/assets/images/MapaMini.png" class="mini-map-image" />
      
      <!-- Player (agora se move com reatividade) -->
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

// 🔁 Torna o ponto do jogador reativo
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
.mini-map-fixed {
  position: fixed;
  top: 50%;
  right: 32px;
  transform: translateY(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: none;
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
