<template>
  <van-nav-bar>
    <slot slot="left" name="left">
      <div class="header-return">
        <van-icon name="arrow-left" @click="goBack" />
      </div>
    </slot>
    <slot slot="title" name="title"></slot>
    <slot slot="right" name="right">
      <div class="header-returnHome">
        <van-icon name="arrow" @click="goHome" />
      </div>
    </slot>
  </van-nav-bar>
</template>

<script>
export default {
  name: "Navbar",
  methods:{
    goBack(){},
    goHome(){}
  }
};
</script>

<style lang="scss">
.van-nav-bar {
  background: rgba(0, 0, 0, 0);
  .van-nav-bar__content {
    height: 54px;
  }
}
</style>
