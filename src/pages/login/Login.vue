<template>
  <div class="parent">
    <header>
      <navbar />
    </header>
    <section>
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-field
          v-model="userTel"
          clearable
          type="tel"
          name="userTel"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '手机号不能为空' }]"
        />
        <van-field
          ref="password"
          v-model="userPwd"
          clearable
          :type="!passwordStatus ? 'password' : 'number'"
          name="userPwd"
          label="密码"
          :right-icon="!passwordStatus ? 'closed-eye' : 'eye-o'"
          placeholder="请设置密码"
          @click-right-icon="passwordStatus = !passwordStatus"
          :rules="[{ required: true, message: '密码不能为空' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
      <div class="footer">
        <span @click="GoRecovery">忘记密码？</span>
        <span @click="GoCodelogin">快捷登录</span>
        <span @click="GoRegister">快去注册！</span>
      </div>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
import http from "@/common/api/request.js";
import navbar from "@/components/Navbar";
import {mapState,mapMutations} from 'vuex';

export default {
  components: {
    navbar,
  },
  data() {
    return {
      userTel: "",
      userPwd: "",
      passwordStatus: false,
      rePasswordStatus: false,
      rules: {
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "请输入正确手机号",
        },
        userPwd: {
          rule: /^\w{6,15}$/,
          msg: "密码格式错误，要求6-15位",
        },
      },
    };
  },
  computed:{
    ...mapState({
      // userInfo:(state)=>state.user.userInfo
    })
  },
  methods: {
    ...mapMutations(['userLogin']),
    // 点击登录
    onSubmit() {
      // 前端验证
      if (!this.validator("userTel")) return;
      if (!this.validator("userPwd")) return;
      // 发送请求，后端验证
      http
        .$axios({
          url: "/api/login",
          method: "POST",
          data: {
            userTel: this.userTel,
            userPwd: this.userPwd,
          },
        })
        .then((res) => {
          Toast(res.msg);
          // 登录失败
          if (!res.success) return;
          // 登录成功-跳转页面-存储用户信息
          this.userLogin(res.data)
          this.$router.push("/mine");
        })
        .catch(err=>{
          Toast('出错啦:'+err)
        })

    },
    validator(val) {
      let bool = true;
      if (!this.rules[val].rule.test(this[val])) {
        Toast.fail(this.rules[val].msg);
        bool = false;
        return false;
      }
      return bool;
    },

    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },

    GoRecovery() {
      this.$router.push("/recovery");
    },
    GoRegister() {
      this.$router.push("/register");
    },
    GoCodelogin() {
      this.$router.push("/codelogin");
    },
  },
};
</script>
<style scoped lang="scss">
.footer{
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  align-content: center;
}
</style>
