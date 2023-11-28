<template>
  <Liste :labels="labels" :data="cryptos">
  </Liste>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Liste from "./Liste.vue";
import {getCryptos} from "../api/api";

const cryptos = ref([])
const labels = ref([])

labels.value = [
  {
    understandingName: 'Rang',
    name: 'rank',
    type: 'number'
  },
  {
    understandingName: 'Nom',
    name: 'name',
    type: 'string',
    specialColumnType: 'img'
  },
  {
    understandingName: 'Prix',
    name: 'priceUsd',
    type: 'float'
  },
  {
    understandingName: 'Capitalisation',
    name: 'marketCapUsd',
    type: 'float'
  },
  {
    understandingName: 'VWAP',
    name: 'vwap24Hr',
    type: 'float'
  },
  {
    understandingName: 'Offre',
    name: 'supply',
    type: 'float'
  },
  {
    understandingName: 'Volume (24h)',
    name: 'volumeUsd24Hr',
    type: 'float'
  },
  {
    understandingName: 'Fluctuation (24h)',
    name: 'changePercent24Hr',
    type: 'percent',
    specialColumnType: 'fluctuation'
  }
]

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

onMounted(async () => {
  let res = await getCryptos()
  cryptos.value = res.data.data
  cryptos.value.forEach((crypto) => {
    crypto.img = 'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'
  })
})
</script>
