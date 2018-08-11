<script>
import VueCharts from "vue-chartjs";
import { Bar, Line } from "vue-chartjs";
import {
  calcInterval,
  intervalToAggregate,
  intervalToDisplayFormat
} from "~/utils/period";
import moment from 'moment'
import api from '~/api'

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
    moment.locale('ru')
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
                display: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
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

      const res = await api.logs.stat(this.$axios, {
        id: this.checkId,
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

      return {
        datasets: [
          {
            label: "Среднее время запроса",
            backgroundColor: "#59ba83",
            borderColor: "#59ba83",
            borderWidth: 1,
            data: data,
            lineTension: 0,
            fill: false
          }
        ]
      };
    }
  }
};
</script>

