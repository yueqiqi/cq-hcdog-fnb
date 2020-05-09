<!-- 选择优惠券弹窗 -->
<template>
	<div class='dis'>
		<el-dialog :close-on-click-modal='false' title="选择优惠券" center :visible.sync="couponIsShow" width="70%">
			<el-row>
				
			<el-col :span="12" >
				<div style="height: 70px;background: #f1f1f1;display: flex;align-items: center;padding:0 20px"><el-input v-model="search" placeholder="搜索优惠券"></el-input></div>
				<div>
					<el-table :show-header='false' :data='list' @selection-change="chooseDis">
						<el-table-column prop='couponName' label="标题"></el-table-column>
						<el-table-column type="selection"></el-table-column>
					</el-table>
				</div>
			</el-col>
			
			
			
			<el-col :span="12" style="margin-top: 15px;">
				<el-col :span='16'><div style="padding-left:15px">已选项{{chooseList.length}}</div></el-col>
				<el-col :span='7'><div>设置数量</div></el-col>
				<el-table :show-header='false' :data='chooseList'>
					<el-table-column prop='couponName' label="标题"></el-table-column>
					<el-table-column align="center" prpo='goodsCount' label>
						<template slot-scope="scope">
							<el-input-number v-model="scope.row.goodsCount" :min="1" :max="scope.row.surplusCount" label="" size="small"></el-input-number>
						</template>
					</el-table-column>
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
			couponIsShow:Boolean,
			couponList:Array
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
		computed: {

		},
		watch:{
			couponList(val){
				val.map(item => {
					item.goodsCount=1
				})
				this.list=val
			}
		},
		methods: {
			// 确定按钮
			confirm(){
				this.$emit('confirmCoupon',this.chooseList)
			},
			// 关闭按钮
			close(){
				this.$emit('closeCoupon')
			},
			// 选择的优惠券
			chooseDis(val){
				console.log('选择的下标',val)
				this.chooseList=val
			},
		},
mounted() {

},
created() {}, //生命周期 - 创建之后
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