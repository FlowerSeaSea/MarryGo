<template>
  <div id="root">
    <header class="nav">
      <div class="nav-port">
        <div class="nav_left">
          <van-dropdown-menu>
            <van-dropdown-item :title="option[0].name" ref="dropdown">
              <van-area
                title="选择地址"
                :area-list="areaList"
                @confirm="confirm"
                @cancel="cancel"
                @change="change"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                :visible-item-count="4"
              />
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <div class="nav_title">
          <van-search
            background="rgba(255,255,255,0)"
            placeholder="请输入搜索关键词"
            @focus="searchFocus"
          />
        </div>
      </div>
      <div class="nav-right">
        <van-button to="login" color="rgba(0,0,0,0)">
          <van-icon name="envelop-o" size="30" color="#ee0a24" badge="9" />
        </van-button>
      </div>
    </header>
    <section>
      <van-notice-bar
        left-icon="volume-o"
        :scrollable="false"
        mode="closeable"
        background="#ecf9ff"
      >
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item @click="goNews">内容 1</van-swipe-item>
          <van-swipe-item @click="goNews">内容 2</van-swipe-item>
          <van-swipe-item @click="goNews">内容 3</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
      <van-grid class="first" :border="false" square center>
        <van-grid-item
          v-for="(item, index) in imgList"
          :key="index"
          to="/search"
        >
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.imgurl"></use>
          </svg>
          <span>{{ item.text }}</span>
        </van-grid-item>
      </van-grid>

      <!-- 三栏 -->
      <van-grid class="second" direction="horizontal" :column-num="3">
        <van-grid-item to="/search">
          <svg class="icon icon3" aria-hidden="true">
            <use xlink:href="#icon-shangjiaruzhu"></use>
          </svg>
          <p>
            <span>商家入驻</span>
            <span>商家入驻</span>
          </p>
        </van-grid-item>
        <van-grid-item to="/invitation">
          <svg class="icon icon3" aria-hidden="true">
            <use xlink:href="#icon-dianziqingtie"></use>
          </svg>
          <p>
            <span>电子请帖</span>
            <span>电子请帖</span>
          </p>
        </van-grid-item>
        <van-grid-item to="/calendar">
          <svg class="icon icon3" aria-hidden="true">
            <use xlink:href="#icon-huangdaojiri"></use>
          </svg>
          <p>
            <span>黄道吉日</span>
            <span>黄道吉日</span>
          </p>
        </van-grid-item>
      </van-grid>

      <!-- 两栏 -->
      <van-grid class="third" direction="horizontal" :column-num="2">
        <van-grid-item to="/search">
          <p>
            <span>问大家</span>
            <span>问大家</span>
          </p>
          <svg class="icon2" aria-hidden="true">
            <use xlink:href="#icon-yihuo"></use>
          </svg>
        </van-grid-item>
        <van-grid-item to="/search">
          <p>
            <span>自己筹备</span>
            <span>自己筹备</span>
          </p>

          <svg class="icon2" aria-hidden="true">
            <use xlink:href="#icon-bijiben"></use>
          </svg>
        </van-grid-item>
      </van-grid>

      <div>
        <div class="partOne">
          <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hunshalifu"></use>
          </svg>
            大家都在买
            </p>
          <van-icon name="arrow" @click="goShop" />
        </div>
        <ul class="goodList">
          <li v-for="(item, index) in goodsList" :key="index" class="goods">
            <img :src="item.imgUrl" />
            <p class="goodDetail">
              <span class="van-ellipsis"
                >【{{ item.name }}】{{ item.content }}</span
              >
              <span>￥{{ item.price }}<s>￥1111</s></span>
              <span>销量{{ item.num }}</span>
              <van-button
                round
                color="red"
                @click="goDetaile(item.id)"
                style="width: 80%; height: 20px; font-color: 'white'"
                ><strong style="color: white">立即购买</strong></van-button
              >
            </p>
          </li>
        </ul>
      </div>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import Tabbar from "@/components/Tabbar.vue";
