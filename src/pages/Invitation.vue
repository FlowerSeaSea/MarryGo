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
      <h3>先上传两位的照片</h3>
      <van-field name="photo" label="新郎新娘" colon class="tx">
        <template #input>
          <van-image
            round
            width="10rem"
            height="10rem"
            :src="staffPhoto ? staffPhoto : '/images/logo.jpg'"
          />
        </template>
      </van-field>
      <van-uploader :before-read="beforeRead" :after-read="afterRead">
        <van-button icon="add-o">上传大头照</van-button>
      </van-uploader>
      <h3>婚礼请帖背景</h3>
      <div class="wrap">
        <div class="box">
          <div class="shadow">
            <van-image
              round
              width="8rem"
              height="8rem"
              :src="staffPhoto ? staffPhoto : '/images/logo.jpg'"
            />
          </div>
        </div>
      </div>
      <h4>点击立即生成后，点击右上角给分享给好友吧！</h4>
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
      staffPhoto: "",
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
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.staffPhoto = file.content;
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
html {
  font-size: calc(100vw / 7.5);
}
.box {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(/images/请帖.jpg) no-repeat;
  background-size: 100% 100%;

  .shadow {
    position: absolute;
    top: 53%;
    left: calc(50% - 4rem);
    height: 8rem;
    opacity: .8;
    width: 8rem;
    background-size: cover; //覆盖
  }
}
</style>
