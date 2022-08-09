<template>
  <line-chart-generator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

export default {
  name: 'IncomeChart',

  components: { LineChartGenerator },

  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    incomeItems: {
      type: Array,
      default: () => []
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({}),

  computed: {
    chartData: function () {
      return {
        labels: this.generateLabels(),
        datasets: [
          {
            label: 'Income Chart',
            data: this.generatePoints()
          }
        ]
      }
    },
    chartOptions: function () {
      return {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: 'Age' },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10
            }
          },
          y: {
            title: { display: true, text: 'Income' },
            beginAtZero: true
          }
        }
      }
    }
  },

  methods: {
    generateLabels() {
      let labels = []
      for (let i = 0; i <= 100; ++i) {
        labels.push(i)
      }
      return labels
    },

    generatePoints() {
      let points = []
      for (let i = 0; i <= 100; ++i) {
        points.push(NaN)
      }

      this.incomeItems.forEach((item) => {
        // eslint-disable-next-line no-debugger
        // debugger
        const rate =
          (item.final_amount - item.init_amount) /
          (item.end_age - item.start_age)

        for (let i = item.start_age; i <= item.end_age; ++i) {
          if (isNaN(points[i])) {
            points[i] = 0
          }
          points[i] = points[i] + item.init_amount + rate * (i - item.start_age)
        }
      })

      return points
    }
  }
}
</script>
