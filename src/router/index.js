import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import ConnectionView from "../views/connection/ConnectionView.vue";
import GameView from "../views/game/GameView.vue";
import DevelopView from "../views/viewDevelop/DevelopView.vue";

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
  },
  {
    path: '/dev',
    name: 'dev',
    component: DevelopView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
