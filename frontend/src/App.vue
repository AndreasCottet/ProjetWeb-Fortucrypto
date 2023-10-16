<template>
  <body>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900" :class="{ 'overflow-hidden': isSideMenuOpen }">
      <Menu />
      <div class="flex flex-col flex-1 w-full">
        <Header />
        <HomeView />
      </div>
    </div>
  </body>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
import HomeView from './views/HomeView.vue'
</script>

<style scoped></style>
