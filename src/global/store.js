import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
        pjtnews: 0,
        count: 1,
        userInfo: {},
        token: null,
				carList:[],
    }
    //在这里定义更新state的方法
const mutations = {
	list(state,list){
		state.carList=list
	},
	// listAdd(state,list){
		
	// },
        add(state) {
            state.count += 1;
        },
        reduce(state) {
            state.count -= 1;
        },
        increment(state) {
            state.userInfo = {
                name: '王珊',
                age: '21'
            }
        },
        setToken(state, token) {
            state.token = token;
        }
    }
    //在这里分发调用上面的更新方法
const actions = {
    increment(context) {
        context.commit('increment')
    },
    setToken(context) {
        context.commit('setToken')
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
});