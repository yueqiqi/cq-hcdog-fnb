<!-- 财务结算 -->
<template>
	<div class="financialClose">
		<!-- <div style=" margin-left: 120px;height: 50px;"><h2 style="text-align: left;">工单管理/工单列表/工单结算</h2></div>
		<div style="height: 20px;"><hr /></div> -->

		<div class="body">
			<div style="display: flex;align-items: center;padding-left: 50px;">
				<el-col :span="2"><div class="font-big">财务结算</div></el-col>
				<el-col :span="8" class="d-flex" style="align-items: center;">
					<div>工单编号:</div>
					&nbsp;&nbsp;
					<div style="padding-top: 5px;">{{ form.laborOrder.workorderCode }}</div>
				</el-col>
				<el-col :span="10"><el-button type="text" style="text-decoration: underline;font-size: 14px;" @click="look">查看工单详情></el-button></el-col>
			</div>

			<div>
				<table class="table">
					<tr>
						<td rowspan="2" style="text-align: left; padding-left: 30px;">会员卡</td>
						<td style="width: 700px;">
							<div class="d-flex" style="align-items: center;padding-left: 40px;">
								<div style="padding: 25px 0px;" class="d-flex" v-for="(item, index) in form.vipCards" :key="index">
									<span style="margin-right: 20px;">{{ item }}</span>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="d-flex" style="width: 700px;border:0;padding:20px;padding-left: 40px;">
							<div>{{ notifyCardOwner ? '通知持卡人' : '不通知他人' }}</div>
						</td>
					</tr>
					<tr>
						<td>次卡商品</td>
						<td class="d-flex" style="width: 700px;border: 0;padding:20px;padding-left: 40px;">
							<span style="color: #0000ff;">已选:</span>
							<!-- <div style="margin-right: 5px;color: #0000ff;" v-for="(item, index) in form.onceGoodsList" :key="index">{{ item.goodsName }}*{{ item.goodsCount }}</div> -->
							<div style="margin-right: 5px;color: #0000ff;" v-for="(item, index) in form.onceGoodsList" :key="index">{{ item }}</div>
						</td>
					</tr>
					<tr>
						<td>优惠券</td>
						<td class="d-flex" style="width: 700px;border:0;padding:20px;padding-left: 40px;">
							<span style="color: #0000ff;">已选:</span>
							<div style="margin-right: 5px;color: #0000ff;" v-for="(item, index) in form.coupons" :key="index">{{ item.couponName }}*{{ item.goodsCount }}</div>
						</td>
					</tr>
					<tr>
						<td>卡余额</td>
						<td class="d-flex" style="width: 700px;border: 0;padding:20px;padding-left: 40px;">
							<div style="width: 200px;text-align: left;">余额:{{ form.cardBalance }}元</div>
							<div class="d-flex" style="align-items: center;">
								<div>已抵扣:¥{{ form.specialDeduction || 0 }}</div>
							</div>
						</td>
					</tr>
					<tr style="height: 60px;">
						<td style="text-align: left; padding-left: 30px;">兑换码</td>
						<td class="d-flex" style="width: 700px;border: 0;padding:20px;padding-left: 40px;">
							<div v-for="(item, index) in form.redeemCode" :key="index">{{ item.name }}</div>
						</td>
					</tr>
				</table>
			</div>

			<div style="margin-right: 56px;margin-top:50px;display: flex;justify-content: flex-end;">
				<ul>
					<li class="d-flex" style="align-items: center;">
						<div style="width: 200px;">会员卡抵扣:</div>
						<div style="margin-left:80px">-¥{{ form.deduction }}</div>
					</li>
					<li class="d-flex" style="align-items: center;">
						<div style="width: 200px;">兑换码核销:</div>
						<div style="margin-left:80px">-¥{{ form.redeemVerification }}</div>
					</li>
					<li class="d-flex" style="align-items: center;">
						<div style="width: 200px;">人工优惠金额:</div>
						<div style="margin-left:80px">-¥{{ form.benefit }}</div>
					</li>
				</ul>
			</div>

			<div style="background:#ccc;height: 70px;display: flex;justify-content: flex-end;align-items: center;">
				<div>订单总金额:</div>
				<div class="red" style="margin-left: 10px;">¥{{ form.orderPrice }}</div>
				<div style="margin-left: 30px;margin-right: 10px;">优惠金额:</div>
				<div class="red">¥{{ form.benefit }}</div>
				<div style="margin-left: 60px;margin-right: 10px;">应收总额:</div>
				<div class="red" style="margin-right: 80px;">¥{{ form.shouldPay }}</div>
			</div>

			<div style="display: flex;justify-content: flex-end;align-items: center;margin-right:30px ;margin-top: 20px;">
				<div style="margin-right: 15px;">支付方式：</div>
				<div>
					<el-radio-group v-model="checkedRadio" @change="radioChanges">
						<el-radio label="1">现金</el-radio>
						<el-radio label="3">微信支付/支付宝支付</el-radio>
						<!-- <el-radio label="4">支付宝支付</el-radio> -->
						<el-radio label="2">刷卡</el-radio>
						<el-radio label="6">支付宝转账</el-radio>
						<el-radio label="5">微信转账</el-radio>

						<el-popover placement="bottom" width="800" trigger="manual" v-model="vis">
							<div>
								<!-- <el-row> -->
								<el-col :span="6">
									<div class="d-flex choose" style="align-items: center;">
										<div>现金：</div>
										<el-input v-model="cash" oninput = "value=value.replace(/[^\d.]/g,'')"  style="width: 50%;"  size="mini">
											<template slot="prepend">
												¥
											</template>
										</el-input>
									</div>
								</el-col>
								<el-col :span="9">
									<div class="d-flex choose" style="align-items: center;">
										<div>微信/支付宝支付：</div>
										<el-input v-model="wx" oninput = "value=value.replace(/[^\d.]/g,'')" style="width: 50%;" size="mini">
											<template slot="prepend">
												¥
											</template>
										</el-input>
									</div>
								</el-col>
								<!-- <el-col :span="8">
						<div class="d-flex choose" style="align-items: center;">
							<div>支付宝支付：</div>
							<el-input v-model="ali" style="width: 50%;" size='mini'><template slot="prepend">¥</template></el-input>
						</div>
					</el-col> -->
								<el-col :span="8">
									<div class="d-flex choose" style="align-items: center">
										<div>刷卡：</div>
										<el-input v-model="bank" oninput = "value=value.replace(/[^\d.]/g,'')" style="width: 50%;" size="mini">
											<template slot="prepend">
												¥
											</template>
										</el-input>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="d-flex choose" style="align-items: center;margin-top: 10px;">
										<div>微信转账：</div>
										<el-input v-model="wxpay" oninput = "value=value.replace(/[^\d.]/g,'')" style="width: 50%;" size="mini">
											<template slot="prepend">
												¥
											</template>
										</el-input>
									</div>
								</el-col>
								<el-col :span="16">
									<div class="d-flex choose" style="align-items: center;margin-top: 10px;">
										<div>支付宝转账：</div>
										<el-input v-model="alipay" oninput = "value=value.replace(/[^\d.]/g,'')" style="width: 30%;" size="mini">
											<template slot="prepend">
												¥
											</template>
										</el-input>
									</div>
								</el-col>
								<el-col :span="5"><div style="margin-top:10px;">将微信二维码发送至</div></el-col>
								<el-col :span="12">
									<el-radio-group style="margin-top:10px;" v-model="mesCode" @change="mesChange">
										<el-radio label="1">电脑</el-radio>
										<el-radio label="2">一体机</el-radio>
									</el-radio-group>
								</el-col>
								<!-- </el-row> -->
							</div>
							<el-radio label="7" slot="reference">两种以上支付方式</el-radio>
						</el-popover>
					</el-radio-group>
				</div>
			</div>

			<div style="display: flex;justify-content: flex-end;align-items: center;margin-right:30px " :class="vis ? 'mt' : 'normal'">
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
				<el-button style="margin-left: 35px;" size="small" type="primary" @click="close">财务结算</el-button>
			</div>
		</div>
		<hint :notice="notice" @rec="rec" @unrec="unrec" :onceClick='onceClick'></hint>
		<codeimg :codeIsShow="codeIsShow" :codeImg="codeImg" :price="codePrice" @closeCode="closeCode"></codeimg>
	</div>
