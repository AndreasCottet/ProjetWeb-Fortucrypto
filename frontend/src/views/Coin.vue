<template>
  <div class="flex flex-row w-full justify-center">
    <div class="flex flex-row">
      <img :src="img">
      <div class="">
        <h1 class="font-bold text-md">{{ coin?.name }} ({{ coin?.symbol }})</h1>
        <p>{{ todayDate.toLocaleDateString('fr-FR',  { year: 'numeric', month: 'long', day: 'numeric'}) }}</p>
      </div>
    </div>
    <div class="inline-grid grid-cols-2 grid-rows-2">
      <h2>HIGH</h2><p>{{ maxPrice }}</p>
      <h2>LOW</h2><p>{{ minPrice }}</p>
      <h2>AVERAGE</h2><p>{{ average }}</p>
      <h2>CHANGE</h2><p>{{ fluctuation }}</p>
    </div>
  </div>
  <div><ChartCoin v-if="chartDatas.values.length > 0" :chart-values="chartDatas" /></div>
  <ListeCoin />
</template>

<script setup>
import {getCrypto, getCryptoHistory} from "../api/api";
import {computed, onMounted, ref} from "vue";
import ChartCoin from "../components/ChartCoin.vue";
import router from "../router";
import ListeCoin from "../components/ListeCoin.vue";

const id = router.currentRoute.value.params.id

const coin = ref(null)
const coinHistory = ref(null)

let startDate = new Date()
let todayDate = new Date()
startDate.setDate(startDate.getDate() - 1);

onMounted(async () => {
  const res = await getCrypto(id)
  coin.value = res.data.data
  const resHistory = await getCryptoHistory(id, startDate.getTime(), todayDate.getTime())
  coinHistory.value = resHistory.data.data
})

const minPrice = computed(() => {
  if(coinHistory.value && coinHistory.value.length > 0) {
    return coinHistory.value.reduce((min, currentValue) => {
      return Math.min(min, currentValue.priceUsd)
    }, coinHistory.value[0].priceUsd);
  }
  return 'Erreur'
})

const maxPrice = computed(() => {
  if(coinHistory.value && coinHistory.value.length > 0) {
    return coinHistory.value.reduce((max, currentValue) => {
      return Math.max(max, currentValue.priceUsd)
    }, coinHistory.value[0].priceUsd);
  }
  return 'Erreur'
})

const average = computed(() => {
  if(coinHistory.value) {
    return coinHistory.value.reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.priceUsd)
    }, 0) / coinHistory.value.length
  }
  return 'Erreur'

})

const fluctuation = computed(() => {
  if (coinHistory.value && coinHistory.value.length > 0) {
    return coinHistory.value.reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.priceUsd)
    }, 0) / coinHistory.value.length
  }
  return 'Erreur'
})

const chartDatas = computed(() => {
  if(!coinHistory.value) {
    return {
      values: [],
      labels: [],
    }
  }
  let chartDatas = {
    values: [],
    labels: [],
  }
  for(let i = 0; i < coinHistory.value.length; i++) {
    chartDatas.labels.push(new Date(coinHistory.value[i].time).getHours())
    chartDatas.values.push(parseFloat(coinHistory.value[i].priceUsd))
  }

  return chartDatas
})

const img = computed(() => {
  if (coin.value) {
    return 'https://assets.coincap.io/assets/icons/' + coin?.value.symbol.toLowerCase() + '@2x.png'
  }
  return '';
})

let dataChart = computed(() => {
  if(chartDatas.value.length === 0) {
    return {}
  }
  return {
    labels: chartDatas.value,
    datasets: [
      {
        label: '$',
        data: chartDatas,
        fill: false,
        borderColor: '#f87979'
      }
    ]
  }
})

</script>