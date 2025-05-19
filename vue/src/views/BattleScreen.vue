<template>
  <div class="battle-screen">
    <h1>Tela de Batalha</h1>
    <div class="battle-arena">
      <!-- Componentes de batalha serão adicionados aqui -->
       <div class="tree">
         <div class="leaves layer1"></div>
         <div class="leaves layer2"></div>
         <div class="leaves layer3"></div>
         <div class="trunk"></div>
      </div>

    </div>
    <div class="action-buttons">
      <!-- ActionButtons component será usado aqui -->
    </div>
    <div class="menu-buttons">
      <router-link to="/"><button>Voltar ao Menu</button></router-link>
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

.menu-buttons {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

body {
  background-color: #cce7ff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.tree {
  position: relative;
  width: 0;
  height: 0;
}

.leaves {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-bottom: 60px solid green;
}

.layer1 {
  top: 0;
}

.layer2 {
  top: 40px;
  border-left-width: 70px;
  border-right-width: 70px;
  border-bottom-width: 70px;
}

.layer3 {
  top: 90px;
  border-left-width: 80px;
  border-right-width: 80px;
  border-bottom-width: 80px;
}

.trunk {
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 40px;
  background-color: #8b5a2b;
  border-radius: 3px;
}

</style>
