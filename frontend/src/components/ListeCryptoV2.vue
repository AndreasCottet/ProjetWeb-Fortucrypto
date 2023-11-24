<template>
  <Liste>
    <template v-slot:head>
      <th class="px-4 py-3">Rang</th>
      <th class="px-4 py-3">Nom</th>
      <th class="px-4 py-3">Prix</th>
      <th class="px-4 py-3">Capitalisation</th>
      <th class="px-4 py-3">VWAP</th>
      <th class="px-4 py-3">Offre</th>
      <th class="px-4 py-3">Volume (24h)</th>
      <th class="px-4 py-3">Fluctuation (24h)</th>
    </template>
    <template v-slot:body v-if="cryptos.length > 0">
      <tr class="text-gray-700 dark:text-gray-400" v-for="crypto in cryptos">
        <td class="px-4 py-3 text-sm">{{ crypto.rank }}</td>
        <td class="px-4 py-3 text-sm flex">
          <div class="w-10 h-10 mr-3 rounded-full md:block">
            <img :src="crypto.img" :alt="'Logo ' + crypto.name"/>
          </div>
          <div style="display: inline-block; vertical-align: middle" class="ellipsis">
            <a v-bind:href="'/coin/'+ crypto.id">{{ crypto.name }}
              <p style="font-size: 0.8em; opacity: 0.7">{{ crypto.symbol }}</p>
            </a>
          </div>
        </td>
        <td class="px-4 py-3 text-sm">{{ parseFloat(crypto.priceUsd).toFixed(2) }}€</td>
        <td class="px-4 py-3 text-sm">{{ kFormatter(parseFloat(crypto.marketCapUsd).toFixed(2)) }}€</td>
        <td class="px-4 py-3 text-sm">{{ kFormatter(parseFloat(crypto.vwap24Hr).toFixed(2)) }}€</td>
        <td class="px-4 py-3 text-sm">{{ kFormatter(parseInt(crypto.supply)) }}</td>
        <td class="px-4 py-3 text-sm">{{ kFormatter(parseFloat(crypto.volumeUsd24Hr).toFixed(2)) }}€</td>
        <td class="px-4 py-3 text-xs">
        <span
            class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
            v-if="parseFloat(crypto.changePercent24Hr) > 0">
          {{ parseFloat(crypto.changePercent24Hr).toFixed(2) }}%
        </span>
          <span
              class="px-2 py-1 font-semibold leading-tight text-red-500 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100"
              v-else>
          {{ parseFloat(crypto.changePercent24Hr).toFixed(2) }}%
        </span>
        </td>
      </tr>
    </template>
  </Liste>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import Liste from "./Liste.vue";
import {getCryptos} from "../api/api";

const cryptos = ref([])

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

onMounted(async () => {
  let res = await getCryptos()
  cryptos.value = res.data.data
  cryptos.value.forEach((crypto) => {
    crypto.img = 'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'
  })
})
</script>
