<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <tabbar v-if="tabShow"/>
  </div>
</template>

<script>
import Tabbar from './components/Tabbar.vue';

export default {
  components: {
    Tabbar
  },
  data(){
    return{
      tabShow:true
    }
  },
  watch:{
    $route() {
      if (this.$route.path=='/detaile') {
        this.tabShow=false
      }else{
        this.tabShow=true
      }
    },
  }
}
</script>

<style>
 
</style>
