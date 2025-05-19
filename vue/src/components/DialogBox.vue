<template>
    <div
      v-if="visible"
      class="dialog-overlay"
      @keydown.prevent="handleKey"
      tabindex="0"
    >
      <div class="dialog-box">
        <p class="dialog-text">{{ displayText }}</p>
        <p class="hint">Pressione <span>E</span> para continuar</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  
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
  const typingSpeed = 50 // ms por letra
  let typingInterval = null
  
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

  
  function handleKey(e) {
    if (!visible.value) return
    if (e.key.toLowerCase() !== 'e') return
  
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
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 1000;
    outline: none;
  }
  .dialog-box {
    max-width: 80%;
    background-color: #fdf7e3;
    border: 4px solid #ffffff;
    border-radius: 30px;
    padding: 20px;
    margin-bottom: 32px;
    font-family: 'Press Start 2P', monospace;
    font-size: 14px;
    color: #000;
    line-height: 1.3;
    position: relative;
  }
  .dialog-text {
    white-space: pre-wrap;
  }
  .hint {
    font-size: 12px;
    text-align: right;
    margin-top: 8px;
  }
  .hint span {
    background: #000;
    color: #fff;
    padding: 2px 4px;
    font-family: monospace;
  }
  </style>
  