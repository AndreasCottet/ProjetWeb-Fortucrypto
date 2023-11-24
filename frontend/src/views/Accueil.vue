<script setup>
import {onMounted, ref} from "vue";
import ListeCrypto from "../components/ListeCrypto.vue";
import Card from "../components/Card.vue";
import {getCryptos} from "../api/api";
import ListeCryptoV2 from "../components/ListeCryptoV2.vue";

const cards = ref([
  {
    name: "Capitalisation",
    value: "6389",
    svg: "M10.034,18.069a7.982,7.982,0,0,0,3.939-1.035l3.332,3.332a2.164,2.164,0,0,0,3.061-3.061L17.031,13.97a8.026,8.026,0,1,0-7,4.1ZM5.768,5.768A6.033,6.033,0,1,1,4,10.035,5.988,5.988,0,0,1,5.768,5.768Zm-.7,4.267a1.015,1.015,0,0,1,1-1.018.985.985,0,0,1,1,.983v.035A2.968,2.968,0,0,0,10.035,13a1,1,0,0,1,0,2A4.972,4.972,0,0,1,5.069,10.035Z",
    color: "#a01bae",
  },
  {
    name: "Volume d'échange",
    value: "46,760.89",
    svg: "M3,22a1,1,0,0,1-1-1V3A1,1,0,0,1,4,3V21A1,1,0,0,1,3,22ZM8,5v6h7a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1Zm13,8H8v6H21a1,1,0,0,0,1-1V14A1,1,0,0,0,21,13Z",
    color: "#21c25e",
  },
  {
    name: "Marchés",
    value: "376",
    svg: "M20,4H4A2,2,0,0,0,2,6V18a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6A2,2,0,0,0,20,4ZM8,17H4V15H8Zm12-5H4V8H20Z",
    color: "#1d3b8b",
  },
  {
    name: "BTC Indice de dominance",
    value: "35%",
    svg: "M17,6.009s2,4.01-1,4.01C12.838,10.019,13,3,15,2c0,0-7.655.767-9.57,7.673-.5-1.35-1.059-3.4-.43-4.666,0,0-3,2.005-3,7.017S4,22,12,22s10-4.965,10-8.974C22,7.012,17,6.009,17,6.009Z",
    color: "#f87215",
  }
])

const cryptos = ref([])

onMounted(async () => {
  const res = await getCryptos()
  cryptos.value = res.data.data
})

</script>

<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Accueil
      </h2>
      <!-- CTA -->
      <a
        class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
        href="https://github.com/estevanmaito/windmill-dashboard"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <span>Star this project on GitHub</span>
        </div>
        <span>View more →</span>
      </a>
      <!-- Cards -->
      <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <!-- Card -->
        <Card 
        v-for="card in cards"
        :key="card.name"
        :card="card"/>
      </div>

      <!-- New Table -->
      <ListeCryptoV2 />
    </div>
  </main>
</template>
