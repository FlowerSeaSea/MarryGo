<template>
  <div>
    <header>
      <navbar>
        <div slot="title" class="nav-center">
          <h1>333</h1>
        </div>
        <div slot="right" class="nav-right">
          <h1>222</h1>
        </div>
      </navbar>
    </header>
    <section>
      <van-skeleton title avatar avatar-size="70px" />
      <div class="head">
        <div class="head-left"></div>
        <div class="head-right">
          <p>name</p>
          <p>time</p>
          <p>
            <span>fabu</span>
            <span>guanzhu</span>
          </p>
        </div>
      </div>
      <div class="card">
        <div class="card-left"></div>
        <div class="card-left"></div>
      </div>
      <div class="util">
        <van-grid>
          <van-grid-item icon="star-o" text="收藏" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="paid" text="卡卷钱包" />
          <van-grid-item icon="cart-o" text="购物车" />
        </van-grid>
      </div>
      <div class="progress">
        <div class="progress-title">
          <h3>我的备婚进度</h3>
          <van-icon name="arrow" @click="goProgress" />
        </div>
        <div class="progress-value">
          <van-progress
            :percentage="75"
            stroke-width="7"
            pivot-text="紫色"
            pivot-color="#7232dd"
            color="linear-gradient(to right, #be99ff, #7232dd)"
          />
        </div>
        <div class="progress-button">
          <van-tag mark type="primary" color="#ffe1e1" text-color="#ad0000">未完成</van-tag>
          <span>选定婚期</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  components: { Navbar },
};
</script>

<style scoped lang="scss">
.head {
  display: flex;
  align-items: center;
  .head-left {
    width: 100px;
    height: 50px;
    background: yellow;
  }
}
.card {
  width: 100%;
  height: 50px;
  .card-left {
    width: 50%;
    height: 50px;
    background: gold;
  }
}
.util {
  width: 100%;
}
.progress{
  padding: 10px;
  border-radius: 13px;
  background: blueviolet;
  .progress-title{
    display: flex;
    justify-content: space-between;
    line-height: 25px;
    align-items: center;
  }
  .progress-value{
    height: 20px;
    margin:20px 0 5px 0;
  }
  .progress-button{
    height: 20px;
    margin-top:7px;
    span{
      margin-left: 6px;
      font-size: 12px;
    }
  }
}
</style>
