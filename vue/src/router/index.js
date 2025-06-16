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




const routes = [
  { path: '/menu', component: MainMenu },
  { path: '/map', component: GameMapWithZoom },
  { path: '/battle', component: BattleScreen },
  { path: '/credits', component: Credits },
  { path: '/instructions', component: Instructions },
  { path: '/victory', component: Victory },
  { path: '/defeat', component: Defeat },
  { path: '/commands', component: Commands },
  { path: '/options', component: OptionsView }, // nova rota
  { path: '/', component: Intro }, // nova rota
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
