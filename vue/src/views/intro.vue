<template>
    <div class="intro-container">
      <h1 class="titulo">Syntax Fight</h1>
      <p class="intro-text">{{ textoDigitado }}<span class="cursor">|</span></p>
      <RouterLink to="/intro-video"><button  class="btn-continuar">Continuar</button></RouterLink>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const textoCompleto = `Em Syntax Fight: Batalha no DOM, o conhecimento é sua espada... e a sanidade, seu escudo.
Enfrente mestres implacáveis, derrote bugs traiçoeiros e supere os desafios mais temidos da vida acadêmica.
Entre erros de sintaxe e provas mortais, apenas os verdadeiros guerreiros do código sobreviverão.
Com coragem no coração e lógica nas mãos — a batalha começou.
Você está pronto para lutar até o último ponto e vírgula?`;
  const textoDigitado = ref('');
  let i = 0;
  
  const digitar = () => {
    if (i < textoCompleto.length) {
      textoDigitado.value += textoCompleto[i];
      i++;
      setTimeout(digitar, 50); // velocidade da digitação
    }
  };
  
  const irParaMenu = () => {
    router.push('/mainmenu');
  };
  
  onMounted(() => {
    digitar();
  });
  </script>
  
  <style scoped>
  
  .cursor {
  animation: blink 1s infinite;
  color: #ffce1c;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

  .titulo {
      font-size: 3rem;
      margin-bottom: 20px;
      color: #ffce1c;
      text-shadow: 2px 2px 0 #000;
      letter-spacing: 2px;
    }
  .intro-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 2rem;
    background: linear-gradient(135deg, #1e1e2f, #0f0f0f);
    background-size: cover;
    background-position: center;
    color: #ffffff;
    text-align: center;
  }
  
  .intro-text {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 700px;
    margin-bottom: 2rem;
    white-space: pre-wrap;
    animation: fadeIn 0.5s ease-in-out;
    margin-top: 10px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

  
  .btn-continuar {
    padding: 10px 20px;
    background-color: #e5b700;
    box-shadow: 0 0 10px #ffce1c;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    animation: pulse 1.8s infinite;
  }
    @keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 10px #ffce1c;
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 20px #ffce1c;
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 10px #ffce1c;
    }
}
  
  .btn-continuar:hover {
    background-color: #e5b700;
  }
  </style>
  