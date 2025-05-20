<script setup>
import { computed } from 'vue'

const props = defineProps({
   name: {
      type: String,
      default: 'Aluno'
   },
   health: {
      type: Number,
      required: true
   },
   maxHealth: {
      type: Number,
      required: true
   },
   xp: {
      type: Number,
      required: true
   },
   maxXp: {
      type: Number,
      required: true
   }
})

const healthPercent = computed(() => Math.min(100, Math.max(0, (props.health / props.maxHealth) * 100)))
const xpPercent = computed(() => Math.min(100, Math.max(0, (props.xp / props.maxXp) * 100)))

const healthBarColor = computed(() => {
   if (healthPercent.value > 50) return '#2ecc71'
   if (healthPercent.value > 20) return '#f1c40f'
   if (healthPercent.value < 10) return '#e67e22'
   return '#e74c3c'
})
</script>

<template>
   <div class="player-stats">
      <div class="stats-header">
         <div class="player-name">{{ name }}</div>
         <div class="status-text">HP: {{ health }}/{{ maxHealth }}</div>
      </div>

      <!-- Health Bar -->
      <div class="status-bar health-bar">
         <div class="status-fill" :style="{
            width: `${healthPercent}%`,
            backgroundColor: healthBarColor
         }">
            <div class="pixel-overlay"></div>
         </div>
      </div>

      <!-- XP Bar -->
      <div class="stats-footer">
         <div class="status-text">XP: {{ xp }}/{{ maxXp }}</div>
         <div class="status-bar xp-bar">
            <div class="status-fill" :style="{ width: `${xpPercent}%` }">
               <div class="pixel-overlay"></div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.player-stats {
   background-color: rgba(0, 0, 0, 0.8);
   padding: 1rem;
   border: 4px solid red;
   border-radius: 0;
   width: 300px;
   position: relative;
   font-family: 'Press Start 2P', cursive;
   box-shadow: 0 0 0 4px #ffce1c, 
               inset 0 0 20px rgba(0, 0, 0, 0.5);
   image-rendering: pixelated;
}

.player-stats::before {
   content: '';
   position: absolute;
   top: 4px;
   left: 4px;
   right: 4px;
   bottom: 4px;
   border: 2px solid #ffce1c;
   pointer-events: none;
}

.stats-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 0.5rem;
}

.player-name {
   color: #ffce1c;
   font-size: 1rem;
   text-shadow: 2px 2px #931e30;
}

.status-text {
   color: #ffce1c;
   font-size: 0.7rem;
   text-shadow: 1px 1px #931e30;
}

.status-bar {
   background-color: #2a0f13;
   height: 24px;
   border: 2px solid #931e30;
   padding: 2px;
   margin: 0.5rem 0;
   position: relative;
   overflow: hidden;
}

.status-fill {
   height: 100%;
   transition: all 0.3s ease;
   position: relative;
}

.pixel-overlay {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 75%,
      transparent 75%
   );
   background-size: 4px 4px;
   opacity: 0.5;
}

.health-bar {
   border-color: red;
   box-shadow: 0 0 10px rgba(147, 30, 48, 0.5);
   margin-bottom: 1rem;
}

.xp-bar {
   height: 16px;
   border-color: #ffce1c;
   box-shadow: 0 0 10px rgba(255, 206, 28, 0.3);
}

.xp-bar .status-fill {
   background-color: #ffce1c;
}

.stats-footer {
   margin-top: 0.5rem;
}

@keyframes pulse {
   0% { opacity: 0.8; }
   50% { opacity: 1; }
   100% { opacity: 0.8; }
}

.status-fill {
   animation: pulse 2s infinite;
}
</style>