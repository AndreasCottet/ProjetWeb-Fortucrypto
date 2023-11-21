import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Exchange from "../views/Exchange.vue";
import Convertir from "../views/Convertir.vue";
import Wallet from "../views/Wallet.vue";

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
      path: '/convertir',
      name: 'convertir',
      component: Convertir
    }, {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    }
  ]
})

export default router
