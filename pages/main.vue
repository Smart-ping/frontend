<template>
<b-container fluid>
<CreateCheckDlg 
  name="create-check-dlg" 
  title="Создать новую проверку" 
  @onOk="onOk"></CreateCheckDlg>

  <b-row>
    <b-col>
      <b-button-toolbar class="main-toolbar">
        <b-btn v-b-modal.create-check-dlg>Новая проверка</b-btn>
      </b-button-toolbar>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      
        <b-card v-for="check in checks" :key="check.id">
        {{ check.url }} 
        </b-card>
    </b-col>
  </b-row>
</b-container>
</template>

<style>
.main-toolbar {
  margin: 1em 0;
}
</style>
<script>
import CreateCheckDlg from "~/components/CreateCheckDlg";

export default {
  computed:{
    checks() { 
      return this.$store.state.check.checks
    }
  },
  fetch({ store, params }) {
    return store.dispatch('check/fetch')
  },
  methods: {
    onOk(info) {
      this.loading = true;
      this.$store
        .dispatch("check/create", info)
        .then(result => {
          this.loading = false;
          return this.$store.dispatch('check/fetch')
        })
        .catch(error => {
          this.loading = false;
           console.log("error:", error);
        });
    }
  },
  components: {
    CreateCheckDlg
  }
};
</script>
