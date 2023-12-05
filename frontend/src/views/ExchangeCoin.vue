<script setup>
import {computed, onMounted, ref} from "vue";
import router from "../router";
import {useStore} from "vuex"
import {getCrypto, getCryptos, getUserCrypto, getUserMoney, submitTrade} from "../api/api";
import Loading from "../components/Loading.vue";

const store = useStore()
const isLoading = ref(true)

const username = computed(() => store.getters.username)
const cryptos = ref([])
const userCryptos = ref([])
const userMoney = ref(0)

const account1 = ref(null)
const account2 = ref(null)

const chooseAccount1 = ref(false)
const chooseAccount2 = ref(false)

const amount = ref(0)
const loadingTrade = ref(false)

const amountRequested = computed(() => {
  return (account2.value?.priceUsd * amount.value) / account1.value?.priceUsd
})

const tradeMessage = ref({
  isActive: false,
  message: '',
  type: ''
})

const userCryptoMoney = computed(() => {
  let total = 0
  for (const crypto of userCryptos.value) {
    if (crypto.type === 'money') continue
    total += crypto.priceUsd * crypto.amount
  }
  return total
})

async function getUserCryptos() {
  let res = await getUserCrypto(username.value)
  userCryptos.value = res.data

  for (let i = 0; i < userCryptos.value.length; i++) {
    res = await getCrypto(userCryptos.value[i].cryptoId)
    userCryptos.value[i].symbol = res.data.data.symbol
    userCryptos.value[i].name = res.data.data.name
    userCryptos.value[i].type = 'crypto'
    userCryptos.value[i].priceUsd = res.data.data.priceUsd
  }

  const argent = ({
    name: 'Mon argent',
    cryptoId: 'money',
    symbol: '€',
    priceUsd: 1,
    amount: userMoney,
    type: 'money'
  })

  userCryptos.value = [argent].concat(userCryptos.value)
}

onMounted(async () => {
  await onCryptoChange()
})

async function onCryptoChange() {
  isLoading.value = true
  await getUserCryptos()

  let res = await getCryptos()
  cryptos.value = res.data.data

  res = await getUserMoney(username.value)
  userMoney.value = res.data

  const argent = ({
    id: 'money',
    name: 'Mon argent',
    priceUsd: 1,
    type: 'money',
    symbol: '€'
  })

  cryptos.value = [argent].concat(cryptos.value)

  isLoading.value = false
}

async function handleSubmitTrade() {
  if (amountRequested.value > account1.value.amount) {
    tradeMessage.value.isActive = true
    tradeMessage.value.type = 'error'
    tradeMessage.value.message = 'Vous n\'avez pas assez de ' + account1.value.symbol
    return
  }

  if (account1.value.name === account2.value.name) {
    tradeMessage.value.isActive = true
    tradeMessage.value.type = 'error'
    tradeMessage.value.message = 'Vous ne pouvez pas échanger la même cryptomonnaie'
    return
  }

  let trade = {
    cryptoId: account2.value.id,
    amount: amount.value,
    cryptoIdToExchange: account1.value.cryptoId,
  }

  try {
    loadingTrade.value = true
    let res = await submitTrade(username.value, trade)

    if (res.status === 200) {
      tradeMessage.value.isActive = true
      tradeMessage.value.type = 'success'
      tradeMessage.value.message = 'Echange réalisé avec succès'
      await onCryptoChange()
    }
  } catch (e) {
    console.error(e)
  }
  loadingTrade.value = false
}


</script>

