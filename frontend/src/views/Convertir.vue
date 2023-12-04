<script setup>
import {computed, ref} from "vue";
import router from "../router";

const cryptos = ref([])
const userCryptos = ref([])
const userMoney = ref(0)

const account1 = ref(null)
const account2 = ref(null)

const chooseAccount1 = ref(false)
const chooseAccount2 = ref(false)

const userCryptoMoney = computed(() => {
  let total = 0
  // for (const crypto of userCryptos.value) {
  //   total += crypto.priceUsd * crypto.amount
  // }
  return total
})


</script>

<template>
  <h1>Echanger ses cryptomonnaies</h1>
  <p>Voici l'argent qui est sur votre compte : {{ userMoney }}</p>
  <p>Voici l'argent de vos cryptomonnaies : {{ userCryptoMoney }}</p>

  <div class="bg-gray-800 rounded-lg py-4 px-4">
    <h1 class="font-bold text-lg mb-2">Echanger</h1>
    <h1>Choix du compte à débiter</h1>

    <div v-if="chooseAccount1">
      <div class="flex flex-row hover:border hover:border-gray-500 rounded-lg py-2 px-2 hover:bg-gray-900"
           v-for="crypto in userCryptos" v-on:click="() => {
              account1 = crypto
              chooseAccount1 = false
         }">
        <img class="w-8 mr-2"
             :src="'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'"/>
        <p>{{ crypto.name }}</p>
      </div>
      <div>
        <img class="w-8 mr-2"
             :src="'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'"/>
        <p>{{ userMoney }}</p>
      </div>
    </div>

    <div v-if="chooseAccount2" class="overflow-scroll h-64 mb-4">
      <div class="flex flex-row hover:border hover:border-gray-500 rounded-lg py-2 px-2 hover:bg-gray-900"
           v-for="crypto in cryptos" v-on:click="() => {
              account2 = crypto
              chooseAccount2 = false
         }">
        <img class="w-8 mr-2"
             :src="'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'"/>
        <p>{{ crypto.name }}</p>
      </div>
      <div>
<!--        <img class="w-8 mr-2"-->
<!--             :src="'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '.png'"/>-->
        <p>{{ userMoney }}</p>
      </div>
    </div>

    <div v-else>
      <p v-if="!account1" class="bg-gray-700 rounded-lg py-2 px-4" v-on:click="chooseAccount1 = true">Choisissez une
        cryptomonnaie</p>
      <div v-else class="flex flex-row gap-2 bg-gray-700 rounded-lg p-2 text-gray-300 mb-2"
           v-on:click="chooseAccount1 = true">
        <div class="flex flex-row gap-2">
<!--          <img class="w-8"-->
<!--               :src="'https://assets.coincap.io/assets/icons/' + crypto1?.symbol.toLowerCase() + '@2x.png'"/>-->
<!--          <p>{{ crypto1?.name }}</p>-->
        </div>
      </div>
<!--      <div class="flex flex-row items-center justify-between bg-gray-700 rounded-lg px-2" v-if="crypto1 && crypto2">-->
<!--        <input type="number" min="0" required-->
<!--               class="bg-transparent bg-gray-700 rounded-lg p-2 text-gray-300 text-base p-1 w-full"-->
<!--               v-model="cryptoAmount">-->
<!--        <p>{{ crypto1?.symbol }}</p>-->
<!--      </div>-->

      <h1 class="font-bold text-lg my-2">En :</h1>

      <p v-if="!account2" class="bg-gray-700 rounded-lg py-2 px-4" v-on:click="chooseAccount2 = true">Choisissez un
        deuxième compte</p>
      <div v-else class="flex flex-row gap-2 bg-gray-700 rounded-lg p-2 text-gray-300"
           v-on:click="chooseAccount2 = true">
<!--        <img class="w-8" :src="'https://assets.coincap.io/assets/icons/' + crypto2?.symbol.toLowerCase() + '@2x.png'"/>-->
<!--        <p>{{ crypto2?.name }}</p>-->
      </div>
      <div class="flex flex-row" v-if="account2 && account2">
<!--        <p class="bg-transparent bg-gray-700 rounded-lg p-2 text-gray-300 items-center justify-center">-->
<!--          {{ parseFloat(crypto2Res).toFixed(2) }} {{ crypto2?.symbol }}</p>-->
      </div>
    </div>
    <button class="px-3 py-1 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700" v-on:click="router.push({name: 'Convertir'})">
      Acheter des cryptomonnaie
    </button>
  </div>



</template>
