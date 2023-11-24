<script setup>
import { onMounted, ref } from "vue";
</script>

<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Portefeuille
      </h2>
      <!-- Cards -->
      <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <!-- Card -->
        <div class="flex items-center p-10 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-white-100 bg-orange-100 rounded-full dark:text-white-100 "
            style="background-color: #a01bae">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 22 22">
              <path d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3">
              </path>
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Solde actuel
            </p>
            <p class="text-lg font-bold text-gray-700 dark:text-gray-200">
              50 000€
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
