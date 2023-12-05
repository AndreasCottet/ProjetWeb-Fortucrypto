<script setup>
import Liste from "../components/Liste.vue";
import { getCrypto, getUserCrypto, getUserMoney } from "../api/api";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Loading from "../components/Loading.vue";

const router = useRouter();

const store = useStore();
const username = computed(() => store.getters.username);
const userCryptos = ref([]);
const values = ref([]);

const userMoney = ref(0);

const totalAmount = ref(0);

onMounted(async () => {
  const response = await getUserCrypto(username.value);
  userCryptos.value = response.data

  for await (const userCrypto of userCryptos.value) {
    let res = await getCrypto(userCrypto.cryptoId);
    let crypto = res.data.data

    crypto.amount = userCrypto.amount
    crypto.img = 'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'
    userCrypto.img = 'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'
    crypto.equivalentTo = userCrypto.amount * crypto.priceUsd

    totalAmount.value += userCrypto.amount * crypto.priceUsd

    values.value.push(crypto)
  }

  userMoney.value = await getUserMoney(username.value).then(res => res.data);
});

const labels = [{
  understandingName: 'Nombre',
  name: 'amount',
  type: 'string',
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
  understandingName: 'Equivaut à ',
  name: 'equivalentTo',
  type: 'float',
},
{
  understandingName: 'Fluctuation (24h)',
  name: 'changePercent24Hr',
  type: 'percent',
  specialColumnType: 'fluctuation'
}
]
</script>

<template>
  <main class="px-6 mx-auto">
    <h2 class="my-6 text-2xl font-semibold text-gray-200">
      Portefeuille
    </h2>
    <div class="flex flex-row gap-6 mb-8">
      <div class="flex flex-col px-10 py-6 rounded-lg justify-center items-center bg-gray-800 w-full" v-if="userMoney && totalAmount">
        <div class="flex flex-row mb-4 gap-6 ">
          <div class="p-3 mr-4 rounded-full text-white-100" style="background-color: #a01bae">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 22 22">
              <path
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3">
              </path>
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-400">Solde d'argent</p>
            <p class="text-lg font-semibold text-gray-200">{{ userMoney }}€</p>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-400">Solde de cryptomonnaies</p>
            <p class="text-lg font-semibold text-gray-200">{{ parseFloat(totalAmount).toFixed(2) }}€</p>
          </div>
        </div>
        <div class="flex flex-row justify-center gap-6">
          <button class="px-2 py-2 font-semibold rounded-full bg-green-700 text-green-100 w-32"
            v-on:click="router.push({ name: 'ExchangeCoin' })">Acheter</button>
          <button class="px-2 py-2 font-semibold rounded-full bg-red-700 text-red-100 w-32"
            v-on:click="router.push({ name: 'ExchangeCoin' })">Vendre</button>
        </div>

      </div>
      <div v-else class="w-full bg-gray-800 rounded-lg text-center p-4">
              <Loading />
      </div>
      <!--        <div class="px-10 rounded-lg shadow-xs bg-gray-800">-->
      <!--          <h1 class="font-bold text-lg py-4">Cryptomonnaie favorite</h1>-->
      <!--          <div class="flex gap-6">-->
      <!--            <img v-for="userCrypto in userCryptos" :src="userCrypto.img" class="w-10 h-10">-->
      <!--          </div>-->
      <!--          <h1 class="text-sm py-4">Ajouter des cryptomonnaie favorite</h1>-->
      <!--        </div>-->
    </div>

    <Liste :labels="labels" :data="values" />

  </main>
</template>
