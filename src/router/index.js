import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConnectionView from "../views/ConnectionView.vue";
import GameView from "../views/game/GameView.vue";

const routes = [
  // Temporary redirect to home on the main page
  {
    path: "/",
    redirect: { name: "home" }
  },
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
    component: GameView,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
