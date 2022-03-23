<template>
  <div class="path-index container">
    <Header></Header>
    <section>
      <van-address-list
        v-if="list.length"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
      <van-empty
        v-else
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="空空如也"
      >
        <van-button round type="danger" class="bottom-button" @click="onAdd"
          >添加地址</van-button
        >
      </van-empty>
    </section>
  </div>
</template>

<script>
import http from "@/common/api/request.js";
// import { Toast } from "vant";
import Header from "@/components/path/Header.vue";
import { mapState, mapMutations } from "vuex";
import bus from '@/common/bus.js'
export default {
  components: {
    Header,
  },
  data() {
    return {
      pathStatus: false,
      chosenAddressId:1
    };
  },
  created() {
    if (this.$route.query.type == "select") {
      this.pathStatus = true;
    }
    this.getData();
  },
  computed: {
    ...mapState({
      list: (state) => state.path.list,
    }),
  },
  methods: {
    ...mapMutations(["initData"]),

    onAdd() {
      this.$router.push({
        name: "path-list",
      });
    },

    onEdit(item) {
      this.$router.push({
        name: "path-list",
        params: {
          key: item,
        },
      });
    },
    onSelect(item,index) {
      console.log(item,index);
      // pathStatus为true说明是从订单页面进入的：选择状态
      if (this.pathStatus) {
        // 不能用push，因为push过去的话原来url中的数据就没了
        bus.$emit('selectPath',item)
        this.$router.back();
        return;
      }
    },
    getData() {
      http
        .$axios({
          url: "/api/selectAddress",
          method: "post",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          this.initData(res.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  ul {
    width: 100%;
    li {
      padding: 0.266666rem 0.4rem;
      margin: 0.16rem 0;
      background-color: #ffffff;
      span {
        padding-right: 0.4rem;
        font-size: 0.426666rem;
      }
      .active {
        color: #b0352f;
      }
      .city {
        span {
          padding-right: 0.16rem;
        }
      }
    }
  }
  .add-path {
    margin-top: 0.8rem;
    width: 3.2rem;
    line-height: 1.066666rem;
    font-size: 0.48rem;
    text-align: center;
    color: #ffffff;
    background-color: #b0352f;
    border-radius: 6px;
  }
  .bottom-button {
    width: 160px;
    height: 40px;
  }
  .van-address-list {
    width: 100%;
    padding: 0;
  }
}
::v-deep .tabbar {
  border-top: 2px solid #ccc;
}
</style>
