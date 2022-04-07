<template>
  <div class="cart container">
    <header>
      <navbar>
        <div slot="title">
          <span>购物车</span>
        </div>
        <div slot="right">
          <span @click="isNavBar" v-text="isNavStatus ? '完成' : '编辑'"></span>
        </div>
      </navbar>
    </header>
    <section v-if="list.length">
      <div class="cart-title">
        <van-checkbox
          @click="checkedAllFn"
          :value="isCheckedAll"
        ></van-checkbox>
        <span>商品列表</span>
      </div>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="check">
            <van-checkbox
              @click="checkItem(index)"
              v-model="item.checked"
            ></van-checkbox>
          </div>
          <h2>
            <img :src="item.goods_imgUrl" alt="" />
          </h2>
          <div class="goods">
            <div class="goods-title">
              <span>{{ item.goods_name }}</span>
              <svg class="icon" aria-hidden="true" @click="delGoodsFn(item.id)">
                <use xlink:href="#icon-shanchu"></use>
              </svg>
            </div>
            <div class="goods-price">¥{{ item.goods_price }}</div>
            <van-stepper
              @change="changeNum($event, item)"
              v-model="item.goods_num"
              integer
            />
          </div>
        </li>
      </ul>
    </section>
    <section v-else>
      没有购物车数据
      <router-link to="/home">去首页逛逛吧</router-link>
    </section>
    <footer>
      <div v-if="isNavStatus">
        <van-submit-bar block button-text="删除" @submit="delGoodsFn"/>
      </div>
      <div v-else>
        <van-submit-bar
          v-if="list.length"
          :price="total.price * 100"
          button-text="提交订单"
          @submit="goOrder"
        >
          <van-checkbox
            @click="checkedAllFn"
            :value="isCheckedAll"
          ></van-checkbox>
          &nbsp;
          <div>
            共
            <span class="total-active">{{ total.num }}</span>
            件商品
          </div>
        </van-submit-bar>
      </div>
    </footer>
  </div>
</template>

<script>
import http from "@/common/api/request.js";
import Navbar from "@/components/Navbar.vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
export default {
  name: "Cart",
  components: {
    Navbar,
  },
  data() {
    return {
      checked: true,
      isNavStatus: false,
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.cart.list,
      selectList: (state) => state.cart.selectList,
    }),
    ...mapGetters(["isCheckedAll", "total"]),

    goodsList() {
      return this.selectList.map((id) => {
        return this.list.find((v) => v.id == id);
      });
    },
  },
  created() {
    //   查看购物车数据
    this.getData();
  },
  methods: {
    ...mapMutations(["cartList", "checkItem", "initOrder"]),
    ...mapActions(["checkedAllFn", "delGoodsFn"]),

    async getData() {
      let res = await http.$axios({
        url: "/api/selectCart",
        method: "post",
        headers: {
          token: true,
        },
      });
      res.data.forEach((element) => {
        element["checked"] = true;
      });
      this.cartList(res.data);
    },
    // 点击编辑
    isNavBar() {
      this.isNavStatus = !this.isNavStatus;
    },

    changeNum(value, item) {
      http.$axios({
        url: "/api/updateNum",
        method: "post",
        headers: {
          token: true,
        },
        data: {
          id: item.id,
          num: value,
        },
      });
    },

    goOrder() {
      if (!this.selectList.length) {
        Toast("请至少选中一件商品");
        return;
      }
      let newList = [];
      this.list.forEach((item) => {
        this.selectList.filter((v) => {
          if (v == item.id) {
            newList.push(item);
          }
        });
      });
      // 生成订单
      http
        .$axios({
          url: "/api/addOrder",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            arr: newList,
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
              detail: JSON.stringify(this.selectList),
              goodsList: JSON.stringify(this.goodsList),
            },
          });
        });
    },
  },
};
</script>
<style scoped lang="scss">
section {
  .cart-title {
    background-color: #f5f5f5;
    display: flex;
    padding: 0.533333rem;

    span {
      padding: 0.3rem;
      font-weight: 600;
      font-size: 1rem;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      margin-bottom: 00.23rem;
      background-color: #fff;
      .check {
        padding-right: 0.373333rem;
      }
      .goods {
        display: flex;
        flex-direction: column;
        font-size: 0.5rem;
        .goods-title {
          font-size: 13px;
          margin: 0.2rem;
          display: flex;
          justify-content: space-between;
        }
        .goods-price {
          font-weight: 600;
          margin: 0.2rem 0 0.2rem 0.2rem;
          color: #b0352f;
        }
        ::v-deep .van-stepper {
          text-align: right;
          margin: 0.2rem 0;
        }
      }
      img {
        width: 5rem;
        height: 5rem;
      }
    }
  }
}

</style>
