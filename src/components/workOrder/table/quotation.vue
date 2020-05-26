<!-- 报价单 -->
<template>
	<div class='' style="text-align: center;">
		<div id="printTest">
			<h2>{{company}}服务中心报价单</h2>
			<div>
				<el-row style="font-size: 20px;text-align: left;">
					<el-col :span="8"><div>工单编号：<span>{{orderNum}}</span></div></el-col>
					<el-col :span="8"><div>开单时间：<span>{{date}}</span></div></el-col>
					<el-col :span="8"><div>打印时间：<span>{{printTime}}</span></div></el-col>
				</el-row>
				
				<table class="t1" style='width: 100%;margin-top: 0.9375rem;'>
					<tr>
						<td>客户姓名</td>
						<td>{{t1.userName}}</td>
						<td>手机号</td>
						<td>{{t1.Phone}}</td>
						<td>车牌号</td>
						<td>{{t1.carNum}}</td>
					</tr>
					<tr>
						<td>会员卡</td>
						<td>{{t1.vip}}张</td>
						<td>品牌/车型/车系</td>
						<td colspan="3">{{t1.brand}}</td>
					</tr>
					<tr>
						<td>车架号</td>
						<td>{{t1.vin}}</td>
						<td>进场时间</td>
						<td>{{t1.approachTime}}</td>
						<td>进场里程</td>
						<td>{{t1.kil}}</td>
					</tr>
				</table>
				<!-- 维修/保养项目(工时) -->
				<h4 style="color: #666666;text-align: left;">维修/保养项目(工时)</h4>
				<table class="t2" style="width: 100%;">
					<tr>
						<td>序号</td>
						<td>服务项目</td>
						<td>数量</td>
						<td>价格/元</td>
						<td>优惠</td>
						<td>总价/元</td>
						<td>备注</td>
					</tr>
					<tr v-for="(item,index) in t2" :key='index'>
						<td>{{index+1}}</td>
						<td>{{item.name}}</td>
						<td>{{item.num}}</td>
						<td>{{item.price}}</td>
						<td>{{item.dis}}</td>
						<td>{{item.money}}</td>
						<td>{{item.remark}}</td>
					</tr>
					<tr>
						<td colspan="7" style="text-align: right;">
							<div style="padding-right: 0.3125rem;">金额合计:{{all}}元</div>
						</td>
					</tr>
				</table>
				
				<!-- 预计合计 -->
				<h4 style="color: #666666;text-align: left;">预计合计：{{prePrice}}元</h4>
				<div class="box d-flex" style="flex-wrap: wrap;">
					<div class="d-flex" v-for="(item,index) in t4" :key='index'>
						<div class="b1">{{item.name}}</div>
						<div class="b1">{{item.price}}</div>
					</div>
				</div>
				
				<!-- 备注 -->
				<div style="color: #666666;text-align: left;">*备注：<span>{{remark}}</span></div>
				<div style="margin-top: 1.5625rem;margin-bottom: 1.5625rem;color: #666666;text-align: left;">门店地址：<span>{{addr}}</span></div>
				<el-row style="color: #666666">
					<el-col :span="12"><div style="text-align: left;">联系电话：<span>{{tel}}</span></div></el-col>
					<el-col :span="12">
						<div style="justify-content: flex-end;" class='d-flex'>
							<div>客户签字：</div>
							<div style="border-bottom: 0.0625rem solid #797979;width: 7.5rem;"></div>
						</div>
				</el-col>
				</el-row>
			</div>
		</div>
		<button v-print="'#printTest'">打印</button>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data () {
			return {
				company:'XXXXX',
				// 应付金额
				
				t4:[{name:'应付金额',price:'2450.00'},{name:'微信支付',price:'2450.00'},],
				// 联系电话
				tel:'17717717717',
				// 门店地址
				addr:'上海市嘉定区',
				// 备注
				remark:'1',
				// 预计合计
				prePrice:'2100.00',
				// 配件金额合计
				all2:'2100.00',
				t3:[{name:'全车做漆',num:'1',price:'2200.00',dis:'100.00',money:'2100.00',remark:'--'},{name:'全车做漆',num:'1',price:'2200.00',dis:'100.00',money:'2100.00',remark:'--'},],
				// 工时金额合计
				all:'2100.00',
				t2:[{name:'全车做漆',num:'1',price:'2200.00',dis:'100.00',money:'2100.00',remark:'--'},{name:'全车做漆',num:'1',price:'2200.00',dis:'100.00',money:'2100.00',remark:'--'},],
				t1:{
					userName:'',
					Phone:'',
					carNum:'',
					vip:'0',
					brand:'',
					vin:'',
					approachTime:'2019-10-08 10:00:00',
					kil:'',
				},
				// 打印时间
				printTime:'2019-10-10 10:00:11',
				// 开单时间
				date:'2019-10-10 10:00:00',
				// 工单编号
				orderNum:'1910100094100584',
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
table{
	border-collapse: collapse;
	text-align: center;
}
.t1 td{
	 border: 1px solid #797979;
	 color: #333;
	 height: 2.1875rem;
}
.t1 tr td{
	width: 9.375rem;
}
.t2 td{
	border: 1px solid #797979;
	color: #333;
	height: 2.1875rem;
}
.t2 :first-child td{
	height: 1.5rem;
}
.t4 td{
		 border: 1px solid #797979;
		 color: #333;
		 height: 1.5625rem;
}
.t4 tr td{
	height: 1.875rem;
}
.b1{
	border: 1px solid #797979;
	width: 9.375rem;
	height: 2.1rem;
	line-height: 2.1rem;
}
.box{
	margin-bottom: 2.5rem;
	}
</style>