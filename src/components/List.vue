<template>
  <ul class="goodList">
    <li v-for="(item, index) in goodsList" :key="index" class="goods">
      <img :src="item.imgUrl" />
      <p class="goodDetail">
        <span>【{{ item.name }}】爱神的箭阿来得及</span>
        <span>￥{{ item.price }}<i>￥1111</i></span>
        <span>销量{{ item.num }}</span>
      </p>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss">

</style>
