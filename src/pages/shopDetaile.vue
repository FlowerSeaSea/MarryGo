<template>
  <div class="detail">
    <header v-show="isShow">
      <Navbar>
        <div slot="title">本地商家</div>
      </Navbar>
    </header>
    <section ref="wrapper">
      <div>
        <swiper :autoplay="3000" :imgUrl="this.imgUrl" />
        <div class="goods_detaile">
          <p>商品名称：{{item.name}}</p>
          <p>详细信息：{{item.content}}</p>
        </div>
        <hr>
        <p>图片展示</p>
        <img
          src="../../public/images/2.jpg"
          style="width: 100%; height: 360px"
        />
        <img
          src="../../public/images/2.jpg"
          style="width: 100%; height: 360px"
        />
        <img
          src="../../public/images/2.jpg"
          style="width: 100%; height: 360px"
        />
      </div>
    </section>
    <footer>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="addCart" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="goOrder"
        />
      </van-goods-action>
    </footer>
  </div>
</template>
<script>
import Swiper from "@/components/Swiper.vue";
import BetterScroll from "better-scroll";
import http from '@/common/api/request.js'
import Navbar from "@/components/Navbar.vue";
import { Toast } from 'vant';
import {mapMutations, mapState} from "vuex";
export default {
  components: {
    Swiper,
    Navbar
  },
  data() {
    return {
      id:0,//用来判断重复刷新
      item:{},
      scroll: "",
      isShow: true,
      Opacity: {},
      imgUrl: [
        require("@/assets/image/4.png"),
        require("@/assets/image/1.jpg"),
        require("@/assets/image/3.jpg"),
        require("@/assets/image/6.jpg"),
        require("@/assets/image/5.jpg"),
      ],
    };
  },
  computed:{
      ...mapState({
      buy_list: (state) => state.buy.buy_list,
      buy_selectList: (state) => state.buy.buy_selectList,
    }),
  },
  methods: {
    ...mapMutations(["initOrder","buyList"]),
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
      this.item = res
    },

    addCart(){
      let id=this.$route.query.id
      http.$axios({
        url:'/api/addCart',
        method:'post',
        data:{
          goodsId:id,
        },
        headers:{
          token:true
        }
      }).then(res=>{
        if(res.success){
          Toast(res.msg)
        }
      })
    },

    goOrder() {
      let goodsList = [];
      // 生成订单
      http
        .$axios({
          url: "/api/addbuy",
          method: "post",
          headers: {
            token: true,
          },
          data:this.item
        })
        .then((res)=>{
          if (!res.success) return;
          goodsList.push(res.data)
          this.buyList(res.data)
        http
          .$axios({
            url: "/api/addOrder",
            method: "post",
            headers: {
              token: true,
            },
            data: {
              arr: goodsList,
            },
          })
          .then((res) => {
            if (!res.success) return;
            // 存储订单号
            this.initOrder(res.data);
            // 进入提交订单页面
            this.$router.push({
              path: "/order",
              query: {
                detail: JSON.stringify(this.buy_selectList),
                goodsList: JSON.stringify(goodsList),
              },
            });
          });
        })

    },
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
    height: 186px;
    img {
      width: 100%;
      height: 100%;
    }
    .van-swipe-item {
      height: 100%;
    }
  }
  .goods_detaile{
    margin: 15px 0;
  }
}
</style>
