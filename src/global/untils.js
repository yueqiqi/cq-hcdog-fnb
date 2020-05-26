	import Vue from 'vue'
	const that=this
	import http from './http.js'
export default{
	getTableData(merchantCode,pageNo,pageSize){
		var result=''
		http.get('/WorkOrder/list',{
			merchantCode,
			pageNo,
			pageSize,
		})
		.then(res=>{
			 console.log('%c请求结果','color:red;font-size:20px',res)
			 if(res.code == '10000'){
				 result=res
		console.log('111111',result)
			}else{
				 alert(res.message)
		}
		})
		setTimeout(()=>{
			console.log('22222',result)
			return result
		}, 2000);

	},
}