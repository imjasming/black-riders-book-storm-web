<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer v-if="excludeRoutes.indexOf($route.name) == -1"></Footer>
  </div>
</template>

<script>
  import Header from '@/components/header/Header';
  import Footer from '@/components/footer/Footer';

  export default {
    name: 'App',
    data() {
      return {
        excludeRoutes: ['HomeIndex', 'MyAddress', 'AddAddress', 'MyOrder', 'MyShoppingCart']
      };
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss">

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    width: 100%;
  }

  html, body {
    height: 100%;
    width: 100%;
  }
</style>
