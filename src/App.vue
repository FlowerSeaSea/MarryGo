<template>
  <div id="app">
    <router-view/>
    <tabbar/>
  </div>
</template>

<script>
import Tabbar from './components/Tabbar.vue';

export default {
  components: {
    Tabbar
  }
}
</script>

<style>
  .body{
    background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
  }
</style>
