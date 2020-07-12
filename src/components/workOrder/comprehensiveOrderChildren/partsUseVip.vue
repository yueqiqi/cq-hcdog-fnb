<!-- 维修/保养项目(配件)--有会员卡 -->
<template>
	<div class='noVip'>
		<el-dialog :visible.sync="pnvIsShow" width="800px" :close-on-click-modal='false' :show-close='false'>
			<div style="padding: 15px; background: #409eff;">
				<el-row>
				<el-col :span="6" class="server" style="color: #fff;font-size: 18px;">商品名称</el-col>
				<el-col :span="3" style="color: #fff;font-size: 18px;" class="product">品牌</el-col>
				<el-col :span="3" style="color: #fff;font-size: 18px;" class="product">规格</el-col>
				<el-col :span="4" style="color: #fff;font-size: 18px;" class="product">当前库存</el-col>
				<el-col :span="3" style="font-size: 18px;color: #fff;" class="checked">售价</el-col>
				<el-col :span="5"><el-input placeholder="请输入查询内容" @keyup.enter.native="searchGoods" v-model="search"></el-input></el-col>
				</el-row>
			</div>
			
			<div class="col">
				<el-row>
					<el-col :span="19">
						<el-table v-show="search ==''" :data="serverList"  @expand-change="toggleRowExpansion" :show-header="false"  @selection-change='serverChecked' ref="table" :row-class-name="getRowClassName" height="400">
							<el-table-column width="30" type="selection"></el-table-column>
							
							
							<el-table-column type="expand" @click='showSecond(scope.$index)'>
								<template slot-scope="scope">
									<!-- <el-table :data='props.row.list' @selection-change="serverChecked2" :show-header="false">
										<el-table-column align="right" type="selection"></el-table-column>
										<el-table-column width="470">
											<template slot-scope="scope">
												<span>{{scope.row.memberCardType==1?'通用储值卡':(scope.row.memberCardType == 2 ? '限定储值卡' : (scope.row.memberCardType == 3 ? '次卡' : (scope.row.memberCardType == 4 ?'默认卡':'卡外')))}}</span>
												<span v-if="scope.row.memberCardType!=0" style="margin-left: 20px;">{{scope.row.memberCardName}}</span>
												<span style="margin-right: 10px;">{{scope.row.price}}</span>
												<span v-if="scope.row.memberCardType==3&&scope.row.memberCardType!=0">(余次{{scope.row.surplusCount}})</span>
												<span v-if="scope.row.memberCardType!=3&&scope.row.memberCardType!=0">余额:{{scope.row.cardBalance}}</span>
											</template>
										</el-table-column>
										<el-table-column align="right">
											<template slot-scope="scope">
												<div class="d-flex" style="justify-content: center;">
												<div>¥{{scope.row.price}}</div>
												<div v-if="scope.row.goodsDiscount!=null&&scope.row.memberCardType!=0" style="width: 35px;margin-left: 5px;border-radius: 7px;text-align: center;line-height: 20px;height: 20px;background:#169BD5 ;color: #fff;">{{scope.row.goodsDiscount}}折</div>
												</div>
											</template>
										</el-table-column>
									</el-table> -->
									
									<el-checkbox-group v-model="checkboxGroup1" v-for="item in scope.row.list" :key="item" @change="handleCheckAllChange(item)">
										<el-checkbox style="width: 100%;margin-left: 40px;"   :label="item"  >										
											<!-- <el-row style="width: 100%;">
												<el-col :span='4'>{{item.memberCardType==1?'通用储值卡':(item.memberCardType == 2 ? '限定储值卡' : (item.memberCardType == 3 ? '次卡' : (item.memberCardType == 4 ?'默认卡':'卡外')))}}</el-col>
												<el-col :span='4'>{{item.memberCardName}}</el-col>
												<el-col :span='4'>(余次{{item.surplusCount}})</el-col>
												<el-col :span='4'>余额:{{item.cardBalance}}</el-col>
												<el-col :span='4'>¥{{item.price}}</el-col>
												<el-col :span='4'>{{item.serviceDiscount}}折</el-col>
											</el-row> -->
											
											<div style="display: flex;justify-content: space-between;">
												
											
											
											<div>{{item.memberCardType==1?'通用储值卡':(item.memberCardType == 2 ? '限定储值卡' : (item.memberCardType == 3 ? '次卡' : (item.memberCardType == 4 ?'默认卡':'卡外')))}}</div>
											<div v-if="item.memberCardType!=0" style="margin-left: 20px;">{{item.memberCardName}}</div>
											<div v-if="item.memberCardType==3&&item.memberCardType!=0">(余次{{item.surplusCount}})</div>
											<div v-if="item.memberCardType!=3&&item.memberCardType!=0" style="margin-left: 10px;">余额:{{item.cardBalance}}</div>	
											<div style="margin-left: 50px;">¥{{item.price}}</div>
											<div v-if="item.serviceDiscount!=null&&item.memberCardType != 3" style="padding:4px 15px;margin-left: 5px;border-radius: 7px;text-align: center;background:#169BD5 ;color: #fff;margin-left: 10px;">{{Number(item.serviceDiscount)*10}}折
											</div>
											
											</div>
										
											
											<!-- <div>¥{{scope.row.price}}</div> -->
									</el-checkbox>
									
									</el-checkbox-group>
								</template>
							</el-table-column>
							<el-table-column  width= "150" prop="name"></el-table-column>
							<el-table-column  width= "" prop="type">
								<template slot-scope="scope">
										<span>{{scope.row.brandName||'--'}}</span>
									</template>
								</el-table-column>
							</el-table-column>
							<el-table-column  width= "" prop="title">
								<template slot-scope="scope">
										<span>{{scope.row.specification||'--'}}</span>
									</template>
								</el-table-column>
							</el-table-column>
							<el-table-column  width= "" prop="type"></el-table-column>
							<el-table-column align="center"  prop="price">
								<template slot-scope="scope">
									<span v-if="scope.row.list.length==0">
										¥{{scope.row.standardPrice}}
									</span>
									<span v-if="scope.row.list.length>1">
										有会员卡
									</span>
								</template>
							</el-table-column>
						</el-table>
						<el-table v-show="search != ''" row-key="goodsCode" :data="tableData" ref="searchTable" @selection-change="handleSelectionChange" :show-header="false">
							<el-table-column type="selection" width="45" />
							<el-table-column width="150" prop="name" />
							<el-table-column width= "90" prop="title">
								<template slot-scope="scope">
									<span>{{scope.row.brandName||'--'}}</span>
								</template>
							</el-table-column>
							<el-table-column width= "" prop="title">
								<template slot-scope="scope">
									<span>{{scope.row.specification||'--'}}</span>
								</template>
							</el-table-column>
							<el-table-column width= "" prop="type">
								<template slot-scope="scope">
									<span>--</span>
								</template>
							</el-table-column>
						<!-- 	<el-table-column width="260" prop="type">
								<template slot-scope="scope">
									<span>{{ scope.row.twoCategoryName + '/' + scope.row.threeCategoryName }}</span>
								</template>
							</el-table-column> -->
							<el-table-column prop="standardPrice" />
						</el-table>
					</el-col>
					
					<!-- 右边一二级菜单 -->
					<el-col  :span="5">
						<div style="text-align: left;height:500px;overflow-y:auto" class="grid-content bg-purple">
							<el-menu
								default-active="2"
								class="el-menu-vertical-demo"
								@open="handleOpen"
								@close="handleClose" v-for="(item,index) in searchList" :key='index'>
									<el-submenu :index="item.name" >
										<template slot="title">
											<span>{{item.name}}</span>
										</template>
										<el-menu-item-group v-for="(list,idx) in item.mapList" :key='idx'>
											<el-menu-item @click='handleClassify(list)' :index="list.name">{{list.name}}</el-menu-item>
										</el-menu-item-group>
									</el-submenu>
								</el-menu>
						</div>
					</el-col>
					
				</el-row>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="close">取 消</el-button>
			    <el-button type="primary" @click="confirm">确 定</el-button>
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	let throttle = null;
	export default {
		props:{
			pnvIsShow:Boolean,
			searchList:Array,
			customerCode:String
		},
		
		components: {

		},
		watch: {
			search(value) {
				if (!!value) {
					if (throttle) {
						clearTimeout(throttle);
					}
					throttle = setTimeout(() => {
						throttle = null;
						this.searchGoods();
					}, 500);
				}
			},
			serverList(newVal, oldVal) {
				let that = this;
				this.$nextTick(() => {
					that.endList.forEach(row => {
						newVal.forEach(val => {
							val.list.map(item => {
								if (item.goodsCode+item.goodsCome  == row.goodsCode+row.goodsCome ) {
									that.checkboxGroup1.push(item);
								}
							});
						});
					});
				});
			},
			tableData(newVal, oldVal) {
				let that = this;
				this.$nextTick(() => {
					that.endList.map(val => {
						newVal.forEach(row => {
							if (row.goodsCode == val.goodsCode) {
								that.$refs.searchTable.toggleRowSelection(row, true);
							}
						});
					});
				});
			}
		},
		data () {
			return {
				searchTable: [],
				tableData: [],
				search: '',
				checkboxGroup1:[],
				// 多选选项
				checkList:[],
				// 手风琴
				// 卡外
				secondList2:[],
				// 储值卡
				secondList:[],
				// 是否显示弹窗
				searchShow:true,
				serverSelected:[],
				// 二级分类显示数组
				serverList:[],
				arr1:[],
				arr2:[],
				arr3:[],
				arr4:[],
// 搜索框弹窗一二级数据
			};
		},
		computed: {
			endList() {
				return this.searchTable.concat(this.checkboxGroup1);
			}
		},
		methods: {
			handleSelectionChange(val) {
				let that = this;
				this.searchTable = val;
			},
			searchGoods() {
				this.$http
					.get('/LaborGoods/listByCategoryForLaborSynthesize', {
						merchantCode: this.merchantCode,
						type: 2,
						condition: this.search
					})
					.then(res => {
						if (res.data == null) return;
						res.data.map(item => {
							item.goodsCode = item.code;
							item.goodsCome = 3;
							item.price = item.standardPrice;
							item.serviceTime = item.serviceMinutes;
							item.goodsName = item.name;
							item.goodsVipId = null;
							item.num = 1;
							item.isGift = 0;
							item.mapList = [];
							item.goodsCount = item.num;
							item.selected = false;
							item.subtotalMoney = item.goodsCount * item.price;
						});
						this.tableData = res.data;
					});
			},
			handleCheckAllChange(val){				
			},
			
			
			
			getRowClassName({row, rowIndex}){
			   if (row.list.length == 0) {
			       return 'row-expand-cover';
			   }else{
					 return 'row-checkbox-cover'
				 }
			},
			
			//手风琴下拉
			toggleRowExpansion(row){
				this.secondList=row.list
			},
			
			/**
			 * 最后确认按钮
			 */
			confirm(){
				// let arr =this.deWeight( this.serverSelected )
				let arr =this.endList
					this.$emit('sendPnv',arr)
				},
				close(){
					this.$emit('closePnv',false)
			},
			
			
			// 数状展示
			showSecond(index){
			},
/**
		 * 搜索框弹窗
		 */
		// 勾选商品
		serverChecked(e){
			this.arr1=e
			this.serverSelected=this.arr1.concat(this.arr2)
			// this.serverSelected=e
		},
		
		//内部勾选选项
		serverChecked2(val){
			let arr4 = []
			// arr4=val
			this.arr3=arr4.concat(val)
			this.arr2=this.arr2.concat(this.arr3)
			this.serverSelected=this.arr1.concat(this.arr2)
		},
		
		
		
		// 选中二级分类
		handleClassify(val){
			console.log('点击',val)
			this.getVipList(val.code)
		},
		// 打开二级列表
		handleOpen(e){
		},
		// 关闭二级列表
		handleClose(e){
		},
		
		
		getVipList(categoryCode){
			this.$http.get('/laborSynthesize/getVipGoods',{
				merchantCode:this.merchantCode,
				customerCode:this.$props.customerCode,
				// customerCode:'111',
				categoryCode,
				level:'3'
			})
			.then(res=>{
				console.log('%c请求三级列表','color:#70ff57;font-size:20px;font-weight:bold',res)
				 if(res.code == '10000'){
					 res.data.map( item => {
						 item.list.map( items => {
							 items.goodsName=item.name
							 items.goodsCount=1
							 items.mapList=[]
							 items.goodsCome=1
							 items.isGift=0
							 items.goodsCode=item.code
							 items.goodsVipId=items.customerMemberCardId
							 items.specification=item.specification
							 items.brandName=item.brandName
							 if(items.memberCardType==3){
								 items.price=item.standardPrice
							 }else{
								 items.price=item.standardPrice
							 }
							 items.subtotalMoney=items.price
						 })
						 item.list.push({
							 memberCardGoodsPrice: null,
							 code: item.code,
							 memberCardGoodsDiscount: null,
							 memberCardType: "0",
							 surplusCount: 999,
							 serviceDiscount: null,
							 cardBalance: null,
							 memberCardName: item.name,
							 customerMemberCardId: "107",
							 goodsDiscount: null,
							 goodsName:item.name,
							 goodsCount:1,
							 mapList:[],
							 goodsCome:3,
							 price:item.standardPrice,
							 subtotalMoney:item.price,
							 isGift:0,
					     goodsCode:item.code,
						 specification:item.specification,
						 brandName:item.brandName
						 })
					 })
					this.serverList=res.data
				 console.log('%c请求结果三级','color:red;font-size:20px',this.serverList)
				}else{
					 alert(res.message)
			}
			})
		},
		
		/**
		 * @param {Object} arry 去重
		 */
		deWeight(arry){
			   let newAry = [];
			   for (let i = 0; i<arry.length; i++) {
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
	this.$bus.$on('delRows',(val)=>{
	var that=this
			that.checkboxGroup1.map((del,idx) => {
				if(del.memberCardType+del.goodsCode+del.goodsName==val.memberCardType+val.goodsCode+val.goodsName){
					that.checkboxGroup1.splice(idx,1)
				}
			})
	})
	this.merchantCode=this.$route.query.merchantCode
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
/deep/ .col .el-submenu .el-menu-item{
	min-width:0px
} 
.noVip /deep/ .el-dialog__body{
	padding:0
}
.noVip /deep/ .el-menu{
	background:#66ccff
}
.noVip /deep/ .el-dialog__header{
	padding:0
}
.noVip /deep/ .el-dialog__headerbtn .el-dialog__close {
	color: #fff;
}
.noVip /deep/ .el-table__expanded-cell{
	padding:20px 10px;
}

/deep/ .row-expand-cover .el-table__expand-icon{visibility:hidden;}
/deep/.row-checkbox-cover .el-table-column--selection{visibility:hidden;}
</style>