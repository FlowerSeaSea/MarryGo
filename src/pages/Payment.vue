<template>
  <div>
    <Navbar>
      <div slot="title">支付状态</div>
    </Navbar>
    <div v-if="payStatus">恭喜您支付成功~</div>
    <div v-else>支付失败</div>
  </div>
</template>

<script>
import http from "@/common/api/request.js";
import Navbar from "@/components/Navbar.vue";
import qs from "qs";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      payStatus: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let datas = {
        out_trade_no: this.$route.query.out_trade_no,
        trade_no: this.$route.query.trade_no,
      };
      http
        .$axios({
          url: "/api/successPayment",
          method: "post",
          headers: {
            token: true,
          },
          data: qs.stringify(datas),
        })
        .then((res) => {
          if (res.code == 2) {
            this.payStatus = true;
          }
        });
    },
  },
};
</script>

<style></style>
