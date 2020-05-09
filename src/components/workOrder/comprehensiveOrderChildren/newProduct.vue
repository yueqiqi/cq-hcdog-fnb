<!-- 新建商品 -->
<template>
	<div class='completeConfirm'>
		<el-dialog title="新建商品" :close-on-click-modal='false' center="" :visible.sync="npIsShow" width="50%">
			
			<el-form ref="form" :model="form" label-width="150px">
			  <el-form-item label="商品(配件)名称">
			    <el-input v-model="form.name" placeholder='请输入商品名称'></el-input>
			  </el-form-item>
				
			  <el-form-item label="商品(配件)分类">
					<el-cascader style="width: 100%;" v-model="form.region" :options="searchList" @change="handleChange" placeholder="请选择商品分类"></el-cascader>
			  </el-form-item>
				
			  <el-form-item label="品牌">
			    <el-input v-model="form.brand" placeholder='如"米其林"等'></el-input>
			  </el-form-item>
				
				<el-form-item label="规格">
					<el-input  v-model="form.spe" placeholder='如"255/60R18"、"J000823"等'></el-input>
				</el-form-item>
				
			  <el-form-item label="计量单位">
					<el-select clearable v-model="form.unit" style="width: 100%;" placeholder='请选择计量单位' @focus="getUnit">
						<el-option  v-for="item in unit" :key="item" :label="item" :value="item">
					      <span>{{ item }}</span>
					    </el-option>
					</el-select>
			  </el-form-item>
				
				<el-form-item label="商品(配件)售价">
				  <el-input  v-model="form.price" placeholder='¥0'></el-input>
				</el-form-item>
				
				<el-form-item label="原厂编码">
				  <el-input  v-model="form.code" placeholder='请输入原厂编码'></el-input>
				</el-form-item>
				
				<el-form-item label="库存阈值">
				  <el-input  v-model="form.repertory" placeholder='请输入安全库存预警值'></el-input>
				</el-form-item>
				
				<el-form-item label="配件编码">
				  <el-input  v-model="form.coding" placeholder='请输入商品配件编码'></el-input>
				</el-form-item>
				
			  <el-form-item label="厂家类型">
			    <el-select v-model="form.model" style="width: 100%;" placeholder="请选择厂家类型">
			      <el-option v-for="(item,index) in type" :label="item.label" :value="item.value" :key='index'></el-option>
			    </el-select>
			  </el-form-item>
				
				<el-form-item label="条形码">
				  <el-input  v-model="form.barCode" placeholder='请输入条形码'></el-input>
				</el-form-item>
				
				<el-form-item label="商品(配件)介绍">
				  <el-input placeholder='请输入商品介绍、例如：库存/规格/品牌等' type="textarea" v-model="form.text"></el-input>
				</el-form-item>
			</el-form>
			
			
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
			npIsShow:{
			type:Boolean,
			},
			searchList:Array,
			},
		data () {
			return {
				// 是否显示工时
				showHour:false,
				radio:'1',
				chooseRadio:null,
				// 厂家类型
				type:[
					{label:'原厂件',value:'1'},{label:'品牌件',value:'2'},{label:'副厂件',value:'3'},{label:'拆解件',value:'4'},{label:'修复件',value:'5'},{label:'假货',value:'6'},
				],
				// 计量单位
				unit:[],
				
				// 表单
				form: {
					// 服务名称
					name: '',
					// 配件分类
					region:'',
					// 品牌
					brand:'',
					// 规格
					spe:'',
					// 计量单位
					unit: '',
					// 配件售价
					price:'',
					// 原厂编码
					code:'',
					// 库存阈值
					repertory:'',
					// 配件编码
					coding:'',
					// 厂家类型
					model:'',
					// 条形码
					barCode:'',
					// 配件介绍
					text:'',
				},
				newProduct:true,
				tel:'',
			};
		},
		computed: {

		},
		methods: {
			// 获取下拉框计量单位的options值
			getUnit(){
				this.$http.get('/laborSynthesize/getUnit',{
					merchantCode:this.merchantCode
				})
				.then(res=>{
					 if(res.code == '10000'){
						this.unit=res.data
					}else{
						 alert(res.message)
				}
				})
			},
			
			
			
			
			// 选择的分类
			handleChange(value) {
			        console.log(value);
			      },
			
			
			
			
			
			// 取消按钮
				close(){
					this.$emit('closeNp')
				},
	// 保存
			save(){
				this.$emit('saveNp')
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
					alert('请选择商品分类')
				}
				this.addNewProduct(f.name,oneCategoryCode,oneCategoryName,twoCategoryCode,twoCategoryName,threeCategoryCode,threeCategoryName,f.price,f.brand,f.spe,f.unit,f.code,f.model,f.barCode,f.text)
				setTimeout(()=>{
					// 表单
					this.form= {
						// 服务名称
						name: '',
						// 配件分类
						region:'',
						// 品牌
						brand:'',
						// 规格
						spe:'',
						// 计量单位
						unit: '',
						// 配件售价
						price:'',
						// 原厂编码
						code:'',
						// 库存阈值
						repertory:'',
						// 配件编码
						coding:'',
						// 厂家类型
						model:'',
						// 条形码
						barCode:'',
						// 配件介绍
						text:'',
					}
				},2000)
			},
			// 确认新建
		confirm(){
			this.$emit('sendNp')
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
				alert('请选择商品分类')
			}
			// console.log()
			console.log('分类',oneCategoryCode,oneCategoryName,twoCategoryCode,twoCategoryName,threeCategoryCode,threeCategoryName)
			this.addNewProduct(f.name,oneCategoryCode,oneCategoryName,twoCategoryCode,twoCategoryName,threeCategoryCode,threeCategoryName,f.price,f.brand,f.spe,f.unit,f.code,f.model,f.barCode,f.text)
			setTimeout(()=>{
				// 表单
				this.form={
					// 服务名称
					name: '',
					// 配件分类
					region:'',
					// 品牌
					brand:'',
					// 规格
					spe:'',
					// 计量单位
					unit: '',
					// 配件售价
					price:'',
					// 原厂编码
					code:'',
					// 库存阈值
					repertory:'',
					// 配件编码
					coding:'',
					// 厂家类型
					model:'',
					// 条形码
					barCode:'',
					// 配件介绍
					text:'',
				}
			},2000)
		},
		// 新建商品
		addNewProduct(name,oneCategoryCode,oneCategoryName,twoCategoryCode,twoCategoryName,threeCategoryCode,threeCategoryName,standardPrice,brandName,specification,unit,oemCode,quality,snCode,description){
			this.$http.post('/laborSynthesize/addGoods',{
				merchantCode:this.merchantCode,
				operateType:'1',
				type:'1',
				name,
				oneCategoryCode,
				oneCategoryName,
				twoCategoryCode,
				twoCategoryName,
				threeCategoryCode,
				threeCategoryName,
				standardPrice,
				createName:'fnb',
				createCode:'007',
				brandName,
				specification,
				unit,
				oemCode,
				quality,
				snCode,
				description,
				
			})
			.then(res=>{
				 console.log('请求新建商品结果',res)
				 if(res.code == '10000'){
				
				}else{
					alert(res.message)
				}
			})
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