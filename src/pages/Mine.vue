<template>
  <div>
    <header>
      <navbar> 
        <div slot="title">个人中心</div>
      </navbar>
    </header>
    <section>
      <div class="head" v-if="loginStatus">
        <div class="head-left" v-html="avatarSVG"></div>
        <div class="head-right">
          <p>{{ userInfo.nickName }}</p>
          <p>time{{ loginStatus }}</p>
          <p>
            <span>发布</span>
            <span>关注</span>
          </p>
        </div>
      </div>
      <van-skeleton v-else title avatar avatar-size="70px" to="/login" />

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
      <div class="list" v-if="loginStatus">
        <ul>
          <li>
            <p  @click="loginOut">我的信息</p>
            <div class="van-hairline--bottom"></div>
          </li>
          <li>
            <p  @click="loginOut">关于我们</p>
            <div class="van-hairline--bottom"></div>
          </li>
          <li>
            <p  @click="loginOut">设置</p>
            <div class="van-hairline--bottom"></div>
          </li>
          <li>
            <p @click="loginOut">退出登录</p>
            <div class="van-hairline--bottom"></div>
          </li>
        </ul> 
      </div>
    </section>
    <footer></footer>
    <Tabbar />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { mapState, mapMutations } from "vuex";
import Tabbar from "@/components/Tabbar.vue";
import { getRandomAvatarConfig, generateNotionAvatar } from "@/common/tools";
export default {
  components: {
    Tabbar,
    Navbar,
  },
  data() {
    return {
      avatarSVG: "",
    };
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
  async mounted() {
    const config = getRandomAvatarConfig();
    //const ff = [1, 9, 3, 9, 9, 9, 9, 9, 9, 9]
    this.avatarSVG = await generateNotionAvatar(config);
    console.log(config);
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
    // background: yellow;
  }
}
.card {
  width: 100%;
  height: 50px;
  .card-left {
    width: 50%;
    height: 50px;
    // background: gold;
  }
}
.util {
  width: 100%;
  margin: 15px 0;
}
.list{
  padding: 10px;
  border-radius: 13px;
  background: white;
  li{
    margin: 5px 0;
  }
}
.progress {
  padding: 10px;
  margin: 15px 0;
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
