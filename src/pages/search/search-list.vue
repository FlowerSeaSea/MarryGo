<template>
  <div>
    <header>
      <SearchHeader />
      <van-sticky>
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            @change="change1"
          />
          <van-dropdown-item
            v-model="value2"
            :options="option2"
            @change="change2"
          />
        </van-dropdown-menu>
      </van-sticky>
    </header>
    <section>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-if="goodsList.length"
        >
          <ul class="goodList">
            <li v-for="(item, index) in goodsList" :key="index" class="goods">
              <img :src="item.imgUrl" />
              <p class="goodDetail">
                <span class="van-ellipsis"
                  >【{{ item.name }}】{{ item.content }}</span
                >
                <span>￥{{ item.price }}<s>￥1111</s></span>
                <span>销量{{ item.num }}</span>
                <van-button
                  round
                  color="red"
                  @click="goDetaile(item.id)"
                  style="width: 80%; height: 20px; font-color: 'white'"
                  ><strong style="color: white">立即购买</strong></van-button
                >
              </p>
            </li>
          </ul>
        </van-list>
        <h4 v-else>没有找到此类信息。。。</h4>
      </van-pull-refresh>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import SearchHeader from "@/components/SearchHeader.vue";
import http from "@/common/api/request.js";
export default {
  components: {
    SearchHeader,
  },
  data() {
    return {
      goodsList: [],
      value1: "全部商品",
      value2: "综合排序",
      option1: [
        { text: "全部商品", value: "全部商品" },
        { text: "新款商品", value: "新款商品" },
        { text: "活动商品", value: "活动商品" },
      ],
      option2: [
        { text: "综合排序", value: "综合排序" },
        { text: "价格排序", value: "价格排序" },
        { text: "销量排序", value: "销量排序" },
      ],
      loading: false,
      finished: false,
      refreshing: false, //下拉刷新
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    change1(val) {
      this.value1 = val;
      this.getData();
    },
    change2(val1) {
      this.value2 = val1;
      this.getData();
    },
    getData() {
      http
        .$axios({
          url: "/api/goods/shopList",
          params: {
            searchName: this.$route.query.key,
            shopStatus: this.value1,
            showStatus: this.value2,
          },
        })
        .then((res) => {
          this.goodsList = res;
        });
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        if (this.refreshing) {
          this.goodsList.unshift({
            id: 0,
            name: "黑茶",
            content: "asdajsna",
            price: 111,
            num: 2,
            imgUrl: "/images/goods1.png",
          });
          this.refreshing = false;
        }
      }, 500);

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.goodsList.length >= 20) {
        this.finished = true;
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    goDetaile(id) {
      console.log(this.$router);
      this.$router.push({
        path: "/detaile",
        name: "shopDetaile",
        query: {
          id,
        },
        params: {
          id,
        },
      });
    },
  },
  watch: {
    // 路由发声改变在次请求
    $route() {
      this.getData();
    },
  },
};
</script>

<style scoped lang="scss">
section {
  .van-pull-refresh {
    height: calc(100vh - 50);
  }
  .goodList {
    display: flex;
    flex-wrap: wrap;
  }
  .goods {
    width: 50%;
    background: white;
    img {
      width: 100%;
      height: 150px;
    }
    .goodDetail {
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      span {
        line-height: 25px;
        display: block;
        font-size: 14px;
        &:nth-child(2) {
          font-weight: 600;
          color: rgb(255, 5, 5);
        }
        &:last-child {
          font-size: 10px;
          color: rgb(168, 5, 5);
        }
      }
    }
  }
}
</style>
