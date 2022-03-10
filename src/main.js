import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';

import '../src/assets/css/common.css'
import '../src/assets/icons/iconfont.js'
Vue.config.productionTip = false

Vue.use(Vant);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
