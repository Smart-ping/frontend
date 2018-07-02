<template>
  <b-container fluid>
  <b-row>
    <b-col>
    <div class="cust-panel">
      <CreateOrder></CreateOrder>    
    </div>
    </b-col>
  </b-row>  
  <b-row>
    <b-col>
      <TestTable></TestTable>
    </b-col>
  </b-row>
  </b-container>
</template>
<script>

import TestTable from './TestTable.vue'
import CreateOrder from './CreateOrder.vue'

export default {
  components : {
    TestTable, 
    CreateOrder
  }
}

</script>

