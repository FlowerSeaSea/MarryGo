<template>
  <div>
    <header>
      <navbar>
        <div slot="title">注册</div>
      </navbar>
    </header>
    <section>
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-field
          v-model="childValue.userTel"
          clearable
          type="tel"
          name="userTel"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '手机号不能为空' }]"
        />
        <van-field
          v-model="childValue.sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '验证码不能为空' }]"
        >
          <template #button>
            <van-button
              size="small"
              color="#7232dd"
              :disabled="disabled"
              native-type="button"
              @click="sendCode"
              >{{ codemsg }}
            </van-button>
          </template>
        </van-field>

        <van-field
          v-model="childValue.userPwd"
          clearable
          :type="!passwordStatus ? 'password' : 'number'"
          name="userPwd"
          label="密码"
          :right-icon="!passwordStatus ? 'closed-eye' : 'eye-o'"
          placeholder="请设置密码"
          @click-right-icon="passwordStatus = !passwordStatus"
          :rules="[{ required: true, message: '密码不能为空' }]"
        />

        <van-field
          v-model="childValue.nickName"
          clearable
          type="text"
          name="nickName"
          label="昵称"
          placeholder="请设置昵称"
          :rules="[{ required: true, message: '昵称不能为空' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
import http from "@/common/api/request.js";
import navbar from "@/components/Navbar";

export default {
  name: "Register",
  components: { navbar },
  data() {
    return {
      disabled: false,
      passwordStatus: false,
      childValue: {
        userTel: "",
        sms: "",
        userPwd: "",
        nickName:""
      },
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
      codenum: 6,
      codemsg: "获取验证码",
      code: "",
    };
  },
  methods: {
    sendCode() {
      if (!this.validator("userTel")) return;

      // 请求短信接口
      http
        .$axios({
          url: "/api/code",
          method: "POST",
          data: {
            phone: this.childValue.userTel,
          },
        })
        .then((res) => {
          if (res.success) {
            this.code = res.data;
          }
        });
      //   禁用按钮
      this.disabled = true;
      //   倒计时
      let timer = setInterval(() => {
        console.log(this.codenum);
        --this.codenum;
        this.codemsg = `重新发送${this.codenum}s`;
      }, 1000);
      // 恢复按钮
      setTimeout(() => {
        clearInterval(timer);
        this.codenum = 6;
        this.codemsg = "获取验证码";
        this.disabled = false;
      }, 6000);
    },

    onSubmit() {
      // 验证码和密码都正确
      if (!this.validator("userPwd")) return;

      if (this.code != this.sms) {
        Toast("验证码错误");
        return;
      }
      http
        .$axios({
          url: "/api/register",
          method: "POST",
          data: {
            phone: this.childValue.userTel,
            pwd: this.childValue.userPwd,
            nickName: this.childValue.nickName,
          },
        })
        .then((res) => {
          if (!res.success) return;
          Toast(res.msg);
          this.$router.push({
            name: "Home",
          });
        });
    },

    validator(val) {
      let bool = true;
      if (!this.rules[val].rule.test(this.childValue[val])) {
        Toast.fail(this.rules[val].msg);
        bool = false;
        return false;
      }
      return bool;
    },

    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
  },
};
</script>

<style></style>
