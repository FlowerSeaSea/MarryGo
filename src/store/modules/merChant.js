import { INIT_MERCHANT } from "./mutations-types.js";

export default {
  state: {
    list: [],
  },
  mutations: {
    [INIT_MERCHANT](state, res) {
      state.list = res;
    },
  },
};
