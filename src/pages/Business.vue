<template>
  <div>
    <header>
      <Navbar>
        <div slot="title">本地商家</div>
      </Navbar>
    </header>
    <section>
      <!-- 上边框 -->
      <div class="van-hairline--top"></div>
      <van-tabs
        v-model="activeName"
        color="red"
        background="pink"
        line-height="5px"
      >
        <van-tab title="婚宴酒店" name="a">
          <ul class="business-list">
            <li class="business" v-for="(item, index) in list" :key="index">
              <div class="business-content">
                <img src="/images/01.jpg" alt="" />
                <div class="business-content_text">
                  <p class="van-multi-ellipsis--l2">
                    【{{ item.merchant_remark }}】{{ item.merchant_content }}
                  </p>
                  <p>
                    <span>￥{{ item.merchant_price }}</span
                    ><span>{{ item.merchant_num }}好評</span>
                  </p>
                  <!-- 上边框 -->
                  <div class="van-hairline--top"></div>
                  <p>
                    <img :src="item.merchant_img" alt="" />
                    <small class="van-ellipsis">{{ item.merchant_name }}</small>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="婚纱礼服" name="b">
          <h3>暂无内容</h3>
        </van-tab>
        <van-tab title="钻戒三金" name="c">
          <h3>
            暂无内容
          </h3>
        </van-tab>
        <van-tab title="婚礼摄影" name="d">
          <h3>
            暂无内容
          </h3>
        </van-tab>
        <van-tab title="婚礼主持" name="e">
          <h3>
            暂无内容
          </h3>
        </van-tab>
        <van-tab title="婚礼跟妆" name="e">
          <h3>
            暂无内容
          </h3>
        </van-tab>
      </van-tabs>
    </section>
    <footer></footer>
    <Tabbar />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Tabbar from "@/components/Tabbar.vue";
import http from "@/common/api/request.js";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Tabbar,
    Navbar,
  },
  data() {
    return {
      activeName: "a",
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState({
      list: (state) => state.merChant.list,
    }),
  },
  methods: {
    ...mapMutations(["initMerChant"]),

    getData() {
      http
        .$axios({
          url: "/api/selectMerchant",
        })
        .then((res) => {
          this.initMerChant(res);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.business-list {
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 300px 300px;
  .business-content {
    box-sizing: border-box;
    border: 5px solid pink;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 13px;
    overflow: hidden;
    img {
      width: 100%;
      height: 66%;
    }
    .business-content_text {
      width: 100%;
      display: flex;
      flex-flow: column wrap;
      :first-child {
        width: 100%;
        font-size: 15px;
      }
      :nth-child(2) {
        padding: 2px;
        width: 100%;
        box-sizing: border-box;
        //  "font-style font-variant font-weight font-size/line-height font-family"
        font-size: 12px;
        font-weight: 600;
        color: red;
        display: flex;
        justify-content: end;
        align-content: center;
      }
      :nth-child(4) {
        width: 100%;
        padding: 2px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
        }
        small {
          display: block;
          color: #000000;
          font-weight: 300;
        }
      }
    }
  }
}
</style>
