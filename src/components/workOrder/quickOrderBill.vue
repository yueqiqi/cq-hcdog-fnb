<!-- 快捷开单--进行开单 -->
<template>
	<div class="quickOrderBill">
		<div style="padding-left: 30px;" class="choose">
			已选
			<span style="color: #0000FF;">{{ List.length }}</span>
			个项目
		</div>

		<div style="padding-left:30px;margin-top: 20px;">
			<el-table :header-cell-style="{ color: '#333', fontSize: '14px', fontWeight: 'bold', fontSize: '20px', backgroundColor: '#d7d7d7' }" :data="List" style="width: 100%">
				<el-table-column align="center" prop="name" label="名称" width="180">
					<template slot-scope="scope">
						<div class="" style="display: flex;text-align: center;justify-content: center;">
							<div style="color:#0000FF">{{ scope.row.isGift == 1 ? '【赠品】' : '' }}</div>
							<div>{{ scope.row.goodsName }}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="price" label="单价" width="180">
					<template slot-scope="scope">
						<span>¥{{ scope.row.price }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="goodsCount" label="数量" width="180">
					<template slot-scope="scope">
						<el-input-number
							:min="1"
							:disabled="dis == false ? scope.row.isGift == 1 : dis"
							size="mini"
							v-model="scope.row.goodsCount"
							@change="handleChange(scope.$index, scope.row)"
							label="描述文字"
						></el-input-number>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="subtotal" label="小计" width="180">
					<template slot-scope="scope">
						<!-- <el-input v-if="inputShow == true" @change="changet" size="mini" v-model="scope.row.subtotal" placeholder=""></el-input> -->
						<!-- v-if="inputShow == false" -->
						<span>¥{{ scope.row.subtotal }}</span>
						<!-- <i v-if="inputShow == false" @click="dis == false ? (inputShow = true) : ''" class="el-icon-edit-outline"></i> -->
					</template>
				</el-table-column>
				<el-table-column align="center" prop="deduct" label="提成" width="180">
					<template slot-scope="scope">
						<!-- <el-input v-if="inputShow2 == true" @change="changet2" size="mini" v-model="scope.row.deduct" placeholder=""></el-input>
						<span v-if="inputShow2 == false">¥{{ scope.row.deduct }}</span>
						<i v-if="inputShow2 == false" @click="dis == false ? (inputShow2 = true) : ''" class="el-icon-edit-outline"></i> -->
						<span>{{scope.row.deduct}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="emp" label="销售/施工人员" width="180">
					<template slot-scope="scope">
						<div style="border:1px dashed #3f3fff;">
							<div style="position:relative;top:-4px;left:70px"><i @click="dis == false ? setEmpAlert(scope.$index, List) : ''" class="el-icon-edit-outline"></i></div>
							<div class="d-flex" style="flex-wrap: wrap;">
									<div>销售:</div>
								<div v-for="(item,index) in scope.row.mapList" :key='index' >
							<div style="margin-left:5px">{{item.employeeType==1?item.employeeName:''}}</div>
								</div>
								</div>
							<div class="d-flex" style="flex-wrap: wrap;">
									<div>施工:</div>
								<div v-for="(item,index) in scope.row.mapList" :key='index' >
							<div style="margin-left:5px">{{item.employeeType==2?item.employeeName:''}}</div>
								</div>
								</div>
							
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="" label="操作" width="180">
					<template slot-scope="scope">
						<div><el-button @click.native.prevent="deleteRow(scope.$index, List)" style="color:red" type="text" size="small" :disabled="dis">删除</el-button></div>
						<div v-if="scope.row.isGift == 0"><el-button @click="set(scope.$index,scope.row)" type="text" size="small" :disabled="dis">设为赠品</el-button></div>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="d-flex remark">
			<div>本次备注:</div>
			<div style="width: 300px;"><el-input size="small" placeholder="请输入备注信息(打印单显示,最多120字)" v-model="remark" clearable :disabled="dis"></el-input></div>
		</div>

		<div class="footer d-flex">
			<div class="d-flex" style="align-items: center;color: #000000;font-size: 18px;">
				总价:
				<span style="color:#FF0000;font-size: 32px;">¥{{ all2 }}</span>
			</div>
			<div style="margin-left: 10px;margin-right: 10px;">
				<el-button type="text" @click="goquick" :disabled="dis">继续添加项目</el-button>
				<el-button type="text" @click="save" :disabled="dis">保存</el-button>
			</div>
			<div class="d-flex">
				<el-button type="primary" size="small" @click="goList" :disabled="dis" v-if="useType!='set'||orderStatus=='0'">开单</el-button>
				<!-- <el-button type="primary" size="small" @click="goClose" :disabled="dis">结算</el-button> -->
			</div>
			<div class="d-flex" style="margin-left: 10px;">
				<!--  -->
				<el-button type="text" @click="setCompAlert" :disabled="dis" v-if="orderStatus!=3&&orderStatus!=2">完工</el-button>
				<!-- <el-button type="text" @click="setBuyerAlert" :disabled="dis">挂账</el-button> -->
			</div>
		</div>
		<!-- 选择销售施工弹窗 -->
		<emp :chooseEmp="empAlert" :empListf="empList1" :empLists="empList2" @closeEmpAlert="closeEmpAlert" @empConfirm="sendEmpData"></emp>
		<!-- 挂账弹窗 -->
		<buyer :carNumber="carNumber" :buyerAlert="buyerAlert" @closeBuyerAlert="closeBuyerAlert" @buyerConfirm="sendBuyerData"></buyer>
		<!-- 完工弹窗 -->
		<!-- <comp :compAlert="compAlert" @closeCompAlert="closeCompAlert" @noSend="noSend" @compConfirm="sendCompData"></comp> -->
		<el-dialog title="完工确认" :close-on-click-modal='false' center="" :visible.sync="isShowFinish" width="30%">
			<el-input v-model="tel" placeholder="请输入需要通知的手机号"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeCompAlert">取 消</el-button>
				<el-button type="primary" @click="noSend">不发送短信提醒</el-button>
				<el-button type="danger" @click="comConfirm">发送短信提醒</el-button>
			</span>
		</el-dialog>
		
		
	</div>
</template>

<script>
// 选择员工弹窗
import emp from './quickOrderBillChildren/chooseEmp.vue';
// 点击挂账弹窗
import buyer from '../Alert/buyerConfirm.vue';
// 点击完工弹窗
import comp from '../Alert/completeConfirm.vue';
import carList from '../../global/carList.js'
export default {
	components: {
		emp,
		buyer,
		comp
	},
	data() {
		return {
			//是否是第一次进入此页面
			isFirstEnter:false, // 定义变量来判断是否第一次进入，默认false
			
			// 挂账弹窗
			carNumber: null,
			// 销售人员
			mapList: null,
			// 提交
			form: {},

			// 挂账弹窗
			// compAlert: null,
			buyerAlert:false,
			// 完工弹窗
			isShowFinish: false,
			// 电话号码
			tel:null,
			// 选择销售施工弹窗的下标
			chooseEmpidx: null,
			// 选择销售施工弹窗
			empList1: [],
			empList2: [],
			empAlert: null,
			// 小计
			inputShow: false,
			// 提成
			inputShow2: false,
			// 总价
			allArr: [],
			all: 0,
			// 备注
			remark: '',
			List: [],

			// 查看
			dis: false
		};
	},
	computed: {
		all2(){
			return this.all.toFixed(2)
		},		
	},
	watch:{
		// all(){
		// 	this.List.map(item => {
		// 		this.all+=item.subtotalMoney
		// 	})
		// }
	},
	
	// beforeRouteEnter(to, from, next) {
	//     if (from.name == "quickOrder") {
	// 			console.log('从哪里来',from.name,to.name)
	//       // 这个name是下一级页面的路由name
	//       to.meta.isBack = true; // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
	//     }
	//     next();
	//   },
	
	// activated() {
	//      if(!this.$route.meta.isBack || this.isFirstEnter){
	//          // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
	//          // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
	//          // this.List=''// 把数据清空，可以稍微避免让用户看到之前缓存的数据
	//          // this.getData();
			
	// 				 console.log('第一次进入',this.isFirstEnter,this.$route.meta.isBack)
	//      }else{
	// 			 if(this.useType=='set'||this.useType=='copy'||this.useType=='look'){
	// 			 	// console.log('%c快捷单传递的值','color:red',this.$route.query.laborOrderGoodsList)
	// 			 	this.$store.state.carList.map(item => {
	// 			 		item.isGift = item.isGift||0;
	// 			 		item.num = item.goodsCount||1;
	// 			 		// item.sell = null;
	// 			 		// item.road = null;
	// 			 		if(item.mapList==undefined){
	// 			 			item.mapList=[];
	// 			 		}
				 			
	// 			 		item.subtotal = item.num * item.price;
	// 			 		item.deduct = 0;
	// 			 	});
	// 			 	// console.log
	// 			 }
	// 			 else{
	// 			 that.$store.state.carList.map(item => {
	// 			 	item.isGift = 0;
	// 			 	item.num = item.goodsCount;
	// 			 	item.sell = null;
	// 			 	item.road = null;
	// 			 	item.subtotal = Number(item.num) * Number(item.price);
	// 			 	item.deduct = 0;
	// 			 });
	// 			 }
				 
	// 			 this.List.map(item => {
	// 				 that.$store.state.carList.map(items=> {
	// 					 if(item.code+item.goodsName+item.goodsCome==items.code+items.goodsName+items.goodsCome){
	// 						 if(item.mapList){
	// 							 items.mapList=item.mapList
	// 						 }
	// 						 items.isGift = item.isGift||0;
	// 						 items.subtotal = item.subtotal
	// 						 items.price = item.price
	// 					 }
	// 				 })
	// 			 })
	// 			 this.List=that.$store.state.carList
	// 				 let all=0
	// 			 this.List.map(item => {
	// 			 	all += item.subtotal;
	// 			 });
	// 			 this.all=all
	// 				 console.log('第二次进入',this.List,this.$route.query.laborOrderGoodsList)
	// 		 }
	//      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
	//      this.$route.meta.isBack=false
	//      // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
	//      this.isFirstEnter=false;
	//    },
	
	
	
	created() {
		//第一次进入此页面
		this.isFirstEnter=true
		this.createId = localStorage.getItem('createId')
		console.log('创建',this.createId)
		// console.log('id',this.createId)
		//是否是会员
		this.isThereVip=this.$route.query.isThereVip
		//传递的状态
		this.orderStatus=this.$route.query.orderStatus
		if(this.orderStatus==0){
			this.statusList=1
		}else{
			this.statusList=''
		}
		console.log('订单状态',	this.orderStatus)
		// console.log()
		let r = this.$route.query;
		let f = this.form;
		console.log('车辆注册日期', r)
		this.remark=r.remarsk
		this.useType = this.$route.query.type; //查看/复制/编辑

		this.carNumber = r.plateNumber;
		
		this.merchantCode = this.$route.query.merchantCode;
		
		this.merchantPhone = f.merchantPhone
		
		this.merchantName = f.merchantName
		this.customerCodeOther=r.customerCodeOther
		this.customerPhoneOther =r.customerPhoneOther   
		this.customerNameOther=r.customerNameOther 
		 console.log('使用他人会员卡',this.customerPhoneOther,this.customerNameOther,this.customerCodeOther)
		f.workOrderCode=r.workOrderCode
		f.orderId = r.orderid;
		f.goodsCome = r.goodsCome;
		f.goodsVipId = r.goodsVipId;
		f.customerName = r.customerName;
		f.customerPhone = r.customerPhone;
		f.plateNumber = r.plateNumber;
		f.mileage = r.mileage;
		f.engineNum = r.engineNum;
		f.vehicleIdNum = r.vehicleIdNum;
		f.applyDate = r.applyDate;
		f.carColor = r.carColor;
		f.brandName = r.brandName
		f.modelName = r.modelName;
		f.seriesName = r.seriesName;
		f.customerCode = r.customerCode;
		f.isMyCard = r.isMyCard;
		f.workorderTime=r.workorderTime
		if(this.useType=='set'||this.useType=='copy'||this.useType=='look'){
			// f.rem
			// console.log('%c快捷单传递的值','color:red',this.$route.query.laborOrderGoodsList)
			this.$store.state.carList.map(item => {
				// item.isGift = item.isGift||0;
				// item.num = item.goodsCount||1;
				// item.sell = null;
				// item.road = null;
				if(item.mapList==undefined){
					item.mapList=[];
				}
					if(item.isGift==1){
						item.subtotal=0
					}else{
						item.subtotal = item.goodsCount * item.price;
					}
				item.deduct = 0;
			});
			// console.log
		}
		else{
		this.$store.state.carList.map(item => {
			// item.isGift = item.isGift||0;
			if(item.isGift==1){
				item.subtotal=0
			}else{
			item.subtotal = Number(item.goodsCount) * Number(item.price);
			}
			// item.num = item.goodsCount;
			item.sell = null;
			item.road = null;
			item.deduct = 0;
		});
		
		}
		if (this.$route.query.type == 'look') {
			this.dis = true;
		}
		this.List =this.$store.state.carList;
		this.List.map(item => {
			item.isGift = item.isGift||0;
			this.all += item.subtotal;
		});
this.$store.commit('list',this.List)
	}, //生命周期 - 创建之后

	methods: {
		/**
		 * 编辑工单
		 */
		setBillOrder(
			orderId,
			goodsCome,
			goodsVipId,
			type,
			workorderType,
			customerName,
			customerPhone,
			plateNumber,
			mileage,
			engineNum,
			vehicleIdNum,
			applyDate,
			carColor,
			modelName,
			seriesName,
			customerCode,
			employeeId,
			updateId,
			workOrderTime,
			isMyCard,
			remarks,
			totalMoney,
			laborOrderGoodsList
		) {
			this.$http
				.post('/LaborFastOrder/addLaborOrder', {
					merchantCode: this.merchantCode,
					workOrderCode:this.form.workOrderCode,
					brandName:this.form.brandName,
					customerCodeOther:this.customerCodeOther,
					customerPhoneOther :this.customerPhoneOther ,
					customerNameOther :this.customerNameOther ,
					orderId,
					goodsCome,
					goodsVipId,
					type,
					workorderType,
					customerName,
					customerPhone,
					plateNumber,
					mileage,
					engineNum,
					vehicleIdNum,
					applyDate,
					carColor,
					modelName,
					seriesName,
					customerCode,
					employeeId,
					updateId,
					workOrderTime,
					isMyCard,
					remarks,
					totalMoney,
					//
					laborOrderGoodsList
				})
				.then(res => {
					console.log('请求结果', res);
					if (res.code == '10000') {
						this.$router.push({
							path:'/',
							query:{
								merchantCode:this.merchantCode
							}
						})
					
					} else {
						alert(res.message);
					}
				});
		},
		//

		/**
		 * 新增工单
		 */
		// 新增工单
		// workorderType 工单类型  1--综合单  2--快捷单
		// isMyCard会员卡所属  1--自己  2--他人
		billing(
		workOrderCode,
		orderId,
			goodsCome,
			goodsVipId,
			type,
			workorderType,
			customerName,
			customerPhone,
			plateNumber,
			mileage,
			engineNum,
			vehicleIdNum,
			applyDate,
			carColor,
			modelName,
			seriesName,
			customerCode,
			employeeId,
			updateId,
			workOrderTime,
			isMyCard,
			remarks,
			totalMoney,
			laborOrderGoodsList
		) {
			this.$http
				.post('/LaborFastOrder/addLaborOrder', {
					customerCodeOther:this.customerCodeOther,
					customerPhoneOther :this.customerPhoneOther ,
					customerNameOther :this.customerNameOther ,
					isThereVip:this.isThereVip,
					merchantCode: this.merchantCode,
					status:this.statusList,
					brandName:this.form.brandName,
					workOrderCode,
					orderId,
					goodsCome,
					goodsVipId,
					type,
					workorderType,
					customerName,
					customerPhone,
					plateNumber,
					mileage,
					engineNum,
					vehicleIdNum,
					applyDate,
					carColor,
					modelName,
					seriesName,
					customerCode,
					employeeId,
					updateId,
					workOrderTime,
					isMyCard,
					remarks,
					totalMoney,
					//
					laborOrderGoodsList
				})
				.then(res => {
					console.log('新增工单请求结果', res);
					if (res.code == 10000) {
						this.$router.push({
							path: '/',
							query: {
								merchantCode: this.merchantCode
							}
						});
						this.$destroy('quickOrder')
					} else {
						alert(res.message);
					}
				});
		}, //确定发送短信按钮
		
		/**
		 * 完工
		 */
		finish(
		goodsCome,
		goodsVipId,
		type,
		workorderType,
		customerName,
		customerPhone,
		plateNumber,
		mileage,
		engineNum,
		vehicleIdNum,
		applyDate,
		carColor,
		modelName,
		seriesName,
		customerCode,
		employeeId,
		updateId,
		workOrderTime,
		isMyCard,
		remarks,
		totalMoney,
		laborOrderGoodsList,
		
		toPhone,
		action,
		plateNum,
		merchantName,
		merchantPhone,
		){
			let workOrderCode
			let orderId
			let status
			console.log('传递',this.useType,this.form.orderId)
			if(this.useType=='set'){
				workOrderCode=this.form.workOrderCode	
				orderId=this.form.orderId
				status=2
			}else{
				workOrderCode=null
				orderId=null
				status=null
			}
			this.$http
				.post('/LaborFastOrder/sendSms', {
					customerCodeOther:this.customerCodeOther,
					customerPhoneOther :this.customerPhoneOther ,
					customerNameOther :this.customerNameOther ,
					isThereVip:this.isThereVip,
					merchantCode: this.merchantCode,
					brandName:this.form.brandName,
					status,
					orderId,
					workOrderCode,
					goodsCome,
					goodsVipId,
					type,
					workorderType,
					customerName,
					customerPhone,
					plateNumber,
					mileage,
					engineNum,
					vehicleIdNum,
					applyDate,
					carColor,
					modelName,
					seriesName,
					customerCode,
					employeeId,
					updateId,
					workOrderTime,
					isMyCard,
					remarks,
					totalMoney,
					//
					laborOrderGoodsList,
					
					toPhone:this.tel,
					action:'WORK_ORDER_FINISHED',
					plateNum:this.carNumber,
					merchantName:this.form.merchantName,
					merchantPhone:this.form.merchantPhone,
				})
				.then(res => {
					console.log('请求完工结果', res);
					if (res.code == 10000) {
						this.$router.push({
							path: '/',
							query: {
								merchantCode: this.merchantCode
							}
						});
						// this.$destroy('')
					} else {
						alert(res.message);
					}
				});
		},
		
		// ====================================================================================================================
		// ====================================================================================================================

		/**
		 * 完工
		 */ 
		comConfirm() {
			let f=this.form
			this.List.map(item => {
				item.subtotalMoney = item.subtotal;
				// item.laborOrderGoodsList
				// item.goodsCount = item.num;
			});
			this.finish(f.goodsCome,
					f.goodsVipId,
					'2',
					'2',
					f.customerName,
					f.customerPhone,
					f.plateNumber,
					f.mileage,
					f.engineNum,
					f.vehicleIdNum,
					f.applyDate,
					f.carColor,
					f.modelName,
					f.seriesName,
					f.customerCode,
					this.createId,
					'007',
					f.workorderTime,
					f.isMyCard,
					this.remark,
					this.all2,
					this.List)
			this.isShowFinish = false;
			
		},
		noSend() {
			let f=this.form
			this.List.map(item => {
				item.subtotalMoney = item.subtotal;
				// item.laborOrderGoodsList
				// item.goodsCount = item.num;
			});
			this.finish(f.goodsCome,
					f.goodsVipId,
					'2',
					'2',
					f.customerName,
					f.customerPhone,
					f.plateNumber,
					f.mileage,
					f.engineNum,
					f.vehicleIdNum,
					f.applyDate,
					f.carColor,
					f.modelName,
					f.seriesName,
					f.customerCode,
					this.createId,
					'007',
					f.workorderTime,
					f.isMyCard,
					this.remark,
					this.all2,
					this.List)
			this.isShowFinish = false;
		},
		// 关闭弹窗
		closeCompAlert() {
			this.isShowFinish = false;
		},
		// 显示弹窗
		setCompAlert() {
			this.isShowFinish = true;
		},
		
		
//挂账
		buyerAjax(
			isBuyoncredit,
			goodsCome,
			goodsVipId,
			type,
			workorderType,
			customerName,
			customerPhone,
			plateNumber,
			mileage,
			engineNum,
			vehicleIdNum,
			applyDate,
			carColor,
			modelName,
			seriesName,
			customerCode,
			createId,
			updateId,
			workOrderTime,
			isMyCard,
			remarks,
			totalMoney,
			laborOrderGoodsList
		) {
			let workOrderCode
			let orderId
			let status
			if(this.useType=='set'){
				workOrderCode=this.form.workOrderCode	
				 orderId=this.form.orderId
				 status=4
			}else{
				workOrderCode=null
				orderId=null
			}
			this.$http
				.post('/LaborFastOrder/buyoncredit', {
					status,
					isThereVip:this.isThereVip,
					isBuyoncredit,
					orderId,
					workOrderCode,
					merchantCode: this.merchantCode,
					goodsCome,
					goodsVipId,
					type,
					workorderType,
					customerName,
					customerPhone,
					plateNumber,
					mileage,
					engineNum,
					vehicleIdNum,
					applyDate,
					carColor,
					modelName,
					seriesName,
					customerCode,
					createId,
					updateId,
					workOrderTime,
					isMyCard,
					remarks,
					totalMoney,
					//
					laborOrderGoodsList
				})
				.then(res => {
					console.log('请求挂账结果', res);
					if (res.code == '10000') {
						this.$router.push({
							path:'/',
							query:{
								merchantCode:this.merchantCode
							}
						})
					} else {
						alert(res.message);
					}
				});
		}, //确定按钮

		/**
		 *挂账
		 */ sendBuyerData() {
			 
			 let f = this.form
			 this.List.map(item => {
			 	item.subtotalMoney = item.subtotal;
			 	// item.goodsCount = item.num;
			 });
			this.buyerAlert = false;
			this.buyerAjax(
				'2',
				f.goodsCome,
				f.goodsVipId,
				'1',
				'2',
				f.customerName,
				f.customerPhone,
				f.plateNumber,
				f.mileage,
				f.engineNum,
				f.vehicleIdNum,
				f.applyDate,
				f.carColor,
				f.modelName,
				f.seriesName,
				f.customerCode,
				this.createId,
				'007',
				f.workorderTime,
				f.isMyCard,
				this.remark,
				this.all2,
				this.List
			);
		},
		// 关闭弹窗
		closeBuyerAlert() {
			this.buyerAlert = false;
		},
		// 显示弹窗
		setBuyerAlert() {
			this.buyerAlert = true;
		},

		/**
		 * 返回快捷开单
		 */
		goquick() {
			// this.$carLists.$emit('lists',this.List)
			this.$store.commit('list',this.List)
			this.$router.go(-1);
		},

		/**
		 * 保存
		 */
		save() {
			this.List.map(item => {
				item.subtotalMoney = item.subtotal;
				// item.laborOrderGoodsList
				// item.goodsCount = item.num;
			});
			let f = this.form;
			let orderId=''
			let workOrderCode=''
			if (this.useType == 'copy' || this.useType == undefined) {
			this.billing(
				workOrderCode,
				orderId,
				f.goodsCome,
				f.goodsVipId,
				'1',
				'2',
				f.customerName,
				f.customerPhone,
				f.plateNumber,
				f.mileage,
				f.engineNum,
				f.vehicleIdNum,
				f.applyDate,
				f.carColor,
				f.modelName,
				f.seriesName,
				f.customerCode,
				this.createId,
				'007',
				f.workorderTime,
				f.isMyCard,
				this.remark,
				this.all2,
				this.List
			);
			} else if (this.useType == 'set') {
				this.setBillOrder(
					f.orderId,
					f.goodsCome,
					f.goodsVipId,
					'1',
					'2',
					f.customerName,
					f.customerPhone,
					f.plateNumber,
					f.mileage,
					f.engineNum,
					f.vehicleIdNum,
					f.applyDate,
					f.carColor,
					f.modelName,
					f.seriesName,
					f.customerCode,
					this.createId,
					'007',
					f.workorderTime,
					f.isMyCard,
					this.remark,
					this.all2,
					this.List
				);
			}
		},

		/**
		 * 开单
		 */
		goList() {
			this.List.map(item => {
				item.subtotalMoney = item.subtotal;
			});
			console.log('开单',this.List)
			let f = this.form;
			let workOrderCode=''
			let orderId=''
			if(this.useType=='set'){
				workOrderCode=this.form.workOrderCode
				orderId=this.form.orderId
			}else{
				workOrderCode=''
				orderId=''
			}
				this.billing(
					workOrderCode,
					orderId,
					f.goodsCome,
					f.goodsVipId,
					'2',
					'2',
					f.customerName,
					f.customerPhone,
					f.plateNumber,
					f.mileage,
					f.engineNum,
					f.vehicleIdNum,
					f.applyDate,
					f.carColor,
					f.modelName,
					f.seriesName,
					f.customerCode,
					this.createId,
					'007',
					f.workorderTime,
					f.isMyCard,
					this.remark,
					this.all2,
					this.List
				);
			
			
		},

		/**
		 * 结算
		 */
		goClose() {
			this.$router.push({
				path: '/close',
				query: {
					id: 'Agony'
				}
			});
		},

		// 小计
		changet() {
			var totalPrice = 0; //临时总价
			console.log(this.List);
			this.inputShow = false;
			this.List.forEach(function(val, index) {
				totalPrice += val.subtotal ; //累计总价
			});
			this.all = parseFloat(totalPrice);
		},
		// 提成
		changet2() {
			this.inputShow2 = false;
		},



		/**
		 * 销售/施工弹窗
		 */
		//确定按钮
		sendEmpData(checkList, checkList2) {
			this.empAlert = false;
			console.log('销售施工',checkList,checkList2)
			let arr=[]
			if (checkList != ''||checkList2 != '') {
				arr = checkList.concat(checkList2);
			}
			this.List[this.chooseEmpidx].mapList=arr
			console.log('最后数组',arr)
			this.$set(this.List,this.chooseEmpidx,this.List[this.chooseEmpidx])
		},
		// 关闭弹窗
		closeEmpAlert() {
			this.empAlert = false;
		},
		
		
		// 显示弹窗
		setEmpAlert(index, row) {
			this.empAlert = true, console.log('显示弹窗', index, row);
			this.chooseEmpidx = index;
			this.$http
				.get('/LaborFindByGoods/findByGoods', {
					merchantCode: this.merchantCode,
					goodsCode: row[index].goodsCode || row[index].code
				})
				.then(res => {
					console.log('请求选择员工弹窗结果', res);
					if (res.code == '10000') {
						let e1 = [];
						let e2 = [];
						res.data.map(item => {
							if (item.employeeType == 1) {
								e1.push(item);
							} else {
								e2.push(item);
							}
						});
						this.empList1 = this.deWeight(e1);
						this.empList2 = this.deWeight(e2);
					}
				});
		},

		/**
		 *设为赠品
		 */
		set(index, rows) {
			var totalPrice = 0; //临时总价
			// this.List[index].isGift=1
			// this.List[index].subtotal=0
			// this.List[index].goodsCount=1
			// rows[index].price = this.List[index].price;
			// this.$set(rows[index],'isGift',1)
			// this.$set(rows[index],'subtotal',0)
			// this.$set(rows[index],'goodsCount',1)
			rows.isGift = 1;
			rows.subtotal = 0;
			rows.goodsCount=1
			
			console.log('最后欧的值',this.List)
			// this.List=rows
			this.$set(this.List,index,rows)
			this.List.forEach(function(val, index) {
				totalPrice += val.subtotal ; //累计总价
			});
			this.all = parseFloat(totalPrice);
			this.$store.commit('list',this.List)
			// this.List=this.$store.state.carList
			// this.$set(this.List,)
		},

		/**
		 * 删除本行信息
		 */
		deleteRow(index, rows) {
			console.log(index);
			// rows.splice(index, 1);
			this.List.splice(index, 1);
			var totalPrice = 0; //临时总价
			console.log(this.List);
			this.inputShow = false;
			this.List.forEach(function(val, index) {
				totalPrice += Number(val.subtotal) //累计总价
			});
			this.all = parseFloat(totalPrice);
			this.$store.commit('list',this.List)
		},

		/**
		 * 步进器
		 */

		handleChange(idx,row) {
			// this.$set(this.List, idx, row);
			var totalPrice = 0; //临时总价
			// 计算小计
			this.List[idx].subtotal=(Number(this.List[idx].goodsCount)*Number(this.List[idx].price)).toFixed(2)
			// this.List.map(item=>{
			// 	item.subtotal=(Number(item.goodsCount)*Number(item.price)).toFixed(2)
			// })
			// 计算总价
			this.List.forEach(function(val, index) {
				totalPrice += Number(val.subtotal); //累计总价
			});;
			this.all = parseFloat(totalPrice);
			this.$store.commit('list',this.List)
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
	watch:{
		allPrice:function(){
			this.List.map(item => {
				this.all+=item.subtotal
			})
		}
	}
};
</script>

<style scoped>
.quickOrderBill {
	width: 100%;
}
.choose {
	color: #333333;
	font-size: 28px;
	font-weight: bold;
}
.remark {
	justify-content: flex-end;
	margin-right: 30px;
	margin-top: 25px;
	align-items: center;
}
.footer {
	align-items: center;
	justify-content: flex-end;
	padding-right: 30px;
	margin-top: 40px;
	border-top: 1px solid #bcbcbc;
	padding-top: 20px;
}
</style>
