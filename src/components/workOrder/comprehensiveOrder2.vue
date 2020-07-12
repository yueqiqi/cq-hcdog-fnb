<!-- 综合开单 -->
<template>
	<div class="comprehensiveOrder">
		<div class="header" style="background: #F2F2F2;padding:10px 0px;">
			<div class=" center">
				<div style="font-size: 32px;color: #fff;font-weight: bold;margin-right: 15px;">老用户搜索</div>
				<!-- <div class="d-flex" style="width:400px ;"><el-input style="border-top-right-radius:0px ;border-bottom-right-radius: 0px;"  v-model="search" placeholder="根据客户姓名、电话、车牌号进行搜索"></el-input><el-button  style="background:#66ccff;border:1px solid #66ccff;border-top-left-radius:0px ;border-bottom-left-radius: 0px;" @click='searchOld'>搜索</el-button></div> -->

				<div class="d-flex" style="width:400px ;">
					<el-input
						:disabled="useType == 'copy'"
						style="border-top-right-radius:0px ;border-bottom-right-radius: 0px;"
						v-model="search"
						placeholder="根据客户姓名、电话、车牌号进行搜索"
					></el-input>
					<el-button type="primary" @click="searchOld">搜索</el-button>
				</div>
				<div style="margin-left: 15px;font-size: 24px;color: #fff;font-weight: bold;" @click="addUser">新增车辆/客户</div>
			</div>
		</div>

		<div class="body">
			<div class="b1">
				<div class="font-big" style="line-height: 60px;">车主信息</div>
				<el-form class="d-flex" style="flex-wrap: wrap;" label-position="right" label-width="120px" :model="owner">
					<el-form-item label="车牌号">
						<label slot="label">
							<span style="color: red;">*</span>
							车牌号
						</label>
						<el-input v-model="owner.plateNumber" :disabled="dis || useType == 'copy'" @change="importCarnum"></el-input>
					</el-form-item>
					<el-form-item label="客户手机号">
						<label slot="label">
							<span style="color: red;">*</span>
							客户手机号
						</label>
						<el-input v-model="owner.customerPhone" :disabled="dis" @change="inputTel"></el-input>
					</el-form-item>
					<el-form-item label="客户姓名"><el-input v-model="owner.customerName" :disabled="dis"></el-input></el-form-item>
					<el-form-item label="本次里程"><el-input v-model.number="owner.lastMileage" :disabled="dis"></el-input></el-form-item>

					<el-form-item label="下次保养里程">
						<el-select style="width: 202px;" v-model="owner.nextKeepFitKm" placeholder="请输入下次保养里程" :disabled="dis">
							<el-option :label="Number(owner.lastMileage) + Number(5000)" :value="Number(owner.lastMileage) + Number(5000)">
								<span>{{ Number(owner.lastMileage) + '+' + Number(5000) + 'km' }}</span>
							</el-option>

							<el-option :label="Number(owner.lastMileage) + Number(7500)" :value="Number(owner.lastMileage) + Number(7500)">
								<span>{{ Number(owner.lastMileage) + '+' + Number(7500) + 'km' }}</span>
							</el-option>
							<el-option :label="Number(owner.lastMileage) + Number(10000)" :value="Number(owner.lastMileage) + Number(10000)">
								<span>{{ Number(owner.lastMileage) + '+' + Number(10000) + 'km' }}</span>
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="下次保养日期">
						<el-date-picker
							style="width: 202px;"
							v-model="owner.nextKeepFitTime"
							type="date"
							placeholder="填写日期有助于提醒用户"
							:disabled="dis"
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="车架号"><el-input v-model="owner.vehicleIdNum" placeholder="请输入车架号" :disabled="dis"></el-input></el-form-item>
					<el-form-item label="发动机号"><el-input placeholder="请输入发动机号" v-model="owner.engineNum" :disabled="dis"></el-input></el-form-item>

					<el-form-item label="车辆注册日期">
						<el-date-picker style="width: 202px;" v-model="owner.applyDate" type="date" placeholder="请输入注册日期" :disabled="dis" value-format="yyyy-MM-dd"></el-date-picker>
					</el-form-item>
					<el-form-item label="品牌">
						<el-select style="width: 202px;" v-model="owner.brandName" placeholder="请选择" :disabled="dis" @change="chCar">
							<el-option v-for="item in brand" :key="item.brandId" :label="item.brandName" :value="item.value"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="车系车型">
						<!-- <el-select style='width: 202px;' v-model="owner.seriesName" placeholder="请选择" :disabled='dis'>
						    <el-option v-for="item in series" :key="item" :label="item.familyName" :value="item.familyName"></el-option>
						</el-select> -->
						<el-cascader style="width: 202px;" :disabled="dis" v-model="owner.seriesName" :options="series" @active-item-change="getSeriesList"></el-cascader>

						<!-- 	<el-select style='width: 202px;' v-model="owner.seriesName" :options="series" :disabled='dis' @expand-change='chCar2'></el-cascader> -->
					</el-form-item>
					<el-form-item label="车身颜色"><el-input v-model="owner.carColor" placeholder="请输入车身颜色" :disabled="dis" @input="ic"></el-input></el-form-item>

					<el-form-item label="保险到期日期">
						<el-date-picker
							style="width: 202px;"
							v-model="owner.compulsoryInsureDeadline"
							type="date"
							placeholder="请选择保险到期日期"
							:disabled="dis"
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="年检日期">
						<el-date-picker
							style="width: 202px;"
							v-model="owner.annualInspectDate"
							type="date"
							placeholder="请选择年检日期"
							:disabled="dis"
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="预计交车时间">
						<el-date-picker
							style="width: 202px;"
							v-model="owner.estimateSubmit"
							type="datetime"
							placeholder="请选择交车时间"
							:disabled="dis"
							value-format="yyyy-MM-dd HH:mm:ss"
						></el-date-picker>
					</el-form-item>
					<!-- <el-form-item label="开单时间">
						<el-date-picker style='width: 202px;' v-model="owner.workorderTime" type="datetime" placeholder="请选择开单时间" :disabled='dis' value-format='yyyy-MM-dd HH:mm:ss'>
						</el-date-picker>
					</el-form-item> -->
				</el-form>

				<!-- <el-button type='danger' @click='getCarName'>获取选择的车牌车系车型</el-button> -->

				<div class="farewell">
					<div class="font-big" style="line-height: 60px;">送修人信息</div>
					<div class="d-flex">
						<div class="d-flex" style="align-items: center;">
							<div style="font-size:14px;margin-left: 26px;margin-right: 12px;">送修人姓名</div>
							<div><el-input v-model="owner.repairName" placeholder="请输入送修人姓名" :disabled="dis"></el-input></div>
						</div>
						<div class="d-flex" style="align-items: center;">
							<div style="font-size:14px;margin-left: 30px;margin-right: 12px;">送修人手机号</div>
							<div><el-input v-model="owner.repairPhone" placeholder="请输入送修人手机号" @change="inputTel2" :disabled="dis"></el-input></div>
						</div>
					</div>
				</div>
			</div>
			<!-- b2 -->
			<div class="b2" style="font-size: 14px;background: #fff;border-radius:15px ;margin-top: 10px;padding-left: 36px;">
				<div class="d-flex" style="align-items: center;">
					<h5 style="">其他信息</h5>
					<div style="margin-left: 25px;"><el-checkbox @change="userVipChange" v-model="useVip">使用他人会员卡</el-checkbox></div>
					<div style="margin-left:30px ;" v-if="useVip == true">{{ state }}</div>
					<el-button type="text" style="margin-right: 30px;margin-left: 45px;" :class="useVip == true ? 'c1' : ''" @click="useVip == true ? openVipPop() : ''">
						可用会员卡{{ vipNum }}张
					</el-button>
					<div style="color: #999;">
						来店消费统计：来店消费
						<span>{{ expense }}</span>
						次,消费{{ price }}元&nbsp;&nbsp;挂账：{{ buyer }}元
					</div>
				</div>
				<div class="lastTimeRemark">
					<div class="d-flex" style="align-items: center;">
						<h5>上次备注：</h5>
						<div>{{ lastTimeRemark }}</div>
					</div>
				</div>
			</div>

			<!-- b3 -->
			<div class="b3" style="background: #fff;border-radius:15px ;margin-top: 10px;padding-top: 10px;padding-bottom: 10px;">
				<div class="font-big" style="padding-left: 36px;line-height: 60px;">维修/保养项目(工时)</div>
				<el-table
					:data="manOur"
					:header-cell-style="{ color: '#333', fontSize: '14px', fontWeight: 'bold', fontSize: '16px', backgroundColor: '#d7d7d7' }"
					style="width: 100%"
					border
				>
					<el-table-column align="center" prop="goodsName" label="服务名称" width="180">
						<template slot-scope="scope">
							<div class="" style="display: flex;text-align: center;justify-content: center;">
								<div style="color:#0000FF">{{ scope.row.isGift == 1 ? '【赠品】' : '' }}</div>
								<div>{{ scope.row.goodsName }}</div>
							</div>
						</template>
					</el-table-column>

					<el-table-column align="center" prop="serviceTime" label="服务时长" width="180">
						<template slot-scope="scope">
							<span>{{ scope.row.serviceTime || '--' }}</span>
						</template>
					</el-table-column>

					<el-table-column align="center" prop="price" label="价格">
						<!-- <template slot-scope="scope">
							<el-input @change='manOurMoneyChange(scope.row.price,scope.row.goodsCount,scope.$index, manOur)' size='mini' v-model="scope.row.price" :disabled='dis'></el-input>
						</template> -->
					</el-table-column>

					<el-table-column align="center" prop="goodsCount" label="服务次数">
						<template slot-scope="scope">
							<el-input-number
								:min="1"
								:max="scope.row.surplusCount != null ? scope.row.surplusCount : 20"
								size="mini"
								v-model="scope.row.goodsCount"
								@change="changeManOurNum(scope.row.price, scope.row.goodsCount, scope.$index, manOur)"
								label="描述文字"
								:disabled="dis == false ? scope.row.isGift == 1 : dis"
							></el-input-number>
						</template>
					</el-table-column>

					<el-table-column align="center" prop="subtotalMoney" label="小计"></el-table-column>

					<el-table-column align="center" prop="goodsName" label="销售/施工人员" width="180">
						<template slot-scope="scope">
							<div style="border:1px dashed #3f3fff;">
								<div style="position:relative;top:-4px;left:70px"><i @click="dis == false ? setEmpAlert(scope.$index, manOur) : ''" class="el-icon-edit-outline"></i></div>
								<div class="d-flex" style="flex-wrap: wrap;">
									<div>销售:</div>
									<div v-for="(item, index) in scope.row.mapList" :key="index">
										<div style="margin-left:5px">{{ item.employeeType == 1 ? item.employeeName : '' }}</div>
									</div>
								</div>
								<div class="d-flex" style="flex-wrap: wrap;">
									<div>施工:</div>
									<div v-for="(item, index) in scope.row.mapList" :key="index">
										<div style="margin-left:5px">{{ item.employeeType == 2 ? item.employeeName : '' }}</div>
									</div>
								</div>
							</div>
						</template>
					</el-table-column>

					<!-- <el-table-column align='center' prop="deduct" label="提成业绩"></el-table-column> -->
					<el-table-column align="center" prop="remarks" label="备注">
						<template slot-scope="scope">
							<el-input v-model="scope.row.remarks" placeholder="请输入备注" :disabled="dis"></el-input>
						</template>
					</el-table-column>

					<el-table-column align="center" prop="" label="操作">
						<template slot-scope="scope">
							<div><el-button @click.native.prevent="deleteRow(scope.$index, manOur)" style="color:red" type="text" size="small" :disabled="dis">删除</el-button></div>
							<div v-if="scope.row.isGift == 0 && scope.row.memberCardType == 0">
								<el-button @click="set(scope.$index, manOur)" type="text" size="small" :disabled="dis">设为赠品</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="lastTimeRemark" style="margin-top: 20px;padding-left: 25px;padding-top: 20px;">
					<el-input style="width: 250px;" placeholder="搜索服务名称" v-model="manOurSearch" :disabled="dis">
						<el-button slot="append" icon="el-icon-search" @click="showNoVip"></el-button>
					</el-input>
					<el-button @click="openNs" style="margin-left: 15px;" type="text" :disabled="dis">没搜到?新建服务</el-button>
				</div>
			</div>

			<!-- 维修/保养项目(配件) -->
			<b4 :dis="dis" :manOur="manOur2" @children="children1" :customerCode="customerCode"></b4>
			<!-- 门店耗材 -->
			<b5 :dis="dis" :manOur="manOur3" @children="children2"></b5>
			<!-- 客户自带材料 -->
			<b6 :dis="dis" :manOur="manOur4" :useType="useType" @children="children3"></b6>
			<!-- 附加费用 -->
			<b7 :dis="dis" :subjoin="subjoin" :useType="useType" @selectChange="selectChange" @priceChange="priceChange" @remarksChange="remarksChange"></b7>

			<div class="b8">
				<div class="d-flex" style="align-items: center;margin-left: 36px;">
					<h4 style="margin-right: 20px;">备注</h4>
					<el-input style="width:900px" v-model="otherRemark" maxlength="120" placeholder="请输入备注信息(打印单显示,最多120字)" :disabled="dis"></el-input>
				</div>
			</div>
			<!-- bod结束标签 -->
		</div>

		<div class="footer">
			<div class="d-flex" style="justify-content: flex-end;align-items: center;margin-right: 30px;">
				<div class="font">总价：</div>
				<div style="color:#ff0000;font-size: 30px;">¥{{ allNums }}</div>
				<div style="margin-right: 20px;margin-left: 20px;"><el-button type="text" @click="save" :disabled="dis">保存</el-button></div>
				<div v-if="useType != 'set' || orderStatus == '0'"><el-button @click="confirm" type="primary" :disabled="dis">开单</el-button></div>
			</div>
		</div>

		<!-- 使用他人会员卡 -->
		<useOtherVip :usevip="usevip" :vehicleId="vehicleId" @closeVipAlert="closeVipAlert" @vipConfirm="vipConfirm"></useOtherVip>
		<!-- 可用会员卡项目 -->
		<vippop :vipPop="vipPop" :vipList="vipList" :customerCode="cust" @closeVipPop="closeVipPop" @confirmVipPop="confirmVipPop"></vippop>
		<!-- 选择销售施工弹窗 -->
		<emp :chooseEmp="empAlert" :empListf="empList1" :empLists="empList2" @closeEmpAlert="closeEmpAlert" @empConfirm="sendEmpData"></emp>
		<!-- // 打开维修/保养项目(工时)--无会员卡 -->
		<nv :nvIsShow="nvIsShow" :searchList="nvSearchList" :customerCode="customerCode" @closeNv="closeNv" @sendNv="sendNv" :fatherData="fatherData"></nv>
		<!-- 打开新建服务 -->
		<newServe :nsIsShow="nsIsShow" :nsList="nsList" :searchList="options" @sendNs="sendNs" @saveNs="saveNs" @closeNs="closeNs"></newServe>
		<!-- 打开新增车辆/客户 -->
		<addcar :addUserIsShow="addUserIsShow" @closeAc="closeAc" @sendAc="sendAc"></addcar>
	</div>
