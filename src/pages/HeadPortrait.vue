<template>
  <div>
    <header>
      <navbar>
        <div slot="title">配置頭像</div>
      </navbar>
    </header>
    <section>
      <div class="preHead">
        <div class="headSvg" v-html="avatarSVG"></div>
      </div>
      <div class="headPart">
        <div class="diy">
          <h3>个性DIY</h3>
          <van-grid square :column-num="5">
            <van-grid-item v-for="(value,index) in 10" :key="index">
              {{types[index]}}
              <van-button
                round
                color="linear-gradient(to right, #ff6034, #ee0a24)"
                type="info"
                size="mini"
                @click="changePart(index)"
                >随机</van-button
              >
            </van-grid-item>
          </van-grid>
        </div>
        <div class="all">
          <h3>懒人专属</h3>
          <van-button
            round
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            type="info"
            size="large"
            @click="allChange"
            >全部随机</van-button
          >
        </div>
        <van-button
          round
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          type="info"
          size="large"
          @click="quite"
          >就它了</van-button
        >
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { getRandomAvatarConfig, generateNotionAvatar, randomNum} from "@/common/tools";
import { Dialog, Toast } from "vant";
import http from "@/common/api/request.js";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      avatarSVG: "",
      config: [],
      types: [
        "face",
        "nose",
        "mouth",
        "eyes",
        "eyebrows",
        "glasses",
        "hair",
        "accessories",
        "details",
        "beard",
      ]
    };
  },
  created(){
    this.config=getRandomAvatarConfig();
  },
  methods: {
    async allChange() {
      const config = getRandomAvatarConfig();
      this.config = config;
      this.avatarSVG = await generateNotionAvatar(Array.from(this.config));
    },
    async changePart(index){
      this.config[index]= this.config[index]=randomNum(0, 10);
      this.avatarSVG = await generateNotionAvatar(Array.from(this.config));
      if(index==6){
       this.config[index] = this.config[index]=randomNum(0, 30)
       this.avatarSVG = await generateNotionAvatar(Array.from(this.config));
      }
    },
    quite() {
      let confog = Array.from(this.config);
      Dialog.confirm({
        title: "确定您的操作",
        message: "确定将此奇葩头像设置为您的头像吗？",
      }).then((res) => {
        if (res == "confirm") {
          http.$axios({
            method: "post",
            url: "/api/updataImgUrl",
            data: {
              config: confog,
            },
            headers: {
              token: true,
            },
          }).then(res=>{
            Toast(res.msg);
            this.$router.push({
              name:'Mine',
              params:{
                config:confog
              }
            })
          })
        }
      });
    },
  },
  async mounted() {
    const config = getRandomAvatarConfig();
    //const ff = [1, 9, 3, 9, 9, 9, 9, 9, 9, 9]
    this.avatarSVG = await generateNotionAvatar(config);
  },
};
</script>

<style lang="scss" scoped>
section {
  .preHead {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .headSvg {
      width: 200px;
      height: 200px;
    }
  }
  .headPart {
    .diy,
    .all {
      padding: 5px;
      h3 {
        display: block;
        margin: 5px 0;
        text-align: center;
      }
    }
    ::v-deep .van-button--mini {
      width: 100%;
    }
    ::v-deep .van-grid-item__content {
      background-color: pink;
    }
  }
}
</style>
