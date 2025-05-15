<template>
    <div class="menu-screen">
      <h1>Syntax Fight</h1>
      <p>Batalha no DOM</p>
      <router-link to="/map"><button>Jogar</button></router-link>
      <router-link to="/credits"><button>Créditos</button></router-link>
      <router-link to="/commands"><button>Comandos / Teclado</button></router-link>
    </div>
  </template>
  
<style scoped>
.menu-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
  background-color: #121212;
  color: #fff;
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
}

button {
  width: 200px;
  padding: 12px 0;
  font-size: 1.2rem;
  margin: 10px 0;
}
</style>
