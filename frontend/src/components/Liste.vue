<template>
  <div class="w-full overflow-hidden rounded-lg shadow-xs" v-if="data && labels">
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th v-for="label in labels" class="px-4 py-3">{{ label.understandingName }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <tr class="text-gray-700 dark:text-gray-400" v-for="value in data.slice(currentPage * 10, currentPage * 10 + 10)">
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

              <span v-else-if="label?.specialColumnType === 'fluctuation'" :class="{'px-2 py-1 font-semibold leading-tight rounded-full': true, 'dark:bg-red-700 dark:text-red-100': parseFloat(value[label.name]) < 0, 'dark:bg-green-700 dark:text-green-100':  parseFloat(value[label.name])}">{{ parseFloat(value[label.name]).toFixed(2) }} %</span>
              <span v-else-if="label.type === 'float'">{{ label.dontUseFormatter ? parseFloat(value[label.name]) : kFormatter(parseFloat(value[label.name]).toFixed(2)) }}€</span>
              <span v-else-if="label.type === 'percent'">{{ parseFloat(value[label.name]).toFixed(2)  }} %</span>
              <span v-else-if="label.type === 'pair'">{{ value.baseSymbol  }} / {{ value.quoteSymbol }} </span>
              <span v-else>{{ value[label.name] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      <span class="flex items-center col-span-3">Affichage {{ currentPage * 10 }}-{{ currentPage * 10 + 10 }} sur {{ data.length  }} </span>
      <span class="col-span-2"></span>
      <!-- Pagination -->
      <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul class="inline-flex items-center" v-if="data.length > 1">
            <li>
              <button
                  class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
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
                      :class="{'px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple': true, 'bg-purple-600 text-white': currentPage === n - 1}"
                  >
                    {{ n }}
                  </button>
                </li>
            <li>
              <button
                  class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
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

function updateCrypto(idCrypto, isUp) {

}


</script>