<template>
<b-container>
    <b-form @submit="onSubmit">
        <b-row>
            <b-col sm="4"></b-col>
            <b-col sm="4">
                <h1>SuperPing</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="4"></b-col>
            <b-col sm="4">
                <b-alert variant="danger" :show="!!alert">{{ !!alert ? alert.message:'' }}</b-alert>
                <b-form-group>
                    <b-form-input placeholder="e-mail" required v-model="email">
                    </b-form-input>
                </b-form-group>
                <b-form-group >
                    <b-form-input placeholder="пароль" required type="password" v-model="password">
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-button type="submit" variant="primary">Вход</b-button>
                </b-form-group>
            </b-col>
        </b-row>
    </b-form>
</b-container>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      alert: null,
      loading: false
    };
  },
  methods: {
    onSubmit(evt) {
      this.alert = null
      this.loading = true;
      evt.preventDefault();
      this.$store
        .dispatch("auth/login", {
          email: this.email,
          password: this.password
        })
        .then(result => {
          this.alert = { type: "success", message: result.data.message };
          this.loading = false;
          this.$router.push("/");
        })
        .catch(error => {
          this.loading = false;
           if (error.response && error.response.data) {
             this.alert = {
               type: "error",
               message: error.response.data.message || error.reponse.status
             };
           }
        })
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
}
</style>
