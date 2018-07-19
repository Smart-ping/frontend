<template>
    <div>
        <line-chart 
            :chart-data="dataCollection" 
            :options="getOptions()"  
            :height="200">
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
      this.loadData();
    },
    interval(n, o) {
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    getOptions() {
      return {
        animation: {
          duration: 0
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: intervalToAggregate(this.interval),
                displayFormats: intervalToDisplayFormat(this.interval)
              }
            },
            {
              gridLines: {
                display: false
              }
            }
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
      };
    },
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

      console.log(res.data.data);

      var data = [];

      res.data.data.forEach(element => {
        data.push({
          t: new Date(
            element._id.year ? element._id.year : 0,
            element._id.month ? element._id.month : 0,
            element._id.day ? element._id.day : 0,
            element._id.hour ? element._id.hour : 0
          ),
          y: Math.round(element.avg)
        });
      });

      this.dataCollection = {
        datasets: [
          {
            label: "Среднее время запроса",
            backgroundColor: "#59ba83",
            data: data,
            lineTension: 0.3,
            fill: false
          }
        ]
      };
    }
  }
};
</script>

