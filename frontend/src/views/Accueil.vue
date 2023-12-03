<script setup>
import ListeCryptoV2 from "../components/ListeCryptoV2.vue";
import ListeCard from "../components/ListeCard.vue";

</script>

<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Accueil
      </h2>
      <!-- Cards -->
      <ListeCard />

      <!-- New Table -->
      <ListeCryptoV2 />
    </div>
  </main>
</template>
