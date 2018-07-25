<script>
import VueCharts from "vue-chartjs";
import { Bar, Line } from "vue-chartjs";
import {
  calcInterval,
  intervalToAggregate,
  intervalToDisplayFormat
} from "~/utils/period";

export default {
  extends: Line,
  props: {
    checkId: String,
    interval: String
  },
  watch: {
    async checkId(n, o) {
      try {
        this.renderChart(await this.getData(), this.getOptions());
      } catch (e) {}
    },
    async interval(n, o) {
      try {
        this.renderChart(await this.getData(), this.getOptions());
      } catch (e) {}
    }
  },
  async mounted() {
    try {
      this.renderChart(await this.getData(), this.getOptions());
    } catch (e) {}
  },
  methods: {
    getOptions() {
      return {
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
              }
              // ticks: {
              //   callback(val) {
              //       console.log('tick:', val)
              //   }
              // }
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
    async getData() {
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
            Date.UTC(
              element._id.year ? element._id.year : 0,
              element._id.month ? element._id.month - 1 : 0,
              element._id.day ? element._id.day : 0,
              element._id.hour ? element._id.hour : 0
            )
          ),
          y: Math.round(element.avg)
        });
      });

      console.log(data);

      return {
        datasets: [
          {
            label: "Среднее время запроса",
            backgroundColor: "#59ba83",
            data: data,
            lineTension: 0.2,
            fill: false
          }
        ]
      };
    }
  }
};
</script>

