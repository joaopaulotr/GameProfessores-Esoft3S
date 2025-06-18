import { createRouter, createWebHistory } from 'vue-router';
import MainMenu from '@/views/MainMenu.vue';
import GameMapWithZoom from '@/views/GameMapWithZoom.vue';
import BattleScreen from '@/views/BattleScreen.vue';
import Credits from '@/views/Credits.vue';
import Instructions from '@/views/Instructions.vue';
import Victory from '@/views/Victory.vue';
import Defeat from '@/views/Defeat.vue';
import Commands from '@/views/Commands.vue';    
import OptionsView from '@/views/OptionsView.vue';
import Intro from '@/views/intro.vue'
import { audioManager } from '../utils/audioManager'; // PASSO 1: Importe nosso gerenciador





const routes = [
  //{ path: '/menu', component: MainMenu },
  //{ path: '/map', component: GameMapWithZoom },
  { path: '/battle', component: BattleScreen },
  { path: '/credits', component: Credits },
  { path: '/instructions', component: Instructions },
  { path: '/victory', component: Victory },
  { path: '/defeat', component: Defeat },
  { path: '/commands', component: Commands },
  { path: '/options', component: OptionsView },
  { path: '/', component: Intro },
  { 
    path: '/menu', 
    name: 'MainMenu',
    component: MainMenu,
    meta: { soundtrack: 'menu' } // Toca a música do menu
  },
  { 
    path: '/map', 
    name: 'GameMapWithZoom',
    component: GameMapWithZoom,
    meta: { soundtrack: 'map' } // Toca a música do mapa
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  

  router.beforeEach((to, from) => {
  
    const trackName = to.meta.soundtrack;
  
    if (trackName) {
     
      audioManager.playTrack(trackName);
    } else {
     
      audioManager.stopAll();
    }
  });
  
  export default router;