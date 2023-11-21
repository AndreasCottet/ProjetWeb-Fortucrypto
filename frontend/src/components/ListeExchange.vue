<template>
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm">{{ exchange.rank }}</td>
    <td class="px-4 py-3 text-sm flex">
      <div style="display: inline-block; vertical-align: middle" class="ellipsis">
        <a v-bind:href="'/exchange/'+exchange.id">{{  exchange.name }}
        </a>
      </div>
    </td>
    <td class="px-4 py-3 text-sm">{{ exchange.tradingPairs }}</td>
    <td class="px-4 py-3 text-sm"> {{ kFormatter(parseFloat(exchange.volumeUsd).toFixed(2)) }}€</td>
    <td class="px-4 py-3 text-sm">{{ parseFloat(exchange.percentTotalVolume).toFixed(2) }}%</td>
  </tr>
</template>
<script setup>
const { exchange } = defineProps({
  exchange: {
    type: Object,
    required: true
  }
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