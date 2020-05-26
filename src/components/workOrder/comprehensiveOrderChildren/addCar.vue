<!-- 新增车辆/客户 -->
<template>
	<div class='completeConfirm'>
		<el-dialog title="新增车辆/客户" :close-on-click-modal='false' center="" :visible.sync="addUserIsShow" width="50%" :show-close='false'>
			
			<el-form ref="form" :model="form" label-width="150px">
			  <el-form-item label="车牌号">
						<carNum style='' v-model='form.plateNumber'></carNum>
			    <!-- <el-input style="width: 100%;" v-model="form.carNum" placeholder='请输入车牌号'>
						
					</el-input> -->
			  </el-form-item>
				
			  <el-form-item label="用户手机号">
					<el-input v-model.number="form.customerPhone"  placeholder='请填写11位数字'></el-input>
			  </el-form-item>
				
			  <el-form-item label="客户姓名">
			    <el-input v-model="form.customerName" placeholder='请输入客户姓名,不超过10个字' maxlength='10'></el-input>
			  </el-form-item>
				
				<el-form-item label="车架号">
					<el-input  v-model="form.vehicleIdNum" placeholder='请输入车架号'></el-input>
				</el-form-item>
				
			  <el-form-item label="发动机号">
					<el-input v-model="form.engineNum" placeholder='请输入发动机号'></el-input>
			  </el-form-item>
				
				<el-form-item label="注册日期">
				  <el-date-picker type="date" placeholder="请选择注册日期" value-format='yyyy-MM-dd' v-model="form.applyDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
				
				<el-form-item label="品牌">
					<el-select clearable v-model="form.brandName" style="width: 100%;" placeholder='请选择品牌'  @change='chCar' @focus="getBrand">
						<el-option  v-for="item in brand" :key="item.brandId" :label="item.brandName" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="车型车系">
				  <!-- <el-select style='width: 100%;' v-model="form.seriesName" placeholder="请选择" @focus='chCar'>
				      <el-option v-for="item in series" :key="item" :label="item.familyName" :value="item.value"></el-option>
				  </el-select> -->
					<el-cascader style="width: 100%;" v-model="form.seriesNames" placeholder="请选择" :options="series" @active-item-change="getSeriesList"></el-cascader>
				</el-form-item>
				
			  <el-form-item label="车身颜色">
					<el-input v-model="form.carColor" placeholder='请输入车身颜色'></el-input>
			  </el-form-item>
				
				<el-form-item label="本次公里数">
				  <el-input  v-model="form.lastMileage" placeholder='请输入本次公里数'>
						<template slot="append">KM</template>
					</el-input>
				</el-form-item>
				
				<el-form-item label="保险到期日期">
				  <el-date-picker type="date" placeholder="请选择保险到期日期" value-format='yyyy-MM-dd' v-model="form.compulsoryInsureDeadline" style="width: 100%;"></el-date-picker>
				</el-form-item>
				
				<el-form-item label="年检日期">
					<el-date-picker type="date" placeholder="请选择年检日期" value-format='yyyy-MM-dd' v-model="form.annualInspectDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
			</el-form>
			
			
		<span slot="footer" class="dialog-footer">
		  <el-button @click="close">取 消</el-button>
		  <el-button type="primary" @click="confirm">确 定</el-button>
		</span>
		
		
		</el-dialog>
	</div>
</template>

<script>
	import carNum from '../../Alert/province.vue'
	
	export default {
		components: {
			carNum
		},
		props:{
			addUserIsShow:Boolean
			},
		data () {
			return {
				
				brand:[],
				series:[],

				// 下拉选项
				List:[],
				
				// 表单
				form: {
					// 送修人姓名
					repairName:'',
					// 送修人电话
					repairPhone:'',
					workorderTime:'',
					estimateSubmit:'',
					annualInspectDate:'',
					compulsoryInsureDeadline:'',
					carColor:'',
					seriesName:'',
					brandName:'',
					applyDate:'',
					engineNum:'',
					vehicleIdNum:'',
					nextKeepFitTime:'',
					nextKeepFitKm:'',
					lastMileage:'',
					customerName:'',
					customerPhone:'',
					plateNumber:'',
				},
				newProduct:true,
				tel:'',
			};
		},
		computed: {

		},
		methods: {
			// 选择的分类
			handleChange(value) {
			        console.log(value);
			      },
			
			
			
			
			
			// 取消按钮
				close(){
					this.$emit('closeAc')
				},
	// 保存
			save(){
				this.$emit('noSend')
			},
			// 确认新建
		confirm(){
			
				this.form.brandId=this.form.brandName.split('/')[0]||''
				this.form.brandName=this.form.brandName.split('/')[1]||''
				this.form.seriesName=this.form.seriesNames[0].split('/')[1]||''
				this.form.seriesId=this.form.seriesNames[0].split('/')[0]||''
				this.form.modelId=this.form.seriesNames[1].split('/')[0]||''
				this.form.modelName=this.form.seriesNames[1].split('/')[1]||''
			console.log(this.form.seriesName,this.form.brandId,this.form.brandName,this.form.modelId,this.form.modelName,'12312',this.form.seriesNames)
			this.$emit('sendAc',this.form)
		},
		
		
		/**
		 * 选择品牌
		 */
		chCar(val){
			if(val!=''){
				this.brandId=val.split('/')[0]
			}
			this.$http.get('/laborSynthesize/getSeriesList',{
				brandId:this.brandId
			})
			.then(res=>{
				 console.log('请求获取车辆车系列表结果',res)
				 if(res.code == '10000'){
					 res.data.map(item=>{
						 item.value=item.familyId+'/'+item.familyName
						 item.label=item.familyName
						 item.children=[]
					 })
				this.series=res.data
				}
			})
		},
		
		
		
		// 选择车系
		getSeriesList(val){
			console.log('选择车型车系')
			console.log('%c车型','color:red',val[0].split('/')[0])
			this.$http.get('/laborSynthesize/getModelList',{
				familyId:val[0].split('/')[0]
			})
			.then(res=>{
				 console.log('请求车辆车型结果',res)
				 if(res.code == '10000'){
					 res.data.map(item => {
						 item.label=item.vehicleName
						 item.value=item.vehicleId+'/'+item.vehicleName
					 })
					 this.series.map(item => {
						 item.children=res.data
					 })
				}else{
					 alert(res.message)
			}
			})
		},
		
		/**
		 * 获取品牌
		 */
		getBrand(val){
			this.$http.get('/laborSynthesize/getBrandList',{
				merchantCode:this.merchantCode
			})
			.then(res=>{
				 console.log('请求车品牌结果',res)
				 if(res.code == '10000'){
					 res.data.map(item => {
						 item.value=item.brandId+'/'+item.brandName
					 })
				this.brand=res.data
				}else{
					 alert(res.message)
			}
			})
		},
		
		},
mounted() {

},
created() {}, //生命周期 - 创建之后
	}
</script>

<style scoped>
/deep/ .el-dialog__header{
	background:#169bd5!important
}
/deep/ .el-dialog{
	border-radius: 15px;
}
/deep/ .el-dialog__title{
	color:#fff;
	font-weight: bold;
	font-size: 20px;
}
/deep/ .el-input-group__prepend{
	 width: 13%;
}
</style>