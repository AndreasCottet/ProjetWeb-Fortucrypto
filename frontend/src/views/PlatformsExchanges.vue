<script setup>
import ListeExchange from "../components/ListeExchange.vue";
import ListeCard from "../components/ListeCard.vue";

</script>

<template>
  <main class="container px-6 mx-auto grid">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      Plateformes d'échange
    </h2>
    <ListeCard />
    <ListeExchange />
  </main>
</template>
