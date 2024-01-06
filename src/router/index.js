import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ConnectionView from "../views/ConnectionView.vue";
import GameView from "../views/GameView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
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
