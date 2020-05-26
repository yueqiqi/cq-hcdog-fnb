<!-- 选择兑换码弹窗 -->
<template>
	<div class='dis'>
		<el-dialog :close-on-click-modal='false' title="已选兑换码" center :visible.sync="codeShow" width="70%" :show-close='false'>
			<el-row>
			<el-col :span="12" >
				<div style="height: 70px;background: #f1f1f1;display: flex;align-items: center;padding:0 20px"><el-input v-model="search" placeholder="搜索优惠券"></el-input></div>
				<div>
					<el-table :show-header='false' :data='list' @selection-change="chooseDis" ref="multipleTable" @select="tableSelect">
						<el-table-column prop='name' label=""></el-table-column>
						<el-table-column type="selection"></el-table-column>
					</el-table>
				</div>
			</el-col>
			
			
			
			<el-col :span="12" style="margin-top: 15px;">
				<el-col :span='16'><div style="padding-left:15px">已选项{{chooseList.length}}</div></el-col>
				<el-col :span='7'><div>设置数量</div></el-col>
				<el-table :show-header='false' :data='chooseList'>
					<el-table-column prop='name' label=""></el-table-column>
					<el-table-column align="center" prop='goodsCount' label></el-table-column>
				</el-table>
			</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="close">取 消</el-button>
			    <el-button type="primary" @click="confirm">确认选择</el-button>
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {

		},
		props:{
			alertCodeList:Array,
			codeShow:Boolean,
		},
		data () {
			return {
				
				// 已选项
				chooseList:[],
				list:[],
				// 搜索优惠券
				search:'',
			disShow:true
			};
		},
		watch:{
			alertCodeList(val){
				val.map(item => {
					item.goodsCount=1
				})
				this.first(val)	
				this.list=val
			}
				
			
			
		},
		computed: {

		},
		methods: {
			//
			tableSelect(rows,row){
				//rows--选中的项   row--未选中行的项
				 let selected = rows.length && rows.indexOf(row) !== -1 // true就是选中，0或者false是取消选中
				 if(selected == false){
					 this.$http.post('/LaborRedeemCode/unlockedCode',[{
							merchantCode:this.merchantCode,
							exchangeCode:row.exchangeCode,
							type:row.type,
					 }])
					 .then(res=>{
					 	 console.log('%c请求结果','color:red;font-size:20px',res)
					 	 if(res.code == '10000'){
					 	}else{
					 		 alert(res.message)
					 }
					 })
				 }
			},
			
			
			
			// 表格中默认全选
			first(rows){
				// let that=this
				this.$nextTick(()=>{
						rows.forEach(row => {
								this.$refs.multipleTable.toggleRowSelection(row,true);
						});
				})
		},
			
			
			// 确定按钮
			confirm(){
				this.$emit('confirmCode',this.chooseList)
			},
			// 取消按钮
			close(){
				this.$emit('closeCode')
			},
			// 选择的优惠券
			chooseDis(val){
				this.chooseList=val
			},
		},
mounted() {
		
},
created() {
	this.merchantCode = this.$route.query.merchantCode;
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
.dis /deep/ .el-dialog__header{
	background:#578cfe!important
}
.dis /deep/ .el-dialog{
	/* border-radius: 24px; */
}
.dis /deep/ .el-dialog__title{
	color:#fff;
	font-weight: bold;
	font-size: 20px;
}
.dis /deep/ .el-dialog__headerbtn .el-dialog__close {
	color: #fff;
}
.dis /deep/ .el-dialog__body{
	padding:0
}
.dis /deep/ .el-dialog--center .el-dialog__footer{
	text-align: right;
}
</style>