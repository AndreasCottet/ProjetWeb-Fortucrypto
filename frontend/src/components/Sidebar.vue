<template>
  <!-- Desktop sidebar -->
  <aside
    class="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block h-screen border-r border-gray-200 dark:border-gray-700"
  >
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <router-link class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" to="/">
        FortuCrypto
      </router-link>
      <ul class="mt-6">
        <li class="relative px-6 py-3" v-for="page in pages" :key="pages.name">
          <router-link
            exact-active-class="text-white"
            class="inline-flex items-center w-full text-sm font-semibold transition duration-200 ease-in hover:bg-purple-500 hover:text-white py-2 px-2 rounded-lg"
            :to="page.to"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    to: "/exchange",
    name: "Exchange",
  },
]);
</script>
<style></style>
