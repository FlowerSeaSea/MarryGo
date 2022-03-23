import { Dialog, Toast } from "vant";
import http from "@/common/api/request.js";
import {
  CART_LIST,
  CHECK_ALL,
  UN_CHECK_ALL,
  CHECK_ITEM,
} from "./mutations-types.js";
export default {
  state: {
    // 购物车数据
    list: [],
    // 选中的数据id
    selectList: [],
  },
  getters: {
    isCheckedAll(state) {
      return state.list.length == state.selectList.length;
    },
    total(state) {
      let total = {
        num: 0,
        price: 0,
      };
      state.list.forEach((element) => {
        if (element.checked) {
          // 要将字符串转为int
          total.num += parseInt(element.goods_num);
          total.price += element.goods_price * element.goods_num;
        }
      });
      return total;
    },
  },
  mutations: {

    [CART_LIST](state, cartArr) {
      state.list = cartArr;
      // bug:返回后重新进入页面全选按钮会失效，原因是初始化的时候才会往selectList中添加数据，再次进入的时候没有发送请求，也就没有初始化，也就没有push，所以会失效
      // cartArr.forEach((v) => {
      //   state.selectList.push(v.id);
      // });
      // state.selectList=cartArr//不能直接赋值，会引起删除后点击单选任会出现删除的元素
      state.selectList=state.list.map(v=>{
        return v.id
      })
    },

    // 全选
    [CHECK_ALL](state) {
      state.selectList = state.list.map((v) => {
        v.checked = true;
        return v.id;
      });
    },

    // 全不选
    [UN_CHECK_ALL](state) {
      state.list.forEach((element) => {
        element.checked = false;
      });
      // 全不选的话清空
      state.selectList = [];
    },

    //单选
    [CHECK_ITEM](state, index) {
      let id = state.list[index].id,
        i = state.selectList.indexOf(id);
      // 有就删除该id
      if (i > -1) {
        return state.selectList.splice(i, 1);
      }
      // 没有就添加该id
      state.selectList.push(id);
    },

    // 删除
    delGoods(state) {
      state.list = state.list.filter((v) => {
        return state.selectList.indexOf(v.id) == -1;
      });
    },
  },
  actions: {
    
    checkedAllFn({ commit, getters }) {
      getters.isCheckedAll ? commit("unCheckAll") : commit("checkAll");
    },

    delGoodsFn({ commit, state }, id) {
      if (state.selectList.length == 0) {
        Toast("请先选择商品");
        return;
      }
      let arrCart = [];
      Dialog.confirm({
        message: "确定要删除这些商品吗？",
      }).then(() => {
        if (typeof id == "number") {
          // 单个删除
          arrCart = [id];
          let index=state.list.findIndex(v=>{
            return v.id=id
          })
          state.list.splice(index, 1);
        } else {
          // 删除多个
          arrCart = state.selectList;
          commit("delGoods");
        }

        http
          .$axios({
            url: "/api/deleteCart",
            method: "post",
            data: {
              arrId: arrCart,
            },
          })
          .then((res) => {
            if (res.success) {
              Toast(res.msg)
            }
          });
      });
    },
  },
};