</template>

<script>
// import Bus from '../../global/bus.js'
// import { Bus } from 'bus'

// 使用他人会员卡
import useOtherVip from '../Alert/useVip.vue';
// 打开维修/保养项目(工时)--无会员卡
// import nv from './comprehensiveOrderChildren/noVip'

// 打开维修/保养项目(工时)--有会员卡
import nv from './comprehensiveOrderChildren/useVip.vue';
// 打开新建服务弹窗
import newServe from './comprehensiveOrderChildren/newServe.vue';
// // 打开维修/保养项目(配件)--无会员卡
// import pnv from './comprehensiveOrderChildren/partsNoVip'

// 选择员工弹窗
import emp from '../Alert/chooseEmp.vue';
//  综合开单--维修/保养商品(配件)
import b4 from './comprehensiveOrderChildren/b4.vue';
// 门店耗材
import b5 from './comprehensiveOrderChildren/b5.vue';
// 客户自带材料
import b6 from './comprehensiveOrderChildren/b6.vue';
// 附加费用
import b7 from './comprehensiveOrderChildren/b7.vue';
// 新增车辆/客户
import addcar from './comprehensiveOrderChildren/addCar.vue';
// 可用会员卡弹窗
import vippop from './comprehensiveOrderChildren/vip.vue';
export default {
	components: {
		vippop,
		addcar,
		useOtherVip,
		newServe,
		nv,
		emp,
		b4,
		b5,
		b6,
		b7
	},
	data() {
		return {
			customerCodeOther: '',
			customerPhoneOther: '',
			customerNameOther: '',
			orderStatus: '',
			AvipList: [],
			BalertList: [],
			Clist: [],
			Dlist: [],

			delRows: [],
			fatherData: [],

			//他人会员卡信息
			state: null,

			// 用户编码
			// customerCode:'111',
			customerCode: null,
			cust: null,

			// 使用他人会员卡
			usevip: false,
			//他人会员卡内商品
			vipList: [],

			// 新建服务弹窗
			nsIsShow: false,
			nsList: null,
			options: null,

			// 车品牌id
			brandId: null,
			// 车型id
			familyId: null,

			// 打开维修/保养项目(配件)--无会员卡弹窗
			pnvIsShow: false,
			// 弹窗一级分类
			searchList: [],

			// 打开维修/保养项目(工时)--有会员卡弹窗
			uvIsShow: false,
			// 弹窗一级分类
			uvSearchList: [],
			// 打开维修/保养项目(工时)--有会员卡弹窗
			nvIsShow: false,
			// 弹窗一级分类
			nvSearchList: [],

			// 备注信息
			otherRemark: '',
			// 附加费用
			subjoin: [],
			/**
			 * 维修/保养(工时)
			 */
			// 搜索
			manOurSearch: '',
			// 选择销售施工弹窗的下标
			chooseEmpidx: null,
			// 选择销售施工弹窗
			empList1: [],
			empList2: [],
			empAlert: null,
			manOur: [],

			// 配件
			manOur2: [],
			// 门店耗材
			manOur3: [],
			// 客户自带材料
			manOur4: [],
			/**
			 * 其他信息
			 */

			// 上次备注
			lastTimeRemark: '',
			// 挂账
			buyer: '0',
			// 消费价钱
			price: '0',
			// 来店消费
			expense: '0',
			// 可用会员卡
			vipNum: 0,
			// 车牌号
			vipCar: '皖BA827A',
			// 电话
			vipPhone: '18605533016',
			// 姓名
			vipName: '张三',
			// 使用他人会员卡选项
			useVip: false,
			/**
			 * 送修人信息
			 */

			// 车型车系
			series: [],
			// 品牌
			brand: [],
			// 通过查看进入综合开单
			dis: false,
			// 输入车牌号id
			vehicleId: null,

			sumsm: null,

			// 表单
			owner: {
				// 送修人姓名
				repairName: '',
				// 送修人电话
				repairPhone: '',
				workorderTime: '',
				estimateSubmit: '',
				annualInspectDate: '',
				compulsoryInsureDeadline: '',
				carColor: '',
				seriesName: '',
				brandName: '',
				applyDate: '',
				engineNum: '',
				vehicleIdNum: '',
				nextKeepFitTime: '',
				nextKeepFitKm: '',
				mileage: '',
				customerName: '',
				customerPhone: '',
				plateNumber: ''
			},
			// 新增车辆/客户
			addUserIsShow: false,
			// 可用会员卡弹窗
			vipPop: false,
			// 搜索
			search: '',
			//
			useType: null //编辑/查看/复制
		};
	},
	computed: {
		allNums: function() {
			let that = this;
			let total1 = 0;
			let total2 = 0;
			let total3 = 0;
			let total = 0;
			if (that.subjoin.length > 0) {
				that.subjoin.map(item => {
					total1 += item.price;
				});
			}

			if (that.manOur.length > 0) {
				that.manOur.map(item => {
					total2 += Number(item.subtotalMoney);
				});
			}
			if (that.manOur2.length > 0) {
				that.manOur2.map(item => {
					total3 += Number(item.subtotalMoney);
				});
			}
			return (total = (Number(total1) + Number(total2) + Number(total3)).toFixed(2));
		}
	},
	created() {
		this.createId = localStorage.getItem('createId');

		this.merchantCode = this.$route.query.merchantCode;
		this.getBrand();

		if (this.$route.query.carNum != undefined) {
			this.$http
				.get('/LaborFastOrder/findVipGoods', {
					merchantCode: this.merchantCode,
					condition: this.$route.query.carNum
				})
				.then(res => {
					console.log('%c请求搜索结果', res, 'font-size:18px');
					if (res.code == '10000') {
						// res.data.compulsoryInsureDeadline=res.data.commercialInsureDeadline//年检日期
						this.owner = res.data;
						this.owner.plateNumber = this.$route.query.carNum;
						this.vehicleId = res.data.vehicleId;
						this.customerCode = res.data.customerCode;
						this.lastTimeRemark = res.data.beforeRemarks;

						var seriesName = res.data.seriesName;
						var modelName = res.data.modelName;
						// var seriesName=res.data.modelName
						// var modelName=res.data.seriesName

						this.brand.map(item => {
							if (res.data.brandName == item.brandName) {
								this.owner.brandName = item.value;
								this.chCar(item.value);
								console.log('数据回显第一层');
							}
						});

						setTimeout(() => {
							let that = this;
							that.series.map(item => {
								if (seriesName == item.label) {
									var endseries = item.value;
									that.getSeriesList2(item.value.split('/')[0]);
									setTimeout(() => {
										item.children.map(items => {
											if (items.vehicleName == modelName) {
												that.owner.seriesName = [endseries, items.value];
												console.log('选中的值999', that.owner.seriesName);
											}
										});
									}, 1500);
								}
							});
							console.log('最后的值', this.series);
						}, 1500);
						if (res.data.vehicleColor != null) {
							this.owner.carColor = res.data.vehicleColor;
						}
						if (res.data.registeredDate != null) {
							this.owner.applyDate = res.data.registeredDate;
						}
					} else {
						alert(res.message);
					}
				});
			// this.getSeriesList()
		}

		this.useType = this.$route.query.type;
		setTimeout(() => {
			if (this.$route.query.type == 'look') {
				this.getForm();
				this.dis = true;
			} else if (this.$route.query.type == 'copy' || this.$route.query.type == 'set') {
				this.workOrderCode = this.$route.query.workOrderCode;
				this.orderId = this.$route.query.orderid;
				this.getForm('copy');
			}
		}, 1000);
	}, //生命周期 - 创建之后
	methods: {
		ic() {
			this.$forceUpdate();
		},
		/**
		 * 获取新建服务分类的 一 二 三级列表
		 */
		getOptions(type) {
			this.$http
				.get('/LaborGoods/threeCategoryList', {
					merchantCode: this.merchantCode,
					code: 'S01',
					parentCode: '0',
					type
				})
				.then(res => {
					console.log('%c请求新建服务分类的 一 二 三级列表结果', 'color:red;font-size:20px', res);
					if (res.code == '10000') {
						res.data.map(item => {
							item.value = item.code + ',' + item.name;
							item.label = item.name;
							item.mapList.map(items => {
								items.value = items.code + ',' + items.name;
								items.label = items.name;
								if (items.children) {
									items.children.map(ch => {
										ch.value = ch.code + ',' + ch.name;
										ch.label = ch.name;
									});
								} else {
									items.children = [];
								}
							});
							item.children = item.mapList;
						});
						this.options = res.data;
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 计算总和
		 */
		sum() {},
		/**
		 *编辑综合开单
		 */
		setList(
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
			estimateSubmit,
			brandName,
			nextKeepFitKm,
			nextKeepFitTime,
			repairName,
			repairPhone,
			annualInspectDate,
			compulsoryInsureDeadline,
			list,
			laborOrderGoodsList,
			totalMoney
		) {
			this.$http
				.post('/laborSynthesize/addLaborSynthesize', {
					orderId: this.orderId,
					workOrderCode: this.workOrderCode,
					merchantCode: this.merchantCode,
					customerCodeOther: this.customerCodeOther,
					customerPhoneOther: this.customerPhoneOther,
					customerNameOther: this.customerNameOther,
					status: this.statusList,
					// 操作类型  1--保存  2--开单
					type: 1,
					// 工单类型  1--综合单  2--快捷单
					workorderType: '1',
					// 客户姓名
					customerName,
					// 客户电话
					customerPhone,
					// 车牌号
					plateNumber,
					// 本次里程
					mileage,
					// 发动机号
					engineNum,
					// 车架号
					vehicleIdNum,
					// 注册日期
					applyDate,
					// 车辆颜色
					carColor,
					// 车型名
					modelName,
					// 车系名
					seriesName,
					// 客户编码
					customerCode,
					// 创建人id
					employeeId,
					// 更新人id
					updateId,
					// 开单时间
					workOrderTime,
					// 会员卡所属  1--自己  2--他人
					isMyCard,
					// 备注
					remarks,
					// 所有商品总价
					totalMoney,
					// 预计交车时间
					estimateSubmit,
					// 品牌名
					brandName,
					// 下次保养里程
					nextKeepFitKm,
					// 下次保养日期
					nextKeepFitTime,
					// 送修人姓名
					repairName,
					// 送修人手机号
					repairPhone,
					// 年检日期
					annualInspectDate,
					// 保险到期时间
					compulsoryInsureDeadline,
					// 附加信息--Array  name:附加名称  price--附加费价格  remarks--备注
					list,
					// 商品集合
					laborOrderGoodsList
				})
				.then(res => {
					console.log('请求新增综合单结果', res);
					if (res.code == '10000') {
						this.$router.push({
							path: '/',
							query: {
								merchantCode: this.merchantCode
							}
						});
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 新增开单
		 */
		addList(
			type,
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
			estimateSubmit,
			brandName,
			nextKeepFitKm,
			nextKeepFitTime,
			repairName,
			repairPhone,
			annualInspectDate,
			compulsoryInsureDeadline,
			list,
			laborOrderGoodsList,
			totalMoney
		) {
			this.$http
				.post('/laborSynthesize/addLaborSynthesize', {
					merchantCode: this.merchantCode,
					beforeRemarks: this.lastTimeRemark,
					customerCodeOther: this.customerCodeOther,
					customerPhoneOther: this.customerPhoneOther,
					customerNameOther: this.customerNameOther,
					// 操作类型  1--保存  2--开单
					type,
					// 工单类型  1--综合单  2--快捷单
					workorderType: '1',
					// customerCode:this.customerCode
					// 客户姓名
					customerName,
					// 客户电话
					customerPhone,
					// 车牌号
					plateNumber,
					// 本次里程
					mileage,
					// 发动机号
					engineNum,
					// 车架号
					vehicleIdNum,
					// 注册日期
					applyDate,
					// 车辆颜色
					carColor,
					// 车型名
					modelName,
					// 车系名
					seriesName,
					// 客户编码
					customerCode,
					// 创建人id
					employeeId,
					// 更新人id
					updateId,
					// 开单时间
					workOrderTime,
					// 会员卡所属  1--自己  2--他人
					isMyCard,
					// 备注
					remarks,
					// 所有商品总价
					totalMoney,
					// 预计交车时间
					estimateSubmit,
					// 品牌名
					brandName,
					// 下次保养里程
					nextKeepFitKm,
					// 下次保养日期
					nextKeepFitTime,
					// 送修人姓名
					repairName,
					// 送修人手机号
					repairPhone,
					// 年检日期
					annualInspectDate,
					// 保险到期时间
					compulsoryInsureDeadline,
					// 附加信息--Array  name:附加名称  price--附加费价格  remarks--备注
					list,
					// 商品集合
					laborOrderGoodsList
				})
				.then(res => {
					console.log('请求新增综合单结果', res);
					if (res.code == '10000') {
						this.$router.push({
							path: '/',
							query: {
								merchantCode: this.merchantCode
							}
						});
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 查看详情
		 */
		getForm(copy) {
			this.$http
				.get('/WorkOrder/getWorkOrderInfo', {
					merchantCode: this.merchantCode,
					orderCode: this.$route.query.workOrderCode,
					orderType: this.$route.query.orderType,
					copy
				})
				.then(res => {
					console.log('请求综合开单结果', res);
					if (res.code == '10000') {
						this.orderStatus = res.data.status;
						if (this.orderStatus == 0) {
							this.statusList = 1;
						} else {
							this.statusList = '';
						}
						res.data.lastMileage = res.data.mileage || 0;
						this.owner = res.data;

						// var modelName=res.data.seriesName
						// var seriesName=res.data.modelName
						var modelName = res.data.modelName;
						var seriesName = res.data.seriesName;
						// this.owner=res.data
						// this.owner.plateNumber=res.data.plateNumber

						this.brand.map(item => {
							if (res.data.brandName == item.brandName) {
								this.owner.brandName = item.value;
								this.chCar(item.value);
								console.log('数据回显第一层');
							}
						});

						setTimeout(() => {
							let that = this;
							that.series.map(item => {
								// 皖BMW362
								if (seriesName == item.label) {
									var endseries = item.value;
									console.log('车系', endseries);
									that.getSeriesList2(item.value.split('/')[0]);

									setTimeout(() => {
										item.children.map(items => {
											if (items.vehicleName == modelName) {
												that.owner.seriesName = [endseries, items.value];
												console.log('选中的值999', that.owner.seriesName);
											}
										});
									}, 1500);
								}
							});
							// console.log('最后的值',this.series,)
						}, 2500);

						this.customerCode = res.data.customerCode;

						// 表单列表

						//上次备注
						// this.lastTimeRemark=res.data.beforeRemarks
						// 工时
						res.data.laborOrderGoodsList.map(item => {
							if (item.type == 1) {
								this.manOur.push(item);
							} else if (item.type == 2) {
								item.specification = item.serviceFrequency;
								this.manOur2.push(item);
							} else if (item.type == 3) {
								item.specification = item.serviceFrequency;
								this.manOur3.push(item);
							} else {
								this.manOur4.push(item);
							}
						});
						console.log('%c客户组自带', 'color:#70ff57;font-size:20px;font-weight:bold', this.manOur4, this.useType);
						// 附加费用
						this.subjoin = res.data.list;
						// 备注
						this.otherRemark = res.data.remarks;
						// 总价
						this.allNums = res.data.totalMoney;
						
						if(res.data.isMyCard==1){
							this.useVip=true
							 this.customerCodeOther=res.data.customerCodeOther,
							 this.customerPhoneOther=res.data.customerPhoneOther,
							 this.customerNameOther=res.data.customerNameOther,
							 this.state=res.data.customerNameOther+'/'+res.data.customerPhoneOther
							this.gp()
						}
						
						
					}
				});
		},

		/**
		 * @param {Object} 获取弹窗左边一二级分类
		 */
		getTree(type) {
			this.$http
				.get('/LaborGoods/categoryList', {
					merchantCode: this.merchantCode,
					parentCode: '0',
					oneCategoryCode: 'S01',
					type
				})
				.then(res => {
					console.log('请求弹窗树状结果', res);
					if (res.code == '10000') {
						this.nvSearchList = res.data;
						res.data.map(item => {
							item.value = item.code + ',' + item.name;
							item.label = item.name;
							item.mapList.map(items => {
								items.value = items.code + ',' + items.name;
								items.label = items.name;
								if (items.children) {
									items.children.map(ch => {
										ch.value = ch.code + ',' + ch.name;
										ch.label = ch.name;
									});
								} else {
									items.children = [];
								}
							});
							item.children = item.mapList;
						});
						this.options = res.data;
						console.log('%c商品模板', 'color:#70ff57;font-size:20px;font-weight:bold', this.options);
					}
				});
		},

		/**
		 * 获取可用会员卡项目弹窗商品
		 */
		getOtherVipGoods(customerCode) {
			this.$http
				.get('/laborSynthesize/getOtherVip', {
					merchantCode: this.merchantCode,
					customerCode, //他人会员卡的id'
					vehicleId: this.vehicleId //车牌的id
				})
				.then(res => {
					if (res.code == '10000') {
						this.vipList = res.data;
						this.vipNum = res.data.length;
						this.cust = this.customerCode;
					} else {
						this.vipList = [];
						this.vipNum = 0;
						alert(res.message);
					}
				});
		},
		gp() {
			let that = this;
			this.$http
				.get('/LaborFastOrder/findVipGoods', {
					merchantCode: this.merchantCode,
					condition: this.owner.plateNumber
				})
				.then(res => {
					if (res.code == '10000') {
						this.vehicleId = res.data.vehicleId;
						that.$http
							.get('/laborSynthesize/getOtherVip', {
								merchantCode: that.merchantCode,
								customerCode: that.customerCodeOther, //他人会员卡的id'
								vehicleId: res.data.vehicleId //车牌的id
							})
							.then(res => {
								if (res.code == '10000') {
									that.vipList = res.data;
									that.vipNum = res.data.length;
									that.cust = that.customerCode;
								} else {
									that.vipList = [];
									that.vipNum = 0;
									alert(res.message);
								}
							});
					} else {
						alert(res.message);
					}
				});
		},
		// =======================================================================================================================================
		// =======================================================================================================================================

		/**
		 * * 维修/保养项目(工时)
		 */
		// 打开维修/保养项目(工时)--无会员卡
		showNoVip() {
			this.nvIsShow = true;

			this.getTree('1');
		},

		// 接收参数
		sendNv(sendPnv) {
			sendPnv.map(item => {
				item.subtotalMoney = item.goodsCount * item.price;
			});
			this.fatherData = sendPnv;
			this.Clist = sendPnv;
			this.manOur = this.uniqs(this.manOur.concat(this.Clist.concat(this.AvipList)));
			this.nvIsShow = false;
		},
		// 关闭弹窗
		closeNv(nvIsShow) {
			this.nvIsShow = false;
		},

		/**
		 * @param {Object} 新建服务
		 */
		// 打开新建服务
		openNs() {
			this.nsIsShow = true;
			this.$http.get('/LaborGoods/getSelect', {}).then(res => {
				console.log('请求服务模板结果', res);
				if (res.code == '10000') {
					this.nsList = res.data;
				}
			});
			this.getOptions('1');
		},
		// 取消新建
		closeNs() {
			this.nsIsShow = false;
		},
		// 保存并且继续新建
		saveNs() {},
		// 确认新建
		sendNs() {
			this.nsIsShow = false;
		},
		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		/**
		 * 附加费用
		 */

		remarksChange(arr) {
			this.subjoin = arr;
		},
		priceChange(arr) {
			this.subjoin = arr;
			// console.log('计算总价',total)
		},
		selectChange(arr) {
			this.subjoin = arr;
		},

		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		//配件/保养项目(配件)传递的值
		children1(val) {
			val.map(item => {
				item.serviceFrequency = item.specification;
			});
			this.manOur2 = val;
		},
		//门店耗材传递的值
		children2(val) {
			val.map(item => {
				item.serviceFrequency = item.specification;
			});
			this.manOur3 = val;
		},
		// 客户自带材料传递的值
		children3(val) {
			this.manOur4 = val;
		},

		/**
		 * 开单按钮
		 */
		confirm() {
			let f = this.owner;
			let brandName = '';
			let modelName = '';
			let seriesName = '';
			if (f.brandName) {
				brandName = f.brandName.split('/')[1];
			}
			if (f.seriesName) {
				modelName = f.seriesName[1].split('/')[1];
				seriesName = f.seriesName[0].split('/')[1];
			}
			// console.log(modelName,seriesName,'品牌	',brandName)
			let isMyCard;
			if (this.useVip) {
				isMyCard = 1; //使用他人会员卡
			} else {
				isMyCard = 0; //使用自己会员卡
			}
			let arr = [];
			// 工时
			this.manOur.map(item => {
				item.type = 1;
			});
			// 配件
			this.manOur2.map(item => {
				item.type = 2;
			});
			// 门店耗材
			// if(this.manOur3)
			this.manOur3.map(item => {
				item.type = 3;
			});
			console.log('客户自带', this.manOur4);
			// 客户自带材料
			// this.manOur4.map(item=>{
			// 	item.type=4
			// })
			// 计算总价
			arr = this.manOur2.concat(this.manOur.concat(this.manOur3.concat(this.manOur4)));
			if (this.useType == 'set') {
				// 编辑
				// console.log('公里数',f)
				this.setList(
					f.customerName,
					f.customerPhone,
					f.plateNumber,
					f.lastMileage,
					f.engineNum,
					f.vehicleIdNum,
					f.applyDate,
					f.carColor,
					modelName,
					seriesName,
					this.customerCode,
					this.createId,
					'',
					f.workOrderTime,
					isMyCard,
					this.otherRemark,
					f.estimateSubmit,
					brandName,
					f.nextKeepFitKm,
					f.nextKeepFitTime,
					f.repairName,
					f.repairPhone,
					f.annualInspectDate,
					f.compulsoryInsureDeadline,
					this.subjoin,
					arr,
					this.allNums
				);
			} else {
				this.addList(
					'2',
					f.customerName,
					f.customerPhone,
					f.plateNumber,
					f.lastMileage,
					f.engineNum,
					f.vehicleIdNum,
					f.applyDate,
					f.carColor,
					modelName,
					seriesName,
					this.customerCode,
					this.createId,
					'007',
					f.workOrderTime,
					isMyCard,
					this.otherRemark,
					f.estimateSubmit,
					brandName,
					f.nextKeepFitKm,
					f.nextKeepFitTime,
					f.repairName,
					f.repairPhone,
					f.annualInspectDate,
					f.compulsoryInsureDeadline,
					this.subjoin,
					arr,
					this.allNums
				);
			}
		},

		/**
		 * 保存按钮
		 */
		save() {
			let f = this.owner;

			let brandName = '';
			let modelName = '';
			let seriesName = '';
			if (f.brandName) {
				brandName = f.brandName.split('/')[1];
			}
			if (f.seriesName) {
				modelName = f.seriesName[1].split('/')[1];
				seriesName = f.seriesName[0].split('/')[1];
			}
			let isMyCard;
			if (this.useVip) {
				isMyCard = 1; //使用他人会员卡
			} else {
				isMyCard = 0; //使用自己会员卡
			}
			let arr = [];
			this.manOur.map(item => {
				item.type = 1;
			});
			// 配件
			this.manOur2.map(item => {
				item.type = 2;
			});
			// 门店耗材
			this.manOur3.map(item => {
				item.type = 3;
			});
			// 客户自带材料
			// this.manOur4.map(item=>{
			// 	item.type=4
			// })
			arr = this.manOur2.concat(this.manOur.concat(this.manOur3.concat(this.manOur4)));
			if (this.useType == 'set') {
				// 编辑
				// console.log('公里数',f)
				this.setList(
					f.customerName,
					f.customerPhone,
					f.plateNumber,
					f.lastMileage,
					f.engineNum,
					f.vehicleIdNum,
					f.applyDate,
					f.carColor,
					modelName,
					seriesName,
					this.customerCode,
					this.createId,
					'',
					f.workOrderTime,
					isMyCard,
					this.otherRemark,
					f.estimateSubmit,
					brandName,
					f.nextKeepFitKm,
					f.nextKeepFitTime,
					f.repairName,
					f.repairPhone,
					f.annualInspectDate,
					f.compulsoryInsureDeadline,
					this.subjoin,
					arr,
					this.allNums
				);
			} else {
				//正常开单
				this.addList(
					'1',
					f.customerName,
					f.customerPhone,
					f.plateNumber,
					f.lastMileage,
					f.engineNum,
					f.vehicleIdNum,
					f.applyDate,
					f.carColor,
					modelName,
					seriesName,
					this.customerCode,
					this.createId,
					'',
					f.workOrderTime,
					isMyCard,
					this.otherRemark,
					f.estimateSubmit,
					brandName,
					f.nextKeepFitKm,
					f.nextKeepFitTime,
					f.repairName,
					f.repairPhone,
					f.annualInspectDate,
					f.compulsoryInsureDeadline,
					this.subjoin,
					arr,
					this.allNums
				);
			}
		},

		/**
		 * 维修/保养项目(工时)
		 */

		// 设为赠品
		set(index, rows) {
			var totalPrice = 0; //临时总价
			this.manOur[index].isGift = 1;
			this.manOur[index].subtotalMoney = 0;
			// rows[index].subtotal = 0;
			// this.manOur[index].price = 0;
			this.manOur[index].goodsCount = 1;
			// console.log(index,rows,this.manOur)
		},
		// 删除本行信息
		deleteRow(index, rows) {
			this.$bus.$emit('delRow', rows[index]);
			console.log('bus1删除的数据', rows[index]);
			// this.delRows
			this.manOur.splice(index, 1);
			// this.fatherData.map((item,idx) => {
			// 	if(item==rows){
			// 		this.fatherData.splice(idx,1)
			// 	}
			// })
			// console.log()

			// this
		},

		/**
		 * 销售/施工弹窗
		 */
		//确定按钮
		sendEmpData(checkList, checkList2) {
			this.empAlert = false;
			let mapList = [];
			checkList.map(item => {
				mapList.push(item);
			});
			checkList2.map(item => {
				mapList.push(item);
			});
			let that = this;
			console.log('%c111', 'font-size:100px');
			that.manOur[that.chooseEmpidx].mapList = mapList;
			console.log(this.manOur);
		},
		// 关闭弹窗
		closeEmpAlert() {
			this.empAlert = false;
		},
		// 显示弹窗
		setEmpAlert(index, row) {
			(this.empAlert = true), (this.chooseEmpidx = index);
			console.log('%c选择员工', 'color:#70ff57;font-size:20px;font-weight:bold', row);
			this.$http
				.get('/LaborFindByGoods/findByGoods', {
					merchantCode: this.merchantCode,
					goodsCode: row[index].goodsCode
				})
				.then(res => {
					console.log('请求选择员工弹窗结果', res);
					if (res.code == '10000') {
						// if()
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

		// 价格
		// manOurMoneyChange(money,num,index,row){
		// 	row[index].subtotalMoney=Number(money)*Number(num)
		// },
		// 服务次数步进器
		changeManOurNum(money, num, index, row) {
			row[index].subtotalMoney = Number(money) * Number(num);
		},

		/**
		 * 使用他人会员卡弹窗
		 */
		// 关闭弹窗
		closeVipAlert() {
			this.usevip = false;
			this.useVip = false;
		},
		// 接收弹窗传递的值
		vipConfirm(customerCode, state) {
			this.state = state;
			// 用户编码
			// this.customerCode=customerCode
			(this.customerCodeOther = customerCode), (this.customerPhoneOther = state.split('/')[1]), (this.customerNameOther = state.split('/')[0]), (this.usevip = false);
			this.getOtherVipGoods(customerCode);
		},
		// 打开弹窗
		userVipChange(en) {
			if (this.vehicleId != null) {
				this.useVip = en;
				this.usevip = en;
			} else {
				this.$alert('使用他人会员卡请先输入车牌号', '提示', {
					confirmButtonText: '确定'
				});
				// console.log('')

				this.useVip = false;
				this.usevip = false;
			}

			if (en == false) {
				this.vipNum = 0;
				this.state = '';
			}
		},

		/**
		 * @param {Object} 打开可用会员卡弹窗
		 */
		openVipPop() {
			this.vipPop = true;
		},
		// 关闭弹窗
		closeVipPop() {
			this.vipPop = false;
		},
		confirmVipPop(val) {
			this.vipPop = false;
			let arr = [];
			let arr2 = [];
			console.log('父组件', val);
			if (val.map.length > 0) {
				val.map(item => {
					item.subtotalMoney = item.price;
					// item.goodsCount=1
					item.mapList = [];
					if (item.goodsType == 1) {
						arr.push(item);
					} else {
						arr2.push(item);
					}
				});

				this.AvipList = arr2;
				// this.BalertList=arr
				// this.Clist
				this.manOur2 = this.deWeight(this.manOur2.concat(arr));
				// this.manOur=this.deWeight(this.manOur.concat(arr2))
				this.manOur = this.Clist.concat(this.AvipList);
			}
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

		/**
		 * 老用户搜索
		 */
		searchOld() {
			this.$http
				.get('/LaborFastOrder/findVipGoods', {
					merchantCode: this.merchantCode,
					condition: this.search
				})
				.then(res => {
					console.log('%c请求输入车牌结果', 'font-size:18px', res);
					if (res.code == '10000') {
						this.lastTimeRemark = res.data.beforeRemarks;
						var seriesName = res.data.seriesName;
						var modelName = res.data.modelName;
						// var modelName=res.data.seriesName
						// var seriesName=res.data.modelName
						// res.data.compulsoryInsureDeadline=res.data.commercialInsureDeadline//年检日期
						this.owner = res.data;
						this.owner.plateNumber = res.data.plateNumber;

						this.brand.map(item => {
							if (res.data.brandName == item.brandName) {
								this.owner.brandName = item.value;
								this.chCar(item.value);
								console.log('数据回显第一层');
							}
						});

						setTimeout(() => {
							let that = this;
							that.series.map(item => {
								// 皖BMW362
								if (seriesName == item.label) {
									var endseries = item.value;
									console.log('车系', endseries);
									that.getSeriesList2(item.value.split('/')[0]);

									setTimeout(() => {
										item.children.map(items => {
											if (items.vehicleName == modelName) {
												that.owner.seriesName = [endseries, items.value];
												console.log('选中的值999', that.owner.seriesName);
											}
										});
									}, 500);
								}
							});
							// console.log('最后的值',this.series,)
						}, 500);
						// this.series.map()

						// this.

						// console.log('所有车品牌',this.brand)
						// this.owner.seriesName=['123123123123123312`123','21312']
						if (res.data.vehicleColor != null) {
							this.owner.carColor = res.data.vehicleColor;
						}
						if (res.data.registeredDate != null) {
							this.owner.applyDate = res.data.registeredDate;
						}
						this.vehicleId = res.data.vehicleId;
						this.customerCode = res.data.customerCode;
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 新增负车辆/客户
		 */
		// 点击打开新增车辆/客户
		addUser() {
			console.log('打开');
			this.addUserIsShow = true;
		},
		// 关闭新增车辆客户弹窗
		closeAc() {
			console.log('关闭');
			this.addUserIsShow = false;
		},
		// 接收新增车辆/客户传递的数据
		sendAc(val) {
			console.log('val', val);
			let f = val;
			this.$http
				.post('/laborSynthesize/addCarAndCustomer', {
					plateNumber: f.plateNumber, // String 车牌号
					phone: f.customerPhone, //String  手机号
					name: f.customerName, // String  客户姓名
					vehicleIdNum: f.vehicleIdNum, // String  车架号
					engineNum: f.engineNum, // String  发动机号
					registeredDate: f.applyDate, // String  注册日期
					brandName: f.brandName, // String  品牌名称
					merchantCode: this.merchantCode, // String  商家编码
					brandId: f.brandId, //string 品牌id
					modelName: f.modelName, // String  车型名称
					modelId: f.modelId, //String  车型id
					seriesName: f.seriesName, // String  车系名
					seriesId: f.seriesId, // String  车系id
					lastMileage: f.lastMileage || 0, //number 最新里程
					carColor: f.carColor, //车声颜色
					compulsoryInsureDeadline: f.compulsoryInsureDeadline, //保险日期
					annualInspectDate: f.annualInspectDate, //年检日期
					source: 's' //String  客户信息来源(信息来源: c-客户;p-平台;s-商家;cp-跨业平台) 必传 默认S
				})
				.then(res => {
					if (res.code == '10000') {
						// this.chCar()
						this.customerCode = res.data.customerCode;
						this.vehicleId = res.data.vehicleId;
						this.addUserIsShow = false;
						this.owner = val;
						var seriesName = val.seriesName;
						var modelName = val.modelName;

						this.brand.map(item => {
							if (val.brandName == item.brandName) {
								this.owner.brandName = item.value;
								this.chCar(item.value);
								console.log('数据回显第一层');
							}
						});

						setTimeout(() => {
							let that = this;
							that.series.map(item => {
								// 皖BMW362
								if (seriesName == item.label) {
									var endseries = item.value;
									console.log('车系', endseries);
									that.getSeriesList2(item.value.split('/')[0]);

									setTimeout(() => {
										item.children.map(items => {
											if (items.vehicleName == modelName) {
												that.owner.seriesName = [endseries, items.value];
												console.log('选中的值999', that.owner.seriesName);
											}
										});
									}, 1500);
								}
							});
							// console.log('最后的值',this.series,)
						}, 1500);
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 获取品牌
		 */
		getBrand(val) {
			this.$http
				.get('/laborSynthesize/getBrandList', {
					merchantCode: this.merchantCode
				})
				.then(res => {
					console.log('请求获取车辆品牌列表结果', res);
					if (res.code == '10000') {
						res.data.map(item => {
							item.value = item.brandId + '/' + item.brandName;
						});
						this.brand = res.data;
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 选择品牌
		 */
		chCar(val) {
			console.log('选择品牌后的值', val);
			if (val != '') {
				this.brandId = val.split('/')[0];
			}
			this.$http
				.get('/laborSynthesize/getSeriesList', {
					brandId: this.brandId
				})
				.then(res => {
					console.log('请求获取车辆车系列表结果', res);
					if (res.code == '10000') {
						res.data.map(item => {
							item.value = item.familyId + '/' + item.familyName;
							item.label = item.familyName;
							item.children = [];
						});
						this.series = res.data;
					}
				});
		},

		// 选择车系
		getSeriesList(val) {
			console.log('选择车型车系');
			console.log('%c车型', 'color:red', val[0].split('/')[0], val);
			this.$http
				.get('/laborSynthesize/getModelList', {
					familyId: val[0].split('/')[0]
				})
				.then(res => {
					console.log('请求车辆车型结果', res);
					if (res.code == '10000') {
						res.data.map(item => {
							item.label = item.vehicleName;
							item.value = item.vehicleId + '/' + item.vehicleName;
						});
						this.series.map(item => {
							item.children = res.data;
						});
					} else {
						alert(res.message);
					}
				});
		},

		getSeriesList2(val) {
			console.log('调用接口', val);
			this.$http
				.get('/laborSynthesize/getModelList', {
					familyId: val
				})
				.then(res => {
					console.log('请求车辆车型结果', res);
					if (res.code == '10000') {
						res.data.map(item => {
							item.label = item.vehicleName;
							item.value = item.vehicleId + '/' + item.vehicleName;
						});
						this.series.map(item => {
							item.children = res.data;
						});
					} else {
						alert(res.message);
					}
				});
		},

		//获取选中的值
		getCarName() {
			console.log('获取车名', this.owner.seriesName);
			console.log(this.owner.seriesName[1].split('/')[1]);
		},

		/**
		 * 输入车牌号
		 */
		importCarnum() {
			this.$http
				.get('/LaborFastOrder/findVipGoods', {
					merchantCode: this.merchantCode,
					condition: this.owner.plateNumber
				})
				.then(res => {
					console.log('%c请求输入车牌结果', 'font-size:18px', res);
					if (res.code == '10000') {
						this.lastTimeRemark = res.data.beforeRemarks;
						// var seriesName=res.data.modelName
						// var modelName=res.data.seriesName
						// res.data.compulsoryInsureDeadline=res.data.commercialInsureDeadline//年检日期
						var seriesName = res.data.seriesName;
						var modelName = res.data.modelName;
						this.owner = res.data;
						this.owner.plateNumber = res.data.plateNumber;

						this.brand.map(item => {
							if (res.data.brandName == item.brandName) {
								this.owner.brandName = item.value;
								this.chCar(item.value);
								console.log('数据回显第一层');
							}
						});

						setTimeout(() => {
							let that = this;
							that.series.map(item => {
								// 皖BMW362
								if (seriesName == item.label) {
									var endseries = item.value;
									console.log('车系', endseries);
									that.getSeriesList2(item.value.split('/')[0]);

									setTimeout(() => {
										item.children.map(items => {
											if (items.vehicleName == modelName) {
												that.owner.seriesName = [endseries, items.value];
												console.log('选中的值999', that.owner.seriesName);
											}
										});
									}, 500);
								}
							});
							// console.log('最后的值',this.series,)
						}, 500);

						this.owner.carColor = res.data.vehicleColor || '';
						this.owner.applyDate = res.data.registeredDate || '';
						this.vehicleId = res.data.vehicleId;
						this.customerCode = res.data.customerCode;
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 手机号验证
		 */
		inputTel(val) {
			let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			if (reg.test(val)) {
				console.log('输入的手机号', val);
			} else {
				this.$message.error('请输入正确的手机号');
				this.owner.customerPhone = '';
			}
		},
		inputTel2(val) {
			let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			if (reg.test(val)) {
				console.log('输入的手机号', val);
			} else {
				this.$message.error('请输入正确的手机号');
				this.owner.repairPhone = '';
			}
		},
		uniqs(array) {
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
		}
	},
	mounted() {}
};
</script>

<style scoped>
.center {
	display: flex;
	justify-content: center;
	align-items: center;
	background: #0066ff;
	height: 121px;
	border-radius: 15px;
}
.body {
	background: #f2f2f2;
	padding: 5px;
	/* margin-top: 10px; */
}
.b1 {
	background: #fff;
	padding: 10px;
	border-radius: 15px;
}
.c1 {
	color: #0000ff;
}
.farewell {
	border-top: 2px dashed #bcbcbc;
}
.lastTimeRemark {
	border-top: 2px dashed #bcbcbc;
}
/deep/.center .el-input__inner {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.b8 {
	background: #fff;
	border-radius: 15px;
	margin-top: 10px;
	padding-top: 10px;
}
.footer {
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
