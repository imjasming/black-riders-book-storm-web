<template>
  <div>
    <page-header></page-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import PageHeader from './PageHeader'

  export default {
    name: "Layout",
    components:{
      PageHeader
    }
  }
</script>

<style scoped>

</style>
