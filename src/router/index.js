import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConnectionView from "../views/ConnectionView.vue";
import GameView from "../views/GameView.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: '/connect',
    name: 'connection',
    component: ConnectionView
  },
  {
    path: '/game',
    name: 'game',
    component: GameView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