import http from "@/common/api/request.js";
export default {
  components: {
    Tabbar,
  },
  data() {
    return {
      goodsList: [],
      areaList,
      code: 0,
      option: [
        {
          code: "110000",
          name: "北京市",
        },
        {
          code: "110100",
          name: "北京市",
        },
        {
          code: "110101",
          name: "东城区",
        },
      ],
      imgList: [
        {
          imgurl: "#icon-hunshasheying",
          text: "婚纱摄影",
        },
        {
          imgurl: "#icon-hunyanjiudian",
          text: "婚宴酒店",
        },
        {
          imgurl: "#icon-hunsha",
          text: "婚纱礼服",
        },
        {
          imgurl: "#icon-bojuelvpai-hunche",
          text: "婚车",
        },
        {
          imgurl: "#icon-a-lvyoulvhangshatan",
          text: "全球旅拍",
        },
        {
          imgurl: "#icon-siyibeifen",
          text: "婚礼司仪",
        },
        {
          imgurl: "#icon-huazhuangshua",
          text: "婚礼跟妆",
        },
        {
          imgurl: "#icon-hunjie",
          text: "婚戒三金",
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      http
        .$axios({
          url: "/api/goods",
        })
        .then((res) => {
          this.goodsList = res;
        });
    },
    goDetaile(id) {
      this.$router.push({
        path: "/detaile",
        name: "shopDetaile",
        query: {
          id,
        },
        params: {
          id,
        },
      });
    },
    confirm(value) {
      this.option = value;
      console.log(value);
      this.$refs.dropdown.toggle();
    },
    cancel() {
      this.$refs.dropdown.toggle();
    },
    change() {},
    searchFocus() {
      this.$router.push("/search");
    },
    goNews() {
      this.$router.push("/news");
    },
    goShop() {
      this.$router.push("/shop");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  .nav-port {
    position: absolute;
    display: flex;
    left: 0;
    width: 85%;
    height: 100%;
    .nav_left {
      flex: 1;
      padding: 3px;
      ::v-deep .van-dropdown-menu__bar {
        background-color: rgba($color: #000000, $alpha: 0);
        box-shadow: 0 0px 0px;
      }
      ::v-deep .van-dropdown-menu__title::after {
        border-color: transparent transparent #000000 #000000;
      }
    }
    .nav_title {
      position: relative;
      flex: 4;
      ::v-deep .van-search__content {
        background-color: white;
      }
    }
  }
  .nav-right {
    position: absolute;
    padding-top: 0.3rem;
    width: 15%;
    height: 100%;
    right: 0;
  }
}

section {
  .van-notice-bar {
    margin-bottom: 0.5rem;
    height: 1.3rem;
    background-color: rgba($color: #ffffff, $alpha: 0.8) !important;
    border-radius: 13px;
  }
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
  .first,
  .second,
  .third {
    margin-bottom: 0.6rem;
    border-radius: 0.6rem;
    overflow: hidden;
  }

  .first {
    span {
      font-size: 13px;
    }
  }
  .second {
    p {
      span {
        display: inline-block;
        font-size: 15px;
        font-weight: 500;
        padding-left: 5px;
      }
      span:last-child {
        font-size: 12px;
        font-weight: 500;
        color: orangered;
      }
    }
    .icon3 {
      width: 2rem;
      height: 2rem;
      padding: 5px;
    }
  }
  .third {
    p {
      span {
        display: inline-block;
        font-size: 15px;
        font-weight: 500;
        padding-left: 20px;
      }
      span:last-child {
        font-size: 12px;
        font-weight: 500;
        color: orangered;
      }
    }
    .icon2 {
      width: 4rem;
      height: 4rem;
    }
  }
  .partOne{
    padding: 5px;
    display: flex;
    color: #291a1a;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-bottom: 1px solid rgb(228, 223, 223);
    border-radius: 12px 12px 0px 0px;
    p{
      font-size: 15px;
      font-weight: 600;
      display: flex;
      align-items: center;
      .icon{
        width: 1.5rem;
      }
    }
  }
  .goodList {
    display: flex;
    flex-wrap: wrap;
  }
  .goods {
    padding: 5px 0 10px 0;
    width: 50%;
    background: white;
    img {
      width: 100%;
      height: 150px;
    }
    .goodDetail {
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      span {
        line-height: 25px;
        display: block;
        font-size: 14px;
        &:nth-child(2) {
          font-weight: 600;
          color: rgb(255, 5, 5);
        }
        &:last-child {
          font-size: 10px;
          color: rgb(168, 5, 5);
        }
      }
    }
  }
}
</style>
