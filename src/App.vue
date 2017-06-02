<template>
  <div id="app">
    <navbar></navbar>
  </div>
</template>

<script>

import Navbar from './components/Navbar';


export default {
  name: 'app',
  components: {
     Navbar
  },
  events: {
    'btnSelected' (data){
      this.$broadcast('btnSelected', data);
    }
  }
}
</script>

<style lang="css">
    @import '../node_modules/bulma/css/bulma.css';
    @import '../node_modules/font-awesome/css/font-awesome.min.css';

    #app{
      height: 100%;
    }

    html{
      height: 100%;
    }

    body{
      height: 100%;
    }
</style>
