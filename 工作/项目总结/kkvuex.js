import { getUserInfo } from '@/api/userApi'
export default {
    state: { // 提供公共组件数据源
        userInfo: null,
        noUserNo: null,
        initialPasswd: ''
    },
    mutations: { // 间接修改state的数据
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setNoUserNo(state, noUserNo) {
            state.noUserNo = noUserNo
        },
        setInitialPasswd(state, pass) {
            state.initialPasswd = pass
        }
    },
    actions: { // 通过提交mutations来间接修改数据  可以包括异步操作
        setUserInfo({ commit }, userInfo) {
            if (!userInfo) {
                return getUserInfo().then(res => {// 获取用户信息
                    if (res && res.code == 200) { // 获取成功
                        Vue.store.dispatch('setUserInfo', res.obj)// 保存用户信息   
                        commit('setUserInfo', res.obj)//    保存用户信息
                        commit('setAuthList', res.obj)// 保存权限信息
                        return 'success'
                    } else { // 获取失败
                        console.log('get info error')//
                        return Promise.reject(new Error('interface error')) // 返回一个失败的promise
                    }
                })
            } else {
                commit('setUserInfo', userInfo) // 保存用户信息
                commit('setAuthList', userInfo) // 保存权限信息
            }
        }
    },
    getters: { // 获取特定的state数据
        userInfo: state => state.userInfo,
        staffId: state => state?.userInfo?.staffId,
        initialPasswd: state => state.initialPasswd,
        mobile: state => state?.userInfo?.mobile,
        country: state => state?.userInfo?.country,
        utc: state => state?.userInfo?.utc,
        lang: state => state?.userInfo?.lang
    }
}
