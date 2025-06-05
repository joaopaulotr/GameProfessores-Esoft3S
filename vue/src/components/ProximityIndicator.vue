<template>
  <div class="proximity-indicator" :style="{ left: `${x}px`, top: `${y}px` }">
    <div class="indicator-ring"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});
</script>

<style scoped>
.proximity-indicator {
  position: absolute;
  pointer-events: none;
  z-index: 19; /* Um nível abaixo dos professores */
}

.indicator-ring {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px dashed #ffce1c;
  opacity: 0.7;
  transform: translate(-50%, -50%);
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.4;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }
}
</style>
