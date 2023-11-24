<script setup>
import {onMounted, ref} from "vue";
import router from "../router";
import {getExchangeById, getExchanges, getMarketByCryptoId} from "../api/api";
import Liste from "./Liste.vue";

const id = router.currentRoute.value.params.id
const markets = ref([])
const marketsName = ref({})

let promises = []

onMounted(async () => {
  let res = await getMarketByCryptoId(id)

  markets.value =  res.data.data.sort((a, b) => b.volumeUsd24Hr - a.volumeUsd24Hr);
  markets.value = markets.value.filter((market) => {
    return market.volumeUsd24Hr && market.percentExchangeVolume
  })

  markets.value

  markets.value.forEach((market) => {
    if (!marketsName.value.hasOwnProperty(market.exchangeId)) {
      getExchangeById(market.exchangeId).then((res) => {
        return res.data.data
      }).then((exchange) => {
        marketsName.value[market.exchangeId] = exchange.name
      })
      // marketsName.value[market.exchangeId] = exchange.name
      // marketsName.value.push(market.exchangeId)
    }
    console.log(marketsName.value)
  })
  // console.log(markets.value)
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

<template>
  <Liste>
    <template #head>
      <th class="px-4 py-3">Exchange</th>
      <th class="px-4 py-3">Paire</th>
      <th class="px-4 py-3">Prix</th>
      <th class="px-4 py-3">Volume (24h)</th>
      <th class="px-4 py-3">Volume (%)</th>
    </template>
    <template #body>
      <tr class="text-gray-700 dark:text-gray-400" v-for="market in markets">
        <td class="px-4 py-3 text-sm">{{ marketsName[market.exchangeId] }}</td>
        <td class="px-4 py-3 text-sm">{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
        <td class="px-4 py-3 text-sm">{{ kFormatter(parseFloat(market.priceUsd).toFixed(2)) }}€</td>
        <td class="px-4 py-3 text-sm">{{ kFormatter(parseFloat(market.volumeUsd24Hr).toFixed(2)) }}€</td>
        <td class="px-4 py-3 text-sm">{{ parseFloat(market.percentExchangeVolume) * 100 }} %</td>
      </tr>
    </template>
  </Liste>
</template>

<style scoped>

</style>