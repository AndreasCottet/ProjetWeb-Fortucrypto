<script setup>
import {computed, onMounted, ref} from "vue";
import {getCryptos} from "../api/api";
const cryptos = ref([])

let cryptoAmount = ref(null)
let cryptoType = ref(null)
let cryptoType2 = ref(null)
let convertedAmount = computed(() => {
  if (cryptoAmount.value == null || cryptoType.value == null || cryptoType2.value == null) {
    return null
  }
  return cryptoAmount.value * cryptoType.value.priceUsd / cryptoType2.value.priceUsd
})



onMounted(async () => {
  const res = await getCryptos()
  cryptos.value = res.data.data
})


</script>

<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Convertisseur de crypto
      </h2>
      <!-- New Table -->
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="mx-auto text-xs font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th class="px-4 py-3">Convertissez votre cryptomonnaie</th>
              </tr>
            </thead>
          </table>
          <div class="bg-gray-800 p-4">

            <div class="flex justify-center space-x-4 mb-4 mr-100">
              <label for="cryptoAmount">Montant en crypto :</label>
              <input v-model="cryptoAmount" type="number"
                class="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-150 bg-gray-700" />
            </div>
            <div class="flex flex-row justify-center space-x-4 mb-4 ">
              <select v-model="cryptoType"
                class="p-2 border border-gray-300 bg-gray-700 rounded focus:outline-none focus:border-blue-500 transition duration-150">
                <!-- Remplace les options avec les crypto-monnaies que tu souhaites supporter -->
                <option v-for="crypto in cryptos" :value="crypto">{{ crypto.name }}</option>

              </select>
              <button
                class="flex px-3 items-center text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                <svg class="w-5 h-5 item-center" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"></path>
                </svg>
              </button>
              <select v-model="cryptoType2"
                class="p-2 border border-gray-300 bg-gray-700 rounded focus:outline-none focus:border-blue-500 transition duration-150">
                <!-- Remplace les options avec les devises que tu souhaites supporter -->
                <option v-for="crypto in cryptos" :value="crypto">{{ crypto.name }}</option>
              </select>
            </div>
            <div v-if="convertedAmount != null" class="mt-4 flex justify-center">
              <p>Résultat : {{ convertedAmount }} {{ cryptoType2.symbol }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