<template>
  <div v-if="tradeMessage.isActive" :class="{'bg-gray-800 w-6/12 mx-auto px-4 py-2 rounded-lg flex flex-row justify-between': true, 'bg-green-500 text-green-700 border-2 border-green-700 font-bold': tradeMessage.type === 'success', 'bg-red-300 text-red-700 border-4 border-red-700 font-bold': tradeMessage.type === 'error'}">
    <p>{{ tradeMessage.message }}</p>
    <svg v-on:click="tradeMessage.isActive = false" :class="{'w-4': true, 'fill-green-700': tradeMessage.type === 'success', 'fill-red-700': tradeMessage.type === 'error' }" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> </g></svg>
  </div>

  <div class="bg-gray-800 rounded-lg py-4 px-4 mt-4 w-6/12 mx-auto">
    <h1 class="font-bold text-lg mb-6 text-center">Echanger ses cryptomonnaies</h1>
    <div v-if="!isLoading">
      <p class="font-semibold text-base">Argent sur mon compte : {{ userMoney }}€</p>
      <p class="font-semibold text-base">Argent grâce aux cryptomonnaies : {{ userCryptoMoney.toFixed(2) }}€</p>
    </div>
    <div v-else class="mx-auto w-fit">
      <Loading/>
    </div>
    <br>
    <h1 class="font-semibold mb-2">Je veux :</h1>

    <div v-if="chooseAccount2" class="overflow-scroll h-full max-h-64 mb-4 bg-gray-700 p-2 rounded-lg">
      <div v-if="isLoading" class="mx-auto w-fit"><Loading/></div>
      <div v-else class="flex flex-row hover:border hover:border-gray-500 rounded-lg py-2 px-2 hover:bg-gray-900"
           v-for="crypto in cryptos" v-on:click="() => {
              account2 = crypto
              chooseAccount2 = false
      }">
        <img class="w-8 mr-2" v-if="crypto.type !== 'money'"
             :src="'https://assets.coincap.io/assets/icons/' + crypto?.symbol.toLowerCase() + '@2x.png' "/>
        <p>{{ crypto.name }}</p>
      </div>
    </div>

    <div v-else>
      <div v-if="account2" class="flex flex-row bg-gray-700 gap-2 rounded-lg p-2" v-on:click="chooseAccount2 = true">
        <img class="w-8" v-if="account2?.type !== 'money'"
             :src="'https://assets.coincap.io/assets/icons/' + account2?.symbol.toLowerCase() + '@2x.png'"/>
        <p>{{ account2?.name }}</p>
      </div>
      <div v-else>
        <p v-if="!account2" class="bg-gray-700 rounded-lg py-2 px-4" v-on:click="chooseAccount2 = true">Choisissez ce que vous voulez</p>
      </div>
      <div class="space-y-3" v-if="account2 && account2">
        <p>Combien en voulez-vous ?</p>
        <input v-model="amount" class="bg-gray-700 rounded-lg p-2 text-gray-300" type="number" step="0.01" min="0">
      </div>
    </div>

    <h1 class="font-semibold my-2">En utilisant mon solde :</h1>
    <div v-if="chooseAccount1" class="overflow-scroll max-h-64 mb-4 bg-gray-700 p-2 rounded-lg">
      <div v-if="isLoading" class="mx-auto w-fit"><Loading/></div>
      <div v-else
          class="flex flex-row justify-between hover:border hover:border-gray-500 rounded-lg py-2 px-2 hover:bg-gray-900"
          v-for="crypto in userCryptos" v-on:click="() => {
          account1 = crypto
          chooseAccount1 = false
        }">
        <div class="flex flex-row gap-2">
          <img class="w-8" v-if="crypto.type !== 'money'"
               :src="'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'"/>
          <p>{{ crypto.name }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p v-if="!account1" class="bg-gray-700 rounded-lg py-2 px-4" v-on:click="chooseAccount1 = true">Choisissez une
        cryptomonnaie</p>
      <div v-else class="flex flex-row justify-between gap-2 bg-gray-700 rounded-lg p-2 text-gray-300 mb-2"
           v-on:click="chooseAccount1 = true">
        <div class="flex flex-row gap-2">
          <img v-if="account1.type !== 'money'" class="w-8"
               :src="'https://assets.coincap.io/assets/icons/' + account1?.symbol.toLowerCase() + '@2x.png'"/>
          <p>{{ account1?.name }}</p>
        </div>
        <p>{{ account1.amount }} {{ account1.symbol }}</p>
      </div>
    </div>

    <div v-if="account1 && account2">
      <h1>Récapitulatif</h1>
      <p>{{ amount }} {{ account2?.symbol }} = {{ amountRequested }} {{ account1?.symbol }} =
        {{ account1?.priceUsd * amountRequested }}€</p>
      <p v-if="amountRequested > account1.amount">Vous n'avez pas assez pour pouvoir échanger</p>
    </div>
    <div class="flex flex-row gap-10 mt-4">
    <button v-if="amountRequested <= account1?.amount" v-on:click="handleSubmitTrade()"
            class="px-3 py-1 mt-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700">
      Echanger
    </button><Loading v-if="loadingTrade"/>
    </div>
  </div>
</template>
