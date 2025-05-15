<template>
  <div class="battle-screen">
    <h1>Tela de Batalha</h1>
    <div class="battle-arena">
      <!-- Componentes de batalha serão adicionados aqui -->
    </div>
    <div class="action-buttons">
      <!-- ActionButtons component será usado aqui -->
    </div>
  </div>
</template>

<style scoped>
.battle-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #121212;
  color: #fff;
}

.battle-arena {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 2rem 0;
}

.action-buttons {
  width: 80%;
  margin-top: 1rem;
}
</style>