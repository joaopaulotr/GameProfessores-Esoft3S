<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
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
    default: 0
  },
  maxXp: {
    type: Number,
    default: 100
  }
})

const showXP = computed(() => props.xp !== undefined && props.maxXp !== undefined)
const healthPercent = computed(() => (props.health / props.maxHealth) * 100)
const xpPercent = computed(() => (props.xp / props.maxXp) * 100)

const previousHealth = ref(props.health)
const previousHealthPercent = ref(healthPercent.value)
const showDamageIndicator = ref(false)

watch(() => props.health, (newHealth, oldHealth) => {
  if (newHealth < oldHealth) {
    previousHealthPercent.value = (oldHealth / props.maxHealth) * 100
    showDamageIndicator.value = true
    setTimeout(() => {
      showDamageIndicator.value = false
    }, 1000)
  }
})
</script>

<template>
  <div class="health-bar-container">
    <div class="name-plate">{{ name }}</div>
    <div class="bars-container">
      <div class="health-bar">
        <div class="health-label">HP: {{ health }}/{{ maxHealth }}</div>
        <div class="bar-background">
          <div class="bar-fill" 
               :style="{ width: healthPercent + '%' }"
               :class="{ 
                 'low-health': healthPercent <= 25,
                 'critical-health': healthPercent <= 10 
               }">
            <div class="health-segments">
              <div v-for="n in 10" :key="n" class="segment"></div>
            </div>
          </div>
          <div class="damage-indicator" 
               :style="{ width: previousHealthPercent + '%' }"
               v-if="showDamageIndicator"></div>
        </div>
      </div>
      
      <div v-if="showXP" class="xp-bar">
        <div class="xp-label">XP: {{ xp }}/{{ maxXp }}</div>
        <div class="bar-background">
          <div class="bar-fill xp-fill" :style="{ width: xpPercent + '%' }">
            <div class="xp-segments">
              <div v-for="n in 10" :key="n" class="segment"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.health-bar-container {
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #ffce1c;
  min-width: 300px;
}

.name-plate {
  font-family: 'Press Start 2P', cursive;
  color: #ffce1c;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.bars-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.health-bar, .xp-bar {
  width: 100%;
}

.health-label, .xp-label {
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  color: #fff;
  margin-bottom: 0.25rem;
}

.bar-background {
  height: 20px;
  background: #333;
  border: 2px solid #666;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(to right, #2ecc71, #27ae60);
  transition: width 0.3s ease-out;
  position: relative;
}

.damage-indicator {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 0, 0, 0.5);
  transition: width 1s ease-out;
  pointer-events: none;
}

.health-segments, .xp-segments {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}

.segment {
  flex: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}

.segment:last-child {
  border-right: none;
}

.low-health {
  background: linear-gradient(to right, #e74c3c, #c0392b);
  animation: pulse 1.5s infinite;
}

.critical-health {
  background: linear-gradient(to right, #c0392b, #962b22);
  animation: pulse 0.8s infinite;
}

.xp-fill {
  background: linear-gradient(to right, #3498db, #2980b9);
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}
</style>
