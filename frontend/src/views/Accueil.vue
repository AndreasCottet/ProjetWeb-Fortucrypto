<script setup>
import ListeCrypto from "../components/ListeCrypto.vue";
import ListeCard from "../components/ListeCard.vue";

</script>

<template>
  <main class="container px-6 mx-auto grid">
    <h2 class="my-6 text-2xl font-semibold text-gray-200">
      Accueil
    </h2>
    <!-- Cards -->
    <ListeCard />

    <!-- New Table -->
    <ListeCrypto />
  </main>
</template>
