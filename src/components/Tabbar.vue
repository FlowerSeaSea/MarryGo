<template>
  <van-tabbar
    route
    active-color="#ee0a24"
    inactive-color="#000"
    v-model="active"
  >
    <van-tabbar-item replace to="/home" icon="home-o" name="home"
      >首页</van-tabbar-item
    >
    <van-tabbar-item replace to="/business" icon="shop-o" name="business"
      >本地商家</van-tabbar-item
    >
    <van-tabbar-item replace to="/secrete" name="secrete">
      <span v-show="!(this.active === 'secrete')">结婚秘籍</span>
      <template #icon="props">
        <van-icon v-show="!props.active" name="envelop-o" />
        <van-popup
          v-model="show"
          closeable
          round
          position="bottom"
          close-icon="close"
          :style="{ height: '60%' }"
        >
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell title="新晋小生" clickable @click="radio = '新晋小生'">
                <template #right-icon>
                  <van-radio name="新晋小生" />
                </template>
              </van-cell>
              <van-cell title="扫地僧" clickable @click="radio = '扫地僧'">
                <template #right-icon>
                  <van-radio name="扫地僧" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>

          <van-field
            v-model="message"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
            @blur="blur(message)"
          />
          <van-button round type="primary" size="large" @click="sendClick"
            >发送</van-button
          >
        </van-popup>
        <van-button
          v-show="props.active"
          icon="plus"
          type="primary"
          round
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          size="small"
          @click="sendShow"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/shop" icon="cart-o" name="shop"
      >婚礼用品</van-tabbar-item
    >
    <van-tabbar-item replace to="/mine" icon="user-o" name="mine"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
import http from "@/common/api/request.js";
import { Toast } from "vant";

export default {
  name: "Tabbar",
  components: {},
  data() {
    return {
      radio: "新晋小生",
      message: "",
      active: "home",
      show: false,
    };
  },
  methods: {
    sendShow() {
      this.show = !this.show;
    },
    getContainer() {
      return document.querySelector(".add");
    },
    blur(v) {
      this.message = v;
    },
    sendClick() {
      if (this.message == "") {
        Toast("留言不能为空哦~臭宝");
        return;
      }
      let title = this.radio,
        content = this.message;
      let time = new Date(),
        M = time.getMonth() + 1,
        Y = time.getFullYear(),
        D = time.getDate(),
        H = time.getHours(),
        nowTime = Y + `年` + M + `月` + D + `日` + H + `时`;

      http
        .$axios({
          url: "/api/addMessage",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            title,
            content,
            nowTime,
          },
        })
        .then((res) => {
          console.log(res);
          this.radio = "";
          this.message = "";
          this.sendShow()
        });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .van-popup {
  padding-top: 38px;
}
</style>
