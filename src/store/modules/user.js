import {USER_LOGIN,INIT_USER,LOGIN_OUT,CHANGE_TABLIST} from './mutations-types'
export default{
    state:{
        // 登录状态
        loginStatus:false,
        // 用户信息
        userInfo:{},

        tabList: [
            {
              title: "开始备婚",
              img: "",
              content: "备婚第一步，快来get超全备婚流程~",
              data: [
                {
                  name: "第一项",
                  text: "双方家长见面，商谈婚事",
                  isFinish: false,
                },
                {
                  name: "第二项",
                  text: "选定婚期",
                  isFinish: false,
                },
                {
                  name: "第三项",
                  text: "确定婚礼举办地和场次",
                  isFinish: false,
                },
                {
                  name: "第四项",
                  text: "结婚预算及分配",
                  isFinish: false,
                },
              ],
            },
            {
              title: "婚前准备",
              img: "",
              content: "备婚进行时，这几点做好事半功倍！",
              data: [
                {
                  name: "第一项",
                  text: "订婚",
                  isFinish: false,
                },
                {
                  name: "第二项",
                  text: "拍婚纱照",
                  isFinish: false,
                },
                {
                  name: "第三项",
                  text: "调钻戒三金",
                  isFinish: false,
                },
                {
                  name: "第四项",
                  text: "确定婚礼场地",
                  isFinish: false,
                },
                {
                  name: "第五项",
                  text: "确定婚策商家及风格",
                  isFinish: false,
                },
                {
                  name: "第六项",
                  text: "领结婚证",
                  isFinish: false,
                },
              ],
            },
            {
              title: "婚礼策划",
              img: "",
              content: "提前预定档期，不要让婚礼留下遗憾！",
              data: [
                {
                  name: "第一项",
                  text: "确定婚礼摄影摄像",
                  isFinish: false,
                },
                {
                  name: "第二项",
                  text: "挑婚纱礼服",
                  isFinish: false,
                },
                {
                  name: "第三项",
                  text: "确定婚礼司仪",
                  isFinish: false,
                },
                {
                  name: "第四项",
                  text: "确定婚礼跟妆",
                  isFinish: false,
                },
                {
                  name: "第五项",
                  text: "租婚车",
                  isFinish: false,
                },
              ],
            },
            {
              title: "婚前冲刺",
              img: "",
              content: "婚礼前的重要事项，快来查漏补缺！",
              data: [
                {
                  name: "第一项",
                  text: "婚品采购",
                  isFinish: false,
                },
                {
                  name: "第二项",
                  text: "发送请帖，邀请宾客",
                  isFinish: false,
                },
                {
                  name: "第三项",
                  text: "婚前美容",
                  isFinish: false,
                },
                {
                  name: "第四项",
                  text: "安排宾客（座位、住宿）",
                  isFinish: false,
                },
                {
                  name: "第五项",
                  text: "婚礼当天事件流程安排",
                  isFinish: false,
                },
                {
                  name: "第六项",
                  text: "查漏补缺",
                  isFinish: false,
                },
              ],
            },
        ],

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

        [CHANGE_TABLIST](state,data){
            state.tabList=data
        },

        // 退出登录
        [LOGIN_OUT](state){
            state.loginStatus=false
            state.token=null
            state.userInfo={}
            localStorage.removeItem('userInfo')
        },

    },
    actions:{

    },
}