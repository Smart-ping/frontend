<template>
    <div v-if="check">

        <b-modal id="delete-modal"  
            ok-title="Удалить"
            cancel-title="Отменить" 
            ok-variant="danger" 
            centered
            @ok="deleteCheck">
            <p>Удалить безвозвратно проверку и все ее данные ?</p>
        </b-modal>

        <b-navbar type="light" variant="light" class="mt-2">
            <b-navbar-nav>
                <b-nav-form>
                    <b-form-select v-model="interval" class="mr-sm-2" >
                        <option value="day">Сутки</option>
                        <option value="week">Неделя</option>
                        <option value="month">Месяц</option>
                        <option value="halfyear">6 месяцев</option>
                        <option value="year">Год</option>
                    </b-form-select>
                </b-nav-form>
            </b-navbar-nav>
            <b-navbar-nav right>
                <b-button variant="secondary" v-b-modal.delete-modal>Удалить</b-button>
            </b-navbar-nav>
        </b-navbar>
        <b-row>
            <b-col>
                <h1 class="title">{{ check ? check.title: '' }}</h1>
                <h2>{{check ? check.url: ''}}</h2>
                <p>Проверяем каждые: {{check ? check.interval : "" }} минут.</p>
                <p>Сейчас сервис: <span class="text-success" v-if="check.online">работает</span> <span class="text-danger" v-else>не работает</span></p>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <LogCharts :checkId="checkId" :interval="interval"></LogCharts>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <!-- <b-card no-body> -->
                    <b-tabs class="mt-2">
                        <b-tab title="Проверки" active>
                            <EventDetail :checkId="checkId" :interval="interval" class="mt-4"></EventDetail>
                        </b-tab>
                        <b-tab title="События">
                            <br>События
                        </b-tab>
                    </b-tabs>
                <!-- </b-card> -->
            </b-col>
        </b-row>
    </div>
    <div v-else>
        <b-container fluid >
            <b-row class="justify-content-md-center">
                <b-col md="5" class="mt-5">
                    <p class="text-center">У вас нет активных проверок !</p>
                    <p class="text-center">Скорее создайте новую.</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>

import EventDetail from '~/components/EventDetail'
import LogCharts from '~/components/LogCharts'

export default {

    props: {
        check: Object,
        onDelete: Function
    },
    data() {
        return {
            interval: "day"
        }
    },
    computed: {
        checkId() {
            return this.check ? this.check.id : null
        }
    },
    methods: {
        deleteCheck() {
            this.$emit('onDelete', this.check ? this.check.id : null)
        }
    },
    components: {
        EventDetail,
        LogCharts
    }
}
</script>

<style>
h1.title {
    margin-top: 0.3em; 
}

.text-center {
    text-align: center;
}

</style>

