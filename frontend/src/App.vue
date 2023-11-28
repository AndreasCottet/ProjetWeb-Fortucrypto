<template>
  <body>
    <div class="flex h-full bg-gray-50 dark:bg-gray-900" id="app">
      <Sidebar />
      <div class="flex flex-col flex-1 w-full">
        <Header />
        <div class="p-6 dark:text-white">
          <RouterView />
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
</script>

<style scoped></style>
