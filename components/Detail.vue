<template>
    <b-container>
        <b-row>
            <b-form inline>
                <b-col>
                    <b-form-select v-model="interval" :options="options" >
                        <option value="1">Последние сутки</option>
                        <option value="2">Последняя неделя</option>
                        <option value="3">Последний месяц</option>
                        <option value="4">Последние полгода</option>
                        <option value="5">Последний год</option>
                    </b-form-select>
                </b-col>
                <b-col>
                   <b-button variant="success">Показать</b-button>
                </b-col>
            </b-form>
        </b-row>
        <b-row>
            <b-col>
                <h1>{{ check ? check.url: '' }}</h1>
                <p>Проверяем каждые {{check ? check.interval : "" }} минут.</p>
                <p>Сейчас сервис {{check ? (check.online ? "работает" : "не работает") : ""}}</p>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Проверки" active>
                            <br>Проверки
                        </b-tab>
                        <b-tab title="События" active>
                            <br>События
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
export default {
    props: {
        check: Object
    },
    data() {
        return {
            interval: "1"
        }
    },
    methods: {
    }
}
</script>
