<script setup>
import {computed, onMounted, ref} from "vue";
import router from "../router";
import {useStore} from "vuex"
import {getCrypto, getCryptos, getUserCrypto, getUserMoney, submitTrade} from "../api/api";

const store = useStore()

const username = computed(() => store.getters.username)
const cryptos = ref([])
const userCryptos = ref([])
const userMoney = ref(0)

const account1 = ref(null)
const account2 = ref(null)

const chooseAccount1 = ref(false)
const chooseAccount2 = ref(false)

const amount = ref(0)

const amountRequested = computed(() => {
  return (account2.value?.priceUsd * amount.value) / account1.value?.priceUsd
})

const userCryptoMoney = computed(() => {
  let total = 0
  for (const crypto of userCryptos.value) {
    if(crypto.type === 'money') continue
    total += crypto.priceUsd * crypto.amount
  }
  return total
})

async function getUserCryptos() {
  let res = await getUserCrypto(username.value)
  userCryptos.value = res.data

  for(let i = 0; i < userCryptos.value.length; i++) {
    res = await getCrypto(userCryptos.value[i].cryptoId)
    userCryptos.value[i].symbol = res.data.data.symbol
    userCryptos.value[i].name = res.data.data.name
    userCryptos.value[i].type = 'crypto'
    userCryptos.value[i].priceUsd = res.data.data.priceUsd
  }

  userCryptos.value.push({
    name: 'Mon argent',
    cryptoId: 'money',
    symbol: '€',
    priceUsd: 1,
    amount: userMoney,
    type: 'money'
  })
}

onMounted(async () => {
  await getUserCryptos()

  let res = await getCryptos()
  cryptos.value = res.data.data

  res = await getUserMoney(username.value)
  console.log(res.data)
  userMoney.value = res.data

  cryptos.value.push({
    id: 'money',
    name: 'Mon argent',
    priceUsd: 1,
    type: 'money',
    symbol: '€',
  })
})

async function handleSubmitTrade() {
  if (amountRequested.value > account1.value.amount) {
    alert('Vous n\'avez pas assez de ' + account1.value.symbol)
    return
  }

  if (account1.value.name === account2.value.name) {
    alert('Vous ne pouvez pas échanger la même cryptomonnaie')
  }

  let trade = {
    cryptoId: account2.value.id,
    amount: amount.value,
    cryptoIdToExchange: account1.value.cryptoId,
  }

  try {
    let res = await submitTrade(username.value, trade)
    if(res.status === 200) {
      alert("Transaction effectuée avec succès")
      router.push({name: 'Accueil'})
    }
  } catch(e) {
    alert('Une erreur est survenue');
    console.error(e)
  }
}


</script>

<template>
  <div class="bg-gray-800 rounded-lg py-4 px-4 mt-10 w-6/12 mx-auto">
    <h1 class="font-bold text-lg mb-2">Echanger ses cryptomonnaies</h1>
    <p class="font-semibold text-base">L'argent de mon compte : {{ userMoney }}€</p>
    <p class="font-semibold text-base">L'argent grâce aux cryptomonnaies : {{ userCryptoMoney.toFixed(2) }}€</p>
    <br>
    <h1 class="font-semibold mb-2">Je veux :</h1>

    <div v-if="chooseAccount2" class="overflow-scroll h-64 mb-4">
      <div class="flex flex-row hover:border hover:border-gray-500 rounded-lg py-2 px-2 hover:bg-gray-900"
           v-for="crypto in cryptos" v-on:click="() => {
              account2 = crypto
              chooseAccount2 = false
      }">
        <img class="w-8 mr-2" v-if="crypto.type !== 'money'"
             :src="'https://assets.coincap.io/assets/icons/' + crypto?.symbol.toLowerCase() + '@2x.png' "/>
        <p>{{ crypto.name }}</p>
      </div>
    </div>

    <div v-else-if="chooseAccount1">
      <div class="flex flex-row justify-between hover:border hover:border-gray-500 rounded-lg py-2 px-2 hover:bg-gray-900"
           v-for="crypto in userCryptos" v-on:click="() => {
              account1 = crypto
              chooseAccount1 = false
      }">
        <div class="flex flex-row gap-2">
          <img class="w-8" v-if="crypto.type !== 'money'" :src="'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'"/>
          <p>{{ crypto.name }}</p>
        </div>
        <div>
          <p>{{crypto.amount}} {{ crypto.symbol }}</p>
        </div>
      </div>
    </div>

    <div v-else>

      <p v-if="!account2" class="bg-gray-700 rounded-lg py-2 px-4" v-on:click="chooseAccount2 = true">Choisissez ce que vous voulez</p>
      <div v-else class="flex flex-row gap-2 bg-gray-700 rounded-lg p-2 text-gray-300" v-on:click="chooseAccount2 = true">
        <img class="w-8" v-if="account2.type !== 'money'" :src="'https://assets.coincap.io/assets/icons/' + account2?.symbol.toLowerCase() + '@2x.png'"/>
        <p>{{ account2?.name }}</p>
      </div>
      <div class="space-y-3" v-if="account2 && account2">
        <p>Combien en voulez-vous ?</p>
        <input v-model="amount" class="bg-gray-700 rounded-lg p-2 text-gray-300" type="number" step="0.01" min="0">
      </div>

      <h1 class="font-semibold my-2">En utilisant mon solde :</h1>
      <p v-if="!account1" class="bg-gray-700 rounded-lg py-2 px-4" v-on:click="chooseAccount1 = true">Choisissez une cryptomonnaie</p>
      <div v-else class="flex flex-row justify-between gap-2 bg-gray-700 rounded-lg p-2 text-gray-300 mb-2" v-on:click="chooseAccount1 = true">
        <div class="flex flex-row gap-2">
          <img v-if="account1.type !== 'money'" class="w-8" :src="'https://assets.coincap.io/assets/icons/' + account1?.symbol.toLowerCase() + '@2x.png'"/>
          <p>{{ account1?.name }}</p>
        </div>
        <p>{{account1.amount}} {{ account1.symbol }}</p>
      </div>
    </div>
    <div v-if="account1 && account2">
      <h1>Récapitulatif</h1>
      <p>{{ amount }} {{ account2?.symbol }} = {{ amountRequested }} {{ account1?.symbol }} = {{ account1?.priceUsd * amountRequested }}€</p>
      <p v-if="amountRequested > account1.amount">Vous n'avez pas assez pour pouvoir échanger</p>
    </div>
    <button v-if="amountRequested <= account1?.amount" v-on:click="handleSubmitTrade()" class="px-3 py-1 mt-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700">
      Echanger
    </button>
  </div>
</template>
