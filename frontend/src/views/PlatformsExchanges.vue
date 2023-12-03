<script setup>
import {onMounted, ref} from "vue";
import ListeExchangev2 from "../components/ListeExchangev2.vue";
import ListeCard from "../components/ListeCard.vue";

</script>

<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Plateformes d'échange
      </h2>
      <!-- Cards -->
      <ListeCard />

      <!-- New Table -->
      <ListeExchangev2 />
    </div>
  </main>
</template>
