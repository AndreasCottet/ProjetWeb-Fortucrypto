<template>
  <form class="flex flex-col rounded-lg border-2 border-gray-500 bg-gray-800 w-fit py-4 px-8 mx-auto mt-20" @submit.prevent="handleLogin">
    <h1 class="font-bold text-lg my-4">Se connecter</h1>

    <label class="mb-1 font-light">Nom d'utilisateur</label>
    <input type="text" placeholder="Michel Michel" class="w-96 bg-gray-700 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:bg-gray-600" v-model="form.username">

    <label class="mb-1 font-light">Mot de passe</label>
    <input type="password" placeholder="*************" class="w-96 bg-gray-700 rounded-lg px-4 py-2 mb-12 focus:outline-none focus:bg-gray-600" v-model="form.password">

    <button class="rounded-lg bg-purple-600 text-white border-4 border-purple-600 hover:text-white hover:bg-purple-700 hover:border-purple-700 h-12 mb-2">Connexion</button>
  </form>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  import axios from 'axios';
  import { sha256 } from 'js-sha256';
  import {login} from "../api/api";

  const router = useRouter();
  const store = useStore();

  const form = reactive({ username: '', password: '' });

  async function handleLogin() {
    const { username, password } = form;
    const hashedPassword = sha256(password);

    try {
      await login(username, hashedPassword );
      await store.dispatch('login', username);
      await router.push({ name: 'Accueil' });
    } catch (e) {
      console.error(e)
      console.error('Mauvais nom d\'utilisateur ou mot de passe');
    }
  };
</script>

<style scoped>

</style>