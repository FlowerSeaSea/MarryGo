<template>
  <div>
    <header>
      <navbar>
        <div slot="title">备婚进度</div>
      </navbar>
    </header>
    <section>
      <van-cell title="择吉日" :value="date" @click="show = true" />
      <van-calendar v-model="show" @confirm="onConfirm" :formatter="formatter" confirm-text="ok" :min-date="minDate" :max-date="maxDate" />
      <div v-show="this.date == ''" class="feTimer">
        <h2>暂未设定你的好日子，快去设定吧</h2>
      </div>
      <div v-show="this.date != ''" class="timer">
        <h4>{{ this.dateHead }}</h4>
        <h2>{{ this.dateDay }}</h2>
        <h4>{{ this.dateWeek }}</h4>
        <h4 v-if="this.Festivals.length != 0">
          节日:
          <span v-for="(item, index) in this.Festivals" :key="index">
            {{ item }}
          </span>
        </h4>
        <h4 v-else>
          <span> 节日:无 </span>
        </h4>

        <h4>
          <span>农历:{{ this.NL }}</span>
        </h4>
        <h4>
          宜:
          <span v-for="(item, index) in this.YI" :key="index">
            {{ item }}
          </span>
        </h4>
        <h4>
          忌:
          <span v-for="(item, index) in this.JI" :key="index">
            {{ item }}
          </span>
        </h4>
      </div>
      <van-button
        round
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        type="info"
        size="large"
        @click="quite"
        >就它了</van-button
      >
    </section>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import http from "@/common/api/request.js";
import { Toast, Dialog} from "vant";
import { Solar, Lunar } from "lunar-javascript";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      show: false,
      date: "",
      dateHead: "",
      dateDay: "",
      dateWeek: "",
      Festivals: [],
      NL: "",
      YI: [],
      JI: [],
      minDate: new Date(2022, 0, 1),
      maxDate: new Date(2023, 0, 31),
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    ...mapMutations(["userLogin"]),
    getData() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo")),
        nowData = new Date(userInfo.calendar);
      this.fomatData(nowData);
    },

    onConfirm(date) {
      Dialog.confirm({
        title: "Please confirm your operation",
        message: "确定今天设为你大喜的日子吗？",
      }).then((res) => {
        if (res == "confirm") {
          http
        .$axios({
          url: "/api/calendar",
          method: "post",
          data: {
            calendar: date,
          },
          headers: {
            token: true,
          },
        })
        .then((res) => {
            Toast(res.msg);
            this.userLogin(res.data);
          })
        }
      });
      this.show = false;
      this.fomatData(date);
    },

    fomatData(date) {
      let M = date.getMonth() + 1,
        Y = date.getFullYear(),
        D = date.getDate(),
        W = date.getDay();
      this.date = `${Y}年${M}月${D}日`;
      this.dateHead = `${Y}年${M}月`;
      this.dateDay = `${D}`;
      this.dateWeek = "星期" + "日一二三四五六".charAt(W);
      let solar = Solar.fromYmd(Y, M, D);
      this.Festivals = solar.getFestivals();
      solar.getOtherFestivals().forEach((element) => {
        this.Festivals.push(element);
      });
      this.NL = ` ${Lunar.fromDate(date).getYearInChinese()}年 ${Lunar.fromDate(
        date
      ).getMonthInChinese()}月 ${Lunar.fromDate(date).getDayInChinese()}`;
      // this.NL = solar.getLunar().toFullString()
      this.YI = Lunar.fromDate(date).getDayYi();
      this.JI = Lunar.fromDate(date).getDayJi();
    },

    formatter(day) {
      if (Lunar.fromDate(day.date).getDayYi().includes('嫁娶')) {
        day.topInfo = '吉日';
      }
      return day;
    },
    quite(){
      this.$router.push('Mine')
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  height: 100vh;
  .timer {
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      display: block;
      width: 100px;
      line-height: 100px;
      border-radius: 50%;
      text-align: center;
      font-size: 40px;
      background: red;
    }
    h4 {
      line-height: 30px;
    }
  }
  .feTimer {
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 13px;
    background: red;
    text-align: center;
    align-items: center;
    h2 {
      display: block;
    }
  }
}
</style>
