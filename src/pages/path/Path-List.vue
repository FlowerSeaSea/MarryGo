<template>
  <div class="path-index container">
    <header>
      <Navbar>
        <div slot="title">
          <span v-if="pathStatus">编辑地址</span>
          <span v-else>添加地址</span>
        </div>
      </Navbar>
    </header>
    <section>
      <van-address-edit
        v-if="pathStatus"
        :address-info="AddressInfo"
        :area-list="areaList"
        show-set-default
        show-delete
        @save="onUpdata"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
      <van-address-edit
        v-else
        :area-list="areaList"
        show-set-default
        @save="onSave"
      />
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
import Navbar from "@/components/Navbar.vue";
import { areaList } from "@vant/area-data";
import http from "@/common/api/request.js";
export default {
  data() {
    return {
      pathStatus: false,
      areaList,
      AddressInfo: {},
    };
  },
  components: {
    Navbar,
  },
  created() {
    if (this.$route.params.key) {
      this.pathStatus = true;
      this.AddressInfo = this.$route.params.key;
      console.log(this.AddressInfo);
    }
  },
  methods: {
    //点击保存触发=>增加
    onSave(content) {
      content.isDefault = content.isDefault == true ? 1 : 0;
      http
        .$axios({
          url: "/api/addAddress",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            ...content,
          },
        })
        .then((res) => {
          if (!res.success) return;
          Toast(res.msg);
          this.$router.push("/path");
        });
    },
    //点击保存触发=>增加
    onUpdata(content) {
      content.isDefault = content.isDefault == true ? 1 : 0;
      console.log(content);
      http
        .$axios({
          url: "/api/updateAddress",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            ...content,
          },
        })
        .then((res) => {
          if (!res.success) return;
          Toast(res.msg);
          this.$router.push("/path");
        });
    },
    //点击保存触发=>删除
    onDelete(content) {
      http
        .$axios({
          url: "/api/deleteAddress",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            id: content.id,
          },
        })
        .then((res) => {
          if (!res.success) return;
          Toast(res.msg);
          this.$router.push("/path");
        });
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  background-color: #f7f7f7;
  .van-address-edit {
    padding: 0;
  }
  ::v-deep .van-address-edit__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  ::v-deep .van-button--danger {
    background-color: #b0352f;
  }
}
::v-deep .tabbar {
  border-top: 2px solid #ccc;
}
</style>
