<template>
  <div class="detail">
    <header v-show="isShow"  :style="Opacity">
      <div class="header-return">
        <van-icon name="arrow-left" @click="goBack" />
      </div>
    </header>
    <section ref="wrapper">
      <div>
        <swiper :autoplay="3000" :imgUrl="this.imgUrl" />
        <img
          src="../../public/images/goods1.png"
          style="width: 100%; height: 360px"
        />
        <img
          src="../../public/images/goods1.png"
          style="width: 100%; height: 360px"
        />
        <img
          src="../../public/images/goods1.png"
          style="width: 100%; height: 360px"
        />
      </div>
    </section>
    <footer>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
        />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button
          type="danger"
          text="立即购买"
         
        />
      </van-goods-action>
    </footer>
  </div>
</template>
<script>
import Swiper from "@/components/Swiper.vue";
import BetterScroll from "better-scroll";
import http from '@/common/api/request.js'
export default {
  components: {
    Swiper,
  },
  data() {
    return {
      id:0,
      scroll: "",
      isShow: true,
      Opacity: {},
      imgUrl: [
        require("@/assets/image/swiper01.png"),
        require("@/assets/image/swiper02.png"),
        require("@/assets/image/swiper01.png"),
        require("@/assets/image/swiper03.png"),
        require("@/assets/image/swiper04.png"),
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.back();
      // this.$router.go(-1);
    },

    async getData(){
      let id=this.$route.query.id
      let res =await http.$axios({
        url:'/api/goods/id',
        params:{
          id
        }
      })
      console.log(res);
    }
  },
  created(){
    this.id=this.$route.query.id
    this.getData()
  },
  activated(){
    if(this.$route.query.id != this.id){
      this.getData()
      this.id=this.$route.query.id;
    }

  },
  mounted() {
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      probeType: 3,
      movable: true,
      zoom: true,
      bounce: false,
      click: true,
    });

    this.scroll.on("scroll", (pos) => {
      let posY = Math.abs(pos.y);
      let opacity = (1-posY/180);
      console.log(opacity);
      opacity = opacity < 1 ? opacity : 1;
      this.Opacity = {
        opacity: opacity,
      };
      if (posY >= 54) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    });
  },
};
</script>
<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
header {
  .header-return {
    position: relative;
    width: 54px;
    height: 100%;
    background: tan;
    text-align: center;
    .van-icon {
      top: 19px;
    }
  }
}
section {
  flex: 1;
  overflow: hidden;
  .van-swipe {
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
    .van-swipe-item{
      height: 100%;
    }
  }
}
</style>
