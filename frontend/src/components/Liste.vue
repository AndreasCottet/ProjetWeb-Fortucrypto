<template>
  <div class="w-full overflow-hidden rounded-lg" v-if="data && labels">
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr class="text-xs font-semibold text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
            <th v-for="label in labels" class="px-4 py-3">{{ label.understandingName }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700 bg-gray-800">
          <tr class="text-gray-400" v-for="value in data.slice(currentPage * 10, currentPage * 10 + 10)">
            <td v-for="label in labels" :class="{'px-4 py-3 text-sm': true, 'bg-red-900': value?.update === 'down', 'bg-green-900': value?.update === 'up'}">
              <div v-if="label?.specialColumnType === 'img'" class="flex flex-row">
                <div class="w-10 h-10 mr-3 rounded-full md:block">
                  <img :src="value.img" :alt="'Logo ' + value.name"/>
                </div>
                <div style="display: inline-block; vertical-align: middle" class="ellipsis">
                  <a v-bind:href="'/coin/'+ value.id">{{ value.name }}
                    <p style="font-size: 0.8em; opacity: 0.7">{{ value.symbol }}</p>
                  </a>
                </div>
              </div>
              <div v-else-if="label?.specialColumnType === 'coinExchangeColumn'">
                <a v-bind:href="'/exchange/'+ value.exchangeId">{{ value.name }}
                </a>
              </div>

              <span v-else-if="label?.specialColumnType === 'fluctuation'" :class="{'px-2 py-1 font-semibold rounded-full': true, 'bg-red-700 text-red-100': parseFloat(value[label.name]) < 0, 'bg-green-700 text-green-100':  parseFloat(value[label.name]) > 0}">{{ parseFloat(value[label.name]).toFixed(2) }} %</span>
              <span v-else-if="label.type === 'float'">{{ label.dontUseFormatter ? parseFloat(value[label.name]) : kFormatter(parseFloat(value[label.name]).toFixed(2)) }}€</span>
              <span v-else-if="label.type === 'percent'">{{ parseFloat(value[label.name]).toFixed(2)  }} %</span>
              <span v-else-if="label.type === 'pair'">{{ value.baseSymbol  }} / {{ value.quoteSymbol }} </span>
              <span v-else>{{ value[label.name] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="grid px-4 py-3 text-xs font-semibold uppercase border-t border-gray-700 sm:grid-cols-9 text-gray-400 bg-gray-800">
      <span class="flex items-center col-span-3">Affichage {{ currentPage * 10 }}-{{ currentPage * 10 + 10 }} sur {{ data.length  }} </span>
      <span class="col-span-2"></span>
      <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul class="inline-flex items-center" v-if="data.length > 1">
            <li>
              <button
                  class="px-3 py-1 rounded-md rounded-l-lg"
                  aria-label="Previous"
              >
                <svg
                    aria-hidden="true"
                    class="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                >
                  <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
                <li v-for="n in nbrPages">
                  <button
                      @click="currentPage = n - 1"
                      :class="{'px-3 py-1 rounded-md': true, 'bg-purple-600 text-white': currentPage === n - 1}"
                  >
                    {{ n }}
                  </button>
                </li>
            <li>
              <button
                  class="px-3 py-1 rounded-md rounded-r-lg"
                  aria-label="Next"
              >
                <svg
                    class="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                >
                  <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd">
                  </path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </span>
    </div>
  </div>
  <div v-else class="text-center">
    <h1>Chargement ...</h1>
  </div>
</template>
<script setup>

import {computed, ref} from "vue";

const props = defineProps(
    {
      labels: [],
      data: []
    }
)

const currentPage = ref(0)
const nbrPages = computed(() => {
  let nbrPages = props.data.length / 10
  if(!Number.isInteger(nbrPages)) {
    nbrPages = parseInt(nbrPages)
    nbrPages++
  }
  return nbrPages
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