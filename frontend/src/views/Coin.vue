<template>
  <div class="w-10/12 mx-auto">
    <div class="flex flex-row gap-10 text-purple-100 bg-purple-600 rounded-lg py-6 mb-10">
      <div class="pl-8 text-xl font-bold">
        <p>Rang</p>
        <h1 class="text-center">{{ coin?.rank }}</h1>
      </div>
      <div class="basis-1/4">
        <h1 class="text-xl font-bold">{{ coin?.name }} ({{ coin?.symbol }})</h1>
        <p class="text-lg font-semibold">{{ parseFloat(coin?.priceUsd).toFixed(2) }}€
          <span class="text-green-500 text-base ml-4" v-if="parseFloat(coin?.changePercent24Hr) > 0">{{ parseFloat(coin?.changePercent24Hr).toFixed(2) }}%</span>
          <span class="text-red-500 text-base ml-4" v-if="parseFloat(coin?.changePercent24Hr) < 0">{{ parseFloat(coin?.changePercent24Hr).toFixed(2) }}%</span>
        </p>
      </div>
      <div>
        <p class="font-semibold">Capitalisation</p>
        <h2>{{ kFormatter(parseFloat(coin?.marketCapUsd).toFixed(2)) }}€ </h2>
      </div>
      <div>
        <p class="font-semibold">Volume (24H)</p>
        <h2>{{ kFormatter(parseFloat(coin?.volumeUsd24Hr).toFixed(2)) }}€</h2>
      </div>
      <div>
        <p class="font-semibold">Quantité</p>
        <h2>{{ kFormatter(parseFloat(coin?.supply).toFixed(2)) }} {{ coin?.symbol }}</h2>
      </div>
    </div>

    <div class="flex flex-row w-10/12 mx-auto">
      <div class="flex flex-row mr-10">
        <img :src="img" class="w-16 h-16 mr-4">
        <div>
          <h1 class="font-bold text-lg">{{ coin?.name }} ({{ coin?.symbol }})</h1>
          <p>{{ todayDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 text-gray-400">
        <p>HIGH <span class="font-semibold text-white">{{ parseFloat(maxPrice).toFixed(2) }}</span></p>
        <p>LOW <span class="font-semibold text-white">{{ parseFloat(minPrice).toFixed(2) }}</span></p>
        <p>AVERAGE <span class="font-semibold text-white">{{ parseFloat(average).toFixed(2) }}</span></p>
        <p>CHANGE <span class="font-semibold text-white">{{ parseFloat(fluctuation).toFixed(2) }}</span></p>
      </div>
    </div>
    <div class="flex flex-row gap-10 mx-auto my-10 w-full">
      <div class="w-8/12">
        <ChartCoin v-if="chartDatas.values.length > 0" :chart-values="chartDatas"/>
      </div>
      <div v-if="loggedIn" class="flex flex-col bg-gray-800 rounded-lg px-4 py-2 w-3/12">
        <h1 class="font-bold text-lg mb-2">Acheter</h1>
        <label class="font-semibold">Echanger dû :</label>
        <div class="flex flex-row" v-for="(userCrypto, index) in userCryptos" :class="{'hidden': !showOtherCrypto && index !== 0}">
          <img :src="userCrypto.img" class="w-8 mr-2">
          <h1 class="text-lg font-semibold">{{ userCrypto?.name }}</h1>
        </div>
        <button><img src=""/></button>

        <label class="font-semibold">En :</label>
        <div class="flex flex-row">
          <img :src="img" class="w-8 mr-2">
          <h1 class="text-lg font-semibold">{{ coin?.name }}</h1>
        </div>
      </div>
      <div v-else class="bg-gray-800 rounded-lg px-4 py-2">
        <h1>Vous avez envie d'acheter du {{ coin?.name }}</h1>
        <button v-on:click="router.push({ name: 'Login' })" class="px-3 py-1 text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700">Connectez-vous</button>
      </div>
    </div>
    <ListeCoin />
  </div>
</template>

<script setup>
import {getCrypto, getCryptoHistory, getUserCrypto} from "../api/api";
import { computed, onMounted, ref } from "vue";
import ChartCoin from "../components/ChartCoin.vue";
import router from "../router";
import ListeCoin from "../components/ListeCoin.vue";
import {useStore} from "vuex";

const store = useStore()

const userCryptos = ref([])
const showOtherCrypto = ref(false)

const id = router.currentRoute.value.params.id

const coin = ref(null)
const coinHistory = ref(null)

let startDate = new Date()
let todayDate = new Date()
startDate.setDate(startDate.getDate() - 1);

const loggedIn = computed(() => store.getters.loggedIn);
const username = computed(() => store.getters.username)

onMounted(async () => {
  const res = await getCrypto(id)
  coin.value = res.data.data
  const resHistory = await getCryptoHistory(id, startDate.getTime(), todayDate.getTime())
  coinHistory.value = resHistory.data.data

  const resUserCrypto = await getUserCrypto(username.value)
  userCryptos.value = resUserCrypto.data

  let resCrypto;
  let i = 0;
  let currentCrypto;

  for(const crypto of userCryptos.value) {
    resCrypto = await getCrypto(crypto.cryptoId)
    currentCrypto = resCrypto.data.data
    userCryptos.value[i].priceUsd = currentCrypto.priceUsd
    userCryptos.value[i].img = 'https://assets.coincap.io/assets/icons/' + currentCrypto.symbol.toLowerCase() + '@2x.png'
    userCryptos.value[i].name = currentCrypto.name
    i++
  }

  console.log(userCryptos)
})

const minPrice = computed(() => {
  if (coinHistory.value && coinHistory.value.length > 0) {
    return coinHistory.value.reduce((min, currentValue) => {
      return Math.min(min, currentValue.priceUsd)
    }, coinHistory.value[0].priceUsd);
  }
  return 'Erreur'
})

const maxPrice = computed(() => {
  if (coinHistory.value && coinHistory.value.length > 0) {
    return coinHistory.value.reduce((max, currentValue) => {
      return Math.max(max, currentValue.priceUsd)
    }, coinHistory.value[0].priceUsd);
  }
  return 'Erreur'
})

const average = computed(() => {
  if (coinHistory.value) {
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
  if (!coinHistory.value) {
    return {
      values: [],
      labels: [],
    }
  }
  let chartDatas = {
    values: [],
    labels: [],
  }
  for (let i = 0; i < coinHistory.value.length; i++) {
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
  if (chartDatas.value.length === 0) {
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