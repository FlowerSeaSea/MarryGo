<template>
  <div>
    <header>
      <navbar/>
    </header>
    <section>
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-field
          v-model="userPwd"
          clearable
          :type="!passwordStatus ? 'password' : 'number'"
          name="userPwd"
          label="新密码"
          :right-icon="!passwordStatus ? 'closed-eye' : 'eye-o'"
          placeholder="请设置新密码"
          @click-right-icon="passwordStatus = !passwordStatus"
          :rules="[{ required: true, message: '密码不能为空' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            >确认</van-button
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
  components:{navbar},
  data() {
    return {
      userPwd: "",
      passwordStatus: false,
      rules: {
        userPwd: {
          rule: /^\w{6,15}$/,
          msg: "密码格式错误，要求6-15位",
        },
      },
    };
  },
  methods: {
    onSubmit() {
      if (!this.validator("userPwd")) return;
      http
        .$axios({
          url: "/api/recovery",
          method: "POST",
          data: {
            phone: this.$route.params.phone,
            pwd: this.userPwd,
          },
        })
        .then((res) => {
          if (!res.success) return;
          Toast(res.msg);
          this.$router.push({
            path: "/login",
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
