<template>
    <b-container>
        <b-row>
            <b-col>
                <b-table 
                    striped
                    hover
                    small
                    :fields="fields" 
                    :items="getItems"
                    :current-page="currentPage"
                    :per-page="perPage"
                    ref="eventTable">
                    <template slot="date" slot-scope="data">
                        {{ new Date(data.item.date).toLocaleString() }}
                    </template>
                    <template slot="duration" slot-scope="data">
                        {{ data.item.duration == 0 ? "&nbsp;" : data.item.duration + ' мс' }}
                    </template>

                    <template slot="downloadSize" slot-scope="data">
                        {{ data.item.downloadSize == 0 ? "&nbsp;" : data.item.downloadSize + ' байт' }}
                    </template>

                </b-table>        
            </b-col>
        </b-row>
        <b-row>
            <b-col md="7">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
            <b-col md="5">
                <b-form-group horizontal label="Записей" class="mb-0">
                    <b-form-select :options="pageOptions" v-model="perPage" />
                </b-form-group>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>

export default {
    props: {
        checkId: String
    },
    watch: {
        checkId(o, n) {
            if (o != n)
               this.$refs.eventTable.refresh()
        }
    },
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            totalRows: 100,
            pageOptions: [10, 20, 50, 100],
            fields: [ 
                { key: 'date', label: "Время проверки" },
                { key: 'status', label: "Статус" },
                { key: 'duration', label: "Отклик" },
                { key: 'downloadSize', label: "Размер"}
            ]
        }
    },
    methods: {
        getItems(context) {

            if (this.checkId == null)
                return []

            return this.$axios.get(`/data/checks/log/${this.checkId}`,{
                params: {
                    offset: (context.currentPage - 1) * context.perPage,
                    limit: context.perPage
                }
            }).then( res => {
                return res.data.log || []
            })
        }
    }
}
</script>

