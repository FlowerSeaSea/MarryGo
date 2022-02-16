<template>
  <van-tabs v-model:active="active" swipeable sticky swipe-threshold=6>
  <van-tab v-for="index in 8" :title="'标签 ' + index">
    内容 {{ index }}
  </van-tab>
</van-tabs>
</template>

<script>
export default {

}
</script>

<style>

</style>