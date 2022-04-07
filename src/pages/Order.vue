<template>
  <div class="order container">
    <header>
      <Navbar>
        <div slot="title">
          <span>提交订单</span>
        </div>
      </Navbar>
    </header>
    <section>
      <div class="path">
        <h3>收货信息</h3>
        <div class="path-content" @click="goPath">
          <div>
            <span>{{ path.name }}</span>
            <span>{{ path.tel }}</span>
          </div>
          <div>
            <span>{{ path.province }}</span>
            <span>{{ path.city }}</span>
            <span>{{ path.county }}</span>
            <span>{{ path.addressDetail }}</span>
          </div>
        </div>
      </div>
      <div class="payment">
        <h3>支付方式：</h3>
        <van-radio-group v-model="radioPayment">
          <van-radio name="wx">微信支付</van-radio>
          <van-radio name="ali">支付宝支付</van-radio>
        </van-radio-group>
      </div>
      <div class="goods">
        <ul>
          <li v-for="(item, index) in goodsList" :key="index">
            <div>
              <img :src="item.goods_imgUrl" alt="" />
            </div>
            <div class="goods-content">
              <span>{{ item.goods_name }}</span>
              <div class="goods-total">
                <span>¥{{ item.goods_price }}</span>
                <span>x{{ item.goods_num }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <van-submit-bar
         :price="total.price*100"
      button-text="提交订单"
      @submit="goPayment"
    >
      <div>
        共
        <span class="total-active">{{ total.num }}</span>
        件
      </div>
    </van-submit-bar>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import http from "@/common/api/request.js";
import { mapState, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";
import bus from "@/common/bus.js";
import qs from "qs";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      radioPayment: "wx",
      path: {},
      item: [],
      total: {
        price: 0,
        num: 0,
      },
    };
  },
  computed: {
    ...mapState({
      order_id: (state) => state.order.order_id,
      selectList: (state) => state.cart.selectList,
      buy_order_id: (state) => state.buy.buy_order_id,
      buy_selectList: (state) => state.buy.buy_selectList,
    }),
    ...mapGetters(["defaultPath"]),
  },

  activated() {
    //activated只有启动keepalive才能出发
    bus.$on(
      "selectPath",
      function (data) {
        this.path = data;
      }.bind(this)
    );

    //选中的商品id号
    this.item = JSON.parse(this.$route.query.detail);
    this.goodsList = JSON.parse(this.$route.query.goodsList);
    this.selectOrder();
  },
  created() {
    this.goodsList = JSON.parse(this.$route.query.goodsList);
    this.selectAddress();
  },
  methods: {
    ...mapMutations(["initData", "initOrder"]),

    selectOrder() {
      //   查询订单
      http
        .$axios({
          url: "/api/selectOrder",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            orderId: this.order_id,
          },
        })
        .then((res) => {
          // 存储订单号
          this.initOrder(res.data);

          this.total = {
            price: res.data[0].goods_price,
            num: res.data[0].goods_num,
          };
        });
    },

    selectAddress() {
      // 查询到地址
      http
        .$axios({
          url: "/api/selectAddress",
          method: "post",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          this.initData(res.data);
          //有默认收货地址
          if (this.defaultPath.length) {
            this.path = this.defaultPath[0];
          } else {
            this.path = res.data[0];
          }
        });
    },

    // 选择收货地址
    goPath() {
      this.$router.push({
        path: "/path",
        query: {
          type: "select",
        },
      });
    },
    // 提交订单
    goPayment() {
      // 判断是否填写了收货地址
      if (!this.path) return Toast("请填写收货地址");
      //   发送请求==》1.修改订单状态，2.删除购物车数据
      http
        .$axios({
          url: "/api/submitOrder",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            orderId: this.order_id,
            shopArr: this.selectList.length ? this.buy_selectList :this.selectList
          },
        })
        .then((res) => {
          // 支付传递的参数
          let newArr = [];
          this.goodsList.forEach((element) => {
            newArr.push(element.goods_name);
          });
          let dataOrder = {
            orderId: this.order_id,
            name: newArr.join(""),
            price: this.total.price,
          };

          if (res.success) {
            http
              .$axios({
                url: "/api/payment",
                method: "post",
                headers: {
                  token: true,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                // qs是增加安全性的序列化插件
                data: qs.stringify(dataOrder),
              })
              .then((res) => {
                // 打开支付页面
                window.location.href = res.paymentUrl;
                console.log(res);
              });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  background-color: #f7f7f7;
  h3 {
    padding: 0.5rem;
    font-size: 1rem;
  }
  .path-content {
    padding: 0.5rem;
    font-size: 0.8rem;
    background-color: #ffffff;
    div{
      height: 1.3rem;
    }
    span {
      padding: 0.16rem;
    }
  }
  .payment {
    padding: .5rem;
    margin-top: 0.4rem;
    font-size: 1rem;
    background-color: #ffffff;
    .van-radio-group {
      display: flex;
      padding: .5rem 0;
      .van-radio {
        padding-right: .5rem;
      }
    }
  }
  .goods {
    padding: 10px;
    margin-top: 0.4rem;
    font-size: 0.426666rem;
    background-color: #ffffff;
    ul {
      width: 100%;
      li {
        display: flex;
        width: 100%;
        img {
          width: 60px;
          height:50pxpx;
        }
        .goods-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 10px;
          span{
            font-size: 16px;
            display: inline-block;
            line-height: 30px;
            align-items: center;
          }
          .goods-total {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            font-weight: 600;
          }
        }
      }
    }
  }
}

</style>
