<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>

export default {
  components: {
  },
  data(){
    return{
      tabShow:false
    }
  },
  created(){
    this.$store.commit('initUser')
  },
  watch:{
    // $route() {
    //   if (this.$route.path=='/detaile' && this.$route.path=='/cart') {
    //     console.log(this.$route.path);
    //     this.tabShow=false
    //   }else{
    //     this.tabShow=true
    //   }
    // },
  }
}
</script>

<style>
 
</style>
