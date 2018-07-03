<template>
    <b-container fluid>
            <b-form @submit="onSubmit">
            <b-form-row class="justify-content-md-center">
                <b-col md="4">
                    <h1>Зарегистрируйтесь</h1>
                </b-col>
            </b-form-row>
            <b-form-row class="justify-content-md-center">
                <b-col md="4">        
                <b-form-group id="emailInputGroup"
                                label="Email он же логин:"
                                label-for="emailInput">
                    <b-form-input id="emailInput"
                                type="text"
                                v-model="form.email"
                                placeholder="user@host.ru"
                                ref="emailInput"
                                v-bind:class="{ 'is-invalid' : isNoValidEmail() }">
                    </b-form-input>
                    <b-form-invalid-feedback id="emailFeedback">Введите email</b-form-invalid-feedback>    
                </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-md-center">
                <b-col md="4">
                <b-form-group id="password1InputGroup"
                                label="Пароль"
                                label-for="password1Input">
                    <b-form-input id="password1Input"
                                type="password"
                                v-model="form.password1"
                                v-bind:class="{ 'is-invalid' : isNoPassword1Empty() }">
                    </b-form-input>
                    <b-form-invalid-feedback>Введите пароль</b-form-invalid-feedback>
                </b-form-group>
                </b-col>
            </b-form-row>


            <b-form-row class="justify-content-md-center">
                <b-col md="4">
                <b-form-group id="password2InputGroup"
                                label="Повторите пароль"
                                label-for="password2Input">
                    <b-form-input id="password2Input"
                                type="password"
                                v-model="form.password2"
                                v-bind:class="{ 'is-invalid' : isNoPassword2Match() }" >
                    </b-form-input>
                    <b-form-invalid-feedback>Пароли не совпадают</b-form-invalid-feedback>
                </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-md-center">
                <b-col md="4">
                    <b-btn variant="primary" type="submit" :disabled="isNoValidEmail() || isNoPassword1Empty() || isNoPassword2Match()" >Зарегистроваться</b-btn>
                </b-col>
            </b-form-row>

            </b-form>
    </b-container>
</template>
<script>

import validator from 'email-validator'

export default {
    data()
    {
        return { 
            form: {
                email: '',
                password1: '',
                password2: ''

            }
        }
    },
    mounted(){
        this.$refs.emailInput.focus()
    },
    methods: {
        onSubmit(evt)
        {
            evt.preventDefault()
        },
        isNoValidEmail() {
            return (this.form.email === '') || !validator.validate(this.form.email) 
        },
        isNoPassword1Empty() {
            return (this.form.password1 === '') 
        },
        isNoPassword2Match() {
            return (this.form.password1 != this.form.password2 ) 
        }
    }
}
</script>
<style scoped>
    h1 {
        font-size: 2rem;
        margin-top: 3rem;
        margin-bottom: 1rem;
    }
</style>
