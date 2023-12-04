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
    type: 'float',
    dontUseFormatter: true
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

onMounted(async () => {
  let res = await getCryptos()
  cryptos.value = res.data.data
  cryptos.value.forEach((crypto) => {
    crypto.img = 'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'
  })
})


const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')

pricesWs.onmessage = function (msg) {
  let data = JSON.parse(msg.data)
  for (const [key, value] of Object.entries(data)) {
    cryptos.value.forEach((crypto) => {
      if (crypto.id === key) {

        if (value > crypto.priceUsd) {
          crypto.update = 'up'
        } else {
          crypto.update = 'down'
        }

        crypto.priceUsd = value

        setTimeout(() => {
          crypto.update = ''
        }, 700)
      }
    })
  }
  console.log(data);
}
</script>
