<!-- 工单列表 -->
<template>
	<div class="hello" style="width: 100%;margin-left: -2px;">
		<!-- <div style=" margin-left: 120px;"><h2 style="text-align: left;">工单管理/工单列表</h2></div>
		<div style="width: 100%;"><hr /></div> -->
<div  id='exportTab' v-show="false">
		<excel :list='allList'></excel>
	</div>
		<div style="width: 100%;margin-top: 50px;">
			
			<div class="d-flex">	
			<div style=" margin-top: 5px;margin-left: 10px;" class="font-big">输入车牌号开单:</div>
			
			
			
		<!-- 	<div style=";margin-left: 10px;">
				<el-select v-model="car" placeholder="请选择"><el-option v-for="item in province" :key="item" :label="item" :value="item"></el-option></el-select>
			</div> -->
			<!-- 输入车牌开单 -->
			<!-- <div style=" margin-left: 10px;"><el-input v-model="carNum" placeholder="请输入车牌号"></el-input></div> -->
			
			<carNum style='margin-left: 15px;' v-model='plateNumber'></carNum>
			
			
			
			
			
			<div class="ml">
				<el-button type="primary" @click='goQuickOrder' class="">快捷开单</el-button>
				<el-button type="primary" @click='goCompre' class="ml">综合开单</el-button>
				<el-button type="primary" class="ml">使用兑换码</el-button>
				<el-button type="primary" @click='exportExcel' class="ml">导出明细</el-button>
			</div>
			
			<!-- <export-excel v-if="list !== null" :list="list" :tHeader="tHeader" :tValue="tValue"></export-excel> -->
			
			
			</div>
			<!-- tabs -->
			<!-- <ul style="margin-left:-32px;text-align: center;">
				<li v-for="(item,index) in tabTitle" :key='index' @click="tabChange(index)" :class="{active:cur==index}">{{item}}</li>
			</ul> -->
			<el-tabs style="margin-top:20px" v-model="editableTabsValue" type="card" 	@tab-click="tabChange">
  <el-tab-pane
    v-for="(item, index) in tabTitle"
    :key="index"
    :label="item"
    :name="item"
  >
  </el-tab-pane>
