<template>
	<div class="hello" style="width: 100%;">
		<div style="width: 100%;" class="d-spb">
			<div class="d-flex">
				<div style="height: 60px;margin-left: 30px;">
					<div class="font-big">{{ carNum }}</div>
				</div>
				<div style="margin-left: 5px;margin-top: 8px;" v-if="useType!='copy'"><i class="el-icon-edit-outline" @click="dis == false ? setCar() : dm()"></i></div>
				<div style="margin-left: 120px;"><el-switch inactive-color="#999999" v-model="radio" active-color="#13ce66" @change="check()" :disabled="dis"></el-switch></div>
				<div style="margin-left: 10px;" class="font-big">
					使用他人会员卡
					<span style="color: #409EFF;">{{ state }}</span>
				</div>
				<!--  -->
			</div>

			<div style="color:#666666">
				<div class="d-flex" style="">
					<div>
						<span style="color: red;margin-right: 10px;">*</span>
						<el-input v-model="carAddTel" class="phone" style="height: 23px;width: 200px;" placeholder="添加手机号" @change="inputTel" :disabled="dis"></el-input>
					</div>
					<div>
						<span style="color: red;margin-right: 10px;margin-left: 20px;">*</span>
						<el-input v-model="carAddName" class="phone" style=";height: 23px;width: 200px;" placeholder="添加姓名" :disabled="dis"></el-input>
					</div>
					<div style="margin-left: 22px;margin-top: 14px;" class="d-flex">
						挂账:
						<span style="color:red;padding-top:3px">¥&nbsp;{{ buyer }}</span>
					</div>
					<div style="margin-left: 22px;" class="d-flex" v-if="showInput">
						<div style="padding-top: 14px;">本次公里数</div>
						<div style="margin-left: 5px;" class="d-flex">
							<el-input v-model="carKil" class="kil" style="width: 100px;" :disabled="dis"></el-input>
							<div style="padding-top: 14px;margin-left: 5px;">KM</div>
						</div>
					</div>
				</div>

				<div class="d-flex" style="margin-top: 20px;" v-if="showInput">
					<div><el-input v-model="carAddEngine" class="phone" style=";height: 23px;width: 200px;" placeholder="添加发动机号" :disabled="dis"></el-input></div>

					<div><el-input v-model="carVin" class="phone" style="margin-left: 22px;;height: 23px;width: 200px;" placeholder="添加车架号" :disabled="dis"></el-input></div>
					<div class="d-flex" style="">
						<div style="margin-left: 22px;padding-top: 14px;">车辆注册日期</div>
						<div style="width: 200px;margin-left: 5px;" class="c-date">
							<el-date-picker style="width: 200px;" :clearable="false" v-model="carDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :disabled="dis"></el-date-picker>
						</div>
					</div>
				</div>

				<div class="d-flex" style="margin-top: 20px;" v-if="showInput">
					<div><el-input v-model="carColor" class="phone" style="width: 120px;" placeholder="车身颜色" :disabled="dis"></el-input></div>
					<div style="height:23px;margin-left:22px" class="cartype">
						<el-select style="width: 202px;height: 23px;" v-model="brandName" placeholder="请选择" :disabled="dis" @change="chCar">
							<el-option v-for="item in brand" :key="item.brandId" :label="item.brandName" :value="item.value"></el-option>
						</el-select>

						<el-cascader style="width: 302px;margin-left: 22px;" :disabled="dis" v-model="seriesName" :options="series" @active-item-change="getSeriesList"></el-cascader>
					</div>
				</div>
			</div>
		</div>

		<div class="d-flex" style="height: 60px;margin-left: 30px;">
			<div style="width: 300px;"><el-input v-model="search" placeholder="请输入搜索内容..." @focus="searchShowClick" :disabled="dis"></el-input></div>

			<div style="margin-left: 22px;"><el-button @click="searchShowClick" type="primary" :disabled="dis">搜索</el-button></div>
			<div style="margin-left: 20px;margin-top: 14px;">
				<font color="#808080">找不到项目？</font>
				<el-button type="text" style="color: #409eff;" :disabled="dis" @click="openNs">新建服务</el-button>
				<el-popover placement="top-start" width="200" trigger="hover" content="服务不计入库存,如:洗车、保养...">
					<i class="el-icon-question" style="color: #409eff;" slot="reference"></i>
				</el-popover>
				<el-button :disabled="dis" type="text" style="margin-left:5px; color: #409eff;" @click="openNp">新建商品</el-button>
				<span style="color: #409eff;">(配件)</span>
				<el-popover placement="top-start" width="200" trigger="hover" content="商品计入库存,如:玻璃水、机油滤芯...">
					<i class="el-icon-question" style="color: #409eff;" slot="reference"></i>
				</el-popover>
			</div>
		</div>

		<div style="margin-top: 20px;">
			<div style="margin-left: 30px;"><div style="text-align: left;" class="font-big">快速选择开单项目</div></div>

			<!-- <div class="vipBox d-flex">
			<div v-if="dis==false" v-for="(item,index) in sCheck" :key='index' style="padding:0 10px;height: 40px;line-height: 40px;color: #fff;background:#b0b0b0;text-align: center;border-radius: 10px;margin-right: 10px;" @click="vipChange(item,index)" :class="{actives:vipBoxCur==index}">{{item.memberCardName}}</div>
		</div> -->
			<el-tabs v-model="vipBoxCur" type="card" @tab-click="vipChange" style="margin-top: 20px;">
				<el-tab-pane v-for="(item, index) in sCheck" :key="index" :label="item.memberCardName" :name="item"></el-tab-pane>
			</el-tabs>

			<!-- <div style=""><hr /></div> -->
		</div>

		<!-- <el-button @click='showChecked'>点击</el-button> -->

		<div style="width: 100%;margin-top: 20px;">
			<div style="margin-left: 50px; " class="c-checkBoxs">
				<el-checkbox-group @change="checkGroup" v-model="checkServer" style="width:100%;flex-wrap:wrap;display: flex;justify-content: left;">
					<el-checkbox
						@change="checkChange(index, item)"
						style="margin-top: 10px;"
						v-for="(item, index) in fCheck"
						:key="index"
						:label="item"
						class="c-checked"
						v-model="item.checked"
						:disabled="dis"
					>
						<template>
							<div>{{ item.goodsName }}</div>
							<div style="margin-left: 5px;">¥{{ item.price }}</div>
						</template>
					</el-checkbox>
				</el-checkbox-group>
			</div>

			<div style="text-align: left;color:#c5c5c8;margin-top:20px;margin-left: 50px;border-left:3px solid #6F93FE;padding-left:3px;">储值卡内常用项目</div>
			<el-checkbox-group @change="checkGroup2" v-model="checkServer2" style="">
				<div style="margin-left: 50px;" class="c-checkBoxs">
					<div style="width:100%;flex-wrap:wrap;display: flex;justify-content: left;">
						<el-checkbox
							@change="checkChange2(index, item)"
							style="margin-top: 10px;"
							v-for="(item, index) in vipbox.laborItemsVoList"
							:key="index"
							:label="item"
							class="c-checked"
						>
							<template>
								<div>{{ item.name }}</div>
								<div class="d-flex">
									<!-- 2020-03-31 -->
									<!-- <div class="discount">{{item.count}}折</div> -->

									<!-- <div style="margin-left: 5px;color:#6F93FE">
									¥
									<span style="font-size: 18px;">{{item.price}}</span>
								</div> -->
									<div style="margin-left: 5px;">剩余{{ item.surplusCount }}次</div>
								</div>
							</template>
						</el-checkbox>
					</div>
					<div style="width:100%;flex-wrap:wrap;display: flex;justify-content: left;" class="c-checkBoxs">
						<el-checkbox @change="checkChange2(index, item)" style="margin-top: 10px;" v-for="(item, index) in vipbox.freeItemsVoList" :key="index" :label="item" class="c-checked">
							<template>
								<div>{{ item.name }}</div>
								<div style="margin-left: 5px;">剩余{{ item.surplusCount }}次</div>
								<div class="d-flex">
									<!-- 2020-03-31 -->
									<!-- <div class="discount">{{item.surplusCount}}折</div>
							
								<div style="margin-left: 5px;color:#6F93FE">
									¥
									<span style="font-size: 18px;">{{item.price}}</span>
								</div> -->
									<!-- <div style="margin-left: 5px;">剩余{{item.count}}次</div> -->
								</div>
							</template>
						</el-checkbox>
					</div>
				</div>
			</el-checkbox-group>

			<div style="margin-left: 20px;margin-top: 70px;text-align: center;">
				<font size="1"><font color="#808080">更多项目请在搜索栏中搜索~</font></font>
			</div>
		</div>

		<div class="end d-spb" style="margin-left: 20px;margin-right20px;">
			<!-- 'visibility':carNone -->
			<div :style="{ position: 'relative' }">
				<div class="end-img d-flex">
					<div @click="showCar()" class="carAlert"><img src="../../assets/car.png" alt="" /></div>
					<!-- <div class="icon" style="text-align: center;">{{dis==false?carList.length:fCheck.length }}</div> -->
					<div class="icon" style="text-align: center;">{{ allCarNum }}</div>
				</div>
				<!-- 购物车弹窗 -->
				<div class="carTable" v-if="isCarShow">
					<el-table
						:header-cell-style="{ color: '#fff', fontSize: '14px', backgroundColor: '#409eff' }"
						:data="carList"
						style="width: 100%"
						show-summary
						:summary-method="getSummaries"
					>
						<el-table-column prop="goodsName" label="已选项目" width="180"></el-table-column>
						<el-table-column prop="num" label="清空" width="200">
							<template slot="header" slot-scope="{ column, $index }">
								<span @click="clearAll">
									<i class="el-icon-delete"></i>
									清空
								</span>
							</template>
							<template slot-scope="scope">
								<span @click="dis == false ? handleDelete(scope.$index, scope.row) : dm()" style="margin-right:5px;color:#4c6acc;font-size: 5px;" class="carDel">删除</span>
								<span style="color:rgb(223, 150, 90)">
									<el-input-number
										size="small"
										v-model="scope.row.goodsCount"
										:min="1"
										:max="999"
										@change="carGoodsCount(scope.$index, scope.row)"
										:disabled="dis||scope.row.isGift==1"
									></el-input-number>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="price" label="" width="80">
							<template slot="header" slot-scope="{ column, $index }">
								<i class="el-icon-close" @click="closeCar"></i>
							</template>
							<template slot-scope="scope">
								<span style="color:rgb(223, 150, 90)">¥{{ scope.row.price }}</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>

			<div class="end-btn d-flex">
				<div class="title">
					已选&nbsp;
					<span style="font-size:28px;color:#f00">{{ dis == false ? carList.length : fCheck.length }}</span>
					&nbsp;个项目
				</div>
				<div style="margin-left: 10px;"><el-button type="primary" size="mini" @click="toBill">下一步</el-button></div>
			</div>
		</div>

		<!-- 搜索框弹窗 -->
		<el-dialog :visible.sync="searchShow" width="800px" :close-on-click-modal="false" :lock-scroll="true">
			<div style="padding-top: 15px;">
				<el-row>
					<el-col class="tabs" style="font-weight: bold;color: black;font-size: 18px;" v-for="(item, index) in tabTitle" :key="index" :span="8">
						<p style="text-align: center;padding-bottom: 10px;" :class="{ active: cur == index }" @click="tabChangess(index)">{{ item }}</p>
					</el-col>
					<el-col :span="8" style="font-weight: bold;color: #999acd;font-size: 18px;text-align: center;line-height: 64px;" class="checked">已选项目</el-col>
				</el-row>
			</div>
			<div class="col" style="margin-top: 38px;">
				<el-row>
					<!-- 左边一二级菜单 -->
					<el-col :span="5">
						<div style="text-align: left;height: 400px;overflow-y: auto" class="grid-content bg-purple">
							<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" v-for="(item, index) in searchList" :key="index">
								<el-submenu :index="item.code">
									<template slot="title">
										<span>{{ item.name }}</span>
									</template>
									<el-menu-item-group v-for="(list, idx) in item.mapList" :key="idx">
										<el-menu-item @click="handleClassify(list)" :index="list.code">{{ list.name }}</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
							</el-menu>
						</div>
					</el-col>
					<!-- 中间已选择商品 -->
					<el-col :span="14">
						<div style="" class="grid-content bg-purple-light bm">
							<el-row>
								<el-col :span="8">名称</el-col>
								<el-col :span="8">价格</el-col>
								<el-col :span="8" style="text-align: right;padding-right: 13px;">选择</el-col>
							</el-row>
							<el-table style="height: 400px;overflow-y: auto;" ref="multipleTable" :show-header="false" :data="serverList" @selection-change="serverChecked" :row-key="getRowKeys">
								<el-table-column prop="goodsName"></el-table-column>
								<el-table-column prop="price">
									<template slot-scope="scope">
										¥{{ scope.row.price }}
									</template>
								</el-table-column>
								<el-table-column type="selection" :reserve-selection="true"></el-table-column>
							</el-table>
						</div>
					</el-col>
					<!-- 右边删除 -->
					<el-col :span="5">
						<div v-for="(selected, index) in serverSelected" :key="index" style="text-align: center;" class="grid-content bg-purple">
							<el-col style="margin-top: 10px;" :span="20">{{ selected.goodsName }}</el-col>
							<el-col style="margin-top: 13px;" :span="4"><i @click="delSelected(selected.goodsCode)" class="el-icon-close"></i></el-col>
						</div>
					</el-col>
				</el-row>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="onfirm">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 新建商品 -->
		<newproduct :npIsShow="npIsShow" :searchList="options" @sendNp="sendNp" @saveNp="saveNp" @closeNp="closeNp"></newproduct>
		<!-- 新建服务 -->
		<newserve :nsIsShow="nsIsShow" :nsList="nsList" :searchList="options" @sendNs="sendNs" @saveNs="saveNs" @closeNs="closeNs"></newserve>
		<!-- 编辑车辆 -->
		<setCar :setCarshow="setCarshow" @closeCarAlert="closeCarAlert" @carConfirm="sendCarData"></setCar>
		<!-- 使用他人会员卡 -->
		<uservip :usevip="usevip" :vehicleId="vehicleId" @closeVipAlert="closeVipAlert" @vipConfirm="sendVipData"></uservip>
	</div>
