<template>
  <div class="w-10/12 mx-auto">
    <div class="flex flex-row gap-10 text-purple-100 bg-purple-600 rounded-lg py-6 mb-10">
      <div class="pl-8 text-xl font-bold">
        <p>Rang</p>
        <h1 class="text-center">{{ exchange?.rank }}</h1>
      </div>
      <div class="basis-1/4">
        <h1 class="text-xl font-bold">{{ exchange?.name }}</h1>
        <p>{{ exchange?.tradingPairs }} paires</p>
      </div>
      <div>
        <p class="font-semibold">Volume (24Hr)</p>
        <h2>{{ parseFloat(exchange?.volumeUsd).toFixed(0) }}€</h2>
      </div>
      <div>
        <p class="font-semibold">Volume d'échanges</p>
        <h2>{{ parseFloat(exchange?.percentTotalVolume).toFixed(2) }} %</h2>
      </div>
      <div>
        <p class="font-semibold">Top paires</p>
        <h2>{{ topMarket?.baseSymbol }} // {{ topMarket?.quoteSymbol }}</h2>
      </div>
    </div>
    <ListeMarketExchange/>
  </div>
</template>
<script setup>
import router from "../router";
import { onMounted, ref } from "vue";
import {getExchangeById, getMarketsByExchangeId} from "../api/api";
import ListeMarketExchange from "../components/ListeMarketExchange.vue";

let exchange = ref(null)
const id = router.currentRoute.value.params.id

const topMarket = ref(null)

onMounted(async () => {
  let res2 = await getExchangeById(id)
  exchange.value = res2.data.data

  res2 = await getMarketsByExchangeId(id)
  topMarket.value = res2.data.data[0]
  console.log(res2)
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