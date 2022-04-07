import { BUY_LIST } from "./mutations-types.js";

export default {
  state: {
    buy_list: [],
    buy_selectList: [],
    buy_order_id: localStorage.getItem('goods_orderId') || ''
  },
  mutations: {
    [BUY_LIST](state, cartArr) {
        state.buy_selectList.shift()
        state.buy_list = cartArr;
        console.log(state.buy_list.id);
        state.buy_selectList.push(state.buy_list.id)
      },
  },
};
