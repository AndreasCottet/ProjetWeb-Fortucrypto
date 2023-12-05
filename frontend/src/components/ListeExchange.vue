<template>
    <Liste :labels="labels" :data="exchanges">
    </Liste>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Liste from "./Liste.vue";
import {getExchanges} from "../api/api";

const exchanges = ref([])

const labels = ref([
  {
    understandingName: 'Rang',
    name: 'rank',
    type: 'number'
  },
  {
    understandingName: 'Nom',
    name: 'name',
    type: 'string',
    specialColumnType: 'coinExchangeColumn'
  },
  {
    understandingName: 'Paires d\'échange',
    name: 'tradingPairs',
    type: 'number'
  },
  {
    understandingName: 'Volume (24h)',
    name: 'volumeUsd',
    type: 'float'
  },
  {
    understandingName: 'Total %',
    name: 'percentTotalVolume',
    type: 'percent'
  }
])

onMounted(async () => {
  const res = await getExchanges()
  exchanges.value = res.data.data
})
</script>