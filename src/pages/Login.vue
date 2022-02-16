<template>
<van-tabs v-model="active" animated title-active-color="red" line-width=50%>
  <van-tab name="login" >
    <template #title title-style="font-size:20px"> <van-icon name="contact" />登录</template>
    <van-form @submit="onSubmit" @failed="onFailed">
    <van-field
      v-model="username"
      clearable
      type="tel"
      name="手机号"
      label="手机号"
      placeholder="手机号"
      :rules="[{ required: true, message: '请填写手机号' }]"
    />
    <van-field
      ref="password"
      v-model="password"
      clearable
      :type="!passwordStatus? 'password':'number'"
      name="密码"
      label="密码"
      :right-icon="!passwordStatus ? 'closed-eye' : 'eye-o'"
      placeholder="请设置密码"
      @click-right-icon="passwordStatus = !passwordStatus"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">登录</van-button>
    </div>
    </van-form>
  </van-tab>
  <van-tab name="regist">
    <template #title> <van-icon name="edit" />注册</template>
    <van-form @submit="onSubmit" @failed="onFailed">
      <van-field
        v-model="username"
        clearable
        type="tel"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        ref="password"
        v-model="password"
        clearable
        :type="!passwordStatus? 'password':'number'"
        name="密码"
        label="密码"
        :right-icon="!passwordStatus ? 'closed-eye' : 'eye-o'"
        placeholder="请设置密码"
        @click-right-icon="passwordStatus = !passwordStatus"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        ref="rePassword"
        v-model="rePassWord"
        clearable
        :type="!rePasswordStatus?'password':'number'"
        name="确认密码"
        label="确认密码"
        :right-icon="!rePasswordStatus?'closed-eye':'eye-o'"
        placeholder="请再次确认密码"
        @click-right-icon="rePasswordStatus = !rePasswordStatus"
        :rules="[{ required: true, message: '请再次輸入确认密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </van-tab>
</van-tabs>

</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      activeName: 'login',
      username: '',
      password: '',
      rePassWord: '',
      passwordStatus: false,
      rePasswordStatus: false,
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading('验证中...');

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
  },
}
</script>
<style scoped>

</style>
<style></style>
