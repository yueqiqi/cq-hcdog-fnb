<!-- 开单详情 -->
<template>
	<div class='billdetail'>
<!-- 		<div style=" margin-left: 120px;height: 50px;"><h2 style="text-align: left;">工单管理/工单列表/开单详情</h2></div>
		<div style="height: 20px;"><hr /></div> -->
		
	<div style="display: flex;align-items: baseline;padding-left: 50px;">
	<el-col :span="3"><div class="font-big">{{laborOrder.plateNumber}}</div></el-col>
	<el-col :span="5"><span>{{laborOrder.payName}}</span>&nbsp;&nbsp;<span>{{laborOrder.payTel}}</span></el-col>
	<el-col :span="3"><div>{{laborOrder.payTime}}</div></el-col>
	<el-col :span="6">
		<div class="d-flex" style="align-items: center;
		">
		<div style="width: 40%;">本次公里数:</div>
		<el-input v-model="laborOrder.thisMileage">
			<template slot="append">KM</template>
		</el-input>
		</div>
	</el-col>
	</div>
	
		<div style="margin-top: 50px;">
			<el-row style="align-items: center;display: flex;">
				
			<el-col :span='14'><div class="font-big">已选项目{{listed.length}}个</div></el-col>
			<el-col :span="10"  style="align-items: center;">
				<el-button type='text' style="text-decoration: underline;font-size: 14px;" @click='look'>查看工单详情></el-button>
			</el-col>
			</el-row>
			
			<el-table @cell-click="cellClick" :header-cell-style="{color:'#333',fontSize:'14px',background:'#ccc'}" border :data="listed" style="width: 70%;">
				<el-table-column align='center' prop='goodsName' label="项目"></el-table-column>
				<el-table-column align="center" prop='price' label="价格">
					<template slot-scope="scope">
						<span>¥{{scope.row.price}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" prop='goodsCount' label="数量"></el-table-column>
				<el-table-column align='center' prop='subtotalMoney' label="小计">
					<template slot-scope="scope">
						<span>¥{{scope.row.subtotalMoney}}</span>
					</template>
				</el-table-column>
				<el-table-column prop='sell' label="销售/施工人员">
					<template slot-scope="scope">
							<div style="position:relative;left:132px">
								<i @click="setEmpAlert(scope.$index, list)" class="el-icon-edit-outline"></i>
							</div>
							<div class="d-flex" style="flex-wrap: wrap;">
								<div>销售:</div>
							<div v-for="(item,index) in scope.row.employeeList" :key='index' >
						<div style="margin-left:5px">{{item.customerType==1?item.employeeName:''}}</div>
							</div>
							</div>
						<div class="d-flex" style="flex-wrap: wrap;">
								<div>施工:</div>
							<div v-for="(item,index) in scope.row.employeeList" :key='index' >
						<div style="margin-left:5px">{{item.customerType==2?item.employeeName:''}}</div>
							</div>
							</div>
					</template>
				</el-table-column>
				
				<el-table-column prpo='num' align='center' label="提成业绩">
					<template slot-scope="scope">
						<span>--</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
		<div style="margin-top: 20px;">
			<div class="font-big" style="line-height: 60px;">支付信息</div>
			
			<table class="table">
				<tr>
					<td>应收金额</td>
					<td>¥{{(laborOrder.receivablePayMoney)||0}}</td>
					<td>会员卡扣除</td>
					<td>{{laborOrder.vipOffsetMoney ||0}}元</td>
					<td>优惠券折扣</td>
					<td>¥{{laborOrder.couponMoney||0}}</td>
					<td>人工优惠</td>
					<td>¥{{laborOrder.preferentialMoney||0}}</td>
					<td>现金</td>
					<td>¥{{laborOrder.cashPayMoney||0}}</td>
				</tr>
				<tr>
					<td>微信转账</td>
					<td>¥{{laborOrder.wechatTransferPayMoney||0}}</td>
					<td>支付宝转账</td>
					<td>¥{{laborOrder.aliTransferPayMoney||0}}</td>
					<td>刷银行卡</td>
					<td>¥{{laborOrder.swipecardPayMoney||0}}</td>
					<td>微信支付/支付宝支付</td>
					<!-- <td>¥{{laborOrder.wechatPayMoney||0}}</td> -->
					<td>¥{{laborOrder.wechatAliPay||0}}</td>
					<!-- <td>支付宝支付</td> -->
					<!-- <td>¥{{laborOrder.aliPayMoney||0}}</td> -->
					<!-- <td>¥{{laborOrder.wechatAliPay||0}}</td> -->
				</tr>
				<tr>
					<td>兑换码抵扣</td>
					<td>¥{{laborOrder.redeemCodeMoney||0}}</td>
					<td>实收金额</td>
					<td>¥{{laborOrder.realityMoney||0}}</td>
					<td>完成时间</td>
					<td>{{laborOrder.payTime}}</td>
					<!-- <td>{{laborOrder.updateTime}}</td> -->
					<td>操作人</td>
					<td>{{laborOrder.updateName}}</td>
					<td>支付方式</td>
					<td>{{laborOrder.payType==1?'现金':(laborOrder.payType==2?'刷卡':(laborOrder.payType==3?'微信':(laborOrder.payType==4?'支付宝':'组合支付')))}}</td>
				</tr>
			</table>
			<div style="display: flex;justify-content: flex-end;margin-top: 15px;align-items: center;">
				<div>本次备注：</div>
				<el-input style="width: 400px;" maxlength='120' v-model='remark' placeholder='请输入备注信息(打印显示,最多120字)'></el-input>
			</div>
		</div>
		
		<div class="footer">
			<div>共{{server.length}}项服务【含赠送{{fuWuGiftTimes}}项】,</div>
			<div>{{product.length}}件商品【含赠送{{goodsGiftTimes}}件】</div>
			<div>总价: <span style="font-size: 24px;color: #ff0000;font-weight: bold;">¥{{total}}</span></div>
			<el-button  @click='save' size='small' type='primary' style="width: 100px;height: 30px;margin-left:30px ;">保 存</el-button>
			
			<!-- <el-button  @click='save' size='small' type='primary' style="width: 100px;height: 30px;margin-left:30px ;">保 存</el-button> -->
		</div>
		
		
		
		<emp :chooseEmp="empAlert" :empListf='empList1' :empLists="empList2" @closeEmpAlert="closeEmpAlert" @empConfirm="sendEmpData"></emp>
	</div>
</template>

<script>
	// 选择员工弹窗
	import emp from '../../Alert/chooseEmp.vue';
	export default {
		components: {
emp,
		},
		data () {
			return {
				fuWuGiftTimes:0,//服务赠送个数
				goodsGiftTimes:0,//商品赠送个数
				// 服务类
				server:[],
				// 商品类
				product:[],
				
				// 选择销售施工弹窗的下标
				chooseEmpidx:null,
				// 选择销售施工弹窗
				empAlert:false,
				// 销售
				empList1:[],
				// 施工
				empList2:[],
				
				// 总价
				total:0,
				// 赠送
				give2:'0',
				// 赠送项
				give:'0',
				// 本次备注
				remark:'',
				
				laborOrder:{
					redeemCodeMoney:'', //应收金额
					vipOffsetMoney:'', //会员卡抵扣金额
					preferentialMoney:'', //人工优惠金额
					cashPayMoney:'', //现金支付金额
					wechatTransferPayMoney:'', //微信转账金额
					aliTransferPayMoney:'', //支付宝转账金额
					swipecardPayMoney:'', //刷卡支付金额
					wechatPayMoney:'', // 微信支付金额
					aliPayMoney:'', // 支付宝支付金额
					redeemCodeMoney:'', // 兑换码抵扣
					createTime:'', // 完成时间
					creatorId:'', //    操作人id
					realityMoney:'', // 实收金额
					name:'前台', //操作人员
					payType:'已完成', //已支付 
					dis:'0', //优惠券
				},
				
				
				list:[],
				laborAdditionalFeeList:[],
				// 本次公里数
					kil:'12314',
					// 时间
					date:'2019-10-10 14:27:36',
					// 电话号码
					phone:'13555555555',
					// 名字
					name:'王二',
				// 车牌号
				carNum:'皖B09090',
			};
		},
		computed: {
			listed(){
				return this.list.concat(this.laborAdditionalFeeList)
			},
		},
		methods: {		
			/**
			 * 获取查看详情
			 */
			
			getList(){
				this.$http.get('/LaborBlance/findInfoByOrderCode',{
					merchantCode:this.merchantCode,
					orderCode:this.orderCode,
				})
				.then(res=>{
					 console.log('%c请求结算查看结果','color:red;font-size:20px',res)
					 if(res.code == '10000'){
						 res.data.settleaccounts.receivablePayMoney=Number(res.data.settleaccounts.receivablePayMoney).toFixed(2)
						this.fuWuGiftTimes=res.data.fuWuGiftTimes
						this.goodsGiftTimes=res.data.goodsGiftTimes
						this.laborOrder=res.data.settleaccounts
						let fee = res.data.laborAdditionalFeeList||[]
						if(fee.length>0){
							fee.map(val => {
								val.goodsName=val.name
								val.goodsCount=1
								val.subtotalMoney=val.price
							})
							this.laborAdditionalFeeList = fee
						}
						this.list=res.data.goodsList
						this.remark=res.data.settleaccounts.additionalRemarks
						this.list.map(item => {
							if(item.type==1){
								this.server.push(item)
							}else if(item.type==2){
								this.product.push(item)
							}
							this.total+=Number(item.subtotalMoney)
						})
						
					}else{
						 alert(res.message)
				}
				})
			},
			// =======================================================================
			
			
			
			
			/**
			 * 保存按钮
			 */
			save(){
				this.$http.post('/LaborBlance/save',{
					workorderCode:this.orderCode,	//string	工单编号
					merchantCode:this.merchantCode,	//string	商家code
					goodsList:this.list,	//array	商品集合
					mileage:this.laborOrder.thisMileage,	//int	本次里程数
					additionalRemarks:this.remark,	//string	备注
				})
				.then(res=>{
					 console.log('%c请求保存结果','color:red;font-size:20px',res)
					 if(res.code == '10000'){
						this.$router.push({
							path:'/',
							query:{
								merchantCode:this.merchantCode
							}
						})
					}else{
						 alert(res.message)
				}
				})
			},
			//=======================================================================
			
			/**
			 * 点击表格
			 */
			cellClick(val){
				console.log(val)
			},
			
			// 查看工单详情
			look(){
				let path=''
				if(this.workorderType == 1){
					path='/comprehensiveOrder'
				}else{
					path='/quickOrder'
				}
				console.log('工单编号',this.orderCode,this.workorderType)
				this.$router.push({
					path,
					query:{
						merchantCode:this.merchantCode,
						workOrderCode:this.orderCode,
						orderType:this.workorderType,
						type:'look',
						orderType:this.workorderType,
						
					}
				})
				location. reload()
			},
			
		/**
		 * 销售/施工弹窗
		 */
		//确定按钮
		sendEmpData(checkList, checkList2) {
			this.empAlert = false;
			this.list[this.chooseEmpidx].laborGoodsEmployeeList = checkList.concat(checkList2)
			this.list[this.chooseEmpidx].laborGoodsEmployeeList.map( item => {
				item.customerType=item.employeeType
			})
		},
		// 关闭弹窗
		closeEmpAlert() {
			this.empAlert = false;
		},
		// 显示弹窗
		setEmpAlert(index, row) {
			this.empAlert = true
			this.chooseEmpidx = index
		let e1=[]
		let e2=[]
			console.log('显示的弹窗',row[index])
			this.$http.get('/LaborFindByGoods/findByGoods',{
				merchantCode:this.merchantCode,
				goodsCode:row[index].goodsCode||row[index].workorderCode,
			})
			.then(res=>{
				 console.log('%c请求员工弹窗结果','color:red;font-size:20px',res)
				 if(res.code == '10000'){
								res.data.map(item => {
									if(item.employeeType == 1){
										e1.push(item)
									}else{
										e2.push(item)
									}
								})
								this.empList1 = this.deWeight(e1);
								this.empList2 = this.deWeight(e2);
				}else{
					 alert(res.message)
			}
			})
		},
		// 去重
		deWeight(arry) {
			let newAry = [];
			for (let i = 0; i < arry.length; i++) {
				if (newAry.indexOf(arry[i]) === -1) {
					newAry.push(arry[i]);
				}
			}
			return newAry;
		},
		
		},
mounted() {

},
created() {
		this.merchantCode = this.$route.query.merchantCode
		this.orderCode=this.$route.query.workOrderCode
		
		this.workorderType=this.$route.query.orderType
		// console.log('工单',this.workorderType)
		this.getList()
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
.table
  {
  border-collapse:collapse;
	width: 100%;
  }
	.table tr>td{
		height: 40px;
		width: 150px;
		text-align: center;
	}
	.table tr{
		width: 100%;
	}
.table,.table tr, .table td{
	border: 1px solid #797979;
}
.footer{
	display: flex;
	justify-content: flex-end;
	align-items: center;margin-top: 40px;
	margin-right:40px ;
}
.footer>:nth-child(2){
	margin-left:5px ;
	margin-right: 15px;
}

</style>