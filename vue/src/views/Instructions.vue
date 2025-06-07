<template>
  <div class="instructions-screen">
    <h1>Instruções</h1>

    <div class="instructions-content">

      <div class="instruction-section">
        <p>
          Bem-vindo à sua jornada pela lógica de programação! Neste jogo, você explorará mapas, enfrentará inimigos e aprenderá conceitos fundamentais enquanto se diverte.
        </p>
      </div>

      <div class="instruction-section">
        <h2>Controles</h2>
        <ul>
          <li><strong>Setas do teclado:</strong> mover o personagem</li>
          <li><strong>Enter:</strong> interagir com objetos e personagens</li>
          <li><strong>Esc:</strong> abrir o menu</li>
        </ul>
      </div>

      <div class="instruction-section">
        <h2>Como Jogar</h2>
        <p>
          Explore o mapa usando as setas do teclado. Colete itens escondidos e avance pelos desafios enfrentando inimigos e superando obstáculos lógicos.
        </p>
      </div>

      <div class="instruction-section">
        <h2>Batalhas</h2>
        <p>
          Durante as batalhas, escolha ataques com base em conceitos de programação, como estruturas condicionais, loops e variáveis. Cada inimigo é uma chance de aprender!
        </p>
      </div>

      <div class="instruction-section">
        <h2>Objetivo</h2>
        <p>
          Derrote o <strong>Professor Erro de Sintaxe</strong> e prove seu domínio da lógica. Torne-se o verdadeiro Mestre da Sintaxe de Programação!
        </p>
      </div>

      <div class="instruction-section">
        <h2>Dicas Rápidas</h2>
        <ul>
          <li>Fique atento aos diálogos – eles contêm dicas valiosas.</li>
          <li>Errou? Não tem problema. Aprender faz parte da jornada!</li>
          <li>Explore tudo! Há segredos escondidos pelo mapa.</li>
        </ul>
      </div>

    </div>

    <router-link to="/"><button>Voltar ao Menu</button></router-link>
  </div>
</template>

<style scoped>
.instructions-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  background-color: #121212;
  color: #fff;
}

.instructions-content {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2rem 0;
}

.instruction-section {
  background-color: #1e1e1e;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

h2 {
  color: #5c6bc0;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
}

ul {
  padding-left: 1.5rem;
  line-height: 1.6;
}

li {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

button {
  margin-top: 2rem;
  font-family: 'Press Start 2P', monospace;
  background-color: #5c6bc0;
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3f51b5;
}
</style>
