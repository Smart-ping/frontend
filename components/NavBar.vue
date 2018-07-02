<template>
  <b-navbar toggleable="md" type="light" variant="light">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">SuperPing</b-navbar-brand>
    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav>
        <b-nav-item to="/">Проверки</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            {{ user }}
          </template>
          <b-dropdown-item href="#">Профиль</b-dropdown-item>
          <b-dropdown-item v-on:click="onLogout" >Выйти</b-dropdown-item>   
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>

export default {
  computed: {
    user() {
      return this.$store.state.auth.user ? this.$store.state.auth.user.email : null
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('auth/reset').then(resp => {
      //  this.$router.push("/")
        this.$router.go({path:'/', force: true})
      })
    }
  }
}

</script>