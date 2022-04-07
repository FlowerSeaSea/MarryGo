<template>
  <div id="root">
    <header>
      <navbar>
        <div slot="title">婚礼用品</div>
      </navbar>
    </header>
    <section>
      <swiper :autoplay="3000" :imgUrl="this.imgUrl" />
      <div class="contant clearfix">
        <h2>第一栏</h2>
        <div class="left">
          <img src="/images/part1.jpg" alt="" />
        </div>
        <div class="rt_one">
          <img src="/images/part2.jpg" alt="" />
        </div>
        <div class="rt_two">
          <img src="/images/part3.jpg" alt="" />
        </div>
      </div>
      <div class="list">
        <h2>商品</h2>
        <van-tabs v-model="active" swipeable sticky>
          <van-tab
            v-for="(index, item) in 4"
            :title="'选项 ' + index"
            :key="index"
          >
            {{ item }}
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <van-cell v-for="item in list" :key="item" :title="item" />
              </van-list>
            </van-pull-refresh>
            <van-empty
              class="custom-image"
              image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
              description="描述文字"
            >
              <van-button round type="danger" class="bottom-button"
                >按钮</van-button
              >
            </van-empty>
          </van-tab>
        </van-tabs>
      </div>
    </section>
    <footer></footer>
    <Tabbar />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Swiper from "@/components/Swiper.vue";
import Tabbar from "@/components/Tabbar.vue";
import http from "@/common/api/request.js";

export default {
  components: {
    Tabbar,
    Navbar,
    Swiper,
  },
  data() {
    return {
      goodsList:[],
      imgUrl: [
        require("@/assets/image/4.png"),
        require("@/assets/image/1.jpg"),
        require("@/assets/image/3.jpg"),
        require("@/assets/image/6.jpg"),
        require("@/assets/image/5.jpg"),
      ],
      active: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created(){
    this.getData();
  },
  methods: {
    getData() {
      http
        .$axios({
          url: "/api/goods",
        })
        .then((res) => {
          this.goodsList = res;
        });
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 2000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.van-swipe-item {
  position: relative;
  height: 150px;
  width: 100vw;
  text-align: center;
  background-color: #39a9ed;
}
.van-swipe-item img {
  width: 100%;
  height: 100%;
}
.contant {
  padding: 15px 0;
  width: 100%;
}
section {
  .left {
    float: left;
    width: 50%;
    background: red;
    height: 200px;
    border-radius: 20px;
    overflow: hidden;
    img {
      width: 100%;
      height: 200px;
    }
  }
  .rt_one {
    border-radius: 20px;
    margin-bottom: 10px;
    float: right;
    width: 45%;
    background: blue;
    height: 100px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100px;
    }
  }
  .rt_two {
    border-radius: 20px;
    margin-bottom: 10px;
    float: right;
    width: 45%;
    background: pink;
    height: 100px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100px;
    }
  }
  ::v-deep .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
  ::v-deep .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>
