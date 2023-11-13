<template>
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm">1</td>
    <td class="px-4 py-3 text-sm flex">
      <div class="w-10 h-10 mr-3 rounded-full md:block">
        <img :src="crypto.img" :alt="crypto.img"
          class="AssetLogo__ImageStyled-sc-1m18p9x-0 itlbLb ui mini right spaced middle aligned image" />
      </div>
      <div style="display: inline-block; vertical-align: middle" class="ellipsis">
        <a href="/assets/bitcoin">{{ crypto.nom }}
          <p style="font-size: 0.8em; opacity: 0.7">{{ crypto.accronyme }}</p>
        </a>
      </div>
    </td>
    <td class="px-4 py-3 text-xs">{{ crypto.prix }}€</td>
    <td class="px-4 py-3 text-sm">{{ crypto.capitalisation }}€</td>
    <td class="px-4 py-3 text-sm">{{ crypto.vwap }}€</td>
    <td class="px-4 py-3 text-sm">{{ crypto.volume }}€</td>
    <td class="px-4 py-3 text-xs">
      <span
        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" v-if="crypto.typefluc == 'positive'">
        +{{ crypto.fluctuation }}%
      </span>
      <span
        class="px-2 py-1 font-semibold leading-tight text-red-500 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100" v-if="crypto.typefluc == 'negative'">
        -{{ crypto.fluctuation }}%
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
