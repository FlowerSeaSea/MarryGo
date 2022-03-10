<template>
  <van-swipe :autoplay="this.autoplay">
    <van-swipe-item v-for="(item, index) in this.imgUrl" :key="index">
      <img :src="item" :alt="index" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    autoplay: Number,
    imgUrl: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
