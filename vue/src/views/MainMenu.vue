<template>
    <div class="menu-screen">
      <h1>Syntax Fight</h1>
      <h1 class="subtitle">Batalha no DOM</h1>
      <div class="buttons-container">
        <router-link to="/map"><button>Jogar</button></router-link>
        <router-link to="/credits"><button>Créditos</button></router-link>
        <router-link to="/commands"><button>Comandos</button></router-link>
      </div>
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
  background-color: #24b5f8;
  color: #fff;
  background-image: url('@/assets/images/background.png');
  background-size: cover;
  background-position: center;
}

h1 {
  font-size: 4.5rem;
  margin: 0;
  text-align: center;
  color: #ffce1c;
  text-shadow:
    4px 4px 0 #931e30,
    2px 4px 0 #931e30,
    4px 2px 0 #931e30,
    6px 6px 0 rgba(147, 30, 48, 0.6),
    8px 8px 0 rgba(147, 30, 48, 0.4),
    10px 10px 0 rgba(147, 30, 48, 0.2);
}

.subtitle {
  font-size: 1.5rem;
  margin: 10px 0 25px 0;
  color: #fff;
  text-shadow:
    2px 2px 0 #931e30,
    1px 2px 0 #931e30,
    2px 1px 0 #931e30,
    3px 3px 0 rgba(147, 30, 48, 0.6);
  letter-spacing: 2px;
  font-weight: bold;
  animation: pulse 2s infinite alternate;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

button {
  width: 250px;
  font-size: 1rem;
  padding: 8px 0;
  font-family: 'Press Start 2P', cursive;
  background-color: transparent;
  border: none;
  color: white;
  text-shadow:
    2px 2px 0 rgba(0, 0, 0, 0.5),
    1px 1px 0 rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.2s ease;
}

button:hover {
  cursor: pointer;
  transform: scale(1.05);
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.7),
    1px 1px 0 rgba(0, 0, 0, 0.7);
}

button:active {
  transform: scale(0.98);
}

@keyframes pulse {
  from {
    text-shadow:
      2px 2px 0 #931e30,
      1px 2px 0 #931e30,
      2px 1px 0 #931e30,
      3px 3px 0 rgba(147, 30, 48, 0.6);
  }
  to {
    text-shadow:
      2px 2px 0 #931e30,
      1px 2px 0 #931e30,
      2px 1px 0 #931e30,
      3px 3px 0 rgba(147, 30, 48, 0.6),
      4px 4px 0 rgba(147, 30, 48, 0.4);
  }
}

.cloud {
  width: 100px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50px;
  left: 50px;
  animation: moveCloud 45s linear infinite;
  box-shadow: 30px 0px 0px #fff, 60px 10px 0px #fff;
  opacity: 0.8;
}

@keyframes moveCloud {
  0% {
    left: -200px;
  }
  100% {
    left: 110%;
  }
}

</style>
