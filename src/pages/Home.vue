<template>
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
              :columns-placeholder="['请选择', '请选择', '请选择']"
            />
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div class="nav_title">
        <van-search
          v-model="value"
          background="rgba(0,0,0,0)"
          placeholder="请输入搜索关键词"
        />
      </div>
    </div>
    <div class="nav-right">
      <van-button to="login" color="rgba(0,0,0,0)">
        <van-icon name="envelop-o" size="30" color="#ee0a24" badge="9"/>
      </van-button>
    </div>
  </header>
</template>

<script>
import { areaList } from "@vant/area-data";
export default {
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
  },
};
</script>

<style>
.nav {
  width: 100%;
  height: 54px;
  position: relative;
  background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
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
  padding: 3px;
}
.nav_title {
  position: relative;
  flex: 4;
}
.van-search__content {
  background-color: white;
}
.van-dropdown-menu__bar {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none;
}
.van-dropdown-menu__title::after {
  border-color: transparent transparent #646566 #646566;
}

.nav-right {
  position: absolute;
  width: 15%;
  height: 100%;
  right: 0;
  top: 10%;
}
</style>
