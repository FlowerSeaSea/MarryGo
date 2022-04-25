<template>
  <div class="seach-index">
    <SearchHeader></SearchHeader>
    <section>
      <div class="search-history" v-if="this.searchArr.length">
        <h2>
          <van-icon name="clock-o" color="#1989fa" size="0.8rem" />
          <span>历史记录</span>
          <span @click="cleanHistory">清空历史记录</span>
        </h2>
        <ul>
          <li v-for="(item, index) in this.searchArr" :key="index" @click="gosearchList(item)">
            {{ item }}
          </li>
        </ul>
      </div>
      <div v-else>暂无数据</div>
    </section>
  </div>
</template>

<script>
import SearchHeader from "@/components/SearchHeader.vue";
import { Dialog } from "vant";
export default {
  components: {
    SearchHeader,
  },
  data() {
    return {
      searchArr: [],
    };
  },
  methods: {
    gosearchList(item){
      this.$router.push({
        name: "search-list",
        query: {
          key: item,
        },
      });
    },
    cleanHistory() {
      Dialog.confirm({
        title: "提示",
        message: "确定执行此操作？",
      })
        .then((res) => {
          if (res=='confirm') {
            localStorage.removeItem('searchList')
            this.searchArr=[]
          }
        })
        .catch((req) => {
          console.log(req);
        });
    },
  },
  created() {
    // 没有记录的情况下为空，赋值为空数组
    this.searchArr = JSON.parse(localStorage.getItem("searchList")) || [];
  },
  mounted() {

  },
};
</script>

<style scoped>
section {
  margin: 0;
  height: calc(100vh - 100px);
  padding: 0.5rem;
  background-color: #f5f5f5;
  overflow: hidden;
}
.search-history {
  margin: 1rem 0;
}
.search-history h2 {
  position: relative;
  font-size: 0.48rem;
}
.search-history h2 span:last-child {
  position: absolute;
  right: 0.125rem;
}
.search-history ul {
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  padding: 0.53rem 0;
  justify-content: left;
}
.search-history ul li {
  margin: 0.3rem;
  box-sizing: border-box;
  padding: 0.2rem;
  max-width: 30%;
  border-radius: 0.2rem;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 12px;
  background-color: rgba(250, 206, 125, 0.3);
  justify-content: space-around;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.seach-index {
  width: 100%;
}
</style>
