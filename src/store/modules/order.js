import { INIT_ORDER } from "./mutations-types.js";

export default {
  state: {
    list: [],
    order_id: localStorage.getItem('goods_orderId') || ''
  },
  mutations: {
    [INIT_ORDER](state, orderId) {
      state.list = orderId;
      state.order_id = orderId[0].order_id

      localStorage.setItem('goods_orderId', orderId[0].order_id)
    },
  },
};
