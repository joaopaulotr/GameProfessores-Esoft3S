<template>
  <div
    v-if="visible"
    class="dialog-overlay"
    @keydown.prevent="handleKey"
    tabindex="0"
  >
    <div class="dialog-box">
      <div class="dialog-arrow"></div>
      <p class="dialog-text">{{ displayText }}</p>
      <div class="hint-container" v-show="isMessageComplete">
        <div class="arrow-down"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['close'])

const visible = ref(false)
const currentMessageIndex = ref(0)
const displayText = ref('')
const charIndex = ref(0)
const typingSpeed = 30 // ms por letra - mais rápido como em Pokémon
let typingInterval = null

const isMessageComplete = computed(() => {
  if (!props.messages[currentMessageIndex.value]) return false
  return charIndex.value >= props.messages[currentMessageIndex.value].length
})

function startDialog() {
  visible.value = true
  currentMessageIndex.value = 0
  showNextMessage()
}

function showNextMessage() {
  clearInterval(typingInterval)
  displayText.value = ''
  charIndex.value = 0

  const message = props.messages[currentMessageIndex.value]
  typingInterval = setInterval(() => {
    if (charIndex.value < message.length) {
      displayText.value += message[charIndex.value]
      charIndex.value++
      playTypingSound()
    } else {
      clearInterval(typingInterval)
    }
  }, typingSpeed)
}

function playTypingSound() {
  // Implementar som de digitação como em Pokémon
}

function handleKey(e) {
  if (!visible.value) return
  if (e.key.toLowerCase() !== 'e' && e.key !== ' ' && e.key !== 'Enter') return

  const message = props.messages[currentMessageIndex.value]

  if (charIndex.value < message.length) {
    clearInterval(typingInterval)
    displayText.value = message
    charIndex.value = message.length
  } else {
    if (currentMessageIndex.value < props.messages.length - 1) {
      currentMessageIndex.value++
      showNextMessage()
    } else {
      closeDialog()
    }
  }
}

function closeDialog() {
  clearInterval(typingInterval)
  visible.value = false
  emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
  nextTick(startDialog)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
  clearInterval(typingInterval)
})
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: transparent;
  z-index: 1000;
  outline: none;
}

.dialog-box {
  width: 90%;
  max-width: 800px;
  background-color: white;
  border: 4px solid #931e30; 
  border-radius: 0;
  padding: 16px;
  margin-bottom: 40px;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
  position: relative;
  font-family: 'Press Start 2P', monospace;
  font-size: 16px;
  color: #000;
  line-height: 1.5;
  image-rendering: pixelated;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.7);
}

.dialog-box::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c; /* Bordas internas amarelas */
  pointer-events: none;
}

.dialog-text {
  white-space: pre-wrap;
  margin: 0;
  padding: 0;
  min-height: 64px;
}

.hint-container {
  position: absolute;
  right: 16px;
  bottom: 8px;
  animation: bounce 0.6s infinite alternate;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #931e30; /* Seta em vermelho escuro */
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(4px);
  }
}

/* Estilo para o cursor de texto */
.dialog-text::after {
  content: '▮';
  display: inline-block;
  animation: blink 1s infinite;
  position: relative;
  top: 0;
  color: #931e30; /* Cursor vermelho para combinar */
}

@keyframes blink {
  from, to { opacity: 0; }
  50% { opacity: 1; }
}
</style>