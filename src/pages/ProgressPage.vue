<template>
  <div>
    <header>
      <navbar>
        <div slot="title">备婚进度</div>
      </navbar>
    </header>
    <section>
      <div class="progress">
        <div class="progress-title">
          <h3>当前进度</h3>
        </div>
        <div class="progress-value">
          <van-progress
            :percentage="(100 - (userInfo.progress.split(',').length) * (100 / 21))"
            stroke-width="7"
            :pivot-text="
              Math.floor(100 - (userInfo.progress.split(',').length) * (100 / 21)) + '%'
            "
            pivot-color="rgb(11 20 231)"
            color="linear-gradient(to right, rgb(255 153 175), rgb(221 50 50))"
          />
        </div>
        <div
          class="progress-button"
          v-if="userInfo.progress.split(',').length != 0"
        >
          <van-tag mark type="primary" color="#ffe1e1" text-color="#ad0000"
            >未完成</van-tag
          >
          <span>{{ userInfo.progress.split(",")[0] }}</span>
        </div>
        <div class="progress-button" v-else>
          <van-tag mark type="primary" color="#ffe1e1" text-color="#ad0000"
            >恭喜全部完成啦！</van-tag
          >
        </div>
      </div>
      <van-tabs v-model="active" scrollspy sticky>
        <van-tab v-for="(item, index) in mytabList" :key="index">
          <template #title>
            <!-- <van-icon name="more-o" /> -->
            <!-- <h5>1</h5> -->
            {{ item.title }}
          </template>
          <van-cell-group>
            <p>
              {{ item.content }}
              <span>共{{ item.data.length }}项</span>
            </p>
            <van-cell
              v-for="(list, index1) in item.data"
              :title="list.name"
              clickable
              @click="isRadio(list,index,index1)"
              :key="index1"
            >
              <template #right-icon>
                <van-radio-group v-model="list.radio">
                  <van-radio
                    :name="list.text"
                    icon-size="24px"
                    :disabled="list.isFinish"
                  />
                </van-radio-group>
              </template>
              <div>
                <h4>{{ list.text }}</h4>
              </div>
            </van-cell>
          </van-cell-group>
        </van-tab>
      </van-tabs>
      <van-button
        round
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        type="info"
        size="large"
        @click="Confirm"
        >就它了</van-button
      >
    </section>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import http from "@/common/api/request.js";
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      active: 2,
      progressData: [],
      clickable: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      mytabList: (state) => state.user.tabList,
    }),
  },
  methods: {
    ...mapMutations(["userLogin","changeTabList"]),

    isRadio(list,index,index1) {
      this.mytabList[index].data[index1].isFinish=true
      if(this.progressData.indexOf(list.text)!= -1){
        this.progressData.splice(this.progressData.indexOf(list.text),1)
      }
      this.changeTabList(this.mytabList)
    },

    getData() {
      if(localStorage.getItem("userInfo")==null){
        this.$router.push('Login')
      }else{
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo.progress == "") {
          this.mytabList.forEach((v) => {
            v.data.forEach((e) => {
              this.progressData.push(e.text);
            });
          });
          http
          .$axios({
            method: "post",
            url: "/api/updataProgress",
            data: {
              progress: this.progressData,
            },
            headers: {
              token: true,
            },
          })
          .then((res) => {
            this.userLogin(res.data);
          });
        }else{
          this.progressData = userInfo.progress.split(",");
        }
      }
    },
    
    Confirm() {
      http
        .$axios({
          method: "post",
          url: "/api/updataProgress",
          data: {
            progress: this.progressData,
          },
          headers: {
            token: true,
          },
        })
        .then((res) => {
          Toast(res.msg);
          this.userLogin(res.data);
          this.$router.push('Mine')
        });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  .progress {
    padding: 10px;
    margin: 15px 0;
    border-radius: 13px;
    background: pink;
    .progress-title {
      display: flex;
      justify-content: space-between;
      line-height: 25px;
      align-items: center;
    }
    .progress-value {
      height: 20px;
      margin: 20px 0 5px 0;
    }
    .progress-button {
      height: 20px;
      margin-top: 7px;
      span {
        margin-left: 6px;
        font-size: 12px;
      }
    }
  }
  ::v-deep .van-sticky {
    border-radius: 15px;
    overflow: hidden;
  }
  ::v-deep .van-tabs__nav {
    .van-tab::after {
      content: "";
      width: 10px;
      height: 10px;
      clear: both;
      display: block;
      border-right: 2px solid rgb(255, 0, 0);
      border-top: 2px solid rgb(255, 0, 0);
      transform: rotate(45deg);
    }
    :nth-child(4)::after {
      border: none;
    }
  }

  ::v-deep .van-cell-group {
    margin: 10px 0;
    border-radius: 13px;
    overflow: hidden;
    p {
      font-size: 13px;
      color: rgb(172, 172, 165);
      padding: 13px;
      border-bottom: 0.5px solid rgb(186, 184, 184);
      span {
        font-size: 10px;
        float: right;
      }
    }
  }
  ::v-deep .van-cell {
    flex-direction: column;
    .van-cell__value {
      text-align: center;
      div {
        h4 {
          line-height: 30px;
          font-size: 15px;
          color: rgb(0, 0, 0);
        }
      }
    }
  }
}
</style>
