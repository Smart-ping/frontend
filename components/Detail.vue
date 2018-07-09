<template>
    <b-container>
        <b-row>
            <b-form inline>
                <b-col>
                    <b-form-select v-model="interval" >
                        <option value="day">Последние сутки</option>
                        <option value="week">Последняя неделя</option>
                        <option value="month">Последний месяц</option>
                        <option value="halfyear">Последние полгода</option>
                        <option value="year">Последний год</option>
                    </b-form-select>
                </b-col>
                <b-col>
                   <b-button variant="success">Показать</b-button>
                </b-col>
            </b-form>
        </b-row>
        <b-row>
            <b-col>
                <h1 class="title">{{ check ? check.title: '' }}</h1>
                <h2>{{check ? check.url: ''}}</h2>
                <p>Проверяем каждые {{check ? check.interval : "" }} минут.</p>
                <p>Сейчас сервис {{check ? (check.online ? "работает" : "не работает") : ""}}</p>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Проверки" active>
                            <EventDetail :checkId="checkId"></EventDetail>
                        </b-tab>
                        <b-tab title="События">
                            <br>События
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>

import EventDetail from '~/components/EventDetail'

export default {

    props: {
        check: Object
    },
    data() {
        return {
            interval: "day"
        }
    },
    computed: {
        checkId() {
            console.log('check:', this.check)
            return this.check ? this.check.id : null
        }
    },
    components: {
        EventDetail
    }
}
</script>

<style>
h1.title {
    margin-top: 0.3em; 
}
</style>

