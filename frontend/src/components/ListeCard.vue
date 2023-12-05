<template>
    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card v-for="card in cards" :key="card.name" :card="card" />
    </div>
</template>
<script setup>
import { onMounted, computed, ref } from "vue";
import { getAllExchanges, getAllMarkets, getAllCrypto } from "../api/api";
import Card from "./Card.vue";

const nbExchanges = ref(0)
const nbMarkets = ref(0)
const totalCap= ref(0)
const btcDominance = ref(0)


onMounted(async () => {
  try {
    let res = await getAllExchanges()
    nbExchanges.value = res.data.data.length

    res = await getAllMarkets()
    nbMarkets.value = res.data.data.length

    res = await getAllCrypto()

    res.data.data.forEach(element => {
      totalCap.value += parseInt(element.marketCapUsd)
    });

    btcDominance.value = res.data.data[0].marketCapUsd / totalCap.value * 100
  } catch (e) {
    console.error(e)
  }
})

const cards = computed( () => {
  return [
    {
      name: "Capitalisation",
      value: parseFloat(totalCap.value/1000000000000).toFixed(2) +"T €",
      svg: "M10.034,18.069a7.982,7.982,0,0,0,3.939-1.035l3.332,3.332a2.164,2.164,0,0,0,3.061-3.061L17.031,13.97a8.026,8.026,0,1,0-7,4.1ZM5.768,5.768A6.033,6.033,0,1,1,4,10.035,5.988,5.988,0,0,1,5.768,5.768Zm-.7,4.267a1.015,1.015,0,0,1,1-1.018.985.985,0,0,1,1,.983v.035A2.968,2.968,0,0,0,10.035,13a1,1,0,0,1,0,2A4.972,4.972,0,0,1,5.069,10.035Z",
      color: "#a01bae",
    },
    {
      name: "Sites d'échanges",
      value: nbExchanges.value,
      svg: "M3,22a1,1,0,0,1-1-1V3A1,1,0,0,1,4,3V21A1,1,0,0,1,3,22ZM8,5v6h7a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1Zm13,8H8v6H21a1,1,0,0,0,1-1V14A1,1,0,0,0,21,13Z",
      color: "#21c25e",
    },
    {
      name: "Marchés",
      value: nbMarkets.value,
      svg: "M20,4H4A2,2,0,0,0,2,6V18a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6A2,2,0,0,0,20,4ZM8,17H4V15H8Zm12-5H4V8H20Z",
      color: "#1d3b8b",
    },
    {
      name: "BTC Indice de dominance",
      value: parseFloat(btcDominance.value).toFixed(2)+"%",
      svg: "M17,6.009s2,4.01-1,4.01C12.838,10.019,13,3,15,2c0,0-7.655.767-9.57,7.673-.5-1.35-1.059-3.4-.43-4.666,0,0-3,2.005-3,7.017S4,22,12,22s10-4.965,10-8.974C22,7.012,17,6.009,17,6.009Z",
      color: "#f87215",
    }
  ]
})

</script>