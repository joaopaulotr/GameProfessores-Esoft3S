import { ref } from 'vue';
import { Howl, Howler } from 'howler';


const tracks = {
  menu: 'src/assets/music/',    
  map: 'src/assets/music/musicaMapa.mp3',      
  battle: 'src/assets/music/musicaBatalha.mp3'
};



const howlNodes = {}; 
const currentTrackName = ref(null);
const globalVolume = ref(0.5); 

Howler.volume(globalVolume.value);

export const audioManager = {
  playTrack(trackName) {
    if (!tracks[trackName] || currentTrackName.value === trackName) {
      return;
    }

    if (currentTrackName.value && howlNodes[currentTrackName.value]) {
      const oldNode = howlNodes[currentTrackName.value];
      oldNode.once('fade', () => {
        oldNode.stop();
      });
      oldNode.fade(oldNode.volume(), 0, 1000);
    }

    currentTrackName.value = trackName;
    let newNode = howlNodes[trackName];
    if (!newNode) {
      newNode = new Howl({
        src: [tracks[trackName]],
        loop: true,
        html5: true,
        volume: 0
      });
      howlNodes[trackName] = newNode;
    }

    if (!newNode.playing()) {
      newNode.play();
    }
    
    newNode.fade(0, globalVolume.value, 1000);
  },

  stopAll() {
    if (currentTrackName.value && howlNodes[currentTrackName.value]) {
      const node = howlNodes[currentTrackName.value];
      node.once('fade', () => {
        node.stop();
        currentTrackName.value = null;
      });
      node.fade(node.volume(), 0, 1000);
    }
  },

  setGlobalVolume(volume) {
    globalVolume.value = Math.max(0, Math.min(1, volume));
    Howler.volume(globalVolume.value);
  },
  
  globalVolume,
};