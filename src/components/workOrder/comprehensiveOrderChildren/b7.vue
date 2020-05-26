<!--附加费用 -->
<template>
	<div class='b7'>
			<div class="font-big" style="padding-left: 36px;line-height: 60px;">附加费用<span style="margin-left: 38px;color:#666666;font-size: 14px;font-weight: 0;">附加费用&nbsp;注:加工费、管理费、税费等其他费用</span></div>
			<el-table  :data="manOur" :header-cell-style="{color:'#333',fontSize:'14px',fontWeight:'bold',fontSize:'16px',backgroundColor:'#d7d7d7'}" style="width: 100%" border>
			  <el-table-column align='center'  prop="title" label="附加费用名称">
					<template slot="header" slot-scope="scope">
						<div class="d-flex" style="align-items: center;justify-content: center;;">
							<div style="margin-right: 10px">附加费用名称</div>
							<el-button type="text" @click='addlist'>新增</el-button><div style="color:#409Eff ;">/</div><el-button type="text" @click='addlist'>编辑</el-button>
						</div>
					</template>
					
					
					<template slot-scope="scope">
							<el-select v-model="scope.row.name" placeholder="请选择" :disabled='dis' @visible-change='getlists' @change="selectChange">
							    <el-option v-for="item in lists" :key="item.id" :label="item.name" :value="item.name"></el-option>
							</el-select>
					</template>
				</el-table-column>
				
			  <el-table-column align='center' prop="price" label="金额/元">
					<template slot-scope="scope">
							<el-input v-model.number="scope.row.price" placeholder='请输入金额' :disabled='dis' @change='priceChange'></el-input>
					</template>
				</el-table-column>
				<el-table-column align='center' prop="remark" label="备注">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remarks" placeholder='请输入备注' :disabled='dis' @change='remarksChange'></el-input>
					</template>
				</el-table-column>
				
				<el-table-column align='center' prop="" label="操作">
					<template slot-scope="scope">
							<el-button type='text' style="color: red;" @click='del(scope.$index,manOur)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- <div>总价:{{sums}}</div> -->
			
			<div v-if="dis!=true" class="add" @click="add">
				<!-- <h3>+新增</h3> -->
				<el-button type="primary">+新增</el-button>
			</div>
			
			
			
			<addition :isShowAddition="isShowAddition" :addlists='addlists' @close='addPrice'></addition>
	</div>
</template>

<script>
	import addition from './addition.vue';
	export default {
		components: {
			addition
		},
		props:{
			dis:{
			type:Boolean,
			},
			subjoin:{
				type:Array
			},
			useType:String
		},
	
		data () {
			return {
				//添加附加费用弹窗的值
				addlists:[],
				// /下拉框的值
				lists:null,
				isShowAddition:false,
			// 下拉框
			options:[],
			manOur:[],
			};
		},
		computed: {
		sums:function(){
				let that=this
				let total=0
				console.log('数组',that.manOur)
				// if(this)
				for(let i=0;i<that.manOur.length;i++){
					total+=Number(that.manOur[i].price)
				}				
				console.log('%c计算总和','color:#70ff57;font-size:20px;font-weight:bold',total)
				return total
			},
		},
		watch:{
			subjoin(val){
				this.manOur=val
			},
			
		},
		methods: {
			/**
			 * @param {Object} 删除
			 */
			del(idx,row){
				row.splice(idx,1)
			},
			
			/**
			 * 弹窗传递的值
			 */
			addPrice(list){
				this.isShowAddition=false
				this.options=list
			},
			
		/**
		 * 附加费用
		 */
		addlist(){
			this.isShowAddition=true
			this.getlists()
		},
		// 新增
		add(){
			
			this.manOur.push({name:'',price:'',remarks:''})
		},
		//获取下拉框的值
		getlists(){
			this.$http.get('/laborSynthesize/getAdditional',{
				merchantCode:this.merchantCode
			})
			.then(res=>{
				 if(res.code == '10000'){
				this.lists=res.data
					 res.data.map(item => {
						 item.showSet=true
						 item.showSave=false
					 })
				this.addlists=res.data
				console.log('打开的弹框',this.addlists)
				}else{
					 alert(res.message)
			}
			})
		},
		
		
		/**
		 * 传递至综合开单的值
		 */
		//下拉框
		selectChange(){
			let arr=this.manOur
			this.$emit('selectChange',this.manOur)
		},
		
		// 价格输入框
		priceChange(){
			this.$emit('priceChange',this.manOur)
		},
		// 备注输入框
		remarksChange(){
			this.$emit('remarksChange',this.manOur)
		},
		},
mounted() {
	
},
created() {
	this.merchantCode=this.$route.query.merchantCode
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
.b7{
	background: #fff;border-radius:15px ;margin-top: 10px;padding-top: 10px;
}
/* .add{
	display: flex;
	justify-content: center;
	background: #66FFFF;
	margin-left: 10px;
	margin-right: 10px;
	margin-top: 10px;
	color: #0000FF;
} */
.add{
	display: flex;
	justify-content: center;
	/* background: #66FFFF; */
/* 	margin-left: 10px;
	margin-right: 10px; */
	margin-top: 10px;
	width: 100%;
	/* color: #0000FF; */
}
.add button{
	height:40px;
	width: 120px;
}
</style>

