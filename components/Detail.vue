<template>
    <div>
        <b-navbar type="light" variant="light">
            <b-navbar-nav>
                <b-nav-form>
                    <b-form-select v-model="interval" class="mr-sm-2" >
                        <option value="day">Сутки</option>
                        <option value="week">Неделя</option>
                        <option value="month">Месяц</option>
                        <option value="halfyear">6 месяцев</option>
                        <option value="year">Год</option>
                    </b-form-select>
                    <b-button variant="secondary">Показать</b-button>
                </b-nav-form>
            </b-navbar-nav>
            <b-navbar-nav right>
                <b-button variant="secondary">Удалить</b-button>
            </b-navbar-nav>
        </b-navbar>
        <b-container>
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
    </div>
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

