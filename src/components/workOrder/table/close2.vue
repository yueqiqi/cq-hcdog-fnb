<!-- 报价单 -->
<template>
	<div class='' style="text-align: center;">
		<div id="printTest">
			<h2>{{laborOrder.merchantName}}{{type}}</h2>
			<div>
				<el-row style="font-size: 20px;text-align: left;">
					<el-col :span="8"><div>工单编号：<span>{{laborOrder.workorderCode}}</span></div></el-col>
					<el-col :span="8"><div>开单时间：<span>{{laborOrder.createTime}}</span></div></el-col>
					<el-col :span="8"><div>打印时间：<span>{{printTime}}</span></div></el-col>
				</el-row>
				
				<table class="t1" style='width: 100%;margin-top: 0.9375rem;'>
					<tr>
						<td>客户姓名</td>
						<td>{{laborOrder.customerName}}</td>
						<td>手机号</td>
						<td>{{laborOrder.customerPhone}}</td>
						<td>车牌号</td>
						<td>{{laborOrder.plateNumber}}</td>
					</tr>
					<tr>
						<td>会员卡</td>
						<td>{{vipNum}}张</td>
						<td>品牌/车型/车系</td>
						<td colspan="3">{{laborOrder.brandName+'/'+laborOrder.modelName+'/'+laborOrder.seriesName}}</td>
					</tr>
					<tr>
						<td>车架号</td>
						<td>{{laborOrder.vehicleIdNum}}</td>
						<td>进场时间</td>
						<td>{{laborOrder.createTime}}</td>
						<td>进场里程</td>
						<td>{{laborOrder.mileage}}</td>
					</tr>
				</table>
				<!-- 维修/保养项目(工时) -->
				<h4 v-if="t2.length>0" style="color: #666666;text-align: left;">维修/保养项目(工时)</h4>
				<table class="t2" style="width: 100%;" v-if="t2.length>0">
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
						<td>{{item.goodsName}}</td>
						<td>{{item.goodsCount}}</td>
						<td>{{item.price}}</td>
						<td>{{item.memberCardGoodsPrice}}</td>
						<td>{{item.subtotalMoney}}</td>
						<td>{{item.remarks}}</td>
					</tr>
					<tr>
						<td colspan="7" style="text-align: right;">
							<div style="padding-right: 0.3125rem;">金额合计:{{all1}}元</div>
						</td>
					</tr>
				</table>
				
				<h4 v-if="t3.length>0" style="color: #666666;text-align: left;">维修/保养项目(配件)</h4>
				<table class="t2" style="width: 100%;" v-if="t3.length>0">
					<tr>
						<td>序号</td>
						<td>商品项目</td>
						<td>数量</td>
						<td>价格/元</td>
						<td>优惠</td>
						<td>总价/元</td>
						<td>备注</td>
					</tr>
					<tr v-for="(item,index) in t3" :key='index'>
						<td>{{index+1}}</td>
						<td>{{item.goodsName}}</td>
						<td>{{item.goodsCount}}</td>
						<td>{{item.price}}</td>
						<td>{{item.memberCardGoodsPrice}}</td>
						<td>{{item.subtotalMoney}}</td>
						<td>{{item.remarks}}</td>
					</tr>
					<tr>
						<td colspan="7" style="text-align: right;">
							<div style="padding-right: 0.3125rem;">金额合计:{{all2}}元</div>
						</td>
					</tr>
				</table>
				
				<!-- 预计合计 -->
				<!-- <h4 style="color: #666666;text-align: left;">预计合计：{{(Number(all1)+Number(all2)).toFixed(2)}}元</h4> -->
				<h4 style="color: #666666;text-align: left;">预计合计：{{(Number(resPrice)).toFixed(2)}}元</h4>
				<table  class="t8" style="width: 100%;">
					<tr v-for="(item,index) in t4" :key='index' style="float: left;width: auto;height: 40px;" class="tp">
						<td class="tm">{{item.name}}</td>
						<td class="tm">{{Number(item.price).toFixed(2)}}</td>
						<!-- <td>{{item.name2}}</td>
						<td>{{resPrice}}</td> -->
					</tr>
				</table>
				
				<!-- 备注 -->
				<div style="color: #666666;text-align: left;margin-top: 1.25rem;" class="remark">*备注：<span>{{laborOrder.remarks}}</span></div>
				<div style="margin-top: 1.5625rem;margin-bottom: 1.5625rem;color: #666666;text-align: left;">门店地址：<span>{{laborOrder.merchantAddress}}</span></div>
				
				<el-row style="color: #666666">
					<el-col :span="12"><div style="text-align: left;">联系电话：<span>{{laborOrder.merchantPhone}}</span></div></el-col>
					<el-col :span="12">
						<div style="justify-content: flex-end;" class='d-flex'>
							<div>客户签字：</div>
							<div style="border-bottom: 0.0625rem solid #797979;width: 7.5rem;"></div>
						</div>
				</el-col>
				</el-row>
			</div>
		</div>
		<el-button v-print="'#printTest'" type="primary" style="width: 150px;margin-top: 100px;margin-bottom: 100px;">打印</el-button>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data () {
			return {
				type:'结算单',
				// 应付金额
				resPrice:0,
				company:'XXXXX',
				// 应付金额
				
				t4:[],
				// 联系电话
				tel:'17717717717',
				// 门店地址
				addr:'上海市嘉定区',
				// 备注
				remark:'1',
				// 预计合计
				prePrice:'2100.00',
				// 配件金额合计
				all2:0,
				t3:[],
				// 工时金额合计
				all1:0,
				t2:[],
				vipNum:0,
				// 打印时间
				printTime:'',
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
created() {
	this.laborOrder=this.$route.params.data
	console.log(this.$route.params)
	let list=this.$route.params.list
	// console.log('%c额就是那','color:#70ff57;font-size:20px;font-weight:bold',list)
	if(list.length>0){
		
	list.map(item => {
		if(item.type==1){
			this.t2.push(item)
			this.all1+=Number(item.subtotalMoney)
		}else{
			this.t3.push(item)
			this.all2+=Number(item.subtotalMoney)
		}
	})
	}
	this.resPrice=this.$route.params.resPrice
	this.vipNum=this.$route.params.vipNum
	let type = this.$route.params.payType.split(',')
	let type2=[]
	type.map(val => {
		type2.push({num:val})
	})
	console.log('选择的type',type2,type)
	if(type!=''){
		if(type2.length==1){
			if(type==1){
				this.t4=[{name:'应付金额',price:this.$route.params.resPrice},{name:'现金',price:this.$route.params.resPrice}]
			}else if(type==3){
				this.t4=[{name:'应付金额',price:this.$route.params.resPrice},{name:'微信/支付宝支付',price:this.$route.params.resPrice}]
			}else if(type==2){
				this.t4=[{name:'应付金额',price:this.$route.params.resPrice},{name:'银行卡支付',price:this.$route.params.resPrice}]
			}else if(type==5){
				this.t4=[{name:'应付金额',price:this.$route.params.resPrice},{name:'微信转账',price:this.$route.params.resPrice}]
			}else if(type==6){
				this.t4=[{name:'应付金额',price:this.$route.params.resPrice},{name:'支付宝转账',price:this.$route.params.resPrice}]
			}
		}else{
			type2.map(item => {
				if(item.num==1){
					item.name='现金'
					item.price=this.$route.params.cashPayMoney
				}else if(item.num==3){
					item.name='微信/支付宝支付'
					item.price=this.$route.params.wechatAliPay
				}else if(item.num==2){
					item.name='银行卡支付'
					item.price=this.$route.params.swipecardPayMoney
				}else if(item.num==5){
					item.name='微信转账'
					item.price=this.$route.params.wechatTransferPayMoney
				}else if(item.num==6){
					item.name='支付宝转账'
					item.price=this.$route.params.cashPayMoney
				}
			})
			type2.unshift({name:'应付金额',price:this.$route.params.resPrice})
			this.t4=type2
		}
	}else{
		this.t4=[{name:'应付金额',price:this.$route.params.resPrice}]
	}
	
	this.type=this.$route.params.type
	console.log('%c单类型','color:#70ff57;font-size:20px;font-weight:bold',this.type)
	var mydate = new Date();  
	var onedate = mydate.toLocaleString('chinese', { hour12: false }); 
	this.printTime=onedate.replace(/\//g, '-')
}, //生命周期 - 创建之后
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
	.t8 td{
	border: 1px solid #797979;
	color: #333;
}
</style>