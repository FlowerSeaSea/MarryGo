import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import store from "./store/index.js";
import 'vant/lib/index.css';

import '../src/assets/css/common.css'
import '../src/assets/icons/iconfont.js'
Vue.config.productionTip = false

Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
