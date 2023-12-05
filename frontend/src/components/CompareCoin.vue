<script setup>
import {computed, onMounted, ref} from "vue";
import {getCryptos} from "../api/api";
import Convertir from "../views/Convertir.vue";
import router from "../router";

const cryptoAmount = ref(0)

const crypto1 = ref(null)
const crypto2 = ref(null)
const crypto2Res = computed(() => {
  if (crypto1.value == null || crypto2.value == null) {
    return 0
  }
  return cryptoAmount.value * crypto1.value.priceUsd / crypto2.value.priceUsd
})

const chooseCrypto1 = ref(false)
const chooseCrypto2 = ref(false)

const cryptos = ref([])

onMounted(async () => {
  const res = await getCryptos()
  cryptos.value = res.data.data
})
</script>

<template>
  <div class="bg-gray-800 rounded-lg py-4 px-4">
    <h1 class="font-bold text-lg mb-2">Comparer</h1>
    <div v-if="chooseCrypto1 || chooseCrypto2" class="overflow-scroll h-64 mb-4">
      <div class="flex flex-row hover:border hover:border-gray-500 rounded-lg py-2 px-2 hover:bg-gray-900"
           v-for="crypto in cryptos" v-on:click="() => {
            if (chooseCrypto1) {
              crypto1 = crypto
              chooseCrypto1 = false
            } else {
              crypto2 = crypto
              chooseCrypto2 = false
            }
         }">
        <img class="w-8 mr-2" :src="'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'"/>
        <p>{{ crypto.name }}</p>
      </div>
    </div>

    <div v-else>
      <p v-if="!crypto1" class="bg-gray-700 rounded-lg py-2 px-4" v-on:click="chooseCrypto1 = true">Choisissez une
        cryptomonnaie</p>
      <div v-else class="flex flex-row gap-2 bg-gray-700 rounded-lg p-2 text-gray-300 mb-2" v-on:click="chooseCrypto1 = true">
          <img class="w-8"
               :src="'https://assets.coincap.io/assets/icons/' + crypto1?.symbol.toLowerCase() + '@2x.png'"/>
          <p>{{ crypto1?.name }}</p>
      </div>
      <div class="flex flex-row items-center justify-between bg-gray-700 rounded-lg px-2" v-if="crypto1 && crypto2">
        <input type="number" min="0" required step="0.01"
               class="bg-transparent rounded-lg p-2 text-gray-300 text-base p-1 w-full"
               v-model="cryptoAmount">
        <p>{{ crypto1?.symbol }}</p>
      </div>

      <h1 class="font-bold text-lg my-2">Equivaut à :</h1>

      <p v-if="!crypto2" class="bg-gray-700 rounded-lg py-2 px-4" v-on:click="chooseCrypto2 = true">Choisissez une
        deuxième cryptomonnaie</p>
      <div v-else class="flex flex-row gap-2 bg-gray-700 rounded-lg p-2 text-gray-300"
           v-on:click="chooseCrypto1 = true">
        <img class="w-8" :src="'https://assets.coincap.io/assets/icons/' + crypto2?.symbol.toLowerCase() + '@2x.png'"/>
        <p>{{ crypto2?.name }}</p>
      </div>
      <div class="flex flex-row" v-if="crypto1 && crypto2">
        <p class="rounded-lg p-2 text-gray-300 items-center justify-center">{{ parseFloat(crypto2Res).toFixed(2) }} {{ crypto2?.symbol }}</p>
      </div>
    </div>
    <button class="px-3 py-1 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 mt-2" v-on:click="router.push({name: 'ExchangeCoin'})">
      Acheter des cryptomonnaies
    </button>
  </div>
</template>