</template>

<script>
// 新建服务
import newserve from './comprehensiveOrderChildren/newServe.vue';
// 新建商品
import newproduct from './comprehensiveOrderChildren/newProduct.vue';
// 编辑车牌弹窗
import setCar from '../Alert/setCar.vue';
// 使用他人会员卡弹窗
import uservip from '../Alert/useVip.vue';
import carLists from '../../global/carList.js'
export default {
	components: {
		newproduct,
		newserve,
		setCar,
		uservip
	},
	data() {
		return {
			// 服务商品选中的值
			choosedAlert: [],
			remarsk: '',

			brand: [],
			series: [],
			brandName: '',
			seriesName: '',

			workorderTime: '',

			//会员卡开关
			showSwitch: true,

			//他人会员卡信息
			state: null,

			//是否是会员
			isThereVip: null,

			// 新建商品弹窗
			npIsShow: false,
			// 新建服务弹窗
			nsIsShow: false,
			nsList: null,
			options: null,

			carNone: '',

			// 客户编码
			customerCode: null,

			// 弹窗服务--
			// tab选项
			cur: 0,
			tabTitle: ['服务', '商品'],
			// 判断是否携带参数
			showInput: false,

			// 搜索框弹窗
			// 已选项目
			serverSelected: [],
			// 二级分类显示数组
			serverList: [],
			// 是否显示弹窗
			searchShow: false,
			// 搜索框弹窗一二级数据
			searchList: [],
			// 购物车
			// 购物车显示
			isCarShow: false,
			// 购物车
			carList: [],
			carList1: [],
			carList2: [],
			// 选择总共项目
			allNum: 0,

			// 多选2
			checkServer2: [],
			sCheck: [],
			// 多选1
			checkServer: [],
			fCheck: [],
			// 会员卡tab
			vipbox: [],
			vipBoxCur: '',

			// 使用他人会员卡弹窗
			usevip: null,
			// 使用他人会员卡名字/电话号码/车牌号
			otherName: '',
			otherPhone: '',
			otherCar: '',
			// 使用他人会员单选框
			radio: null,
			// 搜索框
			search: '',
			// 开单时间
			orderTime: '今天',
			// 车型选择
			amgValue: '',
			amg: [],
			// 筛选车型
			carType: '',
			carTypes: [],
			// 挂账
			buyer: '0',
			// 车身颜色
			carColor: '',
			// 车辆注册日期
			carDate: '',

			// 车架号
			carVin: '',
			// 公里数
			carKil: '',
			// 添加发动机号
			carAddEngine: '',
			// 添加姓名
			carAddName: null,
			// 添加手机号
			carAddTel: null,
			// 车牌
			// 车牌弹窗
			setCarshow: false,
			// 车主id
			vehicleId: null,
			carNum: '暂无车牌',
			// 查看禁用
			dis: false,

			choosed: []
			// checkServer:[],
		};
	},
	computed: {
		allCarNum() {
			let count = 0;
			this.carList.map(item => {
				count += item.goodsCount;
			});
			return count;
		},
		// carList9(){
		// 	return this.$store.state.carList
		// }
		// name() {
		// 	return this.data
		// }
	},

	created() {
		this.getBrand();
		this.merchantCode = this.$route.query.merchantCode;
		this.useType = this.$route.query.type;
		this.orderId = this.$route.query.orderid;
		this.workOrderCode = this.$route.query.workOrderCode;
		if (this.$route.query.has == 'has') {
			this.carNum = this.$route.query.carNum;
			this.showInput = true;
			this.inputVipList(this.carNum);
		}
		if (this.$route.query.type == 'look') {
			let copy = '';
			this.getLookList(copy);
			this.dis = true;
			this.carNone = 'none';
			this.showInput = true;
			setTimeout(() => {
				this.fCheck = this.choosed;
				this.carList = this.choosed;
				console.log('查看', this.fCheck, this.carList);
			}, 2800);
		} else if (this.$route.query.type == 'copy' || this.$route.query.type == 'set') {
			let copy = 'copy';
			this.getLookList(copy);
			this.dis = false;
			this.carNone = 'hidden';
			this.showInput = true;
			this.getFcheck();
			setTimeout(() => {
				console.log('查看编辑展示的值', this.choosed);
				let arr = [];
				let arr2 = [];
				let arr3 = [];
				let arr4 = [];
				this.choosed.map(item => {
					if (item.goodsVipId == null) {
						this.fCheck.map(items => {
							if (item.goodsName == items.goodsName) {
								items.mapList = item.mapList;
								items.goodsCount = item.goodsCount;
								items.isGift = item.isGift;
								arr.push(items);
							}
						});
						console.log('arr', arr);
					} 
					if(item.goodsVipId != null) {
						this.sCheck.map(pd => {
							if (pd.laborItemsVoList != null && pd.laborItemsVoList.length > 0) {
								pd.laborItemsVoList.map(lab => {
									if (item.goodsName + item.goodsVipId == lab.goodsName + lab.goodsVipId) {
										lab.mapList = item.mapList;
										lab.isGift = item.isGift;
										lab.goodsCount = item.goodsCount;
										arr2.push(lab);
									}
								});
							}
							if (pd.freeItemsVoList != null && pd.freeItemsVoList.length > 0) {
								pd.freeItemsVoList.map(labs => {
									console.log(labs.goodsName + labs.goodsVipId);
									if (item.goodsName + item.goodsVipId == labs.goodsName + labs.goodsVipId) {
										labs.goodsCount = item.goodsCount;
										labs.isGift = item.isGift;
										arr3.push(labs);
									}
								});
							}
						});
					}
				});
				console.log("arr,this.choosed: " ,arr,this.choosed);
				for (var i = 0; i < this.choosed.length; i++) {
					if (this.choosed[i].goodsVipId == null) {
						var obj = this.choosed[i];
						var num = obj.goodsName;
						var flag = false;
						for (var j = 0; j < arr.length; j++) {
							var aj = arr[j];
							var n = aj.goodsName;
							if (n == num) {
								flag = true;
								break;
							}
						}
						if (!flag) {
							arr4.push(obj);
						}
					}
				}

				// 弹框选中的值
				this.choosedAlert = this.uniqs(arr4);
				console.log('外部选择', this.uniqs(arr4));
				this.fCheck = this.fCheck.concat(this.uniqs(arr4));
				// this.checkServer=arr
				this.checkServer = arr.concat(this.uniqs(arr4));
				this.checkServer2 = arr2.concat(arr3);
				// this.carList=arr2.concat(arr).concat(arr3)
				this.carList = arr2
					.concat(arr)
					.concat(arr3)
					.concat(this.uniqs(arr4));
			}, 2800);
		} else {
			this.getFcheck();
			this.getCarBrand();
		}
	},
	methods: {
		//新建客户/车牌号
		addNew(plateNumber, phone, name) {
			var carType2 = '';
			var amgValue2 = '';
			console.log('车型车系', this.carType, this.amgValue);
			if (this.carType != null) {
				carType2 = this.carType.split('/')[1];
			}
			if (this.amgValue != null) {
				amgValue2 = this.amgValue.split('/')[1];
			}
			this.$http
				.post('/laborSynthesize/addCarAndCustomer', {
					plateNumber, //String 车牌号
					phone, //String 手机号
					name, //String  客户姓名
					vehicleIdNum: this.carVin, //string 车架号
					engineNum: this.carAddEngine, //发动机号
					registeredDate: this.carDate, //注册日期
					brandName: carType2, //品牌名称
					modelName: amgValue2, //车型名称
					seriesName: amgValue2, //车系名称
					lastMileage: this.carKil, //最新里程
					carColor: this.carColor, //车身颜色
					source: 'S',
					merchantCode: this.merchantCode
				})
				.then(res => {
					console.log('%c请求新增结果', 'color:red;font-size:20px', res);
					if (res.code == '10000') {
						this.vehicleId = res.data.vehicleId;
						this.customerCode = res.data.customerCode;
					} else {
						alert(res.message);
					}
				});
		},

		//数据回显
		getRowKeys(row) {
			return row.goodsCode;
		},

		dm() {
			console.log('dis', this.dis);
		},

		/**
		 * 工单列表进入查看
		 */
		getLookList(copy) {
			this.$http
				.get('/WorkOrder/getWorkOrderInfo', {
					merchantCode: this.merchantCode,
					orderCode: this.$route.query.workOrderCode,
					orderType: 2
				})
				.then(res => {
					console.log('请求查看快捷开单结果', res);
					if (res.code == '10000') {
						this.remarsk = res.data.remarks;
						var seriesName = res.data.seriesName;
						var modelName = res.data.modelName;
						this.brand.map(item => {
							if (res.data.brandName == item.brandName) {
								this.brandName = item.value;
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
												that.seriesName = [endseries, items.value];
												// console.log('选中的值999',that.owner.seriesName)
											}
										});
									}, 1500);
								}
							});
							console.log('最后的值', this.series);
						}, 1500);

						//+++++++++++++++++++++++
						this.inputVipList(res.data.plateNumber);
						setTimeout(() => {
							//+++++++++++++++++++++++
							copy,
								//车牌号
								(this.carNum = res.data.plateNumber);
							// 手机号
							this.carAddTel = res.data.customerPhone;
							// 客户姓名
							this.carAddName = res.data.customerName;
							// 本次里程
							this.carKil = res.data.mileage;
							// 车辆注册日期
							this.carDate = res.data.applyDate;
							// 发动机号
							this.carAddEngine = res.data.engineNum;
							// 车架号
							this.carVin = res.data.vehicleIdNum;
							// 车身颜色
							this.carColor = res.data.carColor;
							// 车型名称
							this.carType = res.data.modelName;
							// 车系名称
							this.amgValue = res.data.seriesName;
							// 已经选择的开单项目
							this.choosed = res.data.laborGoodsVoList;
							// this
							// this.checkServer=this.checkServer.concat(this.choosed)
							// console.log('编辑复制需要选中的',this.checkServer)
							// this.fCheck=res.data.laborGoodsVoList
							// this.checkServer=this.fCheck
							//客户编码
							this.customerCode = res.data.customerCode;
							// res.data.laborGoodsVoList.map(item=>{
							// 	this.carList.push(item)
							// })
							//工单状态
							this.orderStatus = res.data.status;

							//工单时间
							this.workorderTime = res.data.workorderTime;
						}, 2000);

						// this
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * 获取快捷下单商品列表
		 */
		getFcheck() {
			this.$http
				.get('/LaborGoods/findFastOrderGoods', {
					merchantCode: this.merchantCode
				})
				.then(res => {
					console.log('快捷开单商品列表结果', res);
					if (res.code == '10000') {
						res.data.map(item => {
							item.goodsCode = item.code;
							item.goodsCome = 3;
							item.goodsVipId = null;
							item.goodsCount = 1;
						});
						this.fCheck = res.data;
					}
				});
		},

		/**
		 * 获取他人会员卡内的商品
		 */
		getVipProduct(customerCode) {
			this.$http
				.get('/LaborFastOrder/findOtherVipGoods', {
					merchantCode: this.merchantCode,
					customerCode
				})
				.then(res => {
					console.log('请求会员卡列表结果', res);
					if (res.code == '10000') {
						res.data.map(item => {
							if (item.memberCardType == 3) {
								//次卡
								item.laborItemsVoList.map(items => {
									items.goodsCome = 2;
									items.goodsName = items.name;
									items.goodsVipId = item.customerMemberCardId;
									items.goodsCount = 1;
									items.num = items.goodsCount;
								});
								item.freeItemsVoList.map(items => {
									items.goodsCome = 2;
									items.goodsName = items.name;
									items.goodsVipId = item.customerMemberCardId;
									items.goodsCount = 1;
									items.num = items.goodsCount;
								});
								this.sCheck.push(item);
							}
						});
						this.radio = true;
						console.log('%c展示的会员卡', 'color:#ff0000;font-size:20px;font-weight:bold', this.sCheck);
					} else {
						alert(res.message);
						this.radio = false;
					}
				});
		},

		/**
		 * 输入车牌获取客户信息以及自己会员卡信息
		 */
		inputVipList(condition) {
			this.$http
				.get('/LaborFastOrder/findVipGoods', {
					merchantCode: this.merchantCode,
					condition
				})
				.then(res => {
					console.log('请求输入车牌号结果', res.data.vehicleId, res);
					if (res.code == '10000') {
						this.buyer=res.data.buyoncreditMoney||0
						var seriesName = res.data.seriesName;
						var modelName = res.data.modelName;
						// var modelName=res.data.seriesName
						// var seriesName=res.data.modelName
						this.brand.map(item => {
							if (res.data.brandName == item.brandName) {
								this.brandName = item.value;
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
												that.seriesName = [endseries, items.value];
												console.log('选中的值999', that.seriesName);
											}
										});
									}, 1500);
								}
							});
							console.log('最后的值', this.series);
						}, 1500);

						//是否是会员卡
						if (res.data.canUseNum == 0) {
							this.isThereVip = 0;
						} else {
							this.isThereVip = 1;
						}

						// 手机号
						this.carAddTel = res.data.customerPhone;
						// 客户姓名
						this.carAddName = res.data.customerName;
						// 本次里程
						this.carKil = res.data.lastMileage;
						// 车辆注册日期
						this.carDate = res.data.registeredDate;
						// 发动机号
						this.carAddEngine = res.data.engineNum;
						// 车架号
						this.carVin = res.data.vehicleIdNum;
						console.log('车架号', this.carVin);
						// 车身颜色
						this.carColor = res.data.vehicleColor;
						// 车型名称
						// this.carType=res.data.brandName
						// 车系名称
						// this.amgValue=res.data.modelName
						// 会员卡id
						this.goodsVipId = res.data.customerMemberCardId;
						// 商家名称
						this.merchantName = res.data.merchantName;
						// 商家电话
						this.merchantPhone = res.data.merchantPhone;
						//车主id
						this.vehicleId = res.data.vehicleId;
						//车主code
						this.customerCode = res.data.customerCode;

						this.showInput = true;
						this.sCheck = [];
						if (res.data.vipGoodsList) {
							let arr = [];
							let arr2 = [];
							let arr3 = [];
							res.data.vipGoodsList.map(item => {
								if (item.memberCardType == 3) {
									//次卡
									item.laborItemsVoList.map(items => {
										items.goodsCount = 1;
										items.num = items.goodsCount;
										items.goodsCome = 1;
										items.goodsName = items.name;
										items.goodsVipId = item.customerMemberCardId;
										// items.type = items.goodsType;
									});
									item.freeItemsVoList.map(items => {
										items.goodsCome = 1;
										items.goodsName = items.name;
										items.goodsCount = 1;
										items.num = items.goodsCount;
										items.goodsVipId = item.customerMemberCardId;
									});
									arr.push(item);
								} else if (item.memberCardType == 1) {
									item.freeItemsVoList.map(items => {
										items.goodsCome = 1;
										items.goodsName = items.name;
										items.goodsCount = 1;
										items.num = items.goodsCount;
										items.goodsVipId = item.customerMemberCardId;
									});
									arr2.push(item);
								} else if (item.memberCardType == 2) {
									item.freeItemsVoList.map(items => {
										items.goodsCome = 1;
										items.goodsName = items.name;
										items.goodsCount = 1;
										items.num = items.goodsCount;
										items.goodsVipId = item.customerMemberCardId;
									});
									arr3.push(item);
								}
							});
							// console.log('%c自己会员卡','color:#70ff57;font-size:20px;font-weight:bold',this.sCheck)
							this.sCheck = this.deWeight(arr).concat(this.deWeight(arr2).concat(this.deWeight(arr3)));
						}
						// this
					} else {
						alert(res.message);
					}
				});
		},

		/**
		 * @param {Object} 会员卡tab变化
		 */
		vipChange(val) {
			// console.log('选中的会员卡',val)
			// this.vipBoxCur=val.index
			this.vipbox = val.name;
			// console.log('张氏的会员卡',this.vipbox)
		},

		// ====================================================================================================================
		// ====================================================================================================================
		// 选择的车牌
		// chCar(val){
		// 	console.log('选择车型',val)
		// 	this.brandId=val.split('/')[0]
		// },

		// 选择车系
		chCar2() {
			this.$http
				.get('/laborSynthesize/getSeriesList', {
					brandId: this.brandId
				})
				.then(res => {
					if (res.code == '10000') {
						this.amg = res.data;
					} else {
						alert(res.message);
					}
				});
		},

		// ====================================================================================================================
		// ====================================================================================================================
		/**
		 * 下一步进入快捷开单--进行开单
		 */
		toBill() {
			if (this.carAddTel == '' || this.carAddTel == null) {
				alert('请填入手机号');
			} else if (this.carAddName == '' || this.carAddName == null) {
				alert('请填入姓名');
			} else {
				if (this.vehicleId == null) {
					this.addNew(this.carNum, this.carAddTel, this.carAddName);
				}
				setTimeout(() => {
					var carType2 = '';
					var amgValue2 = '';
					var modelNames = '';
					console.log('车型车系', this.brandName, this.seriesName);
					if (this.brandName != null && this.brandName != '') {
						carType2 = this.brandName.split('/')[1];
					}
					if (this.seriesName != null && this.seriesName != '') {
						modelNames = this.seriesName[1].split('/')[1];
						amgValue2 = this.seriesName[0].split('/')[1];
					}
					console.log('车', carType2, amgValue2, modelNames);
					let isMyCard;
					let goodsCome;
					if (this.radio == true) {
						isMyCard = 1;
						goodsCome = 1;
					} else {
						isMyCard = 0;
						goodsCome = 2;
					}

					let type = this.useType;
					let orderid = this.orderId;
					console.log('type', type, orderid);
					let workOrderCode = this.workOrderCode;

					if (this.carList.length == 0) {
						this.$alert('请选择商品', '提示', {
							confirmButtonText: '确定'
						});
					} else {
						// this.carList.map(item => {
							// if (item.type == 2) {
							// 	item.type = 1;
							// } else if (item.type == 1) {
							// 	item.type = 2;
							// }
							// if (item.goodsType) {
							// 	if (item.goodsType == 2) {
							// 		item.type = 1;
							// 	} else if (item.goodsType == 1) {
							// 		item.type = 2;
							// 	}
							// }
						// });
						this.$store.commit('list',this.carList)
						this.$router.push({
							path: '/quickOrderBill',
							query: {
								// 上次备注
								remarsk: this.remarsk,

								//是否是会员
								isThereVip: this.isThereVip,
								merchantPhone: this.merchantPhone,
								merchantName: this.merchantName,
								orderid,
								workOrderCode,
								type,
								merchantCode: this.merchantCode,
								// 车牌号
								plateNumber: this.carNum,
								// 会员卡id
								goodsVipId: this.goodsVipId,
								// 来源
								goodsCome,
								// 使用他人会员卡
								isMyCard,
								// 客户姓名
								customerName: this.carAddName,
								// 客户手机号
								customerPhone: this.carAddTel,
								// 本次里程
								mileage: this.carKil,
								// 发动机号
								engineNum: this.carAddEngine,
								// 车架号
								vehicleIdNum: this.carVin,
								// 车辆注册日期
								applyDate: this.carDate,
								// 车身颜色
								carColor: this.carColor,
								brandName: carType2,
								// 车型名
								modelName: modelNames,
								// 车系名
								seriesName: amgValue2,
								// 客户编码
								customerCode: this.customerCode,
								// 传过去的商品
								// laborOrderGoodsList: this.carList,
								workorderTime: this.workorderTime,
								orderStatus: this.orderStatus
							}
						});
					}
				}, 2000);
			}
		},

		// ====================================================================================================================
		// ====================================================================================================================
		/**
		 * 搜索框弹窗
		 */
		searchShowClick() {
			this.searchShow = true;
			this.getTree('S01');
		},

		/**
		 * 获取新建服务分类的 一 二 三级列表
		 */
		getOptions(type) {
			this.$http
				.get('/LaborGoods/threeCategoryList', {
					merchantCode: this.merchantCode,
					parentCode: '0',
					code: 'S01',
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

		// 获取一二级分类
		getTree(oneCategoryCode) {
			this.$http
				.get('/LaborGoods/categoryList', {
					merchantCode: this.merchantCode,
					parentCode: '0',
					oneCategoryCode
				})
				.then(res => {
					console.log('请求弹窗树状结果', res);
					if (res.code == '10000') {
						this.searchList = res.data;
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

						// console.log('%c商品模板','color:#70ff57;font-size:20px;font-weight:bold',this.options)
					}
				});
		},

		// 获取三级列表
		getThree(categoryCode, level) {
			this.$http
				.get('/LaborGoods/findGoodsInfo', {
					merchantCode: this.merchantCode,
					categoryCode,
					level
				})
				.then(res => {
					console.log('请求弹窗树三级结果', res);
					if (res.code == '10000') {
						this.serverList = res.data;
					}
				});
		},

		// ====================================================================================================================
		// ====================================================================================================================
		//tab选项改变
		tabChangess(e) {
			console.log('选中的选项', e);
			this.cur = e;
			let oneCategoryCode = 'S01';
			if (e == 0) {
				oneCategoryCode = 'S01';
			} else {
				oneCategoryCode = 'S02';
			}
			this.getTree(oneCategoryCode);
		},
		// ====================================================================================================================
		// ====================================================================================================================

		// 删除已选择商品
		delSelected(val) {
			let idx;
			this.serverList.map((item, index) => {
				if (val == item.goodsCode) {
					idx = index;
				}
			});
			this.$refs.multipleTable.toggleRowSelection(this.serverList[idx], false);
			//fcheck删除
			this.fCheck.map((item, ix) => {
				if (this.serverList[idx] == item) {
					this.fCheck.splice(ix, 1);
				}
			});

			// 购物车删除
			this.carList.map((item, i) => {
				console.log('删除购物车');
				if (this.serverList[idx] == item) {
					console.log('删除购物车下标', i, idx);
					this.carList.splice(i, 1);
				}
			});
		},
		// 勾选商品
		serverChecked(e) {
			console.log('勾选选项', e);
			this.serverSelected = e;
		},
		// 选中二级分类
		handleClassify(e) {
			this.getThree(e.code, '3');
			let idx;
			console.log('二级分类', e, this.choosedAlert);
			setTimeout(() => {
				this.serverList.map((item, index) => {
					this.choosedAlert.forEach(val => {
						console.log(val.goodsCode == item.goodsCode);
						if (val.goodsCode == item.goodsCode) {
							this.$refs.multipleTable.toggleRowSelection(this.serverList[index], true);
						}
					});
				});
			}, 1500);

			//
		},
		// 关闭按钮
		close() {
			this.searchShow = false;
		},

		// 确定按钮
		onfirm() {
			// console.log('搜错弹窗最后确认按钮',this.serverSelected)
			this.searchShow = false;
			this.serverSelected.map(item => {
				item.goodsCome = 3;
				item.goodsCount = 1;
				item.num = item.goodsCount;
			});

			this.serverSelected.map((item, idx) => {
				this.fCheck.map((item2, idx2) => {
					if (item.goodsName == item2.goodsName) {
						this.fCheck.splice(idx2, 1);
					}
				});
			});

			this.fCheck = this.fCheck.concat(this.serverSelected);

			this.serverSelected.map((item, idx) => {
				this.checkServer.map((item2, idx2) => {
					if (item.goodsName == item2.goodsName) {
						this.checkServer.splice(idx2, 1);
					}
				});
			});
			this.checkServer = this.checkServer.concat(this.serverSelected);

			this.carList = this.deWeight(this.checkServer);
		},

		// 打开弹窗
		handleOpen(e) {
			console.log('打开二级列表', e);
		},
		// 关闭弹窗
		handleClose(e) {
			console.log('关闭二级列表', e);
		},

		/**
		 * 购物车
		 */
		// 合计
		getSummaries(param) {
			const { columns, data } = param;
			const sums = [];
			let values = [];
			console.log('params', param);
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = '总计';
					return;
				}
				if (column.property == 'price') {
					values = data.map(item => Number(item.goodsCount * item.price));
				} else {
					values = data.map(item => Number(item['goodsCount']));
				}
				if (column.property == 'price') {
					if (!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
						sums[index] += ' 元';
					}
				} else if (column.property == 'goodsCount') {
					const values = data.map(item => Number(item[column.property]));
					if (!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
						sums[index] += ' 件';
					}
				}
			});
			return sums;
		},
		carGoodsCount(idx, row) {
			this.$set(this.carList, idx, row);
			this.$store.commit('list',this.carList)
		},
		// 删除购物车单个商品
		handleDelete(index, row) {
			this.carList.splice(index, 1);
			this.checkServer.map((item, idx) => {
				if (row == item) {
					this.checkServer.splice(idx, 1);
					this.carList1.splice(idx, 1);
				}
			});
			this.checkServer2.map((item, idx) => {
				if (row == item) {
					this.checkServer2.splice(idx, 1);
					this.carList2.splice(idx, 1);
				}
			});
			//弹窗中删除
			this.$refs.multipleTable.selection.map((item, idx) => {
				if (row == item) {
					console.log('删除', row.goodsName, idx);
					this.$refs.multipleTable.toggleRowSelection(item, false);
				}
			});
		},
		// 全部清空
		clearAll(e) {
			this.carList = [];
			this.checkServer = [];
			this.checkServer2 = [];
			this.carList1 = [];
			this.carList2 = [];
			this.$refs.multipleTable.clearSelection();
		},
		// 关闭购物车
		closeCar() {
			this.isCarShow = false;
		},
		// 打开购物车
		showCar() {
			console.log('打开购物车弹窗');
			this.isCarShow = true;
		},
		/**
		 * 多选框
		 */
		checkGroup(e) {
			// console.log('差大城市',e);
		},
		checkGroup2(e) {
			// console.log('差大城市',e);
		},

		showChecked() {
			console.log('展示的', this.checkServer);
		},

		checkChange(e, item) {
			item.num = 1;
			item.goodsCount = item.num;

			// console.log('选择的自带商品1',this.checkServer)

			// let arr=this.checkServer
			let arr = this.uniqs(this.checkServer);
			let endArr = [];
			arr.map(item => {
				endArr.push(item);
			});
			// this.carList1=this.carList1.concat(endArr)
			console.log('选择的商品自带商品', this.carList1, this.carList2);
			this.carList = this.checkServer.concat(this.checkServer2);
		},

		//多选框2
		checkChange2(e, item) {
			item.num = 1;
			let arr = this.deWeight(this.checkServer2);

			let endArr = [];
			arr.map(item => {
				endArr.push(item);
			});
			// this.carList2=this.carList2.concat(endArr)
			console.log('选择的会员卡商品', endArr);
			this.carList = this.checkServer2.concat(this.checkServer);
		},

		/**
		 * 使用他人会员卡按钮
		 */
		// 关闭弹窗
		closeVipAlert(close) {
			this.usevip = false;
			this.radio = false;
		},
		// 接收使用他人会员卡弹窗传来的值
		sendVipData(customerCode, state) {
			this.state = state;
			this.showInput = true;
			this.usevip = false;
			this.customerCode = customerCode;
			this.getVipProduct(customerCode);
		},
		// 弹窗

		check(val) {
			if (this.radio) {
				this.showSwitch = true;
			} else {
				this.showSwitch = false;
			}
			console.log('单选框', this.radio, val);
			if (this.vehicleId != null) {
				if (this.radio) {
					this.usevip = true;
				} else {
					this.otherName = '';
					this.otherPhone = '';
					this.otherCar = '';
					this.state = '';
					this.sCheck = [];
				}
			} else {
				this.$alert('使用他人会员卡请先输入正确车牌号', '提示', {
					confirmButtonText: '确定'
				});
				this.radio = false;
			}
		},

		/**
		 * 车牌编辑
		 */
		closeCarAlert(close) {
			this.setCarshow = false;
		},
		// 接收弹窗传来的值
		sendCarData(setCarshow, plateNumber) {
			console.log('接收子组件传来的值', setCarshow, plateNumber);
			this.state = '';
			this.radio = false;
			this.setCarshow = false;
			this.carNum = plateNumber;
			this.inputVipList(plateNumber);
			this.showInput = true;
		},
		// 编辑车牌弹窗打开
		setCar() {
			this.setCarshow = true;
		},

		// 获取车品牌车型
		getCarBrand() {
			this.$http
				.get('/laborSynthesize/getBrandList', {
					merchantCode: this.merchantCode
				})
				.then(res => {
					if (res.code == '10000') {
						res.data.map(item => {
							item.value = item.brandId;
							item.label = item.brandName;
						});
						this.carTypes = res.data;
						// this.brandId=
					}
				});
		},

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

		/**
		 * @param {Object} 新建服务
		 */
		// 打开新建服务
		openNs() {
			this.nsIsShow = true;
			this.$http.get('/LaborGoods/getSelect', {}).then(res => {
				console.log('请求服务模板结果2', res);
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

		/**
		 * @param {Object} 新建商品
		 */
		openNp() {
			this.npIsShow = true;
			// this.getOptions('2')
			this.$http
				.get('/LaborGoods/threeCategoryList', {
					merchantCode: this.merchantCode,
					parentCode: '0',
					code: 'S02'
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
		// 取消新建
		closeNp() {
			this.npIsShow = false;
		},
		// 保存并且继续新建
		saveNp() {},
		// 确认新建
		sendNp() {
			this.npIsShow = false;
		},

		/**
		 * @param {Object} 去重方法
		 */
		deWeight(arry) {
			let newAry = [];
			for (let i = 0; i < arry.length; i++) {
				if (newAry.indexOf(arry[i]) === -1) {
					newAry.push(arry[i]);
				}
			}
			return newAry;
		},

		deWeight2(arry) {
			let newAry = [];
			for (let i = 0; i < arry.length; i++) {
				if (newAry.indexOf(arry[i].goodsCode) === -1) {
					newAry.push(arry[i]);
				}
			}
			return newAry;
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
		},

		/**
		 * 手机号验证
		 */
		inputTel(val) {
			let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			if (reg.test(val)) {
			} else {
				this.$message.error('请输入正确的手机号');
				this.carAddTel = '';
			}
		}
	}
};
</script>
<style scoped>
/deep/ .kil .el-input__inner {
	/* padding: 0; */
	/* height: 23px; */
}
/deep/ .c-date .el-date-editor.el-input {
	width: 200px;
	/* height: 23px; */
}
/deep/ .c-date .el-input--suffix .el-input__inner {
	padding-right: 0;
	/* height: 23px; */
}
/deep/ .c-date .el-input--mini .el-input__icon {
	line-height: 23px;
}
/deep/ .c-checkBoxs .el-checkbox {
	border-radius: 10px;
	border: 1px solid #dcdfe6;
	/* box-shadow: 3px 4px 8px #6f93fe; */
	padding-left: 10px;
	padding-top: 19px;
	padding-bottom: 19px;
	padding-right: 45px;
}
.discount {
	width: 32px;
	height: 20px;
	background: #409eff;
	font-size: 5px;
	border-radius: 15px;
	line-height: 20px;
	text-align: center;
	color: #fff;
}
/deep/ .is-checked {
	/* border: 1px solid #409EFF; */
}
/deep/ .c-checkBoxs .el-checkbox__input {
	margin-top: -20px;
}
/deep/ .c-checkBoxs .el-checkbox__inner {
	border-radius: 50%;
}
.end {
	margin-top: 150px;
	border-top: 2px solid #c5c5c8;
	padding-top: 30px;
}
.end-btn .title {
	color: #c5c5c8;
	font-size: 24px;
}
.end-img .icon {
	width: 15px;
	height: 15px;
	background: #f00;
	border-radius: 50%;
	margin-left: 2px;
	margin-top: -5px;
	color: #fff;
	font-size: 5px;
	line-height: 16px;
}
.carAlert:hover {
	/* animation:carAlert 3s infinite 0s */
}
.carTable {
	/* display: none; */
	width: 461px;
	position: absolute;
	top: -221px;
	left: 0px;
}
.carTable .head {
	background: #6d9bfd;
	display: flex;
	align-items: center;
	padding: 5px 10px;
	color: #fff;
	font-size: 10px;
}
.carTable .head img {
	width: 15px;
	height: 15px;
}
.carDel {
	cursor: pointer;
}
/deep/ .col .el-submenu .el-menu-item {
	min-width: 0px;
}
.tabs .active {
	background: #fff;
	border-bottom: 2px solid rgb(24, 144, 255);
	color: rgb(24, 144, 255);
}
.actives {
	background: #169bd5 !important;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
	color: #fff;
	background-color: #409eff;
	font-size: 14px;
}
/deep/.el-table__row,
/deep/.el-table__footer-wrapper tbody td,
/deep/.el-table__header-wrapper tbody td {
	background: #304156 !important;
	color: #fff;
}
/deep/ .el-table tbody tr:hover > td {
	background: #304156 !important;
	color: #fff;
}

/deep/ .bm .el-table__row,
/deep/.el-table__footer-wrapper tbody td,
/deep/.el-table__header-wrapper tbody td {
	background: #fff !important;
	/* color: #fff; */
	color: #303133;
}
/deep/ .bm .el-table tbody tr:hover > td {
	background: #fff !important;
	/* color: #fff; */
	color: #303133;
}
</style>
