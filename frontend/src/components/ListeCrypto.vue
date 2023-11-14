<template>
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm">1</td>
    <td class="px-4 py-3 text-sm flex">
      <div class="w-10 h-10 mr-3 rounded-full md:block">
        <!-- <img :src="crypto.img" :alt="crypto.img" class="AssetLogo__ImageStyled-sc-1m18p9x-0 itlbLb ui mini right spaced middle aligned image" /> -->
      </div>
      <div style="display: inline-block; vertical-align: middle" class="ellipsis">
        <a href="/assets/bitcoin">{{ crypto.name }}
          <p style="font-size: 0.8em; opacity: 0.7">{{ crypto.symbole }}</p>
        </a>
      </div>
    </td>
    <td class="px-4 py-3 text-xs">{{ crypto.priceUsd }}€</td>
    <td class="px-4 py-3 text-sm">{{ crypto.supply }}€</td>
    <td class="px-4 py-3 text-sm">{{ crypto.vwap24Hr }}€</td>
    <td class="px-4 py-3 text-sm">{{ crypto.volumeUsd24Hr }}€</td>
    <td class="px-4 py-3 text-xs">
      <span
        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" v-if="parseFloat(crypto.changePercent24Hr) > 0">
        +{{ crypto.changePercent24Hr }}%
      </span>
      <span
        class="px-2 py-1 font-semibold leading-tight text-red-500 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100" v-else>
        -{{ crypto.changePercent24Hr }}%
      </span>
    </td>
  </tr>
</template>

<script setup>
const { crypto } = defineProps({
  crypto: {
    type: Object,
    required: true
  }
})
</script>

<style></style>
