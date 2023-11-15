<template>
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm">{{ exchange.rank }}</td>
    <td class="px-4 py-3 text-sm flex">
      <div style="display: inline-block; vertical-align: middle" class="ellipsis">
        <a href="/assets/bitcoin">{{  exchange.name }}
        </a>
      </div>
    </td>
    <td class="px-4 py-3 text-sm text-center">{{ exchange.tradingPairs }}</td>
    <td class="px-4 py-3 text-sm"></td>
    <td class="px-4 py-3 text-sm"></td>
    <td class="px-4 py-3 text-sm"></td>
  </tr>
</template>
<script setup>
const { exchange } = defineProps({
  exchange: {
    type: Object,
    required: true
  }
})
</script>