<template>
<b-container fluid>
<CreateCheckDlg 
  name="create-check-dlg" 
  title="Создать новую проверку" 
  @onOk="onOk">
</CreateCheckDlg>
  <b-row>
    <b-col>
      <b-button-toolbar class="main-toolbar">
        <b-btn v-b-modal.create-check-dlg variant="success">Новая проверка</b-btn>
      </b-button-toolbar>
    </b-col>
  </b-row>
  <b-row>
    <b-col sm="3">
      <b-list-group>
        <b-list-group-item 
          v-for="check in checks" 
          :key="check.id" 
          @click="onSelectItem(check.id)" 
          :active="selected === check.id">
            <i class="fa fa-arrow-circle-o-up" v-if="check.online"></i>
            <i class="fa fa-arrow-circle-o-down" v-else></i>
            &nbsp;{{check.title}}
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col sm="9">
      <Detail :check="selectedCheck"></Detail> 
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import CreateCheckDlg from "~/components/CreateCheckDlg"
import Detail from "~/components/Detail.vue"
import url from "url"

export default {
  data() {
    return {
      selected: null
    }
  },
  computed:{
    checks() { 
      return this.$store.state.check.checks
    },
    selectedCheck() {
      return this.$store.state.check.checks.find(item => (item.id == this.selected))
    }
  },
  fetch({ store, params }) {
    return store.dispatch('check/fetch')
  },
  mounted() {
    if (this.$store.state.check.checks && this.$store.state.check.checks[0])
      this.selected = this.$store.state.check.checks[0].id
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
    },
    onSelectItem(id) {
        this.selected = id
    }
  },
  components: {
    CreateCheckDlg,
    Detail
  }
};
</script>

<style>
  .fa-arrow-circle-o-down {
    color: #FF0033;
    font-size:1.2em    
  }
  .fa-arrow-circle-o-up {
    color: #28a745;
    font-size:1.2em
  }
</style>
