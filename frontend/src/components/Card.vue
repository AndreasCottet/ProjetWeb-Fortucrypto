<template>
  <div class="flex items-center p-4 rounded-lg bg-gray-800">
    <div class="p-3 mr-4 rounded-full text-white-100 " v-bind:style="{ 'background-color': card.color}">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 22 22">
        <path 
          :d=card.svg>
        </path>
      </svg>
    </div>
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else>
      <p class="mb-2 text-sm font-medium text-gray-400">
        {{ card.name }}
      </p>
      <p class="text-lg font-semibold text-gray-200">
        {{ card.value }}
      </p>
    </div>
  </div>
</template>
<script setup>
import Loading from "./Loading.vue";

const { card } = defineProps({
  card: {
    type: Object,
    required: true
  },
  isLoading : {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>   
<style></style>