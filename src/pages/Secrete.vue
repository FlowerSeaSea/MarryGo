<template>
  <div>
    <header>
      <Navbar>
        <div slot="title">结婚秘籍</div>
      </Navbar>
    </header>
    <section>
      <van-tabs swipeable sticky background="pink" @click="onClick">
        <van-tab title="新晋小生">
          <ul class="messageList">
            <li v-for="(i, index) in list" :key="index">

              <!-- 在此处渲染头像 -->
              <div class="headSvg" v-html="i.svg"></div>

              <div class="messageList_c">
                <h4>{{ i.name }}</h4>
                <div class="van-multi-ellipsis--l2">
                  {{ i.content }}
                </div>
                <div class="messageList_b">
                  <h5>{{ i.time }}</h5>
                  {{ i.start }}点赞
                  <van-icon
                    name="star-o"
                    size="15px"
                    v-if="i.startShow"
                    @click="addStar(i.uId, i.id, index)"
                  />
                  <van-icon
                    name="star"
                    size="15px"
                    color="red"
                    v-else
                    @click="minStar(i.uId, i.id, index)"
                  />
                </div>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="扫地僧">
          <ul class="messageList">
            <li v-for="(i, index) in list1" :key="index">
              <img :src="i.img_url" />

              <div class="messageList_c">
                <h4>{{ i.name }}</h4>
                <div class="van-multi-ellipsis--l2">
                  {{ i.content }}
                </div>
                <div class="messageList_b">
                  <h5>{{ i.time }}</h5>
                  {{ i.start }}点赞
                  <van-icon
                    name="star-o"
                    size="15px"
                    v-if="i.startShow"
                    @click="addStar1(i.uId, i.id, index)"
                  />
                  <van-icon
                    name="star"
                    size="15px"
                    color="red"
                    v-else
                    @click="minStar1(i.uId, i.id, index)"
                  />
                </div>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </section>
    <footer></footer>
    <Tabbar />
  </div>
</template>

<script>
import http from "@/common/api/request.js";
import Tabbar from "@/components/Tabbar.vue";
import Navbar from "@/components/Navbar.vue";
import { generateNotionAvatar } from "@/common/tools";
import { Toast } from "vant";
export default {
  components: {
    Tabbar,
    Navbar,
  },
  data() {
    return {
      list: [],
      list1: [],
      messagesTitle: [{ title: "新晋小生" }, { title: "扫地僧" }],
    };
  },

  created() {
   this.getData();
  },

  methods: {
    // 异步渲染成svg，此方法行不通
    async change(config) {
      const avatarSVG = await generateNotionAvatar(config);
      return avatarSVG;
    },

    // 获取用户信息方法，在this.list中存放，其中每个对象中的config属性即为用户的头像数组
    getData() {
      http
        .$axios({
          url: "/api/selectMessage/title",
          method: "post",
          data: {
            title: "新晋小生",
          },
        })
        .then((res) => {
          this.list = res;
          this.list.forEach((v) => {
            v.startShow = true;
            v.config = v.img_url.split(",").map((v) => {
              return v / 1;
            });
            v.svg=this.change(v.config)
          });
          console.log(this.list); //用户数据
        });

// this.list1同上
      http
        .$axios({
          url: "/api/selectMessage/title",
          method: "post",
          data: {
            title: "扫地僧",
          },
        })
        .then((res) => {
          this.list1 = res;
          this.list1.forEach((v) => {
            v.startShow = true;
          });
        });

    },

    onClick(name, title) {
      console.log(name, title);
    },

    addStar(uid, id, i) {
      this.list[i].startShow = false;
      this.$forceUpdate();
      http
        .$axios({
          url: "/api/addStar",
          method: "post",
          data: {
            uId: uid,
            id: id,
          },
        })
        .then((res) => {
          Toast(res.msg);
        });
    },
    minStar(uid, id, i) {
      console.log(i, this.list[i].startShow);
      this.$set(this.list[i], "startShow", true);
      this.$forceUpdate();
      // this.list[i].startShow = true;
      http
        .$axios({
          url: "/api/minStar",
          method: "post",
          data: {
            uId: uid,
            id: id,
          },
        })
        .then((res) => {
          console.log(res);
          Toast(res.msg);
        });
    },
    addStar1(uid, id, i) {
      this.list1[i].startShow = false;
      this.$forceUpdate();
      http
        .$axios({
          url: "/api/addStar",
          method: "post",
          data: {
            uId: uid,
            id: id,
          },
        })
        .then((res) => {
          Toast(res.msg);
        });
    },
    minStar1(uid, id, i) {
      this.list1[i].startShow = true;
      this.$forceUpdate();
      http
        .$axios({
          url: "/api/minStar",
          method: "post",
          data: {
            uId: uid,
            id: id,
          },
        })
        .then((res) => {
          Toast(res.msg);
        });
    },
  },
};
</script>

<style scoped lang="scss">
section {
  .messageList {
    li {
      padding: 5px;
      box-sizing: border-box;
      display: flex;
      border-bottom: 1px solid rgb(193, 191, 191);
      flex-direction: row;
      align-items: center;
      height: 6rem;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
      }
      .messageList_c {
        margin-left: 20px;
        height: 100%;
        h4 {
          margin: 3px 0;
        }
        div {
          width: 16rem;
        }
        .messageList_b {
          font-size: 12px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
