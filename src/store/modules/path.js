import {INIT_DATA} from './mutations-types.js'
export default{
    state:{
        list:[],
    },
    getters:{
        defaultPath(state){
            return state.list.filter(v=>{
                return v.isDefault == 1
            })
        }
    },
    mutations:{
        [INIT_DATA](state,arrPath){
            arrPath.map(v=>{
                v.isDefault= v.isDefault == 0 ? false : true;
                v.address=`${v.province}${v.city}${v.country} ${v.addressDetail}`
                // state.chosenAddressId = v.isDefault == 0 ? 1 : v.id;
            })
            state.list=arrPath
        }
    }
}