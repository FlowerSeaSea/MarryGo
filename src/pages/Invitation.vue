<template>
  <div>
    <header>
      <navbar>
        <div slot="title">电子请帖</div>
        <div slot="right">
          <van-icon name="ellipsis" @click="showShare = true" />
        </div>
      </navbar>
    </header>
    <section>
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
    </section>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { Toast } from "vant";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  methods: {
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
};
</script>

<style></style>
