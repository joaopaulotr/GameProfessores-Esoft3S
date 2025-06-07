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
   return '#e74c3c'
})
</script>

<template>
   <div class="player-stats">
      <div class="stats-header">
         <div class="player-name">{{ name }}</div>
      </div>

      <div class="hp-container">
         <div class="hp-label">HP:</div>
         <div class="hp-numbers">{{ health }}/{{ maxHealth }}</div>
      </div>

      <!-- Health Bar -->
      <div class="status-bar health-bar">
         <div class="status-fill" :style="{
            width: `${healthPercent}%`,
            backgroundColor: healthBarColor
         }">
         </div>
      </div>

      <!-- XP Bar -->
      <div class="stats-footer">
         <div class="xp-container">
            <div class="xp-label">EXP:</div>
            <div class="status-bar xp-bar">
               <div class="status-fill" :style="{ width: `${xpPercent}%`, backgroundColor: '#4898d8' }">
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.player-stats {
   background-color: #103040;
   padding: 1rem;
   border: 4px solid #4898d8;
   border-radius: 10px;
   width: 300px;
   position: relative;
   font-family: 'Press Start 2P', cursive;
   box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
   color: #f8f8f8;
}

.stats-header {
   margin-bottom: 0.5rem;
}

.player-name {
   font-size: 1.2em;
   color: #f8f8f8;
   margin-bottom: 0.5rem;
}

.hp-container {
   display: flex;
   align-items: center;
   gap: 0.5rem;
   margin-bottom: 0.25rem;
}

.hp-label {
   font-size: 0.9em;
   color: #f8f8f8;
}

.hp-numbers {
   font-size: 0.9em;
   color: #f8f8f8;
}

.status-bar {
   background-color: #081820;
   height: 12px;
   border: 2px solid #4898d8;
   border-radius: 4px;
   overflow: hidden;
   margin: 4px 0;
}

.status-fill {
   height: 100%;
   transition: width 0.3s ease, background-color 0.3s ease;
}

.health-bar .status-fill {
   background-color: #2ecc71;
}

.xp-container {
   display: flex;
   flex-direction: column;
   gap: 0.25rem;
   margin-top: 0.5rem;
}

.xp-label {
   font-size: 0.8em;
   color: #4898d8;
}

.xp-bar {
   height: 8px;
}
</style>