</el-tabs>



			<div style="width: 100%;margin-top: 20px;margin-left: 10px;" class="d-flex">
			<!-- 	<h4 style="">开单时间:</h4>
				<div class="block" style="margin-left: 10px;margin-top: 10px;">
					<el-date-picker format='yyyy-MM-dd' v-model="getTime" value-format='yyyy-MM-dd' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</div>
				<h4 style="margin-left: 10px;">金额:</h4>
					<div style="width: 80px;margin-top: 10px;margin-left: 10px;"><el-input v-model="fMoney" placeholder="请输入.."></el-input></div>
					<div style="margin-top: 20px;margin-left: 10px;">---</div>
					<div style="width: 80px;margin-top: 10px;margin-left: 10px;"><el-input v-model="eMoney" placeholder="请输入.."></el-input></div>
					<div style="margin-left: 10px;"><h4 style="">请选择工单类型:</h4></div>
					<div style="margin-top: 10px;margin-left: 10px;">
						<el-select @change='typeChange' v-model="orderType" placeholder="工单类型" style="width:110px">
							<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					
					<div style="margin-left: 20px;margin-top: 10px;"><el-input v-model="other" placeholder="请输入车牌号/姓名/手机号"></el-input></div>

					<div style="margin-top: 10px;margin-left: 10px;"><el-button @click='search' type="primary">查询</el-button></div> -->
					<el-form :inline="true" class="demo-form-inline">
					  <el-form-item label="开单时间">
					    <el-date-picker format='yyyy-MM-dd' v-model="getTime" value-format='yyyy-MM-dd' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					  </el-form-item>
					  <el-form-item label="金额">
					    <el-input style='width:100px' v-model="fMoney" placeholder="请输入.."></el-input>&nbsp;---&nbsp;<el-input style='width:100px' v-model="eMoney" placeholder="请输入.."></el-input>
					  </el-form-item>
						<el-form-item label="请选择工单类型">
							<el-select @change='typeChange' v-model="orderType" placeholder="工单类型" style="width:110px">
								<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item >
							<el-input v-model="other" class="ml" placeholder="请输入车牌号/姓名/手机号"/>
						</el-form-item>
					  <el-form-item>
					    <el-button @click='search' class="ml" type="primary">查询</el-button>
					  </el-form-item>
					</el-form>
			
			</div>

	

			<div style="width: 100%;overflow: auto;">
				<el-table :data="tableData" style="width: 100%"  border ref='tableDatas'>
					<el-table-column prop="workorderType" label="工单类型">
						<template slot-scope="scope">
							<span>{{scope.row.workorderType==1?'综合单':'快捷单'}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="workOrderCode" label="工单编号" width="180"></el-table-column>
					<el-table-column prop="plateNumber" label="车牌号" width="130"></el-table-column>
					<el-table-column prop="vehicleIdNum" label="车架号" width="180"></el-table-column>
					<el-table-column prop="customerName" label="客户姓名" width="120"></el-table-column>
					<el-table-column prop="customerPhone" label="手机号码" width="120"></el-table-column>
					<el-table-column prop="name" label="服务项" width="150">	
						<template slot-scope="scope">
							<div  style="overflow:hidden; text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;word-wrap: break-word;white-space: normal">
							<el-popover placement="top-start" title="" width="200" trigger="hover">
								<div v-for="(item,index) in scope.row.serverList2" :key='index' >{{item.goodsName}}</div>
							<div slot="reference" v-for="(item,index) in scope.row.serverList2" :key='index' >{{item.goodsName}}{{scope.row.serverList2.length>2?item.goodsName[1]+'...':'...'}}</div>
							</el-popover>
							</div>
						</template>
						
					</el-table-column>
					<el-table-column prop="name" label="商品" width="150">
						<template slot-scope="scope">
							<div  style="overflow:hidden; text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;word-wrap: break-word;white-space: normal">
							<el-popover placement="top-start" title="" width="200" trigger="hover">
								<div v-for="(item,index) in scope.row.goodsList2" :key='index' >{{item.goodsName}}</div>
							<div slot="reference" v-for="(item,index) in scope.row.goodsList2" :key='index' >{{item.goodsName}}{{scope.row.goodsList2.length>2?item.goodsName[1]+'...':'...'}}</div>
							<!-- <button type="text" >展开</button> -->
							</el-popover>
							</div>
							
							
								
						</template>
					</el-table-column>
					<el-table-column prop="totalMoney" label="工单总额" width=""></el-table-column>
					<el-table-column prop="preferentialMoney" label="优惠金额" width=""></el-table-column>
					<el-table-column prop="realityMoney" label="应收金额/元" width="180"></el-table-column>
					<el-table-column prop="createName" label="开单人员" width="100"></el-table-column>
					<el-table-column prop="workorderTime" label="开单时间" width="180"></el-table-column>
					<el-table-column prop="payTime" label="支付完成时间" width="180">
						<template slot-scope="scope">
							<span v-if="scope.row.status!=3">{{scope.row.payTime}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="状态">
						<template slot-scope="scope">
							<span :style="scope.row.status == 1||scope.row.status == 2?{color:'#0000ff'}:(scope.row.status == 0||scope.row.status == 3?{color:'#00cc00'}:(scope.row.status == 4?{color:'#ff0000'}:{color:'#333333'}))">{{ scope.row.status == 0?'草稿':(scope.row.status == 1?'施工中':(scope.row.status == 2?'待确认':(scope.row.status == 3?'待支付':(scope.row.status == 4?'挂账':(scope.row.status == 5?'已完成':'已作废')))))}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="操作" width="244" fixed="right" style="font-size: 14px;">
						<template slot-scope="scope">
							<el-button v-if='scope.row.status==1' type="text"  @click="finish(scope.$index, scope.row)">完工&nbsp;&nbsp;|</el-button>
							<el-button v-if='scope.row.status==1||scope.row.status==2||scope.row.status==3||scope.row.status==4' type="text" @click="close(scope.$index, scope.row)">结算&nbsp;&nbsp;|</el-button>
							<el-button v-if='scope.row.status==5' type="text"  @click="look(scope.$index, scope.row)">查看&nbsp;&nbsp;|</el-button>
							<el-button v-if='scope.row.status==3' type="text"  @click="buyer(scope.$index, scope.row)">挂账&nbsp;&nbsp;</el-button>
							<el-button v-if='scope.row.status==1||scope.row.status==0' type="text"  @click="set(scope.$index, scope.row)">编辑&nbsp;&nbsp;|</el-button>
							<el-button v-if='scope.row.status!=6&&scope.row.status!=3&&scope.row.status!=5&&scope.row.status!=4' type="text"  @click="del(scope.$index, scope.row)">作废&nbsp;&nbsp;|</el-button>
							<el-button v-if='scope.row.status!=3' type="text" @click="copy(scope.$index, scope.row)">复制</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>



			<div class="" style="margin-left: 380px;float: left;margin-top: 40px;margin-bottom: 80px;">
					<!-- @size-change="handleSizeChange" -->
				<el-pagination
				background
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="total, pager, next, jumper"
					:total="total"
				></el-pagination>
			</div>
		</div>
		<finish :customerPhone='datas.customerPhone' :plateNumber='datas.plateNumber' :merchantName='datas.merchantName' :merchantPhone='datas.merchantPhone' :isShowFinish='isShowFinish' :orderCode='datas.orderCode' @closeCompAlert='closeCompAlert' @compConfirm='compConfirm' @noSend='noSend'></finish>
		<buyer :carNumber="carNumber"  :buyerAlert="buyerAlert" @closeBuyerAlert="closeBuyerAlert" @buyerConfirm="sendBuyerData"></buyer>
	</div>
</template>

<script>
	import FileSaver from 'file-saver'
	// import  ExportExcel from 'file-saver'
	import XLSX from 'xlsx'
	import finish from '../Alert/completeConfirm.vue'
	import carNum from '../Alert/province.vue'
	import buyer from '../Alert/buyerConfirm.vue'
	import excel from './excel.vue'
export default {
	components: {
		finish,
		carNum,
		excel,
		// ExportExcel,
		buyer
	},
	data() {
		return {
			personage:[],
			buyerWorkOrderCode:'',
			company:[],//挂账单位列表
			editableTabsValue:'全部',
			// tValue:['id', 'type', 'content', 'time', 'count'],
			allList:[],
			
			//挂账弹窗
				//挂账车牌号
				carNumber:'',
				//是否显示挂账弹窗
				buyerAlert:false,
				
			//完工弹窗
			isShowFinish:false,
			//工单编号
			orderCode:null,
			// 点击完工下标
			finishIdx:null,
			
			// 完工发送手机号/车牌号
			datas:{
				customerPhone:'',
				plateNumber:'',
				merchantName:'',
				merchantPhone:''
			},
			
			// 车牌号
			province: ['京', '湘', '津', '鄂', '沪', '粤', '渝', '琼', '翼', '川', '晋', '贵', '辽', '云', '吉', '陕', '黑', '甘', '苏', '青', '浙', '皖', '藏', '闽', '蒙', '赣', '桂', '鲁', '宁', '豫', '新'],			
			// tab选项
			tabTitle:['全部','草稿','施工中','待确认','待支付','挂账','已完成','已作废'],
			cur:0,
			// 输入其他查询
			other: '',
			// 工单类型
			orderType: '',
			types:[
				{
					value:'',
					label:'全部'
				},
				{
					value:'2',
					label:'快捷单',
				},
				{
					value:'1',
					label:'综合单',
				},
				
				],
			// 输入结束金额
			eMoney: '',
			// 输入开始金额
			fMoney: '',
			// 开始结束时间
			getTime: '',
			//输入车牌号
			// carNum: '',
			// // 车牌省份
			// car: '',
			plateNumber:'',
			// 订单状态
			status:'',
			//当前页
			currentPage: 1,
			//每页显示条数
			pageSize: 10,
			//总条数
			total: null,
			tableData: [],
			pickerOptions2: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}
				]
			},
			value6: '',
			value7: ''
		};
	},
		created(){
			// this.$http.get('/api/user/user/address/list',{
				
			// }).then(res => {
				
			// })
			
			this.merchantCode=this.$route.query.merchantCode
			// console.log(localStorage.getItem('createId')==null)
				// if(localStorage.getItem('createId')==undefined&&localStorage.getItem('createId')==null){
					// this.getEmployee(this.$route.query.employeeId)
					console.log('操作人id',this.$route.query.employeeId)
					if(this.$route.query.employeeId!=undefined){
						localStorage.setItem('createId', this.$route.query.employeeId||'')
					}
				// }else{
					
				// }
// 			if(this.$route.query.orderNo!=undefined){
// 		let	time=	setInterval(()=>{
				
// 						this.$http.get('/payCallback/payStatus',{
// 							orderNo:this.$route.query.orderNo
// 						})
// 						.then(res=>{
// 							 console.log('%c请求刷新结果','color:red;font-size:20px',res)
// 							 if(res.data == true){
// 								 this.getTableData(this.merchantCode,1,10)
// 										clearInterval(time)
// 							}
// 						})
// 				},1000)
// }

				this.getTableData(this.merchantCode,1,10)
				
		this.getAlllist()
			
			
		},
		
	methods: {

		getAlllist(){
					this.$http.get('/WorkOrder/list',{
						merchantCode:this.merchantCode,
						pageNo:1,
						pageSize:999999,
						startTime:'',
						endTime:'',
						status:'',
						serchMoney1:'',
						serchMoney2:'',
						customerName:'',
						orderType:''
					})
					.then(res=>{
						 if(res.code=='10000'){
							 res.data.map(item => {
									 let arr=[]
									 let arr2=[]
								 item.laborOrderGoodsList.map(sg => {
									 if(sg.type==1){
										 arr.push(sg)
										 item.serverList2=arr
									 }else{
										 arr2.push(sg)
										 item.goodsList2=arr2
									 }
								 })
							 })
							 this.allList=res.data
							 // this.total=res.total
						 }
						 
						 
						 this.$nextTick(() => {
						           this.$refs.tableDatas.doLayout(); //解决表格错位
						         });
					})
				},
		// ---------------
		
		
		
		
		/**
		 * 
		 */
		// getEmployee(employeeId){
		// 	this.$http.get('/LaborCarController/getEmployee',{
		// 		employeeId,
		// 	})
		// 	.then(res=>{
		// 		 console.log('%c请求结果员工编号','color:red;font-size:20px',res)
		// 		 if(res.code == '10000'){
		// 				localStorage.setItem('createId', res.data.code);
		// 				localStorage.setItem('createName', res.data.name)
		// 		}else{
		// 			 alert(res.message)
		// 	}
		// 	})
		// },
		/**
		 * 获取工单列表
		 */
		getTableData(merchantCode,pageNo,pageSize,startTime,endTime,status,serchMoney1,serchMoney2,customerName,orderType){
			this.$http.get('/WorkOrder/list',{
				merchantCode,
				pageNo,
				pageSize,
				startTime,
				endTime,
				status,
				serchMoney1,
				serchMoney2,
				customerName,
				orderType
			})
			.then(res=>{
				
				
				
				
				console.log('请求结果工单列表',res)
				 if(res.code=='10000'){
					 
					 res.data.map(item => {
							 let arr=[]
							 let arr2=[]
						 item.laborOrderGoodsList.map(sg => {
							 if(sg.type==1){
								 arr.push(sg)
								 item.serverList2=arr
							 }else{
								 arr2.push(sg)
								 item.goodsList2=arr2
							 }
						 })
					 })
					 this.tableData=res.data
					 this.total=res.total
				 }
				 
				 
				 this.$nextTick(() => {
				           this.$refs.tableDatas.doLayout(); //解决表格错位
				         });
				 console.log('最后的数组',this.tableData)
			})
		},
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
		
		
		/**
		 * tab选项改变
		 */
		tabChange(e){
			console.log('选中的选项',e)
			let idx=e.index
			this.cur=e
			if(idx==0){
				this.status=''
			}else{
				this.status=idx-1
			}
			this.getTableData(this.merchantCode,1,10,'','',this.status)
		},
		
		/**
		 * 查询按钮
		 */
		search(){
			console.log('时间',this.getTime,'金额',this.fMoney+'--'+this.eMoney,'工单类型',this.orderType,'其他选项',this.other)
			let start=''
			let end=''
			if(this.getTime!=null){
				start=this.getTime[0]
				end=this.getTime[1]
			}
			this.getTableData(this.merchantCode,1,10,start,end,this.status,this.fMoney,this.eMoney,this.other,this.orderType)
		},
		
		/**
		 * 工单类型选择改变
		 */
		typeChange(){
			console.log('工单类型',this.orderType)
		},
		
		/**
		 * 完工
		 */
		// 打开完工弹窗
		finish(index,row) {
			console.log(row)
			this.orderCode=row.workOrderCode
			this.finishIdx=index
			this.$http.get('/LaborFastOrder/findVipGoods',{
				merchantCode:this.merchantCode,
				condition:row.plateNumber
			})
			.then(res=>{
				 console.log('请求商家电话/名称结果',res)
				 if(res.code == '10000'){
					// row.status
			this.isShowFinish=true
			let customerPhone=row.customerPhone
			let plateNumber=row.plateNumber
			let merchantPhone=res.data.merchantPhone
			let merchantName=res.data.merchantName
			let orderCode=row.workOrderCode
			this.datas={customerPhone,plateNumber,merchantName,merchantPhone,orderCode}
				}else{
					 alert(res.message)
			}
			})
		},
		// 发送短信提醒
		compConfirm(val,val2){
			// console.log(val2,val)
			this.finishOrder(val2,this.datas.plateNumber,this.datas.merchantName,this.datas.merchantPhone,this.datas.orderCode)
		},
		// 不发送短信提醒
		noSend(status){
			// this.isShowFinish=false
			// console.log('不发送短信',status)
			// if(status==5){
			// this.status=status
			// this.tableData[this.finishIdx].status=status
			// }
			console.log('挂账',this.datas.orderCode,this.datas.customerPhone)
			this.finishOrder('',this.datas.plateNumber,this.datas.merchantName,this.datas.merchantPhone,this.datas.orderCode)
		},
		// 关闭完工弹窗
		closeCompAlert(){
			this.isShowFinish=false
		},
		
		finishOrder(toPhone,plateNum,merchantName,merchantPhone,orderCode){
			this.$http.get('/WorkOrder/sendMessage',{
				toPhone,
				action:'WORK_ORDER_FINISHED',
				plateNum,
				merchantName,
				merchantPhone,
				orderCode,
				merchantCode:this.merchantCode
			})
			.then(res=>{
				 console.log('请求完单结果',res)
				 if(res.code == '10000'){
						this.tableData[this.finishIdx].status=2
						this.isShowFinish=false
				}else{
					 alert(res.message)
			}
			})
		},
		
		
		
		/**
		 * 查看
		 */
		look(index,row){
			let path
			if(row.status==5){
				path='/billdetail'
			}else if(row.workorderType == 1){
				path='/comprehensiveOrder'
			}else{
				path='/quickOrder'
			}
			this.$router.push({
				path,
				query:{
					merchantCode:this.merchantCode,
					workOrderCode:row.workOrderCode,
					orderType:row.workorderType,
					type:'look'
				}
			})
			location. reload()
		},
		
		/**
		 * 结算
		 */
		close(index,row) {
			console.log('结算',row)
			if(row.status==3||row.status==4){
				this.$router.push({
					path:'/financialClose',
					query:{
						merchantCode:this.merchantCode,
						workOrderCode:row.workOrderCode,
						orderType:row.workorderType,
					}
				})
			}else{
			this.$router.push({
				path:'/close',
				query:{
					merchantCode:this.merchantCode,
					workOrderCode:row.workOrderCode,
					orderType:row.workorderType,
				}
			})	
			}
			location. reload()
		},
		
		/**
		 * 挂账
		 */
		buyer(index,row) {
			this.buyerAlert=true
			this.carNumber=row.plateNumber
			//挂账工单编号
			this.buyerWorkOrderCode=row.workOrderCode
			//挂账工单序号
			this.rowIdx=index
		},
		// 确定挂账
		sendBuyerData(val){
					this.$http.get('/WorkOrder/buyoncredit',{
						merchantCode:this.merchantCode,
						workOrderCode:this.buyerWorkOrderCode,//工单编号
						onAccountType:val.onAccountType,//挂账类型(挂账类型 1:单位 2:个人)
						onAccountId:val.onAccountId,//个人挂账用户code或者挂账单位id
						plateNum:this.carNumber,
						estimateBlanceTime:val.estimateBlanceTime,
						flag:val.flag==1?true:false,
					}).then(res => {
						if(res.code == '10000'){
								 this.tableData[this.rowIdx].status=4
								// row.status=4
								this.buyerAlert=false
							}else{
								 alert(res.message)
						}
					})
			
			// this.$http.get('/WorkOrder/buyoncredit',{
			// 	merchantCode:this.merchantCode,
			// 	workOrderCode:this.buyerWorkOrderCode,
			// 	isBuyoncredit:2,
			// })
			// .then(res=>{
			// 	 console.log('请求工单挂账结果',res)
			// 	 if(res.code == '10000'){
			// 		 this.tableData[this.rowIdx].status=4
			// 		// row.status=4
			// 		this.buyerAlert=false
			// 	}else{
			// 		 alert(res.message)
			// }
			// })
		},
		//取消挂账
		closeBuyerAlert(){
			this.buyerAlert=false
		},
		
		
		
		
		
		/**
		 * 编辑
		 */
		set(index,row) {
			let path
			if(row.workorderType == 1){
				path='/comprehensiveOrder'
			}else{
				path='/quickOrder'
			}
			this.$router.push({
				path,
				query:{
					merchantCode:this.merchantCode,
					workOrderCode:row.workOrderCode,
					orderType:row.workorderType,
					orderid:row.id,
					type:'set',
					status:row.status
				}
			})
			location. reload()
		},
		
		/**
		 * 作废
		 */
		del(index,row) {
			console.log('作废',index,row);
			this.$http.get('/WorkOrder/updateStatus',{
				merchantCode:this.merchantCode,
				workOrderCode:row.workOrderCode
			})
			.then(res=>{
				 console.log('请求作废结果',res)
				 if(res.code == '10000'){
				this.tableData[index].status=6
				}
			})
		},
		
		/**
		 * 复制
		 */
		copy(index,row) {
			console.log(row)
			let path
			if(row.workorderType==1){
				path='/comprehensiveOrder'
			}else{
				path='/quickOrder'
			}
			this.$router.push({
				path,
				query:{
					merchantCode:this.merchantCode,
					workOrderCode:row.workOrderCode,
					orderType:row.workorderType,
					orderid:row.id,
					type:'copy'
				}
			})
			location. reload()
		},
		
		// 综合开单跳转
		goCompre(){
			var query
			if(this.plateNumber!=''){
				query={
					carNum:this.plateNumber,
					merchantCode:this.merchantCode
				}
			}else{
				query={
					merchantCode:this.merchantCode
				}
			}
			this.$router.push({
				path:'/comprehensiveOrder',
				query,
			})
		},
		
		
		// 快捷开单跳转
		goQuickOrder(){
			var query
			
			
			if(this.plateNumber!=''){
				query={
					// car:this.car,
					carNum:this.plateNumber,
					has:'has',
					merchantCode:this.merchantCode
				}
			}else{
				query={
					has:'noHas',
					merchantCode:this.merchantCode
				}
			}
			this.$router.push({
				path:'/quickOrder',
				query,
			})
			location. reload()
		},

		handleClick() {
			alert('button click');
		},

		handleCurrentChange(val) {
			// console.log(this.getTime)
			let start=''
			let end=''
			if(this.getTime!=null){
				start=this.getTime[0]
				end=this.getTime[1]
			}
			this.getTableData(this.merchantCode,val,10,start,end,this.status,this.fMoney,this.eMoney,this.other,this.orderType)
			console.log(`当前页: ${val}`);
		},
		
		
		exportExcel () {
		      /* generate workbook object from table */
		      var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
		      var wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)
		
		      /* get binary string as output */
		      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
		      try {
		        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '工单列表.xlsx')
		      } catch (e) {
		        if (typeof console !== 'undefined') {
		          console.log(e, wbout)
		        }
		      }
		      return wbout
		}
	},
};
</script>
<style scoped>
/deep/.el-table td,
/deep/.el-table th {
	text-align: center;
}

ul li{
	/* clear: both; */
/* 	list-style: none;
	float: left;
	width:100px;height:30px;
	background:#f2f2f2 ;
	line-height: 30px;
	margin-right:5px;
	color:rgba(51,51,51,0.65);
	cursor:pointer */
}
ul li.active{
	background: #fff;
	border-top: 2px solid rgb(24, 144, 255);
	color: rgb(24, 144, 255);
}

</style>