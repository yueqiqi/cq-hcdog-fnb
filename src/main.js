import Vue from 'vue'
import App from './App.vue'
// 全局js
import untils from '../src/global/untils'
import api from '../src/global/api'
Vue.prototype.$api = api
Vue.prototype.$untils = untils

import 'lib-flexible/flexible'
import VueBus from 'vue-bus';
 
Vue.use(VueBus);

//引入封装ajax
import http from '../src/global/http'
Vue.prototype.$http = http;
// 引入路由
import router from '../src/global/router'
// 引入vuex
import store from '../src/global/store'
Vue.config.productionTip = false
// 打印
import Print from 'vue-print-nb'
Vue.use(Print); //注册
/**
 * 引入element-ui
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.bus=new Vue()
Vue.prototype.carLists=new Vue()
// 上传图片地址
Vue.prototype.$imageUrl = 'https://qw-admin.yunchefu.cn/oss/image/toOss'
// new Vue({
//   render: h => h(App),
// }).$mount('#app')
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app")
