<template>
  <!-- Card -->
  <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-3 mr-4 text-white-100 bg-orange-100 rounded-full dark:text-white-100 " v-bind:style="{ 'background-color': card.color}">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 22 22">
        <path 
          :d=card.svg>
        </path>
      </svg>
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        {{ card.name }}
      </p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {{ card.value }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const { card } = defineProps({
  card: {
    type: Object,
    required: true
  }
})
</script>   
<style></style>