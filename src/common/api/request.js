import axios from "axios";
import { Toast } from 'vant';
export default {
  common: {
    method: "GET",
    data: {},
    params: {},
  },

  $axios(options = {}) {
    options.method = options.method || this.common.method;
    options.data = options.data || this.common.data;
    options.params = options.params || this.common.params;

    // 请求前显示加载中
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });

    return axios(options).then((v) => {
      let data = v.data.data;
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
