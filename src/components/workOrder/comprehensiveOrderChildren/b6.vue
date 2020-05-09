<!--客户自带材料 -->
<template>
	<div class='b6'>
			<div class="font-big" style="padding-left: 36px;line-height: 60px;">客户自带材料</div>
			<el-table  :data="manOur" :header-cell-style="{color:'#333',fontSize:'14px',fontWeight:'bold',fontSize:'16px',backgroundColor:'#d7d7d7'}" style="width: 100%" border>
			  <el-table-column align='center'  prop="goodsName" label="商品名称">
					<template slot-scope="scope">
							<el-input v-model="scope.row.goodsName" placeholder='请输入商品名称' :disabled='dis' @change='input'></el-input>
					</template>
				</el-table-column>
			  <el-table-column align='center' prop="brandName" label="品牌">
					<template slot-scope="scope">
							<el-input v-model="scope.row.brandName" placeholder='请输入品牌' :disabled='dis' @change='input'></el-input>
					</template>
				</el-table-column>
			  <el-table-column align='center' prop="model" label="规格型号">
					<template slot-scope="scope">
							<el-input v-model="scope.row.model" placeholder='请输入规格型号' :disabled='dis' @change='input'></el-input>
					</template>
				</el-table-column>
				<el-table-column align='center' prop="goodsCount" label="商品数量" width="170">
				<template slot-scope="scope">
					<!-- :disabled="scope.row.gift==1" -->
					<el-input-number style="width: 100%;" :min="1" v-model="scope.row.goodsCount" @change="changeManOurNum(scope.row.price,scope.row.goodsCount,scope.$index, manOur)"  label="描述文字" :disabled='dis'></el-input-number>
				</template>						
				</el-table-column>
				<el-table-column align='center' prop="remarks" label="备注">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remarks" placeholder='请输入备注' :disabled='dis' @change='input'></el-input>
					</template>
				</el-table-column>
				<el-table-column align='center' prop="" label="操作">
					<template slot-scope="scope">
						<div><el-button @click.native.prevent="deleteRow(scope.$index, manOur)" style="color:red" type="text" size='small' :disabled='dis'>删除</el-button></div>
					</template>
				</el-table-column>
			</el-table>
			
			<div v-if="dis!=true" class="add" @click="add">
				<el-button type="primary">+新增</el-button>
			</div>
	</div>
</template>

<script>
	export default {
		components: {
		},
		props:{
			dis:{
			type:Boolean,
			},
			manOur:{
				type:Array,
				// default:[{goodsName:'',brandName:'',model:'',goodsCount:'1',remarks:'',type:'4'}]
				default:[]
			},
			useType:String
		},
		data () {
			return {
			// 搜索
			manOurSearch:'',
			// manOurs:[{goodsName:'',brandName:'',model:'',goodsCount:'1',remarks:''}],
			};
		},
		computed: {

		},
		methods: {
		/**
		 * 客户自带材料
		 */
		// 新增
		add(){
			this.manOur.push({goodsName:'',brandName:'',model:'',goodsCount:'1',remarks:'',type:4})
		},
		
		//提交给父组件的数据
		input(){
			this.$emit('children',this.manOur)
		},
	
	
		// 删除本行信息
		deleteRow(index, rows) {
			this.manOur.splice(index,1)
			this.$emit('children',this.manOur)
		},

		// 服务次数步进器
		changeManOurNum(money,num,index,row){
			this.$emit('children',this.manOur)
		},
		
		},
mounted() {
},
created() {}, //生命周期 - 创建之后
	}
</script>

<style scoped>
.b6{
	background: #fff;border-radius:15px ;margin-top: 10px;padding-top: 10px;
}
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
	/* width: 100% */
}
</style>

