<template>
  <van-form>
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
      <van-button
        round
        block
        type="info"
        native-type="button"
        @click="childClick"
        >登录</van-button
      >
    </div>
  <span @click="GoRecovery">忘记密码？</span>
  <span>没有账号，去注册？</span>
  </van-form>
</template>

<script>
import { Toast } from "vant";
import http from "@/common/api/request.js";

export default {
  name: "CodeLogin",
  data() {
    return {
      disabled: false,
      childValue: {
        userTel: "",
        sms: "",
      },
      rules: {
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "请输入正确手机号",
        },
      },
      codenum: 6,
      codemsg: "获取验证码",
      code:''
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
            if(res.success){
                this.code=res.data;
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
        this.disabled=false
      }, 6000);
    },

    childClick() {
      if(this.code!=this.sms){
        http
        .$axios({
          url: "/api/addUser",
          method: "POST",
          data: {
            phone: this.childValue.userTel,
          },
        })
        .then((res) => {
        if (!res.success) return;
          console.log(res);
        });
      }else{
          Toast('验证码错误')
      }

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
    GoRecovery(){
        this.$router.push('/recovery')
    }
  },
};
</script>

<style></style>
