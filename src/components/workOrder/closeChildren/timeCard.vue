<!-- 选择次卡弹窗 -->
<template>
	<div class='dis'>
		<el-dialog :close-on-click-modal='false' title="选中的次卡商品" center :visible.sync="timersCardShow" width="40%" :show-close='false'>
			<el-row>
			<!-- <el-col :span="12" > -->
				<!-- <div style="height: 70px;background: #f1f1f1;display: flex;align-items: center;padding:0 20px"><el-input v-model="search" placeholder="搜索次卡商品"></el-input></div> -->
<!-- 				<div>
					<el-table ref='multipleTable' :data='vipCards'  @selection-change="chooseDis" border>
						<el-table-column prop='goodsName' label="会员卡类型">
							<template slot-scope='scope'>
								<span>{{scope.row.goodsName}}</span>
								<span>{{scope.row.goodsType==1?' '}}</span>
								<span style="margin-left: 30px;">{{scope.row.memberCardName}}</span>
							</template>
						</el-table-column>
						<el-table-column prop='goodsName' label="会员卡卡号"></el-table-column>
						<el-table-column prop='name' label="会员卡名称"></el-table-column>
						<el-table-column prop='goodsName' label="卡内项目"></el-table-column>
						<el-table-column prop='surplusCount' label="数量"></el-table-column>
					</el-table>
				</div>
			</el-col> -->
			
			
			
			<el-col :span="24" style="margin-top: 15px;">
				<el-col :span='16'><div style="padding-left:15px">已选项{{timeCardList.length}}</div></el-col>
				<el-col :span='7'><div>已选数量</div></el-col>
				<el-table :show-header='false' :data='timeCardList' @selection-change="chooseDis">
					<el-table-column prop='goodsName'></el-table-column>
					<el-table-column align="center" prop='goodsCount'>
						<!-- <template slot-scope="scope">
							<el-input-number v-model="scope.row.goodsCount" :min="1" :max="scope.row.surplusCount" @change="inputNumber(scope.row,scope.$index)" size="small"></el-input-number>
						</template> -->
					</el-table-column>
				</el-table>
			</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="close">关 闭</el-button>
			    <!-- <el-button type="primary" @click="confirm">确认选择</el-button> -->
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {

		},
		props:{
			timeCardList:Array,
			timersCardShow:Boolean,
			vipCards:Array
		},
		data () {
			return {
				// multipleTable:[],
				// 已选项
				chooseList:[],
				list:[],
				val2:[],
				// 搜索优惠券
				search:'',
			disShow:true
			};
		},
		
		watch:{
			timersCardShow(newVal,oldVal){
				// console.log('新值',newVal,oldval)
				// if(newVal){
					// this.$bus.on('showList',(val,val2)=>{
					// 		val.map(item => {
					// 			item.goodsCount=1
					// 		})
					// 	this.list = val || [];
						
					// this.$nextTick(() => {
					// 	this.list.map((items,ix) => {
					// 		this.val2.map((item,idx) => {
					// 			if(item.goodsCode+item.goodsName+item.goodsVipId==items.goodsCode+items.goodsName+items.goodsVipId){
					// 			this.$refs.multipleTable.toggleRowSelection(this.list[ix],true)
					// 			}
					// 		})
					// 	})
					// });
					// })
				// }
			}
		},
		computed: {
			
		},
		methods: {
			/**
			 * 步进器
			 */
			inputNumber(row,idx){
				this.$set(this.chooseList,idx,row)
			},
			
			
			
			
			/**
			 * 查卡余额和最高可用抵扣金额
			 */
			getBalance(onceCards){
				this.$http.post('/LaborBlance/getBalance',{
					merchantCode:this.merchantCode,
					workorderCode:this.orderCode,
					vipCards:this.$props.vipCards,  //会员卡集合--array
					onceCards,	//次卡集合--array
				})
				.then(res=>{
					 console.log('%c请求最高可用抵扣金额结果','color:red;font-size:20px',res)
					 if(res.code == '10000'){
							this.$emit('confirmTimers',this.chooseList,res.data.cardBalance,res.data.maxDiscount)	
					}else{
						 alert(res.message)
				}
				})
			},
			
			
			
			// 确定按钮
			confirm(){
				// this.getBalance(this.chooseList)
				this.$emit('confirmTimers',this.chooseList)	
			},
			// 取消按钮
			close(){
				this.$emit('closeTimers')
			},
			// 选择的优惠券
			chooseDis(val){
				this.chooseList=val
				// console.log('选择的',val)
			},
		},
mounted() {

},
created() {
	this.merchantCode=this.$route.query.merchantCode
	this.orderCode = this.$route.query.workOrderCode;
	          //默认全选
	// this.$bus.on('showList',(val,val2)=>{
	// 	console.log("val: " , val,val2);
	// 		val.map(item => {
	// 			item.goodsCount=1
	// 		})
	// 	this.list = val || [];
	// this.$nextTick(() => {
	// 	this.list.map((items,ix) => {
	// 		val2.map((item,idx) => {
	// 			if(item.goodsCode+item.goodsName+item.goodsVipId==items.goodsCode+items.goodsName+items.goodsVipId){
	// 				console.log("ix: " , ix);
	// 			this.$refs.multipleTable.toggleRowSelection(this.list[ix],true)
	// 			}
	// 		})
	// 	})
	// });
	// })
	//默认全选

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