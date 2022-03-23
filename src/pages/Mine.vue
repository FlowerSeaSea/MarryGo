<template>
  <div>
    <header>
      <navbar>
      </navbar>
    </header>
    <section>
      <div class="head" v-if="loginStatus">
        <div class="head-left"></div>
        <div class="head-right">
          <p>{{ userInfo.nickName }}</p>
          <p>time{{ loginStatus }}</p>
          <p>
            <span>fabu</span>
            <span>guanzhu</span>
          </p>
        </div>
      </div>
      <van-skeleton v-else title avatar avatar-size="70px" to="/login"/>
      <div class="card">
        <div class="card-left"></div>
        <div class="card-left"></div>
      </div>
      <div class="util">
        <van-grid>
          <van-grid-item icon="star-o" text="收藏" />
          <van-grid-item icon="photo-o" text="地址管理" to="/path" />
          <van-grid-item icon="paid" text="卡卷钱包" />
          <van-grid-item icon="cart-o" text="购物车" to="/cart" />
        </van-grid>
      </div>
      <div class="progress">
        <div class="progress-title">
          <h3>我的备婚进度</h3>
          <van-icon name="arrow" @click="goProgress" />
        </div>
        <div class="progress-value">
          <van-progress
            :percentage="75"
            stroke-width="7"
            pivot-text="紫色"
            pivot-color="#7232dd"
            color="linear-gradient(to right, #be99ff, #7232dd)"
          />
        </div>
        <div class="progress-button">
          <van-tag mark type="primary" color="#ffe1e1" text-color="#ad0000"
            >未完成</van-tag
          >
          <span>选定婚期</span>
        </div>
      </div>
      <p v-if="loginStatus" @click="loginOut">退出登录{{ loginStatus }}</p>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { mapState, mapMutations } from "vuex";
import Tabbar from "@/components/Tabbar.vue";
export default {
  components: {
    Tabbar,
    Navbar,
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  activated() {},
  methods: {
    ...mapMutations(["loginOut"]),
    goProgress() {},
  },
};
</script>

<style scoped lang="scss">
.head {
  display: flex;
  align-items: center;
  .head-left {
    width: 100px;
    height: 50px;
    background: yellow;
  }
}
.card {
  width: 100%;
  height: 50px;
  .card-left {
    width: 50%;
    height: 50px;
    background: gold;
  }
}
.util {
  width: 100%;
}
.progress {
  padding: 10px;
  border-radius: 13px;
  background: blueviolet;
  .progress-title {
    display: flex;
    justify-content: space-between;
    line-height: 25px;
    align-items: center;
  }
  .progress-value {
    height: 20px;
    margin: 20px 0 5px 0;
  }
  .progress-button {
    height: 20px;
    margin-top: 7px;
    span {
      margin-left: 6px;
      font-size: 12px;
    }
  }
}
</style>
