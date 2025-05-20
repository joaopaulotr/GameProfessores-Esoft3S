<script setup>
import HealthBar from '../components/HealthBar.vue'
import { ref } from 'vue'

const playerStats = ref({
   name: 'Aluno',
   health: 100,
   maxHealth: 100,
   xp: 50,
   maxXp: 100
})

// Funções de teste
const damagePlayer = () => {
   if (playerStats.value.health > 10) {
      playerStats.value.health -= 10
   }
}

const healPlayer = () => {
   if (playerStats.value.health < playerStats.value.maxHealth) {
      playerStats.value.health = Math.min(playerStats.value.maxHealth, playerStats.value.health + 10)
   }
}

const addXP = () => {
   if (playerStats.value.xp < playerStats.value.maxXp) {
      playerStats.value.xp = Math.min(playerStats.value.maxXp, playerStats.value.xp + 10)
   }
}
</script>

<template>
  <div class="battle-screen">
    <h1>Tela de Batalha</h1>
    <div class="battle-interface">
      <div class="player-status">
        <HealthBar
          :name="playerStats.name"
          :health="playerStats.health"
          :maxHealth="playerStats.maxHealth"
          :xp="playerStats.xp"
          :maxXp="playerStats.maxXp"
        />
      </div>
      
      <!-- Botões de teste -->
      <div class="test-buttons">
        <button @click="damagePlayer">Tomar Dano (-10)</button>
        <button @click="healPlayer">Curar (+10)</button>
        <button @click="addXP">Ganhar XP (+10)</button>
      </div>

      <div class="battle-arena">
        <!-- Componentes de batalha serão adicionados aqui -->
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
  min-height: 100vh;
  background-color: #121212;
  color: #fff;
  padding: 20px;
}

.battle-interface {
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
}

.player-status {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.battle-arena {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0;
  position: relative;
  min-height: 400px;
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

button {
  font-family: 'Press Start 2P', cursive;
  padding: 10px 20px;
  background-color: #931e30;
  color: #ffce1c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  background-color: #b92639;
}

.test-buttons {
   position: fixed;
   top: 200px;
   left: 20px;
   display: flex;
   flex-direction: column;
   gap: 10px;
   z-index: 10;
}

.test-buttons button {
   min-width: 150px;
}
</style>
