<script>
export default {
  data() {
    return {
      position: {
        top: 0,
        left: 0,
      },
      step: 10, // Quantidade de pixels por movimento
    };
  },
  methods: {
    handleKeyPress(event) {
      switch (event.keyCode) {
        case 37: // Esquerda
          this.position.left -= this.step;
          break;
        case 38: // Cima
          this.position.top -= this.step;
          break;
        case 39: // Direita
          this.position.left += this.step;
          break;
        case 40: // Baixo
          this.position.top += this.step;
          break;
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  },
};
</script>

<template>
  <div
    class="character"
    :style="{
      top: position.top + 'px',
      left: position.left + 'px',
      position: 'absolute',
    }"
  >
  </div>
</template>

<style scoped>
.character {
  height: 100px;
  width: 50px;
  background-color: red;
  transition: all 0.1s ease;
}
</style>
