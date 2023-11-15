<template>
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm">{{ crypto.rank }}</td>
    <td class="px-4 py-3 text-sm flex">
      <div class="w-10 h-10 mr-3 rounded-full md:block">
         <img :src="img" :alt="'Logo ' + crypto.name" />
      </div>
      <div style="display: inline-block; vertical-align: middle" class="ellipsis">
        <a href="/assets/bitcoin">{{ crypto.name }}
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
        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" v-if="parseFloat(crypto.changePercent24Hr) > 0">
        {{ parseFloat(crypto.changePercent24Hr).toFixed(2) }}%
      </span>
      <span
        class="px-2 py-1 font-semibold leading-tight text-red-500 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100" v-else>
        {{ parseFloat(crypto.changePercent24Hr).toFixed(2) }}%
      </span>
    </td>
  </tr>
</template>

<script setup>
import {computed} from "vue";

const { crypto } = defineProps({
  crypto: {
    type: Object,
    required: true
  }
})
console.log(crypto)

const img = computed(() => {
  return 'https://assets.coincap.io/assets/icons/' + crypto.symbol.toLowerCase() + '@2x.png'
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

<style></style>
