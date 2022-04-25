<template>
  <div>
    <header>
      <navbar>
        <div slot="title">个人中心</div>
      </navbar>
    </header>
    <section>
      <div class="head" v-if="loginStatus">
        <div class="head-left" @click="changHead" v-if="userInfo.imgUrl == ''">
          设置头像
        </div>
        <div
          class="head-left"
          @click="changHead"
          v-html="avatarSVG"
          v-else
        ></div>

        <div class="head-right">
          <h4 v-if="userInfo.nickName!='' " @click="setName">{{ userInfo.nickName }}</h4>
          <h4 @click="setName" v-else>设置昵称</h4>
          <van-dialog v-model="show" title="标题" show-cancel-button @confirm="confirm" @cancel="setName">
            <van-field
              v-model="value"
              label="昵称"
              placeholder="请输入昵称"
              @blur="blur(value)"
            />
          </van-dialog>
          <!-- {{ loginStatus }} -->
          <p class="head-right_font">婚礼倒计时666天</p>
          <h5>
            <span>0发布 </span>
            <span>|</span>
            <span> 0关注</span>
          </h5>
        </div>
      </div>
      <van-skeleton v-else title avatar avatar-size="70px" to="/login" />

      <!-- <div class="card">
        <div class="card-left"></div>
        <div class="card-left"></div>
      </div> -->
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
            <p @click="loginOut">我的信息</p>
            <div class="van-hairline--bottom"></div>
          </li>
          <li>
            <p @click="loginOut">关于我们</p>
            <div class="van-hairline--bottom"></div>
          </li>
          <li>
            <p @click="loginOut">设置</p>
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
import { generateNotionAvatar } from "@/common/tools";
import Tabbar from "@/components/Tabbar.vue";
import http from "@/common/api/request.js";
import { Toast } from "vant";
export default {
  components: {
    Tabbar,
    Navbar,
  },
  data() {
    return {
      avatarSVG: "",
      show: false,
      value: "",
    };
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  created() {
  },
  activated() {},
  methods: {
    ...mapMutations(["loginOut",'userLogin']),
    goProgress() {},
    changHead() {
      this.$router.push("head-portrait");
    },
    blur(val) {
      if (!this.value) {
        Toast({
          message: "不能为空",
          position: "top",
        });
        return;
      }
      this.value = val;
    },

    confirm(){
      this.show = !this.show;
      http.$axios({
          method: "post",
          url: "/api/updataNickName",
          data: {
            nickName: this.value,
          },
          headers: {
            token: true,
          }
        }).then((res) => {  
          Toast(res.msg);
          this.userLogin(res.data)
        });
    },
    setName() {
      this.show = !this.show;
    },
  },
  async mounted() {
    let config = this.userInfo.imgUrl.split(",").map((v) => {
      return v / 1;
    });
    this.avatarSVG = await generateNotionAvatar(config);
    if (this.$route.params.config != undefined) {
      config = this.$route.params.config;
      this.avatarSVG = await generateNotionAvatar(config);
    }
  }
};
</script>

<style scoped lang="scss">
.head {
  padding: 0 5px;
  display: flex;
  align-items: center;
  .head-left {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    font-size: 10px;
    text-align: center;
    line-height: 70px;
    background: pink;
  }
  .head-right {
    margin-left: 10px;
  }
  .head-right_font {
    font-size: 10px;
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
.list {
  padding: 10px;
  border-radius: 13px;
  background: white;
  li {
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
