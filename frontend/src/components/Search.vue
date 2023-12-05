<template>
    <div class="flex justify-center flex-1 lg:mr-32">
        <div class="relative w-full max-w-xl text-purple-500">
            <div class="absolute inset-y-0 flex items-center pl-2">
                <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="flex flex-row pl-8 py-2 text-sm border-0 rounded-md bg-gray-700 text-gray-200 focus:placeholder-gray-500 focus:outline-none"
                ref="target">
                <input ref="search" v-model="ask" class="w-full bg-transparent focus:outline-none" type="text"
                    placeholder="Rechercher une cryptomonnaie ou une plateforme" aria-label="Search" />
                <select v-model="type" class="bg-transparent focus:outline-none">
                    <option value="coin" class="bg-gray-700"> Crypto </option>
                    <option value="exchange" class="bg-gray-700"> Exchange </option>
                </select>
            </div>
        </div>
        <div :class="{'absolute z-10 w-full max-w-xl mt-10 overflow-y-auto bg-gray-700 rounded-md shadow-2xl max-h-96': true, 'hidden': !showResult}">
            <ul>
                <li v-for="item in res" :key="item.id" class="px-4 py-2 border-b border-gray-800 hover:bg-gray-800">
                    <router-link :to="`/${type}/${item.id}`">
                        <div class="flex flex-row items-center justify-between">
                            <div class="flex flex-row items-center">
                                <img v-if="type === 'coin'" class="w-8 mr-2" :src="'https://assets.coincap.io/assets/icons/' + item.symbol.toLowerCase() + '@2x.png'"/>
                                <span class="text-sm font-medium text-gray-200">{{ item.name }}</span>
                            </div>
                            <span class="text-sm font-medium text-gray-400">{{ item.symbol }}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { getCryptos, getExchanges } from '../api/api';
import { onClickOutside } from '@vueuse/core'

const target = ref(null)
const showResult = ref(false)

const cryptos = ref([]);
const exchanges = ref([]);

const type = ref('coin');
const ask = ref('');
const res = computed(() => {
  let result = [];
  if (type.value === 'coin' && ask.value !== '') {
      result = cryptos.value.filter((crypto) => crypto.name.toLowerCase().includes(ask.value.toLowerCase()));
  } else if (type.value === 'exchange' && ask.value !== '') {
      result = exchanges.value.filter((exchange) => exchange.name.toLowerCase().includes(ask.value.toLowerCase()));
  }
  showResult.value = true;
  return result;
})

onClickOutside(target, event => { showResult.value = false})

onMounted(async () => {
    await getCryptos().then((res) => {
        cryptos.value = res.data.data;
    });

    await getExchanges().then((res) => {
        exchanges.value = res.data.data;
        exchanges.value.forEach((exchange) => {
            exchange.id = exchange.exchangeId;
        })
    });
});
</script>