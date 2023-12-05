<script setup>
import {onMounted, ref} from "vue";
import router from "../router";
import {getExchangeById, getMarketByCryptoId, getMarketsByExchangeId} from "../api/api";
import Liste from "./Liste.vue";

const id = router.currentRoute.value.params.id
const markets = ref([])
const labels = ref([])

onMounted(async () => {
  const res = await getMarketsByExchangeId(id)
  markets.value = res.data.data

  const sumVolumeCoin = markets.value.reduce((a, b) => {
    if (isNaN(parseFloat(b.volumeUsd24Hr))) {
      b.volumeUsd24Hr = 0
    }
    return a + parseFloat(b.volumeUsd24Hr)
  }, 0)

  markets.value =  markets.value.sort((a, b) => b.volumeUsd24Hr - a.volumeUsd24Hr);
  markets.value = markets.value.filter((market) => {
    return market.volumeUsd24Hr && market.percentExchangeVolume
  })

  let marketsName = {}

  markets.value.forEach((market) => {
    if (!marketsName.hasOwnProperty(market.exchangeId)) {
      getExchangeById(market.exchangeId).then((res) => {
        return res.data.data
      }).then((exchange) => {
        marketsName[market.exchangeId] = exchange.name
        market.name = exchange.name
        market.volumePercent = (market.volumeUsd24Hr / sumVolumeCoin) * 100
      })
    }
  })
})

labels.value = [
  {
    understandingName: 'Rang',
    name: 'rank',
    type: 'number',
  },
  {
    understandingName: 'Paire',
    name: 'pair',
    type: 'pair',
  },
  {
    understandingName: 'Prix',
    name: 'priceUsd',
    type: 'float'
  },
  {
    understandingName: 'Volume (24h)',
    name: 'volumeUsd24Hr',
    type: 'float'
  },
  {
    understandingName: 'Volume (%)',
    name: 'volumePercent',
    type: 'percent'
  },
  {
    understandingName: 'Nombre de trades (24h)',
    name: 'tradesCount24Hr',
    type: 'float'
  }
]

</script>

<template>
  <div v-if="markets && labels">
    <Liste :labels="labels" :data="markets">
    </Liste>
  </div>
</template>