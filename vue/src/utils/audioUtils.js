// Utilitário para controle de áudio no jogo
export function playSound(soundName) {
  const sounds = {
    'professor-approach': '/sounds/professor-approach.mp3',
    'battle-start': '/sounds/battle-start.mp3',
    'professor-unavailable': '/sounds/professor-unavailable.mp3'
  };

  const audio = new Audio();
  audio.src = sounds[soundName] || '';
  audio.volume = 0.2;
  
  if (sounds[soundName]) {
    audio.play().catch(e => console.log(`Erro ao tocar som ${soundName}:`, e));
  }
}

// Previne múltiplas chamadas do mesmo som em um curto período
let soundDebounce = {};
export function playSoundWithDebounce(soundName, timeout = 2000) {
  if (soundDebounce[soundName]) return;
  
  playSound(soundName);
  
  soundDebounce[soundName] = true;
  setTimeout(() => {
    soundDebounce[soundName] = false;
  }, timeout);
}
