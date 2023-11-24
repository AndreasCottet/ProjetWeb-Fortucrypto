<template>
  <!-- Desktop sidebar -->
  <aside
    class="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block h-screen border-r border-gray-200 dark:border-gray-700">
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <router-link class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" to="/">
        <img src="../assets/logo.png" class="w-32 mx-auto">
      </router-link>
      <ul class="mt-6">
        <li class="relative px-6 py-3" v-for="page in pages" :key="pages.name">
          <router-link exact-active-class="text-white"
            class="inline-flex items-center w-full text-sm font-semibold transition duration-200 ease-in hover:bg-purple-500 hover:text-white py-2 px-2 rounded-lg"
            :to="page.to">
            <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path :d="page.img"></path>
            </svg>
            <span class="ml-4">{{ page.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script setup>
import { ref } from "vue";

const pages = ref([
  {
    img:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    to: "/",
    name: "Accueil",
  },
  {
    img:
      "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
    to: "/exchange",
    name: "Plateformes d'échange",
  },
  {
    img:
      "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    to: "/convertir",
    name: "Convertir",
  },
  {
    img:
      "M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3",
    to: "/wallet",
    name: "Portefeuille",
  },
]);
</script>
<style></style>