</template>

<script>
// 提示
import hint from './hint.vue';
// 二维码
import codeimg from './alertCode.vue';
// npm install --save js-base64
const Base64 = require('js-base64').Base64;
export default {
	components: {
		// 提示
		hint,
		codeimg
	},
	data() {
		return {
			onceClick:false,//设置按钮只能点击一次
			//二维码弹窗价格
			codePrice: 0,

			//支付方式
			payType: null,

			//二维码弹窗
			codeIsShow: false,
			//二维码图片
			codeImg: null,
			//二维码64进制
			base64null: null,
			base64: null,
			// 提示弹窗
			notice: false,
			// 是否挂账
			buyoncredit: 0,

			// 二维码发送选择
			mesCode: '1',
			// 两种及以上
			// 支付宝转账
			alipay: '',
			// 微信转账
			wxpay: '',
			// 刷卡
			bank: '',
			// 支付宝支付
			ali: '',
			// 微信支付
			wx: '',
			// 现金
			cash: '',

			vis: false,
			// 选择的支付方式
			radios: null,
			checkedRadio: '',
			// 应收总金额
			payMoney: 240,
			// 优惠金额
			favMoney: 0,
			// 订单总金额
			allMoney: 240,
			// 人工优惠金额
			otherDis: '0',
			// 兑换码折扣
			codeDis: '0',
			// 会员卡折扣
			vipDis: '0',
			// 折扣金额
			discount: '1',
			// 已选择可用优惠券
			couponList: [],
			// 已选择次卡
			timeCardList: [],
			// 展示卡余额
			cardBalance: false,
			// 展示次卡商品/优惠券
			showCard: false,
			// 单选
			radio: false,
			// 多选框
			// 短信通知
			isMes: null,
			// 最后选择选项
			checkList: [],
			// 兑换码核销
			code: '0',
			// 卡余额
			balance: 178,
			// 优惠券
			coupon: '1',
			// 可用次卡商品
			timeCard: '1',
			// 可用会员卡
			vipNum: 3,
			// 工单编号
			orderNum: '120314891023',
			notifyCardOwner:false,
			//
			form: {
				laborOrder:{
				workorderCode:''
					
				}
			}
		};
	},
	created() {
		this.merchantCode = this.$route.query.merchantCode;
		this.orderCode = this.$route.query.workOrderCode; //工单编号
		console.log(this.orderCode)
		this.getInfo();
		
		// 工单对象
		// let f = this.form
		// let	route =JSON.parse(this.$route.query.datas)
		// f.laborOrder=route.laborOrder
		// // 商品集合
		// f.goodsList=route.goodsList
		// // 会员卡数量
		// f.vipNumber=route.vipNumber
		// // 卡余额
		// f.cardBalance=route.cardBalance
		// // 会员卡集合
		// f.vipCards=route.vipCards
		// // 次卡商品集合
		// f.onceGoodsList=route.onceGoodsList
		// // 优惠券集合
		// f.coupons=route.coupons
		// // 订单金额
		// f.orderPrice=route.orderPrice
		// // 抵扣金额
		// f.deduction=route.deduction
		// //兑换码金额
		// this.codeDis=route.redeemVerification
		// // 是否通知折卡信息
		// this.notifyCardOwner=route.notifyCardOwner
		// // 订单号
		// f.orderNo=route.orderNo
		// // 兑换码集合  逗号分隔
		// route.redeemCode.map(item =>{
		// 	item.exchangeCode=item.code
		// 	item.merchantCode=this.merchantCode
		// })
		// f.redeemCode=route.redeemCode
		// // 人工优惠金额
		// f.benefit=route.benefit
		// // 业务结算id
		// f.settleaccountsId=route.settleaccountsId
		// // 应收金额
		// f.shouldPay=route.shouldPay
	}, //生命周期 - 创建之后
	methods: {
		/**
		 * 财务结算数据回显
		 */
		getInfo() {
			this.$http
				.get('/LaborBlance/getBalanceFinance', {
					merchantCode: this.merchantCode,//门店参数
					orderCode: this.orderCode//订单号
				})
				.then(res => {
					if (res.code == '10000') {
						let f = this.form;
						let route = res.data
						// f.orderNo=res.data.workorderCode//工单编号
						f.laborOrder=route.laborOrder
						// 订单号
						f.orderNo=route.orderNo
						// 会员卡集合
						f.vipCards=route.vipCards
						// 是否通知折卡信息
						this.notifyCardOwner=route.notifyCardOwner
						// 次卡商品集合
						f.onceGoodsList=route.onceGoodsList
						// 优惠券集合
						f.coupons=route.coupons
						// 卡余额
						f.cardBalance=route.cardBalance
						//会员卡抵扣金额
						f.specialDeduction=route.specialDeduction;
						// 兑换码集合  逗号分隔
						if(route.redeemCode.length>0){
							route.redeemCode.map(item =>{
								item.exchangeCode=item.code
								item.merchantCode=this.merchantCode
							})
							f.redeemCode=route.redeemCode
						}
						//会员卡总抵扣金额
						f.deduction=route.deduction
						//兑换码核销金额
						f.redeemVerification=route.redeemVerification||0;
						// 人工优惠金额
						f.benefit=route.benefit
						// 订单金额
						f.orderPrice=route.orderPrice
						// 应收金额
						f.shouldPay=route.shouldPay;
						// 业务结算id
						f.settleaccountsId=route.settleaccountsId
						
						// // 商品集合
						f.goodsList=route.goodsList
						// // 抵扣金额
						// f.deduction=route.deduction
						// //兑换码金额
						// this.codeDis=route.redeemVerification
						
						
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 计算
		 */
		getClose(payType, buyoncredit) {
			if (buyoncredit == '0') {
				buyoncredit = false;
			} else {
				buyoncredit = true;
			}

			console.log('是否发送大大屏幕', this.mesCode);

			let f = this.form;
			this.$http
				.post('/LaborBlance/balance/finance', {
					employeeId: localStorage.getItem('createId')||'',
					laborOrder: f.laborOrder, //object	工单对象
					// goodsList: f.goodsList, //array	商品集合
					vipNumber: f.vipNumber, //int	会员卡数量
					cardBalance: f.cardBalance, //int	卡余额
					vipCards: f.vipCards, //array	会员卡集合
					onceGoodsList: f.onceGoodsList, //array	次卡商品集合
					coupons: f.coupons, //array	优惠券集合
					vipNumber: f.vipNumber, //int	会员卡数量
					deduction: f.deduction, //string	抵扣金额
					shouldPay: f.shouldPay, //string	应付金额
					orderPrice: f.orderPrice, //string	订单金额
					redeemCode: f.redeemCode, //array	兑换码集合
					benefit: f.benefit, //string	人工优惠金额
					qrcodeTo: this.mesCode, //int	微信二维码发送至 1:电脑 2:一体机
					payType, //string	支付方式 1:现金 2：刷卡 3：微信 4：支付宝 5:支付宝转账 6:微信转账 7:两种以上支付方式(英文逗号分隔)
					wechatAliPay: Number(this.wx), //string	微信支付金额
					// aliPayMoney:this.ali,	//string	支付宝支付金额
					cashPayMoney: Number(this.cash), //string	现金支付金额
					swipecardPayMoney: Number(this.bank), //string	刷卡支付金额
					wechatTransferPayMoney: Number(this.wxpay), //int	微信转账金额
					aliTransferPayMoney: Number(this.alipay), //string	支付宝转账金额
					vipOffsetMoney: f.deduction, //string	会员卡抵扣
					settleaccountsId: f.settleaccountsId, //string	业务结算单id
					buyoncredit: false, //是否挂账
					orderNo: f.orderNo
				})
				.then(res => {
					console.log('%c请求财务结算结果结果', 'color:red;font-size:20px', res);
					if (res.code == '10000') {
						let that = this;

						this.$router.push({
							path: '/',
							query: {
								merchantCode: this.merchantCode,
								orderNo: this.form.orderNo
							}
						});
					this.onceClick=false
					} else {
						alert(res.message);
					}
				});
		},

		getCode() {
			// // 分享二维码
			this.$http
				.post2(
					'https://autodt-gateway.yunchefu.cn/message/wechat/miniAppQrCode',
					{ appId: 'wx7451a1aa96196cd1', path: '/pages/redirect/index?orderNo=' + this.form.orderNo + '&merchantCode=' + this.merchantCode },
					{
						headers: {},
						// responseType: "blob"
						responseType: "arraybuffer"
					}
				)
				.then(res => {
					// this.codeImg = URL.createObjectURL(res);
					// // this.codeImg = this.base64ImgtoFile(res);
					// this.base64 = res;
					// console.log('请求二维码图片', this.codeImg, res);
					// if (this.mesCode == 2) {
					// 	// this.send(Base64.encode(this.base64));
					// 	this.send(URL.revokeObjectURL(res));
					// }
					this.codeImg =  'data:image/png;base64,' + btoa(
				  new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
					console.log(this.codeImg)
					if (this.mesCode == 2) {
						this.send(this.codeImg);
					}
				});
		},
base64ImgtoFile(dataurl, filename = 'file') {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
},
		/**
		 * 发送二维码到大屏
		 */
		send(photo) {
			console.log('照片', photo);
			this.$http
				.post('/merchantImg/sendPayQrCode', {
					merchantCode: this.merchantCode,
					// name: this.form.shouldPay,
					name: this.codePrice,
					base64Photo: photo
				})
				.then(res => {
					console.log('%c请求发送到大屏幕', 'color:#70ff57;font-size:20px;font-weight:bold', res);
					if (res.code == '10000') {
					} else {
						alert(res.message);
					}
				});
		},

		close() {
			let f = this.form;
			let b1 = false; //true vis
			let b2 = false; //false notice
			let b3 = false; // false codeIsShow
			let that = this;
			if (this.checkedRadio == '3' || this.checkedRadio == '4') {
				this.getCode();
				// 二维码弹窗需要展示的弹窗
				this.codePrice = this.form.shouldPay;
				this.payType = this.checkedRadio; //单个
				b1 = false;
				b2 = false;
				b3 = true;
				this.cash = 0;
				this.wx = 0;
				this.bank = 0;
				this.wxpay = 0;
				this.alipay = 0;
				this.buyoncredit = '1';
			} else if (this.checkedRadio == '7') {
				//组合支付

				let total = Number(this.cash) + Number(this.wx) + Number(this.bank) + Number(this.wxpay) + Number(this.alipay);
				// 二维码弹窗需要展示的弹窗
				this.codePrice = this.wx;

				var arr = []; //用于保存选中的值
				if (this.cash != '' && this.cash != '0') {
					arr.push('1');
				}
				if (this.wx != '' && this.wx != '0') {
					arr.push('3');
				}
				if (this.bank != '' && this.bank != '0') {
					arr.push('2');
				}
				if (this.wxpay != '' && this.wxpay != '0') {
					arr.push('6');
				}
				if (this.alipay != '' && this.alipay != '0') {
					arr.push('5');
				}

				console.log('输入的值', arr, arr.indexOf('3') > -1);
				if (total == this.form.shouldPay) {
					//判断总金额
					let check = arr.indexOf('3') > -1;
					if (check && arr.length >= 2) {
						//判断输入类型

						that.payType = arr.join(',');
						that.getCode(); //获取二维码
						// setTimeout(()=>{
						b3 = true; //打开二维码弹窗
						b2 = true; //打开是否收款弹窗
						// }, 2500);
					} else if (check == false && arr.length >= 2) {
						b2 = true;
						this.payType = arr.join(',');
						// b3=true     //打开是否收款弹窗
					} else if (arr.length < 2) {
						b2 = false;
						b3 = false;
						this.$alert('请选择至少两种支付方式', '提示', {
							confirmButtonText: '确定',
							callback: action => {}
						});
					}
				} else {
					this.$alert('请正确输入金额', '提示', {
						confirmButtonText: '确定',
						callback: action => {}
					});
				}

				b1 = true;
			} else if (this.checkedRadio == '1' || this.checkedRadio == '2' || this.checkedRadio == '5' || this.checkedRadio == '6') {
				b1 = false;
				b2 = true;
				b3 = false;
				this.cash = 0;
				this.wx = 0;
				this.bank = 0;
				this.wxpay = 0;
				this.alipay = 0;
				this.buyoncredit = '0';
				this.payType = this.checkedRadio; //单个
			} else {
				this.$alert('请选择支付方式', '错误提示', {
					confirmButtonText: '确定',
					callback: action => {}
				});

				b1 = false;
				b3 = false;
				b2 = false;
				this.cash = 0;
				this.wx = 0;
				this.bank = 0;
				this.wxpay = 0;
				this.alipay = 0;
				this.payType = this.checkedRadio; //单个
			}
			this.notice = b2;
			this.codeIsShow = b3;
		},

		// =======================================================================
		/**
		 * @param {Object} 提示弹窗
		 */
		//收到
		rec(val) {
			this.onceClick=true
			console.log('支付方式', this.payType);
			this.getClose(this.payType, '1');
			this.notice = false;
			this.buyoncredit = 0;
		},
		//未收到
		unrec() {
			this.notice = false;
			this.buyoncredit = 1;
		},
		/**
		 * 二维码弹窗
		 */
		closeCode() {
			if (this.checkedRadio == '3' || this.checkedRadio == '4') {
				this.$router.push({
					path: '/',
					query: {
						merchantCode: this.merchantCode
					}
				});
			} else {
				this.codeIsShow = false;
			}
		},

		// 二维码发送选择
		mesChange(val) {
			console.log(val);
		},

		// 支付方式
		radioChanges(val) {
			console.log('选择的', val);
			if (val == '7') {
				this.vis = !this.vis;
			} else {
				this.vis = false;
				this.cash = 0;
				this.wx = 0;
				this.bank = 0;
				this.wxpay = 0;
				this.alipay = 0;
			}
		},

		// 打印
		print(val) {
			let payType = '';
			let total = Number(this.cash) + Number(this.wx) + Number(this.bank) + Number(this.wxpay) + Number(this.alipay);
			if (this.checkedRadio == '7') {
				var arr = []; //用于保存选中的值
				if (this.cash != '') {
					arr.push('1');
				}
				if (this.wx != '') {
					arr.push('3');
				}
				if (this.bank != '') {
					arr.push('2');
				}
				if (this.wxpay != '') {
					arr.push('6');
				}
				if (this.alipay != '') {
					arr.push('5');
				}

				if (total == this.form.shouldPay) {
					//判断总金额
					let check = arr.indexOf('3') > -1;
					if (check && arr.length >= 2) {
						//判断输入类型
						payType = arr.join(',');
					} else if (check == false && arr.length >= 2) {
						payType = arr.join(',');
						b3 = true; //打开是否收款弹窗
					} else if (arr.length < 2) {
						b2 = false;
						b3 = false;
						this.$alert('请选择至少两种支付方式', '提示', {
							confirmButtonText: '确定',
							callback: action => {}
						});
					}
				}
				// payType=this.payType
			} else {
				payType = this.checkedRadio;
			}

			console.log(val, payType, this.checkedRadio);
			this.$router.push({
				name: 'closeOrders',
				params: {
					data: this.form.laborOrder,
					vipNum: this.form.vipNumber,
					list: this.form.goodsList,
					resPrice: this.form.shouldPay,
					type: val,
					payType: payType,
					wechatAliPay: this.wx, //string	微信支付金额
					cashPayMoney: this.cash, //string	现金支付金额
					swipecardPayMoney: this.bank, //string	刷卡支付金额
					wechatTransferPayMoney: this.wxpay, //int	微信转账金额
					aliTransferPayMoney: this.alipay //string	支付宝转账金额
				}
			});
		},

		// 添加新兑换码
		addCode() {},

		/**
		 * 多选
		 */
		// 短信通知
		mes(val) {
			console.log(this.isMes, val);
		},
		// 单选
		radioChange() {
			console.log(this.radio);
		},
		// 储值卡
		changeBox(val) {
			if (val == true) {
				this.cardBalance = true;
			} else {
				this.cardBalance = true;
			}
		},
		// 次卡
		changeBox2(val) {
			console.log('val2', val);
			if (val == true) {
				this.showCard = true;
			} else {
				this.showCard = false;
			}
		},

		// 查看工单详情
		look() {
			let path;
			console.log('订单详情', this.form.laborOrder.workorderCode);
			if (this.form.workorderType == 1) {
				path = '/comprehensiveOrder';
			} else {
				path = '/quickOrder';
			}
			this.$router.push({
				path,
				query: {
					merchantCode: this.merchantCode,
					workOrderCode: this.form.laborOrder.workorderCode,
					orderType: this.form.laborOrder.workorderType,
					type: 'look'
				}
			});
			location.reload();
		},

		//返回上个页面
		back() {
			this.$router.go(-1); //返回上一层
		}
	},
	mounted() {}
};
</script>

<style scoped>
.table {
	border-collapse: collapse;
	width: 100%;
}
.table tr > td {
	width: 150px;
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
.red {
	font-size: 28px;
	color: #ff0000;
}
.el-dropdown-link {
	cursor: pointer;
	color: #409eff;
}
.choose /deep/ .el-input-group__prepend {
	padding: 0 2px;
}
.mt {
	margin-top: 140px;
}
</style>
