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
        mode="link"
        background="#ecf9ff"
      >
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item>内容 1</van-swipe-item>
          <van-swipe-item>内容 2</van-swipe-item>
          <van-swipe-item>内容 3</van-swipe-item>
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
        <van-grid-item to="/search">
          <svg class="icon icon3" aria-hidden="true">
            <use xlink:href="#icon-dianziqingtie"></use>
          </svg>
          <p>
            <span>电子请帖</span>
            <span>电子请帖</span>
          </p>
        </van-grid-item>
        <van-grid-item to="/search">
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
            <span>问大家sada</span>
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
    </section>
    <Tabbar/>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import Tabbar from '@/components/Tabbar.vue';
export default {
  components:{
    Tabbar
  },
  data() {
    return {
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
  methods: {
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
  },
};
</script>

<style lang="scss">
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
      padding-left: 19px;   
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
.nav {
  position: relative;
}
.nav-port {
  position: absolute;
  display: flex;
  left: 0;
  width: 85%;
  height: 100%;
}
.nav_left {
  flex: 1;
  background: rgba(255, 255, 255, 0);
  padding: 3px;
}
.van-dropdown-menu__item {
  background: #ff5470;
}
.van-dropdown-menu__bar {
  background: rgba(255, 255, 255, 0);
}
.van-dropdown-menu__title--active {
  color: green;
}
.nav_title {
  position: relative;
  flex: 4;
}
.van-search__content {
  background-color: white;
}
.van-dropdown-menu__title::after {
  border-color: transparent transparent #000000 #000000;
}

.nav-right {
  position: absolute;
  padding-top: 0.3rem;
  width: 15%;
  height: 100%;
  right: 0;
}
</style>
