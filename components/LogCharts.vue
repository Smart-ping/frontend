<template>
    <div>
        <line-chart 
            :chart-data="dataCollection" 
            :options="getOptions"  
            :height="200">
        </line-chart>
    </div>
</template>


<script>
import LineChart from "~/components/LineChart.js";
import { calcInterval } from "~/utils/period";
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
      dataCollection: null,
      getOptions: {
        animation: {
          duration: 0
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [ {
            type: 'time',
            time: {
                unit: 'hour',
                displayFormats:{
                    hour: 'H'
                }
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
                ticks : {
                    beginAtZero : true
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
    async loadData() {
      if (!this.interval || !this.checkId) return;

      const from = calcInterval(this.interval);

      const res = await this.$axios.get(`/data/checks/stat/${this.checkId}`, {
        params: {
          to: new Date(),
          from: from,
          aggregate: "hour"
        }
      });

      console.log(res.data.data);

         var data = [];
      var labels = [];
   /*   for (var i = moment(from); i < moment(); i = i.add(1, "hour")) {
        const hour = i.hour();
        labels.push(hour);

        const item = res.data.data.find(el => el._id.hour == hour); // Это сложно но чтото быстрее я не могу щас придумать

        if (item) {
          data.push(Math.round(item.avg));
        } else {
          data.push(0);
        }
      }
*/

    res.data.data.forEach(element => {
        data.push({
            t: new Date(element._id.year, element._id.month, element._id.day, element._id.hour),
            y: Math.round(element.avg)
        })
    });

      this.dataCollection = {
    //    labels: labels,
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
<style scoped>
.data-chart {
  height: 200px;
}
</style>

