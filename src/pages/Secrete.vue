<template>
<div>
    <van-tabs swipeable sticky @click="onClick">
    <van-tab
      v-for="(item, index) in messagesTitle"
      :title="item.title"
      :key="index"
    >
      <ul>
        <li v-for="(i, index) in item.list1" :key="index">
          <p>{{ i.name }}</p>
          <p>{{ i.text }}</p>
        </li>
      </ul>
    </van-tab>
  </van-tabs>
  <Tabbar/>
</div>

</template>

<script>
import http from "@/common/api/request.js";
import Tabbar from '@/components/Tabbar.vue';
export default {
  components:{
    Tabbar
  },
  data() {
    return {
      messagesTitle: [],
      messagesList: [],
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    console.log("dom渲染");
  },
  methods: {
    async getData() {

      let res = await http.$axios({ url: "/api/message/title" });
      console.log(res);
      //freeze 冻结对象性能好一些(冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。)
      this.messagesTitle = Object.freeze(res);

      // 当dom更新完在加载
      this.$nextTick(() => {
        console.log("dom加载完毕");
      });
    },
    onClick(name, title) {
      console.log(name, title);
    },
  },
};
</script>

<style scoped></style>
