<template>
  <body>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900" id="app">
      <Sidebar :isSideMenuOpen="isSideMenuOpen" @close-side-menu="isSideMenuOpen = false" />
      <div class="flex flex-col flex-1 w-full">
        <Header @open-side-menu="isSideMenuOpen = !isSideMenuOpen" />
        <div class="p-6 dark:text-white">
          <RouterView />
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref } from "vue";

import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

const isSideMenuOpen = ref(false);
</script>

<style scoped></style>
