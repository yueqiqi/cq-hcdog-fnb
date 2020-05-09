<!-- 组件说明 -->
<template>
	<div class=''>
		<div style="">
			<el-table :data="list"  id='exportTab'>
				<el-table-column prop="workorderType" label="工单类型">
					<template slot-scope="scope">
						<span>{{scope.row.workorderType==1?'综合单':'快捷单'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="workOrderCode" label="工单编号" width="180"></el-table-column>
				<el-table-column prop="plateNumber" label="车牌号"></el-table-column>
				<el-table-column prop="vehicleIdNum" label="车架号"></el-table-column>
				<el-table-column prop="customerName" label="客户姓名"></el-table-column>
				<el-table-column prop="customerPhone" label="手机号码"></el-table-column>
				<el-table-column prop="name" label="服务项" width="100%">
					<template slot-scope="scope">
						<div>
						<div v-for="(item,index) in scope.row.serverList2"  :key='index'>
							<div>{{item.goodsName}}</div>
						</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="商品">
					<template slot-scope="scope">
						<div v-for="(item,index) in scope.row.goodsList2" :key='index' >
							<div>{{item.goodsName}}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="totalMoney" label="工单总额"></el-table-column>
				<el-table-column prop="preferentialMoney" label="优惠金额"></el-table-column>
				<el-table-column prop="realityMoney" label="应收金额/元"></el-table-column>
				<el-table-column prop="repairName" label="开单人员"></el-table-column>
				<el-table-column prop="workorderTime" label="开单时间"></el-table-column>
				<el-table-column prop="payTime" label="支付完成时间" width="180"></el-table-column>
				<el-table-column prop="name" label="状态">
					<template slot-scope="scope">
						<span :style="scope.row.status == 1||scope.row.status == 2?{color:'#0000ff'}:(scope.row.status == 0||scope.row.status == 3?{color:'#00cc00'}:(scope.row.status == 4?{color:'#ff0000'}:{color:'#333333'}))">{{ scope.row.status == 0?'草稿':(scope.row.status == 1?'施工中':(scope.row.status == 2?'待确认':(scope.row.status == 3?'待支付':(scope.row.status == 4?'挂账':(scope.row.status == 5?'已完成':'已作废')))))}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			list:Array
		},
		components: {
			
		},
		data () {
			return {

			};
		},
		computed: {

		},
		methods: {

		},
mounted() {

},
created() {}, //生命周期 - 创建之后
	}
</script>

<style scoped>

</style>
