<template>
  <van-tabbar
    route
    active-color="#ee0a24"
    inactive-color="#000"
    v-model="active"
  >
    <van-tabbar-item replace to="/home" icon="home-o" name="home"
      >首页</van-tabbar-item
    >
    <van-tabbar-item replace to="/business" icon="shop-o" name="business"
      >本地商家</van-tabbar-item
    >
    <van-tabbar-item replace to="/secrete" name="secrete">
      <span v-show="!(this.active === 'secrete')">结婚秘籍</span>
      <template #icon="props">
        <van-icon v-show="!props.active" name="envelop-o" />
        <van-popup
          v-model="show"
          closeable
          round
          position="bottom"
          close-icon="close"
          :style="{ height: '70%' }"
        />
        <van-button
          v-show="props.active"
          icon="plus"
          type="primary"
          round
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          size="small"
          @click="sendShow"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/shop" icon="cart-o" name="shop"
      >婚礼用品</van-tabbar-item
    >
    <van-tabbar-item replace to="/mine" icon="user-o" name="mine"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
export default {
  name: "Tabbar",
  components: {},
  data() {
    return {
      active: "home",
      show: false,
    };
  },
  methods: {
    sendShow() {
      this.show = !this.show;
    },
    getContainer() {
      return document.querySelector(".add");
    },
  },
};
</script>

<style scoped></style>
