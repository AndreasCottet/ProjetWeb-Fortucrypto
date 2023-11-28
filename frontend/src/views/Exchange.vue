<template>
  <div class="w-10/12 mx-auto">
    <div class="flex flex-row gap-10 text-purple-100 bg-purple-600 rounded-lg py-6 mb-10">
      <div class="pl-8 text-xl font-bold">
        <p>Rang</p>
        <h1 class="text-center">1</h1>
      </div>
      <div class="basis-1/4">
        <h1 class="text-xl font-bold">Bitcoin (BTC)</h1>
        <p class="text-lg font-semibold">$37,084.69 <span class="text-red-500 text-base">-0.77%</span></p>
      </div>
      <div>
        <p class="font-semibold">Market Cap</p>
        <h2>$724.74b</h2>
      </div>
      <div>
        <p class="font-semibold">Volume (24Hr)</p>
        <h2>$5.16b</h2>
      </div>
      <div>
        <p class="font-semibold">Supply</p>
        <h2>19.55m BTC</h2>
      </div>
    </div>
    <div class="w-10/12 mx-auto my-10">
    </div>
  </div>
</template>
<script setup>
import router from "../router";
import { onMounted, ref } from "vue";
import {getMarketByCryptoId} from "../api/api";

const id = router.currentRoute.value.params.id
const exchange = ref([])

onMounted(async () => {
  let res = await getMarketByCryptoId(id)
  let markets = res.data.data

})
</script>