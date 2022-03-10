<template>
  <div class="parent">
    <header>
      <navbar />
    </header>
    <section>
      <van-tabs
        v-model="active"
        animated
        title-active-color="red"
        line-width="50%"
      >
        <van-tab name="login">
          <template #title title-style="font-size:20px">
            <van-icon name="contact" />登录</template
          >
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
        </van-tab>
        <van-tab name="regist">
          <template #title> <van-icon name="edit" />注册</template>
          <van-form @submit="onSubmit" @failed="onFailed">
            <van-field
              clearable
              type="tel"
              name="userTel"
              label="手机号"
              placeholder="手机号"
              :rules="[{ required: true, message: '请填写手机号' }]"
            />
            <van-field
              ref="password"
              clearable
              :type="!passwordStatus ? 'password' : 'number'"
              name="userPwd"
              label="密码"
              :right-icon="!passwordStatus ? 'closed-eye' : 'eye-o'"
              placeholder="请设置密码"
              @click-right-icon="passwordStatus = !passwordStatus"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
              ref="rePassword"
              clearable
              :type="!rePasswordStatus ? 'password' : 'number'"
              name="userRpwd"
              label="userRpwd"
              :right-icon="!rePasswordStatus ? 'closed-eye' : 'eye-o'"
              placeholder="请再次确认密码"
              @click-right-icon="rePasswordStatus = !rePasswordStatus"
              :rules="[{ required: true, message: '请再次輸入确认密码' }]"
            />
            <div style="margin: 16px">
              <van-button round block type="info" native-type="submit"
                >注册</van-button
              >
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
      <CodeLogin/>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
import http from "@/common/api/request.js";
import navbar from "@/components/Navbar";
import CodeLogin from "@/pages/login/CodeLogin.vue";
export default {
  components: {
    navbar,
    CodeLogin
  },
  data() {
    return {
      sms:"",
      active: "login",
      userTel: "",
      userPwd: "",
      rePassWord: "",
      passwordStatus: false,
      rePasswordStatus: false,
      rules: {
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "请输入正确手机号",
        },
        userPwd: {
          rule: /^\w{6,15}$/,
          msg: "密码格式错误，要求6-12位",
        },
      },
    };
  },
  methods: {
    // 点击登录
    onSubmit(values) {
      console.log(values);
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
          this.$router.push("/home");
        });
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
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
  },
};
</script>
<style scoped></style>
<style scoped></style>
