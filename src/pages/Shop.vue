<template>
  <div>
    <header>
      <navbar></navbar>
    </header>
    <section>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in imgUrl" :key="index">
          <img :src="item" :alt="index" />
        </van-swipe-item>
      </van-swipe>
      <div class="contant clearfix">
        <h2>第一栏</h2>
        <div class="left"></div>
        <div class="rt_one"></div>
        <div class="rt_two"></div>
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
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      imgUrl: [
        require("../assets/image/swiper01.png"),
        require("../assets/image/swiper02.png"),
        require("../assets/image/swiper03.png"),
        require("../assets/image/swiper04.png"),
      ],
      active: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
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

<style>
* {
  margin: 0;
  padding: 0;
}
header,
section,
footer {
  width: 100%;
  margin: 0 auto;
  background-color: green;
}
section {
  margin: 10px auto;
  padding: 15px 10px;
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;
}
footer {
  height: 100px;
}
.van-swipe-item {
  position: relative;
  height: 150px;
  width: 100%;
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
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.left {
  float: left;
  width: 50%;
  background: red;
  height: 200px;
  border-radius: 20px;
}
.rt_one {
  border-radius: 20px;
  margin-bottom: 10px;
  float: right;
  width: 45%;
  background: blue;
  height: 100px;
}
.rt_two {
  border-radius: 20px;
  margin-bottom: 10px;
  float: right;
  width: 45%;
  background: pink;
  height: 100px;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
