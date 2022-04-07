import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./modules/user.js"
import cart from './modules/cart.js'
import path from './modules/path.js'
import order from './modules/order.js'
import merChant from './modules/merChant.js'
import buy from './modules/buy.js'

export default new Vuex.Store({
    // 挂载
    modules:{
        user,
        cart,
        path,
        order,
        merChant,
        buy
    }
})