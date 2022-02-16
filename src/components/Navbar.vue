<template>
    <van-nav-bar>
        <slot slot="left"  name="left"></slot>
        <slot slot="title" name="title"></slot>
        <slot slot="right" name="right"></slot>
    </van-nav-bar>
</template>

<script>
  export default {
    name: "Navbar"
  }
</script>

<style scoped>

.van-nav-bar{
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to top,#ffd1ff 0%, #fad0c4 100%);
}
</style>