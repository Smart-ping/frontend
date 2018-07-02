<template>
  <div> 
    <NavBar></NavBar>
    <nuxt/>
  </div>
</template>

<script>

import NavBar from "~/components/NavBar";

export default {
  components: {
    NavBar
  }
};
</script>