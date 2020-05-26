<!-- 工单结算 -->
<template>
	<div class="close">
		<div class="pl">
			<div style="display: flex;align-items: center;">
				<el-col :span="3">
					<div class="font-big" style="font-size: 24px;">{{ laborOrder.plateNumber }}</div>
				</el-col>
				<el-col :span="5">
					<span>{{ laborOrder.customerName }}</span>
					&nbsp;&nbsp;
					<span>{{ laborOrder.customerPhone }}</span>
				</el-col>
				<el-col :span="2" style="width: 130px;" class="mr">
					<div>{{ laborOrder.updateTime }}</div>
				</el-col>
				<el-col :span="6">
					<div
						class="d-flex"
						style="align-items: center;
			"
					>
						<div style="width: 30%;">本次公里数:</div>
						<el-input v-model="laborOrder.mileage">
							<template slot="append">
								KM
							</template>
						</el-input>
					</div>
				</el-col>
			</div>

			<div style="margin-top: 50px;">
				<el-col :span="4"><div class="font-big" style="line-height: 60px;">项目明细</div></el-col>
				<el-col :span="10" class="d-flex" style="align-items: center;line-height: 60px;">
					<div class="font-big">工单编号:</div>
					&nbsp;&nbsp;
					<div class="font-big" style="">{{ laborOrder.workorderCode }}</div>
				</el-col>
				<el-table @cell-click="cellClick" :header-cell-style="{ color: '#333', fontSize: '14px', background: '#ccc' }" border :data="list" style="width: 60%;">
					<el-table-column align="center" prop="goodsName" label="项目"></el-table-column>
					<el-table-column align="center" prop="price" label="价格">
						<template slot-scope="scope">
							<span>¥{{ scope.row.price }}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="goodsCount" label="数量"></el-table-column>
					<el-table-column align="center" prop="subtotalMoney" label="小计">
						<template slot-scope="scope">
							<span>¥{{ scope.row.subtotalMoney }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="sell" label="销售/施工人员">
						<template slot-scope="scope">
							<!--  -->
							<div style="position:relative;left:126px"><i class="el-icon-edit-outline" @click="setEmpAlert(scope.$index, list)"></i></div>
							<div class="d-flex" style="flex-wrap: wrap;">
								<div>销售:</div>
								<div v-for="(list, index) in scope.row.laborGoodsEmployeeList" :key="index">
									<div style="margin-left:5px">{{ list.customerType == 1 ? list.employeeName : '' }}</div>
								</div>
							</div>
							<div class="d-flex" style="flex-wrap: wrap;">
								<div>施工:</div>
								<div v-for="(list, index) in scope.row.laborGoodsEmployeeList" :key="index">
									<div style="margin-left:5px">{{ list.customerType == 2 ? list.employeeName : '' }}</div>
								</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<div style="margin-top: 40px;">
				<div class="font-big" style="line-height: 60px;">业务结算</div>
				<table class="table">
					<tr>
						<td rowspan="2" style="text-align: left;padding-left: 30px;width: 100px;">会员卡</td>
						<td style="width: 700px;">
							<div class="d-flex" style="align-items: center;padding-left: 40px;">
								<div class="d-flex">
									<p class="underline">{{ vipNum }}张</p>
									<p>可用会员卡</p>
								</div>
								<div style="margin-left: 40px; flex-wrap: wrap;" class="d-flex">
									<el-checkbox-group v-model="vipList" v-for="(item, index) in vipCards" :key="index" :label="item" @change="changeBox(item, index)">
										<el-checkbox style="margin-right: 10px;" @change="checked => ch(checked, item)" :label="item" :disabled="dis">{{ item.memberCardName }}</el-checkbox>
									</el-checkbox-group>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="d-flex" style="width: 700px;border:0;padding:20px;padding-left: 40px;"><el-checkbox @change="mes" v-model="isMes">扣卡后短信通知持卡人</el-checkbox></td>
					</tr>
					<tr>
						<td>次卡商品</td>
						<td class="d-flex" style="width: 700px;border: 0;padding:20px;padding-left: 40px;">
							<div class="d-flex" style="width: 200px;">
								<!-- timeCard -->
								<!-- <div class="underline" @click="timersShow">{{ vipList.length }}张</div> -->
								<div class="underline" @click="timersShow">{{ this.timeCardList.length }}张</div>
								<div>可用次卡商品</div>
							</div>
							<span style="color: #0000ff;">已选:</span>
							<div style="margin-right: 5px;color: #0000ff;" v-for="(item, index) in showtimeCardList" :key="index">{{ item.goodsName }}*{{ item.goodsCount }}</div>
						</td>
					</tr>
					<tr>
						<td>优惠券</td>
						<td class="d-flex" style="width: 1000px;border:0;padding:20px;padding-left: 40px; flex-wrap:wrap ;">
							<div class="d-flex" style="width: 200px;">
								<div class="underline" @click="couponIsAlert">{{ coupon }}张</div>
								<div>可用优惠券</div>
							</div>
							<span style="color: #0000ff;">已选:</span>
							<div style="margin-right: 5px;color: #0000ff;" v-for="(item, index) in showCouponList" :key="index">{{ item.couponName }}*{{ item.goodsCount }}</div>
						</td>
					</tr>
					<tr>
						<td>储值卡</td>
						<td class="d-flex" style="width: 700px;border: 0;padding:20px;padding-left: 40px;">
							<div style="width: 200px;text-align: left;">余额:{{ balance }}元</div>
							<!-- <div class="d-flex" style="align-items: center;">
								<div style="width: 80%;">请输入抵扣金额:</div>
								<el-input size="small" v-model.number="discount" type="number" @input="inputPrice" min="0"></el-input>
							</div> -->
							<div style="color: #0000ff;">本次使用金额:{{thisBalance}}</div>
						</td>
					</tr>
					<tr>
						<td style="text-align: left;padding-left: 30px;">兑换码</td>
						<td class="d-flex" style="width: 700px;border: 0;padding:20px;padding-left: 40px;">
							<div class="d-flex" style="align-items: center;width: 150px;">
								<!-- @click="codeListIsShow" -->
								<div class="underline"  style="color: #C0C4CC;">{{ alertCodeList.length }}张</div>
								<div>可用兑换码</div>
							</div>

							<div v-for="(item, index) in codeList" :key="index" style="margin-right: 10px;align-items: center" class="d-flex">
								<div>{{ item.name }}</div>
							</div>
							<el-button disabled="true" type="text" @click="addCode">添加新兑换码</el-button>
						</td>
					</tr>
				</table>
			</div>

			<div class="footer">
				<div style="margin-right: 56px;display: flex;justify-content: flex-end;">
					<ul>
						<li class="d-flex" style="align-items: center;">
							<div style="width: 200px;">会员卡抵扣:</div>
							<!-- {{ Number(discount)+Number(onceCardDiscount) }} -->
							<!-- <div style="margin-left:80px">-¥{{ onceCardDiscount }}</div> -->
							<div style="margin-left:80px">-¥{{ vipCount }}</div>
						</li>
						<li class="d-flex" style="align-items: center;">
							<div style="width: 200px;">兑换码核销:</div>
							<div style="margin-left:80px">-¥{{ Number(codeDis) }}</div>
						</li>
						<li class="d-flex" style="align-items: center;">
							<div style="width: 200px;">人工优惠金额:</div>
							<div style="margin-left:80px">-¥{{ Number(favMoney) }}</div>
						</li>
					</ul>
				</div>

				<div style="width: 103%;background:#ccc;height: 70px;margin-left: -40px;display: flex;justify-content: flex-end;align-items: center;">
					<div>工单总额:</div>
					<!-- laborOrder.totalMoney  -->
					<div class="red" style="margin-left: 10px;">¥{{ orderPrice }}</div>
					<div style="margin-left: 30px;margin-right: 10px;">优惠金额:</div>
					<div><el-input v-model="favMoney" @input="fav"></el-input></div>
					<div style="margin-left: 30px;margin-right: 10px;">应收金额:</div>
					<div class="red" style="margin-right: 80px;">¥{{Number(shouldPay).toFixed(2)}}</div>
				</div>

				<div style="display: flex;justify-content: flex-end;align-items: center;margin-right:30px ;margin-top: 20px;">
					<el-button style="margin-right:35px ;" type="text" @click="back">返回</el-button>
					<div>
						<el-dropdown @command="print" trigger="click">
							<span class="el-dropdown-link">打印</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="报价单">报价单</el-dropdown-item>
								<el-dropdown-item command="结算单">结算单</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<el-button style="margin-left: 35px;" @click="close" :disabled="onceClick" size="small" type="primary">业务结算</el-button>
				</div>
			</div>
		</div>

		<!-- <el-button @click='un'>解锁</el-button> -->

		<emp :chooseEmp="empAlert" :empListf="empList1" :empLists="empList2" @closeEmpAlert="closeEmpAlert" @empConfirm="sendEmpData"></emp>

		<timesCard :timersCardShow="timersCardShow" :vipCards="onceGoodsListAll" :timeCardList="showtimeCardList" @confirmTimers="confirmTimers" @closeTimers="closeTimers"></timesCard>

		<!-- 兑换码弹窗 -->
		<codes :codeShow="codeShow" :alertCodeList="alertCodeList" @confirmCode="confirmCode" @closeCode="closeCode"></codes>
		<!-- 优惠券 -->
		<coupon :couponIsShow="couponIsShow" :couponList="couponList" @confirmCoupon="confirmCoupon" @closeCoupon="closeCoupon"></coupon>

		<!-- 添加兑换码核销 -->
		<el-dialog :close-on-click-modal="false" center title="添加兑换码" :visible.sync="addCodes">
			<div style="display: flex;justify-content: center;margin-bottom: 30px;">
				<el-radio v-model="radio" label="2">优惠券</el-radio>
				<el-radio v-model="radio" label="1">次卡商品</el-radio>
			</div>
			<el-input v-model="importCode" placeholder="请输入兑换码"></el-input>

			<span slot="footer" class="dialog-footer">
				<el-button @click="closeAddCode">取 消</el-button>
				<el-button type="primary" @click="sendAddCode">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
// 选择员工弹窗
import emp from './closeChildren/chooseEmp.vue';
// 选择次卡弹窗
import timesCard from './closeChildren/timeCard.vue';
// 选择优惠券
import coupon from './closeChildren/dis.vue';
//选择兑换码
import codes from './closeChildren/codes.vue';
export default {
	components: {
		timesCard,
		emp,
		coupon,
		codes
	},
	data() {
		return {
			onceClick:false,//设置按钮只能点击一次
			onceGoodsListAll:[],
			orderPrice:0,
			dataShouldPay:'',
			// shouldPay:'',//应收金额
			vipCount:'',
			
			thisBalance:0,//本次使用金额
			totalMoney3:0,
			totalMoney2:0,
			
			disPrice:0,
			
			isHas: [],

			//会员卡抵扣
			cardDed: 0,

			//临时保存添加的次卡商品
			array: [],
			// 会员卡选择禁用
			dis: false,
			//会员卡id
			arrId: [],

			//选择兑换码
			codeShow: false,
			// 兑换码数据
			alertCodeList: [],
			// 添加新兑换码
			addCodes: false,
			// 输入的兑换码
			importCode: null,
			//兑换码数组
			codeList: [],
			radio: '2',

			//优惠券弹窗
			couponIsShow: false,
			// 已选择可用优惠券
			couponList: [],
			showCouponList: [],

			// 次卡弹窗
			timersCardShow: false,
			// 选择的次卡
			showtimeCardList: [],

			//销售施工弹窗
			//销售
			empList1: [],
			//施工
			empList2: [],
			// 选择销售施工弹窗的下标
			chooseEmpidx: null,
			// 选择销售施工弹窗
			empAlert: false,

			// 应收总金额
			payMoney: 240,
			// 优惠金额
			favMoney: 0,
			// 订单总金额
			allMoney: 240,
			// 人工优惠金额
			otherDis: '0',
			// 兑换码折扣
			codeDis: 0,
			// 会员卡折扣
			vipDis: '0',
			// 输入折扣金额
			discount: 0,
			//最大折扣限制
			discountMax: null,

			// 已选择次卡
			timeCardList: [],
			// 展示卡余额
			cardBalance: false,
			// 展示次卡商品/优惠券
			showCard: false,
			// 多选框
			// 短信通知
			isMes: false,
			// 最后选择选项
			vipList: [],
			// 兑换码核销
			code: '0',
			// 卡余额
			balance: 0,
			// 优惠券
			coupon: '0',
			// 可用次卡商品
			timeCard: '0',
			// 可用会员卡
			//会员卡集合
			vipCards: [],
			//张数
			vipNum: 0,
			// 工单编号
			orderNum: '',
			list: [],
			// 会员卡抵扣金额
			onceCardDiscount: 0,

			//页面初始值
			laborOrder: { plateNumber: '', customerName: '', customerPhone: '', updateTime: '', mileage: '', workorderCode: '', totalMoney: '0' }
		};
	},
	computed: {

		shouldPay(){
			let price = 0
		return	Number(this.dataShouldPay-this.favMoney).toFixed(2)
		}
	},
	methods: {
		/**
		 * 工单结算
		 */
		close(goodsList, vipNumber, cardBalance, vipCards, onceGoodsList, coupons, deduction, orderPrice, redeemCode, benefit, giftObj, giftService) {
			console.log('抵扣金额', Number(this.discount))
					this.onceClick=true
			this.$http
				.post('/LaborBlance/balance/order', {
					employeeId: localStorage.getItem('createId')||'',
					laborOrder: this.laborOrder, //	object	工单对象
					goodsList: this.list, //	array	商品集合
					vipNumber: this.vipNum, //	int	会员卡数量
					cardBalance: Number(this.balance), //	int	卡余额
					vipCards: this.vipList, //	array	会员卡集合
					onceGoodsList: this.showtimeCardList, //	array	次卡商品集合
					coupons: this.showCouponList, //	array	优惠券集合
					// deduction: Number(this.onceCardDiscount)+Number(this.discount), //	string	抵扣金额
					deduction: this.vipCount, //	string	抵扣金额
					reduce:Number(this.thisBalance),
					// shouldPay: this.laborOrder.totalMoney - this.favMoney - this.discount - this.codeDis - this.onceCardDiscount, //	string	应付金额
					shouldPay: Number(this.shouldPay), //	string	应付金额
					orderPrice: this.laborOrder.totalMoney, //	string	订单金额
					redeemCode: this.codeList, //	array	兑换码集合
					benefit: this.favMoney, //	string	人工优惠金额
					redeemVerification: this.codeDis, // string 兑换码优惠
					notifyCardOwner: this.isMes //扣卡后是否通知持卡人
				})
				.then(res => {
					console.log('%c请求工单结算结果', 'color:red;font-size:20px', res);
					if (res.code == 'success') {
						// window.sessionStorage.setItem('financialClose',(res.data))
						this.$router.push({
							path: '/financialClose',
							query: {
								// datas: JSON.stringify(res.data),
								workOrderCode:res.data.laborOrder.workorderCode,
								merchantCode: this.merchantCode
							}
						});
					this.onceClick=false
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 *  查询次卡商品集合
		 */
		getVipList(vipCardId) {
			this.dis = true;
			setTimeout(() => {
				this.dis = false;
			}, 1500);

			this.$http
				.get('/LaborBlance/findOnceCards', {
					merchantCode: this.merchantCode,
					orderCode: this.orderCode,
					vipCardId
				})
				.then(res => {
					console.log('%c请求查询次卡商品集合结果', 'color:red;font-size:20px', res);
					if (res.code == '10000') {
						this.timeCardList = res.data;
					} else {
						alert(res.message);
					}
				});
		},

		// ========================================================
		/**
		 * 返回
		 */
		back() {
			this.$router.push({
				path: '/',
				query: {
					merchantCode: this.merchantCode
				}
			});
		},

		/**
		 * 兑换码
		 */
		codeListIsShow() {
			this.codeShow = true;
		},
		// 确认按钮
		confirmCode(val) {
			console.log('确认兑换码弹窗', val);
			this.codeList = val;
			val.map(item => {
				if (item.type == 2) {
					this.codeDis += Number(item.price);
				}
			});
			this.codeShow = false;
		},
		closeCode() {
			this.codeShow = false;
		},

		// ========================================================
		/**
		 * 优惠券
		 */
		couponIsAlert() {
			this.couponIsShow = true;
		},
		// 关闭按钮
		closeCoupon() {
			this.couponIsShow = false;
		},
		confirmCoupon(val) {
			this.showCouponList = val;
			this.couponIsShow = false;
		},
		// ========================================================
		/**
		 * 次卡弹窗
		 */
		// 确认按钮
		confirmTimers(val) {
			this.timersCardShow = false;
			let total = 0;
			console.log('值', val);
			val.map(item => {
				total += Number(item.price) * Number(item.goodsCount);
			});
			this.onceCardDiscount = total;
			// this.showtimeCardList = val;
			// this.balance = this.balance - cardBalance; //卡余额
			// console.log('最高抵扣',maxDisCount)
			// this.discountMax = maxDisCount; //最大抵扣金额
		},
		// 关闭弹窗
		closeTimers() {
			this.timersCardShow = false;
		},
		// 显示弹窗
		timersShow() {
			console.log(this.timeCardList, this.showtimeCardList);
			this.$bus.$emit('showList', this.timeCardList||[], this.showtimeCardList||[]);
			// this.getVipList(this.arrId.join(','))
			this.timersCardShow = true;
		},

		/**
		 * @param {Object} v输入优惠金额
		 */
		fav(val) {
			if (val > this.dataShouldPay) {
				this.$message.error('输入的优惠金额金额必须小于' + this.dataShouldPay);
				this.favMoney = 0;
			}
		},

		/**
		 * 输入折扣金额判断
		 */
		inputPrice(val) {
			console.log('输入的抵扣金额', val, this.discountMax);
			if (val > this.discountMax) {
				this.$message.error('最高可用折扣金额为' + this.discountMax);
				this.discount = 0;
			} else if (val < 0) {
				this.$message.error('请正确输入折扣金额' + this.discountMax);
				this.discount = 0;
			}else{
				console.log('输入抵扣',this.discount,this.onceCardDiscount)
				// let total=0
				// total=Number(this.discount)
				// this.totalMoney2=total
				this.discount=val
			}
		},

		// 打印
		print(val) {
			console.log(val);
			this.$router.push({
				name: 'closeOrder',
				params: {
					data: this.laborOrder,
					vipNum: this.vipNum,
					list: this.list,
					resPrice: this.laborOrder.totalMoney - this.favMoney  - this.codeDis - this.vipCount,
					type: val
				}
			});
		},

		/**
		 * 添加新兑换码
		 */

		addCode() {
			this.addCodes = true;
		},
		// 取消按钮
		closeAddCode() {
			this.addCodes = false;
		},
		// 确定按钮
		sendAddCode() {
			this.$http
				.get('/LaborRedeemCode/discriminateCode', {
					merchantCode: this.merchantCode,
					exchangeCode: this.importCode,
					type: this.radio
				})
				.then(res => {
					console.log('%c请求兑换码识别结果', 'color:red;font-size:20px', res);
					if (res.data.status == 'true') {
						res.data.exchangeCode = this.importCode;
						this.alertCodeList.push(res.data);
						this.addCodes = false;
						this.importCode = '';
					} else {
						alert('该兑换码已被使用或者暂无该兑换码');
					}
				});
		},

		un() {
			this.$http
				.post('/LaborRedeemCode/unlockedCode', [
					{
						merchantCode: this.merchantCode,
						exchangeCode: 'XP3L62FXVH32HT0X',
						type: 1
					}
				])
				.then(res => {
					console.log('%c请求结果', 'color:red;font-size:20px', res);
					if (res.code == '10000') {
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 多选
		 */
		// 短信通知
		mes(val) {
			console.log(this.isMes, val);
		},
		// 储值卡
		changeBox(val, idx) {
			// let arr=[]
			// this.vipList.map(item=>{
			// 	arr.push(item.customerMemberCardId)
			// 	// if(item.memberCardType==1||item.memberCardType==2){
			// 	// 	
			// 	// }
			// })
			// this.arrId=arr
			// if(this.arrId.length>0){
			// this.getVipList(this.arrId.join(','))
			// }else{
			// 	this.timeCardList=[]
			// }
			// this.getBalance(this.vipList)
			this.getEditfindOrderInfo([],this.vipList)
			// console.log("vipList: " , this.vipList);
		},

		ch(checked, val) {
			//回调函数
			if (checked) {
				// isHas>1表示存在 <1表示不存在
				console.log('选择的次卡',val)
				// if (val.memberCardType == 1 || val.memberCardType == 2) {
				// 	if (this.isHas.length >= 0 && this.isHas.length <= 2) {
				// 		this.isHas.push(val);
				// 		// this.getBalance(val.customerMemberCardId)
				// 	}
						
				// 	if (this.isHas.length > 2) {
				// 		this.isHas.splice(0, 1);
				// 	}
				// 	if (this.isHas.length > 1 && (val.memberCardType == 1 || val.memberCardType == 2)) {
				// 		this.vipList.map((item, idx) => {
				// 			if (this.isHas[0].customerMemberCardId == item.customerMemberCardId) {
				// 				this.vipList.splice(idx, 1);
				// 			}
				// 		});
				// 	}
				// }
			} else {
				// if (val.memberCardType == 1 || val.memberCardType == 2) {
				// 	if (this.isHas.length > 0) {
				// 		this.isHas.map((item, index) => {
				// 			if (val.customerMemberCardId == item.customerMemberCardId) {
				// 				this.isHas.splice(index, 1);
				// 			}
				// 		});
				// 	}
				// }
				// console.log('showtimeCardList',this.showtimeCardList,val.customerMemberCardId)
				// let sp = this.showtimeCardList
				// this.showtimeCardList.map((item, index) => {
				// 	console.log(val.customerMemberCardId,item.goodsVipId)
				// 	if (val.customerMemberCardId == item.goodsVipId) {
				// 		sp.splice(index, 1);
				// 	}
				// });
				// this.showtimeCardList=this.showtimeCardList.filter(item => Number(item.goodsVipId)!=Number(val.customerMemberCardId))
				// console.log('删除',sp)
				// this.array.map((item, index) => {
				// 	this.timeCardList.map((items, idx) => {
				// 		if (item == items) {
				// 			this.timeCardList.splice(idx, this.array.length);
				// 		}
				// 	});
				// });
			}
		},

		/**
		 * 点击表格
		 */
		cellClick(val) {},

		/**
		 * 销售/施工弹窗
		 */
		//确定按钮
		sendEmpData(checkList, checkList2) {
			this.empAlert = false;
			this.list[this.chooseEmpidx].laborGoodsEmployeeList = checkList.concat(checkList2);
			this.list[this.chooseEmpidx].laborGoodsEmployeeList.map(item => {
				item.customerType = item.employeeType;
			});
			console.log('选择的销售施工', this.list[this.chooseEmpidx]);
		},
		// 关闭弹窗
		closeEmpAlert() {
			this.empAlert = false;
		},
		// 显示弹窗
		setEmpAlert(index, row) {
			this.empAlert = true;
			this.chooseEmpidx = index;
			let e1 = [];
			let e2 = [];
			console.log('显示的弹窗', row[index]);
			this.$http
				.get('/LaborFindByGoods/findByGoods', {
					merchantCode: this.merchantCode,
					goodsCode: row[index].goodsCode || row[index].workorderCode
				})
				.then(res => {
					console.log('%c请求员工弹窗结果', 'color:red;font-size:20px', res);
					if (res.code == '10000') {
						res.data.map(item => {
							if (item.employeeType == 1) {
								e1.push(item);
							} else {
								e2.push(item);
							}
						});
						this.empList1 = this.deWeight(e1);
						this.empList2 = this.deWeight(e2);
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 获取工单结算界面
		 */
		getList() {
			this.$http
				.get('/LaborBlance/findOrderInfo', {
					merchantCode: this.merchantCode,
					orderCode: this.orderCode
				})
				.then(res => {
					console.log('%c请求工单结算结果', 'color:red;font-size:20px', res);
					if (res.code == '10000') {
						// 工单数据 车牌/会员卡信息/时间
						res.data.laborOrder.totalMoney=res.data.orderPrice
						this.laborOrder = res.data.laborOrder;
						res.data.goodsList.map(item => {
							if (item.price == null) {
								item.price = 0;
							}
							if (item.subtotalMoney == null) {
								item.subtotalMoney = 0;
							}
						});
						// 项目明细
						this.list = res.data.goodsList;

						// 业务结算
						// 1.会员卡数量
						this.vipNum = res.data.vipNumber;
						
						// 3.会员卡集合
						this.vipCards = res.data.vipCards;
						res.data.vipCards.map(item => {
							if (item.isSelected) {
								this.vipList.push(item);
							}
						});
						let arr = [];
						this.vipList.map(item => {
							arr.push(item.customerMemberCardId);
						});
						// res.data.onceGoodsConsumeList.map(item => {
						// 	item.goodsCount = 1;
						// });

						this.showtimeCardList = res.data.onceGoodsConsumeList;
						
						this.arrId = arr;
						// 4.次卡商品集合
						//4-1 次卡张数
						this.timeCard = res.data.onceGoodsConsumeList.length;
						//4-2 次卡商品集合
						this.timeCardList = res.data.onceGoodsConsumeList;
						this.onceGoodsList = res.data.onceGoodsConsumeList;
						// 5.优惠券集合
						// 5-1优惠券张数
						// this.coupon = res.data.coupons.length;
						// 5-2优惠券商品集合
						this.couponList = res.data.coupons;
						// 6.卡余额
						//6.1余额
						this.balance = res.data.cardBalance;
						// 最大折扣余额限制
						this.discountMax = res.data.maxDisCount;
						// 7.兑换码
						if (res.data.redeemCode != null) {
							this.code = res.data.redeemCode.length;
							this.codeList = res.data.redeemCode;
						} else {
							this.code = 0;
						}
						// 8.次卡抵扣金额
						this.vipCount=res.data.deduction//会员卡抵扣金额
						this.onceCardDiscount = res.data.onceCardDiscount;
						this.cardDed = res.data.onceCardDiscount;
						// this.shouldPay = res.data.beforeAIShouldPay//应收金额
						this.dataShouldPay=res.data.beforeAIShouldPay//应收金额
						this.thisBalance=res.data.specialDeduction
						this.orderPrice=res.data.orderPrice///
						this.onceGoodsListAll=res.data.onceGoodsListAll//次卡商品弹窗左侧展示的数据
					} else {
						alert(res.message);
					}
				});
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

		uniq(array) {
			let temp = []; //一个新的临时数组
			for (let i = 0; i < array.length; i++) {
				if (temp.length == 0) {
					temp.push(array[i]);
				} else {
					let o = 0;
					for (let a = 0; a < temp.length; a++) {
						var obj = array[i];
						var obj1 = temp[a];
						if (JSON.stringify(obj1) === JSON.stringify(obj)) {
							o = 1;
							break;
						}
					}
					if (o == 0) {
						temp.push(array[i]);
					}
				}
			}
			return temp;
		},
		
		
		// getBalance(customerMemberCardId){
		// 	this.$http.post('/LaborBlance/getBalance',{
		// 		merchantCode:this.merchantCode,
		// 		workorderCode:this.orderCode,
		// 		vipCards:this.vipList,  //会员卡集合--array
		// 		// onceCards:this.list,	//次卡集合--array
		// 		// customerMemberCardId//选择储值卡id
		// 	})
		// 	.then(res=>{
		// 		 if(res.code == '10000'){
		// 			this.balance=Number(res.data.cardBalance).toFixed(2)
		// 			this.thisBalance = Number(res.data.maxDiscount).toFixed(2)
		// 		}else{
		// 			 alert(res.message)
		// 	}
		// 	})
		// },
		getEditfindOrderInfo(redeemCode,vipCards){
			this.$http.post('LaborBlance/editFindOrderInfo',{
				laborOrder:this.laborOrder,
				goodsList : this.list,
				redeemCode,//兑换码列表
				benefit :Number(this.favMoney),//优惠金额
				notifyCardOwner :this.isMes,//是否短信通知
				vipCards,//选中的会员卡列表
			}).then(res => {
				this.vipCount=res.data.deduction//会员卡抵扣金额
				this.shouldPay=res.data.shouldPay//应收金额
				this.dataShouldPay=res.data.shouldPay
				this.favMoney=0
				// this.redeemVerification=res.data.redeemVerification//兑换码核销//
				this.balance=res.data.cardBalance  //卡余额
				this.thisBalance=res.data.specialDeduction//本次使用金额
				this.showtimeCardList=res.data.onceGoodsConsumeList//次卡商品集合 
				this.onceGoodsListAll=res.data.onceGoodsListAll//次卡商品弹窗左侧展示的数据
				
			})
		}
	},
	
	
	
	mounted() {},
	created() {
		this.merchantCode = this.$route.query.merchantCode;
		// 工单编号
		this.orderCode = this.$route.query.workOrderCode;
		this.getList();
	} //生命周期 - 创建之后
};
</script>

<style scoped>
.pl {
	padding-left: 50px;
}
.table {
	border-collapse: collapse;
	width: 100%;
}
.table tr > td {
	/* width: 150px; */
	text-align: center;
}
.table tr {
	width: 100%;
}
.table,
.table tr,
.table td {
	border: 1px solid #797979;
}
.underline {
	color: red;
	text-decoration: underline;
	cursor: pointer;
}
.footer {
	margin-top: 60px;
}
.footer ul li {
	list-style: none;
}
.red {
	font-size: 28px;
	color: #ff0000;
}
.el-dropdown-link {
	cursor: pointer;
	color: #409eff;
}
/deep/ .el-dialog__header {
	background: #169bd5 !important;
}
/deep/ .el-dialog {
	border-radius: 24px;
}
</style>
