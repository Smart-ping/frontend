<template>
    <div>
        <line-chart 
            :chart-data="dataCollection" 
            :options="getOptions"
            :height="200"
            ref="chart">
        </line-chart>
    </div>
</template>


<script>
import LineChart from "~/components/LineChart.js";
import { calcInterval, intervalToDisplayFormat, intervalToAggregate } from "~/utils/period";
import moment from "moment";

export default {
  components: {
    LineChart
  },
  props: {
    checkId: String,
    interval: String
  },
  data() {
    return {
      dataCollection: null
    };
  },
  watch: {
    checkId(n, o) {
      this.loadData()
    },
    interval(n, o) {
  //    this.$refs.chart._data._chart.chart.labels = []
      this.loadData()
      // this.$refs.chart._data._chart.chart.scales['x-axis-0'].buildTicks()
      // console.log(this.$refs.chart._data._chart.chart)
    }
  },
  computed: {
    getOptions() {

      console.log('getOptions',intervalToAggregate(this.interval), intervalToDisplayFormat(this.interval), this.interval)
      const dat = {
        animation: {
          duration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                round: intervalToAggregate(this.interval), 
                unit: intervalToAggregate(this.interval),
                displayFormats: intervalToDisplayFormat(this.interval),
                min: calcInterval(this.interval),
                max: new Date()
              },
              gridLines: {
                display: false
              },
              // ticks: {
              //   callback(val) {
              //       console.log('tick:', val)
              //   }
              // }
            },          
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    
    console.log('dat:', dat)
  
    return dat
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      if (!this.interval || !this.checkId) return;

      const from = calcInterval(this.interval);

      const res = await this.$axios.get(`/data/checks/stat/${this.checkId}`, {
        params: {
          to: new Date(),
          from: from,
          aggregate: intervalToAggregate(this.interval)
        }
      });

      var data = [];

      res.data.data.forEach(element => {
        data.push({
          t: new Date(
            element._id.year ? element._id.year : 0,
            element._id.month ? (element._id.month - 1) : 0,
            element._id.day ? element._id.day : 0,
            element._id.hour ? element._id.hour : 0
          ),
          y: Math.round(element.avg)
        });
      });

      console.log(data)

      this.dataCollection = {
        datasets: [
          {
            label: "Среднее время запроса",
            backgroundColor: "#59ba83",
            data: data,
            lineTension: 0.2,
            fill: false
          }
        ]
      }
    }
  }
};
</script>

