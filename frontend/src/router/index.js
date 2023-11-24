import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Exchange from "../views/Exchange.vue";
import Coin from "../views/Coin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    }, {
      path: '/coin/:id',
      name: 'Coin',
      component: Coin,
    }
  ]
})

export default router
