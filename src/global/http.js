/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import Vue from 'vue'
import axios from 'axios';
// import QS from 'qs';

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
axios.defaults.baseURL = 'http://47.103.159.175:8080'; //后端接口前缀
// axios.defaults.baseURL = 'http://192.168.0.110:8080'; //后端接口前缀
// axios.defaults.baseURL = 'http://192.168.2.133:8080'; //后端接口前缀
// 请求超时时间
axios.defaults.timeout = 10000;
//获取token
let token = getCookie('token');
// let token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1Iiwic3ViIjoiMTUxODMyMzMyNzQiLCJpYXQiOjE1ODY5NDI3OTUsInJvbGVzIjoidXNlciIsImV4cCI6MTU4NzU0NzU5NX0.Yd4zMJ769XfhTU0GlrRM7RtQShPsyRyUG8UMoIknozc';
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['token'] = token ? token : null;
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.get['token'] = token ? token : null;

// 请求拦截器
axios.interceptors.request.use(
	config => {
		// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		token && (config.headers.token = token);
		return config;
	},
	error => {
		return Promise.error(error);
	})


class HttpRequest {
	/**
	 * get方法，对应get请求
	 */
	static get(url, params, config) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
					params: params
				}, config)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					reject(err.data)
				})
		});
	}
	/**
	 * post方法，对应post请求
	 */
	static post(url, params, config) {
		return new Promise((resolve, reject) => {
			axios.post(url, JSON.stringify(params), config)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					reject(err.data)
				})
		});
	}
	static post2(url, params, config) {
	    return new Promise((resolve, reject) => {
	        axios.post(url, JSON.stringify(params), config)
	            .then(res => {
	                resolve(res.data);
	            })
	            .catch(err => {
	                reject(err.data)
	            })
	    });
	}
}
export default HttpRequest
