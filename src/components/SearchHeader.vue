<template>
  <div class="header">
    <div class="search-left">
      <van-icon name="arrow-left" @click="goBack" />
    </div>

    <van-search
      class="search-center"
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      input-align="center"
      background="rgba(255,255,255,0)"
      @search="search"
    >
    </van-search>
    <div class="search-right" @click="search">搜索</div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      searchArr: [],
      searchValue: this.$route.query.key || "",
    };
  },
  methods: {
    search() {
      if (!this.searchValue) {
        Toast({
          message: "请输入要搜索的内容",
          position: "top",
        });
        return;
      }

      // 本地存储返回的是string类型数据
      if (!localStorage.getItem("searchList")) {
        localStorage.setItem("searchList", "[]");
      } else {
        this.searchArr = JSON.parse(localStorage.getItem("searchList"));
      }

      // 增加数据
      this.searchArr.unshift(this.searchValue);
      // es6去重
      let newArr = new Set(this.searchArr);
      // 将newArr对象转化为数组再本地存储
      localStorage.setItem("searchList", JSON.stringify(Array.from(newArr)));

      // 如果当前搜索词（this.$route.query.key）与上次搜索值相同则不跳转
      if (this.searchValue === this.$route.query.key) return;
      this.$router.push({
        name: "search-list",
        query: {
          key: this.searchValue,
        },
      });
    },

    goBack() {
      this.$router.push("/home");
    },
  },
  created() {},
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  background: #ff5470;
}
.search-left {
  width: 8%;
  text-align: right;
}
.search-center {
  width: 80%;
}
.search-right {
  width: 12%;
  text-align: center;
  font-size: 15px;
}
.van-icon {
  padding-right: 0.5rem;
}
</style>
