<!-- 新建服务 -->
<template>
	<div class='completeConfirm'>
		<el-dialog title="新建服务" :close-on-click-modal='false' center="" :visible.sync="nsIsShow" width="40%">
			
			<el-form ref="form" :model="form" label-width="80px">
			  <el-form-item label="服务名称">
			    <el-input v-model="form.name" placeholder='请输入服务名称'></el-input>
			  </el-form-item>
				
			  <el-form-item label="服务分类">
					<el-cascader style="width: 100%;" v-model="form.region" :options="searchList" @change="handleChange" placeholder="请选择服务分类"></el-cascader>
			  </el-form-item>
				
			 <!-- <el-form-item label="收费方式">
			    <el-col :span="11">
			     <el-radio @change='chRadio' v-model="radio" label="1">按一口价收费</el-radio>
			    </el-col>
					<el-col :span="11">
						<el-radio @change='chRadio' v-model="radio" label="2">按工时收费</el-radio>
					</el-col>
			  </el-form-item> -->
				
				<el-form-item v-if="showHour" label="工时/小时">
					<el-col :span="7">
						<el-input  v-model="form.hour"></el-input>
					</el-col>
					<el-col :span="11" style="margin-left: 20px;">
						<span style="margin-right: 10px;">工时单价</span>
						<el-input style="width: 60%;" v-model="form.price"></el-input>
					</el-col>
				</el-form-item>
				
			  <el-form-item label="一口价">
			    <el-input  v-model="form.buy"></el-input>
			  </el-form-item>
				
			  <el-form-item label="服务模板">
			    <el-select v-model="form.model" style="width: 100%;" placeholder="请选择服务模板">
			      <el-option v-for="(item,index) in nsList" :label="item.templateName" :value="item.code" :key='index'></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
			
			<!-- <el-button @click='look'>查看</el-button> -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="danger" @click="save">保存并继续新建</el-button>
				<el-button type="primary" @click="confirm">确认新建</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {
		},
		props:{
			nsIsShow:Boolean,
			nsList:Array,
			searchList:Array
		},
		data () {
			return {
				options:null,
				// 选择的一二级
				value:null,
				
				// 是否显示工时
				showHour:false,
				radio:'1',
				chooseRadio:null,
				// 下拉选项
				List:[],
				// 表单
				form: {
					// 服务名称
					name: '',
					// 服务分类
					region: '',
					// 收费方式
					// radio:'',
					// 工时
					hour:'',
					// 工时单价
					price:'',
					// 一口价
					buy:'',
					// 服务模板
					model:'',
				},
				newServe:true,
				tel:'',
			};
		},
		computed: {
			
		},
		methods: {
			look(){
				console.log('查看',this.$props.nsList)
			},
			
			
			handleChange(val){
				console.log('%c选择德服务分类','color:#70ff57;font-size:20px;font-weight:bold',val,this.form.region)
			},
			
			
			fList(val){
				console.log('选择的',val)
			},
			
			
			// 选中的单选
			chRadio(e){
				console.log(e)
				if(e==2){
					this.showHour=true
				}else{
					this.showHour=false
				}
			},
			

			// 取消按钮
				close(){
					this.$emit('closeNs')
				},
				// 保存
			save(){
				this.$emit('saveNs')
				let f=this.form
				let oneCategoryCode
				let twoCategoryCode
				let threeCategoryCode
				let oneCategoryName
				let twoCategoryName
				let threeCategoryName
				if(f.region!=''){
				oneCategoryCode = f.region[0].split(',')[0]
				twoCategoryCode = f.region[1].split(',')[0]
				threeCategoryCode = f.region[2].split(',')[0]
				oneCategoryName = f.region[0].split(',')[1]
				twoCategoryName = f.region[1].split(',')[1]
				threeCategoryName = f.region[2].split(',')[1]
				}else{
					alert('请选择服务分类')
				}
				console.log(oneCategoryCode,oneCategoryName,twoCategoryCode,twoCategoryName,threeCategoryCode,threeCategoryName)
				this.getNewServe(f.name,oneCategoryCode,oneCategoryName,twoCategoryCode,twoCategoryName,threeCategoryCode,threeCategoryName,f.buy,f.model)
				setTimeout(()=>{
					this.form={
						// 服务名称
						name: '',
						// 服务分类
						region: '',
						// 收费方式
						// radio:'',
						// 工时
						hour:'',
						// 工时单价
						price:'',
						// 一口价
						buy:'',
						// 服务模板
						model:'',
					}
				},2000)
			},
			// 确认新建
		confirm(){
			this.$emit('sendNs')
			let f=this.form
			let oneCategoryCode
			let twoCategoryCode
			let threeCategoryCode
			let oneCategoryName
			let twoCategoryName
			let threeCategoryName
			if(f.region!=''){
			oneCategoryCode = f.region[0].split(',')[0]
			twoCategoryCode = f.region[1].split(',')[0]
			threeCategoryCode = f.region[2].split(',')[0]
			oneCategoryName = f.region[0].split(',')[1]
			twoCategoryName = f.region[1].split(',')[1]
			threeCategoryName = f.region[2].split(',')[1]
			}else{
				alert('请选择服务分类')
			}
			console.log('分类',oneCategoryCode,oneCategoryName,twoCategoryCode,twoCategoryName,threeCategoryCode,threeCategoryName)
			this.getNewServe(f.name,oneCategoryCode,oneCategoryName,twoCategoryCode,twoCategoryName,threeCategoryCode,threeCategoryName,f.buy,f.model)
			setTimeout(()=>{
				this.form={
					// 服务名称
					name: '',
					// 服务分类
					region: '',
					// 收费方式
					// radio:'',
					// 工时
					hour:'',
					// 工时单价
					price:'',
					// 一口价
					buy:'',
					// 服务模板
					model:'',
				}
			},2000)
		},
		// 新建服务
		getNewServe(name,oneCategoryCode,oneCategoryName,twoCategoryCode,twoCategoryName,threeCategoryCode,threeCategoryName,standardPrice,templateCode){
			this.$http.post('/laborSynthesize/addGoods',{
				merchantCode:this.merchantCode,
				operateType:'2',
				type:'2',
				// 服务名称
				name,
				oneCategoryCode,
				oneCategoryName,
				twoCategoryCode,
				twoCategoryName,
				threeCategoryCode,
				threeCategoryName,
				// 一口价
				standardPrice,
				// 创建人姓名
				createName:'fnb',
				// 创建人编码
				createCode:'007',
				templateCode,
			})
			.then(res=>{
				 console.log('新建服务结果',res)
				 if(res.code == '10000'){
				
				}else{
					 alert(res.message)
			}
			})
		},
		},
mounted() {

},
created() { this.merchantCode=this.$route.query.merchantCode
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
/deep/ .el-dialog__header{
	background:#409eff!important
}
/deep/ .el-dialog{
	border-radius: 15px;
}
/deep/ .el-dialog__title{
	color:#fff;
	/* font-weight: bold; */
	font-size: 18px;
}
</style>