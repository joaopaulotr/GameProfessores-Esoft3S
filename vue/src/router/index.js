import { createRouter, createWebHistory } from 'vue-router';
import MainMenu from '@/views/MainMenu.vue';
import GameMap from '@/views/GameMap.vue';
import BattleScreen from '@/views/BattleScreen.vue';
import Credits from '@/views/Credits.vue';
import Instructions from '@/views/Instructions.vue';
import Victory from '@/views/Victory.vue';
import Defeat from '@/views/Defeat.vue';
import Commands from '@/views/Commands.vue';    
import OptionsView from '@/views/OptionsView.vue';



const routes = [
  { path: '/', component: MainMenu },
  { path: '/map', component: GameMap },
  { path: '/battle', component: BattleScreen },
  { path: '/credits', component: Credits },
  { path: '/instructions', component: Instructions },
  { path: '/victory', component: Victory },
  { path: '/defeat', component: Defeat },
  { path: '/commands', component: Commands },
  { path: '/', component: MainMenu }, // seu menu principal
  { path: '/options', component: OptionsView }, // nova rota
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
