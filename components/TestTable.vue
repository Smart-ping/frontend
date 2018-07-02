<template>
<div id="people">
  <v-client-table 
    :data="tableData" 
    :columns="columns" 
    :options="options">
  </v-client-table>
</div>
</template>

<script>

//import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import Vue from 'vue'
import {ClientTable} from 'vue-tables-2'

let tableOptions = {
  //
}

Vue.use(ClientTable, tableOptions);

export default {
  data () {
    return {
      columns: ['id', 'name', 'age'],
      
      tableData: [
        {'id':1, name: 'Anton', age: 42},
        {'id':2, name: 'Julia', age: 43},
        {'id':3, name: 'Tim', age: 10},
        {'id':4, name: 'Margaritha', age: 14}
      ],

      options: {
        filterable: false
      }
    }
  }
}
</script>