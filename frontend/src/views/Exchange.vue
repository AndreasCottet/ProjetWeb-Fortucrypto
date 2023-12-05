<template>
  <div class="w-10/12 mx-auto">
    <div class="text-purple-100 bg-purple-600 rounded-lg py-6 mb-10">
      <div class="flex flex-row gap-10" v-if="exchange && topMarket">
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
      <div v-else class="text-center mx-auto">
        <Loading />
      </div>
    </div>

    <ListeMarketExchange />
  </div>
</template>
<script setup>
import router from "../router";
import { onMounted, ref } from "vue";
import { getExchangeById, getMarketsByExchangeId } from "../api/api";
import ListeMarketExchange from "../components/ListeMarketExchange.vue";
import Loading from "../components/Loading.vue";

let exchange = ref(null)
const id = router.currentRoute.value.params.id

const topMarket = ref(null)

onMounted(async () => {
  let res2 = await getExchangeById(id)
  exchange.value = res2.data.data

  res2 = await getMarketsByExchangeId(id)
  topMarket.value = res2.data.data[0]
})

</script>