<template>
    <Liste>
        <template v-slot:head>
            <th class="px-4 py-3">Classement</th>
            <th class="px-4 py-3">Nom</th>
            <th class="px-4 py-3">Paires d'échange</th>
            <th class="px-4 py-3">Volume (24h)</th>
            <th class="px-4 py-3">Total %</th>
        </template>
        <template v-slot:body v-if="exchanges.length > 0">
            <tr class="text-gray-700 dark:text-gray-400" v-for="exchange in exchanges">
                <td class="px-4 py-3 text-sm">{{ exchange.rank }}</td>
                <td class="px-4 py-3 text-sm flex">
                    <div style="display: inline-block; vertical-align: middle" class="ellipsis">
                        <a v-bind:href="'/exchange/' + exchange.exchangeId">{{ exchange.name }}
                        </a>
                    </div>
                </td>
                <td class="px-4 py-3 text-sm">{{ exchange.tradingPairs }}</td>
                <td class="px-4 py-3 text-sm"> {{ kFormatter(parseFloat(exchange.volumeUsd).toFixed(2)) }}€</td>
                <td class="px-4 py-3 text-sm">{{ parseFloat(exchange.percentTotalVolume).toFixed(2) }}%</td>
            </tr>
        </template>
    </Liste>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Liste from "./Liste.vue";
import {getExchanges} from "../api/api";

const exchanges = ref([])

onMounted(async () => {
  const res = await getExchanges()
  exchanges.value = res.data.data
  console.log(exchanges)
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