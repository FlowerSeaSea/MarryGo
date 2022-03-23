import axios from "axios";
import { Toast } from 'vant';
import store from '@/store';
import router from "@/router";
export default {
  common: {
    method: "GET",
    data: {},
    params: {},
    headers:{}
  },

  $axios(options = {}) {
    options.method = options.method || this.common.method;
    options.data = options.data || this.common.data;
    options.params = options.params || this.common.params;
    options.headers = options.headers || this.common.headers;

    // 请求前显示加载中
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
    
      // 判断是否是登录状态
      if(options.headers.token){
        options.headers.token=store.state.user.token;
        if (!options.headers.token) {
          router.push('/login')
        }
      }
      return axios(options).then((v) => {
        let data = v.data.data;
      
        // 如果token过期，重新登录
        if (data.code == 1000) {
          Toast.clear();
          Toast('登录过期，请重新登录！')
          return router.push('/login')
        }

      return new Promise((res, rej) => {
        if (!v) return rej();
        setTimeout(() => {
          // 关闭加载
          Toast.clear();
        }, 500);
        res(data)
      });
    });
  },

  
};
