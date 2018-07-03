<template>
  <b-navbar toggleable="md" type="dark" variant="secondary" class="main-toolbar">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">SuperPing</b-navbar-brand>
    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right v-if="user">
          <template slot="button-content">
            {{ user }}
          </template>
          <b-dropdown-item href="#">Профиль</b-dropdown-item>
          <b-dropdown-item v-on:click="onLogout" >Выйти</b-dropdown-item>   
        </b-nav-item-dropdown>

        <b-nav-form right v-if="!user">
          <b-button variant="info" size="sm" href="/login">Войти</b-button>
        </b-nav-form>

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
        this.$router.go({path:'/', force: true})
      })
    }
  }
}
</script>

<style>
.main-toolbar {
  margin-bottom: 1em;
}
</style>
