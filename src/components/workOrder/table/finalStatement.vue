<!-- 结算单 -->
<template>
	<div class='' style="text-align: center;">
		<form id='form1'>
		<div class="cm">
			<h2>{{laborOrder.merchantName}}服务中心{{type}}</h2>
			<div>
				
				<div class="row">
					<div class="c1">工单编号：<span>{{laborOrder.workorderCode}}</span></div>
					<div  class="c1">开单时间：<span>{{laborOrder.createTime}}</span></div>
					<div  class="c1">打印时间：<span>{{printTime}}</span></div>
				</div>
				
				
				
				
				
				<!-- <el-row style="font-size: 0.833312rem;text-align: left;" class="row">
					<el-col :span="8"><div>工单编号：<span>{{laborOrder.workorderCode}}</span></div></el-col>
					<el-col :span="8"><div>开单时间：<span>{{laborOrder.createTime}}</span></div></el-col>
					<el-col :span="8"><div>打印时间：<span>{{printTime}}</span></div></el-col>
				</el-row> -->
				
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
				<!-- 维修/保养项目(配件) -->
				
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
				<h4 style="color: #666666;text-align: left;">预计合计：{{Number(all1)+Number(all2)}}元</h4>
				<!-- <div class="box d-flex" style="flex-wrap: wrap;">
					<div class="d-flex" v-for="(item,index) in t4" :key='index'>
						<div class="b1">{{item.name}}</div>
						<div class="b1">{{resPrice}}</div>
					</div>
				</div> -->
				<table  class="t3" style="width: 100%;">
					<tr v-for="(item,index) in t4" :key='index' style="float: left;width: auto;height: 40px;" class="tp">
						<td class="tm">{{item.name}}</td>
						<td class="tm">{{item.price}}</td>
						<!-- <td>{{item.name2}}</td>
						<td>{{resPrice}}</td> -->
					</tr>
				</table>
				
				
				<!-- 备注 -->
				<div style="color: #666666;text-align: left;margin-top: 1.25rem;" class="remark">*备注：<span>{{remark}}</span></div>
				<div style="margin-top: 1.5625rem;margin-bottom: 1.5625rem;color: #666666;text-align: left;">门店地址：<span>{{addr}}</span></div>
				
				
				
				
<!-- 				<el-row style="color: #666666">
					<el-col :span="12"><div style="text-align: left;">联系电话：<span>{{tel}}</span></div></el-col>
					<el-col :span="12">
						<div style="justify-content: flex-end;" class='d-flex'>
							<div>客户签字：</div>
							<div style="border-bottom: 0.0625rem solid #797979;width: 7.5rem;"></div>
						</div>
				</el-col>
				</el-row> -->
				<div>
					<div class="c2">联系电话：<span>{{tel}}</span></div>
					<div class="c3">客户签字：</div>
					<div class="border"></div>
				</div>
				
				
				
			</div>
		</div>
		</form>
		<!-- <button v-print="'#printTest'">打印</button> -->
		<button @click="printPdf">打印</button>
	</div>
</template>

<script>
	import {getLodop} from '../../../global/LodopFuncs.js'
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
				
				t4:[{name:'应付金额',price:'2450.00'},{name:'剩余应付金额',price:'2450.00'},{name:'剩余应付金额',price:'2450.00'},],
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
			 // 查询数据
			      printPdf() {
			        let  LODOP = getLodop();
			        // LODOP.PRINT_INIT("订货单");
			        LODOP.SET_PRINT_STYLE("FontSize", 12);
			        // LODOP.SET_PRINT_STYLE("Bold", 1);
			        // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
							
var strBodyStyle="<style> table,td { border: 1 solid #000000;border-collapse:collapse;text-align:center; }  table,th { border: 0;border-collapse:collapse;text-align:center;} h2{text-align:center;} .remark{margin-top:20px} .row{font-size:12px} .c1{float:left;width:33.33333%}  .c2{float:left;width:65%} .border{border-bottom: 1px solid #797979;width: 120px;float:left} .c3{float:left} .tm{border:1px solid #797979;color:#333; height:30px; line-height: 30px; padding: 0.625rem;} .tp{float: left;width: auto;height: 40px;}</style>";
							
							 var strFormHtml=strBodyStyle+document.getElementById("form1").innerHTML;
							
			        LODOP.ADD_PRINT_HTM(74, 200, 590, 1000,
			          strFormHtml);
							LODOP.SET_PRINT_PAGESIZE(1,2100,2970, document.getElementById("form1").innerHTML)//设定纸张大小	
								// LODOP.ADD_PRINT_TABLE(10,20,500,900,document.getElementById("form1").innerHTML)//增加表格项
			//        LODOP.PRINT();
			
			
			
			
			        LODOP.PREVIEW();
							// LODOP.PRINT() //直接打印
			      },
		},
mounted() {

},
created() {
	this.laborOrder=this.$route.params.data
	console.log(this.laborOrder)
	let list=this.$route.params.list
	list.map(item => {
		if(item.type==1){
			this.t2.push(item)
			this.all1+=Number(item.subtotalMoney)
		}else{
			this.t3.push(item)
			this.all2+=Number(item.subtotalMoney)
		}
	})
	this.resPrice=this.$route.params.resPrice
	this.vipNum=this.$route.params.vipNum
	// if(this.$route.params.payType!=''){
	// 	this.$route.params.payType.map(item => {
	// 		if(item)
	// 	})
	// }
	
	this.type=this.$route.params.type
	var mydate = new Date();  
	var onedate = mydate.toLocaleString('chinese', { hour12: false }); 
	this.printTime=onedate.replace(/\//g, '-')
	console.log(this.laborOrder)
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
	/* float: left; */
}
.t2 :first-child td{
	height: 1.5rem;
}
.t3 td{
	border: 1px solid #797979;
	color: #333;
	height: 2.1875rem;
	line-height: 2.1875rem;
	padding: 0.625rem;
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
	.row{display:flex;justify-content: space-between;}
	.c1{float:left;width:33.33333%}  .c2{float:left;width:65%} .border{border-bottom: 1px solid #797979;width: 120px;float:left} .c3{float:left}
</style>