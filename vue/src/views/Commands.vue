<template>
  <div class="commands-screen">
    <router-link to="/"><button>Voltar ao Menu</button></router-link>
    <h1>Comandos e Controles</h1>
    <div class="commands-container">
      <div class="command-section">
        <h2>Controles de Teclado</h2>
        <ul>
          <li><strong>Setas</strong>: Movimentação</li>
          <li><strong>Espaço</strong>: Atacar</li>
          <li><strong>E</strong>: Interagir</li>
          <li><strong>I</strong>: Inventário</li>
          <li><strong>Esc</strong>: Menu de pausa</li>
        </ul>
      </div>
      <div class="command-section">
        <h2>Comandos de Combate</h2>
        <ul>
          <li><strong>1-4</strong>: Selecionar habilidades</li>
          <li><strong>Tab</strong>: Alternar entre inimigos</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.commands-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  background-color: #121212;
  color: #fff;
}

.commands-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 80%;
  margin: 2rem 0;
}

.command-section {
  background-color: #1e1e1e;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem;
  min-width: 300px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

h2 {
  margin-bottom: 1rem;
  color: #5c6bc0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

button {
  margin-bottom: 2rem; /* Ajuste para espaçamento abaixo do botão */
}
</style>
