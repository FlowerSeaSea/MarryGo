<template>
  <div>
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
          v-model="sms"
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
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >下一步</van-button
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
  name: "CodeLogin",
  components: { navbar },
  data() {
    return {
      disabled: false,
      userTel: "",
      code: "",
      sms: "",
      rules: {
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "请输入正确手机号",
        },
      },
      codenum: 6,
      codemsg: "获取验证码",
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
            phone: this.userTel,
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
      if (this.code != this.sms) {
        Toast("验证码错误");
        return;
      }
      //告诉后端手机号存在吗
      http
        .$axios({
          url: "/api/selectUser",
          method: "POST",
          data: {
            phone: this.userTel,
          },
        })
        .then((res) => {
          if (!res.success) {
            Toast(res.msg);
            return;
          }
          this.$router.push({
            name: "btn",
            params: {
              phone: this.userTel,
            },
          });
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

    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
  },
};
</script>

<style></style>
