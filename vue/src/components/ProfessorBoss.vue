<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  boss: {
    type: Object,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['batalhar']);

function handleClick() {
  emit('batalhar', props.boss);
}
</script>

<template>
  <div
    class="professor-boss"
    :style="{
      left: `${x}px`,
      top: `${y}px`
    }"
    @click="handleClick"
    title="Desafiar {{ boss.nome }}"
  >
    <img :src="boss.sprite" :alt="boss.nome" class="boss-sprite" />
    <div class="boss-label">{{ boss.nome }}</div>
  </div>
</template>

<style scoped>
.professor-boss {
  position: absolute;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
}
.boss-sprite {
  width: 64px;
  height: 64px;
  image-rendering: pixelated;
  filter: drop-shadow(0 0 8px #ffce1c);
  transition: transform 0.15s;
}
.professor-boss:hover .boss-sprite {
  transform: scale(1.1);
  filter: drop-shadow(0 0 16px #931e30);
}
.boss-label {
  margin-top: 4px;
  background: rgba(255, 255, 255, 0.85);
  color: #931e30;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  padding: 2px 8px;
  border: 2px solid #ffce1c;
  border-radius: 4px;
  box-shadow: 0 2px 0 #931e30;
  text-align: center;
  pointer-events: none;
}
</style>