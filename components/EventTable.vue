<template>
    <div>
        <b-row>
            <b-col>
                <b-table 
                    striped
                    small
                    :fields="fields" 
                    :items="getItems"
                    :current-page="currentPage"
                    :per-page="perPage"
                    ref="eventTable">
                    <template slot="start" slot-scope="data">
                        {{ new Date(data.item.start).toLocaleString() }}
                    </template>
                    <template slot="finish" slot-scope="data">
                        {{  data.item.finish ? new Date(data.item.finish).toLocaleString() : "&nbsp;" }}
                    </template>

                    <template slot="duration" slot-scope="data">
                        {{ data.item.duration ?  $moment.utc($moment.duration(data.item.duration).asMilliseconds()).format('HH:mm:ss') : "&nbsp;" }}
                    </template>

                    <template slot="online" slot-scope="data">
                      <i class="fa fa-arrow-circle-o-up" v-if="data.item.online"></i>
                      <i class="fa fa-arrow-circle-o-down" v-else></i>
                    </template>
                </b-table>        
            </b-col>
        </b-row>
        <b-row>
            <b-col md="9">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
            <b-col md="3" text-right>
                <b-form inline>
                    <label for="pageOptions">Показывать по:</label>
                    <b-form-select class="ml-2" id="pageOptions" :options="pageOptions" v-model="perPage" />
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>
<script>

import { calcInterval } from '~/utils/period'
import api from '~/api'
import moment from 'moment'

export default {
    props: {
        checkId: String,
        interval: String
    },
    watch: {
        async checkId(o, n) {
            if (o != n)
                await this.setupRecCount()
        },
        async interval (o, n) {
            if (o != n)
                await this.setupRecCount()
        },
    },
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            totalRows: 0,
            pageOptions: [10, 20, 30, 50, 100],
            fields: [
                { key: 'online', label: ''}, 
                { key: 'start', label: 'Начало' },
                { key: 'finish', label: 'Конец' },
                { key: 'duration', label: 'Длительность' }
            ]
        }
    },
    methods: {
        getItems(context) {

            if (this.checkId == null)
                return []

            return api.logs.event(this.$axios, {
                id: this.checkId,
                params: {
                    offset: (context.currentPage - 1) * context.perPage,
                    limit: context.perPage,
                    to: new Date(),
                    from: calcInterval(this.interval)
                }
            }).then( res => {
                return res.data.log || []
            })
        },
        async setupRecCount() {

            const res = await api.logs.event(this.$axios, {
                id: this.checkId,
                params: {
                    onlycount: true,
                    to: new Date(),
                    from: calcInterval(this.interval)
                }
            })

            if (res.data.type = 'success')
                this.totalRows = res.data.count

            if (this.$refs.eventTable)    
                this.$refs.eventTable.refresh()
        }
    }
}
</script>

