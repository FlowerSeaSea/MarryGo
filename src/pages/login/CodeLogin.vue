<template>
<div>
  <header>
    <navbar/>
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
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          >登录</van-button
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
import {mapMutations,mapState} from 'vuex'
export default {
  name: "CodeLogin",
  components:{
    navbar
  },
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
  computed:{
    ...mapState({
      // loginStatus:(state)=>state.user.loginStatus,
      // userInfo:(state)=>state.user.userInfo
    })
  },
  methods: {
    ...mapMutations(['userLogin']),
    
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

    onSubmit() {
      if(this.code==this.sms){
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
        Toast(res.msg)
          this.userLogin(res.data)
          this.$router.push("/mine");
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

    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
  },
};
</script>

<style></style>
