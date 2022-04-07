<template>
  <div>
    <header>
      <Navbar>
        <div slot="title">实时资讯</div>
      </Navbar>
    </header>

    <section>
      <van-swipe-cell :before-close="beforeClose">
        <van-cell :border="false" title="热点资讯" value="内容1" />
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell :before-close="beforeClose">
        <van-cell :border="false" title="最新消息！" value="内容2" />
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { Dialog } from 'vant';
export default {
  components: {
    Navbar,
  },
  data(){
      return{

      }
  },
   methods: {
    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance }) {
        console.log(position,instance);
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
            instance.close();
          });
          break;
      }
    },
  },
};
</script>

<style></style>
