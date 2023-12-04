<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

import { Line } from 'vue-chartjs'

const chartConfig = {
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


export default {
  name: 'ChartCoin',
  components: {
    Line
  },
  props: {
    chartValues: {
      type: Object,
      required: true
    }
  },

  computed: {
    chartData() {
      console.log(this.$props.chartValues)
      return {
        labels: this.$props.chartValues.labels,
        datasets: [
          {
            label: 'Prix (€)',
            data: this.$props.chartValues.values,
            fill: false,
            borderColor: this.$props.chartValues.changePercent24Hr < 0 ? '#ff0000' : "#7dd71d"
          }
        ]
      }
    },
    chartOptions() {
      return chartConfig.options
    }
  }
}
</script>
