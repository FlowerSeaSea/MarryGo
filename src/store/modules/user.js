import {USER_LOGIN,INIT_USER,LOGIN_OUT} from './mutations-types'
export default{
    state:{
        // 登录状态
        loginStatus:false,
        // 用户信息
        userInfo:{},

        token:null,
    },
    getters:{

    },
    mutations:{
        // 接受并保存
        [USER_LOGIN](state,data){
            state.loginStatus=true;
            state.token=data.token;
            state.userInfo=data
            console.log(state.userInfo);
            // 持久化存储--本地存储
            localStorage.setItem('userInfo',JSON.stringify(data))
        },
        
        // 读取(什么时候读取：在刚进入的时候执行，html-main.js-app.vue)
        [INIT_USER](state){
            let userInfo=JSON.parse(localStorage.getItem('userInfo'))
            if (userInfo) {
                state.loginStatus=true;
                state.token=userInfo.token;
                state.userInfo=userInfo
            }
        },

        // 退出登录
        [LOGIN_OUT](state){
            state.loginStatus=false
            state.token=null
            state.userInfo={}
            localStorage.removeItem('userInfo')
        }
    },
    actions:{

    },
}