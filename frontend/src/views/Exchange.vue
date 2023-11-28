<template>
  <div class="w-10/12 mx-auto">
    <div class="flex flex-row gap-10 text-purple-100 bg-purple-600 rounded-lg py-6 mb-10">
      <div class="pl-8 text-xl font-bold">
        <p>Rang</p>
        <h1 class="text-center">{{ exchange?.rank }}</h1>
      </div>
      <div class="basis-1/4">
        <h1 class="text-xl font-bold">{{ exchange?.name }}</h1>
        <p class="text-lg font-semibold">{{ exchange?.tradingPairs }} Paires<span class="text-red-500 text-base">-0.77%</span></p>
      </div>
      <div>
        <p class="font-semibold">Volume (24Hr)</p>
        <h2>{{ parseFloat(exchange?.volumeUsd).toFixed(0) }}€</h2>
      </div>
      <div>
        <p class="font-semibold">Top paires</p>
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
import {getExchangeById, getMarketByCryptoId} from "../api/api";

let market = ref(null)
let exchange = ref(null)
const id = router.currentRoute.value.params.id

onMounted(async () => {
  let res = await getMarketByCryptoId(id)
  market.value = res.data.data
  let res2 = await getExchangeById(id)
  exchange.value = res2.data.data
})

function kFormatter(num) {
  if (num / 1000000000 > 1) {
    return (num / 1000000000).toFixed(2) + 'B';
  } else if (num / 1000000 > 1) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num / 1000 > 1) {
    return (num / 1000).toFixed(2) + 'K';
  } else {
    return num;
  }
}
</script>