<!-- 维修/保养项目(工时)--有会员卡 -->
<template>
	<div class='noVip' >
		<el-dialog :visible.sync="nvIsShow" width="850px" style="margin-top:0" :close-on-click-modal='false' :show-close='false'>
			<div style="padding: 15px; background: #409eff;color: #FFFFFF;">
				<el-row>
				<el-col :span="8" class="server" style="color: #FFFFFF;font-size: 18px;">服务名称</el-col>
				<el-col :span="8" style="color: #FFFFFF;font-size: 18px;" class="product">服务分类</el-col>
				<el-col :span="8" style="color: #FFFFFF;font-size: 18px;" class="checked">售价</el-col>
				</el-row>
			</div>
			
			<div class="col">
				<el-row>
					<el-col :span="19">
						<el-table  :data="serverList" :show-header="false" @selection-change='serverChecked' ref="table" :row-class-name="getRowClassName" :row-key="getRowKey1" height="500">
						<!-- <el-checkbox-group v-model="checkboxGroup1">	 -->
							<el-table-column width="30" type="selection" :reserve-selection="true"></el-table-column>
							
							<el-table-column type="expand" :reserve-selection="true">
								
								<template slot-scope="scope">
									
									<!-- <el-table :data='scope.row.list' :row-key="getRowKey" ref="multipleTable" @selection-change="serverChecked2" :show-header="false">
										<el-table-column align="right" type="selection" :reserve-selection="true"></el-table-column>
										<el-table-column width="400">
											<template slot-scope="scope">
												<span>{{scope.row.memberCardType==1?'通用储值卡':(scope.row.memberCardType == 2 ? '限定储值卡' : (scope.row.memberCardType == 3 ? '次卡' : (scope.row.memberCardType == 4 ?'默认卡':'卡外')))}}</span>
												<span v-if="scope.row.memberCardType!=0" style="margin-left: 20px;">{{scope.row.memberCardName}}</span>
												<span v-if="scope.row.memberCardType==3&&scope.row.memberCardType!=0">(余次{{scope.row.surplusCount}})</span>
												<span v-if="scope.row.memberCardType!=3&&scope.row.memberCardType!=0" style="margin-left: 10px;">余额:{{scope.row.cardBalance}}</span>
											</template>
										</el-table-column>
										
										<el-table-column align="right">
											<template slot-scope="scope">
												<div class="d-flex">
												<div>¥{{scope.row.price}}</div>
												<div v-if="scope.row.goodsDiscount!=null&&scope.row.memberCardType!=0" style="padding:2px;margin-left: 5px;border-radius: 7px;text-align: center;background:#169BD5 ;color: #fff;">{{scope.row.goodsDiscount}}折</div>
												</div>
											</template>
										</el-table-column>
									</el-table> -->
									<el-checkbox-group v-model="checkboxGroup1" v-for="item in scope.row.list" :key="item" @change="handleCheckAllChange(item)">
										<el-checkbox style="width: 100%;"   :label="item"  >
											<span>{{item.memberCardType==1?'通用储值卡':(item.memberCardType == 2 ? '限定储值卡' : (item.memberCardType == 3 ? '次卡' : (item.memberCardType == 4 ?'默认卡':'卡外')))}}</span>
											<span v-if="item.memberCardType!=0" style="margin-left: 20px;">{{item.memberCardName}}</span>
											<span v-if="item.memberCardType==3&&item.memberCardType!=0">(余次{{item.surplusCount}})</span>
											<span v-if="item.memberCardType!=3&&item.memberCardType!=0" style="margin-left: 10px;">余额:{{item.cardBalance}}</span>
											<span style="margin-left: 50px;">¥{{item.price}}</span>
												<span v-if="item.serviceDiscount!=null&&item.memberCardType != 3" style="padding:4px 15px;border-radius: 7px;text-align: center;background:#169BD5 ;color: #fff;margin-left: 10px;">{{Number(item.serviceDiscount)*10}}折
												</span>
											
									</el-checkbox>
									</el-checkbox-group>
								
								</template>

								
							</el-table-column>
						
							
							
							
							
							
							
							<el-table-column  width= "200" prop="name">
								
							</el-table-column>
							<el-table-column  width= "260" prop="type">
								<template slot-scope='scope'>
									<span>{{scope.row.twoCategoryName+'/'+scope.row.threeCategoryName}}</span>
								</template>
							</el-table-column>
							<el-table-column  prop="price">
								<template slot-scope="scope">
									<span v-if="scope.row.list.length==0">
										¥{{scope.row.standardPrice}}
									</span>
									<span v-if="scope.row.list.length>1">
										有会员卡
									</span>
								</template>
							</el-table-column>
						<!-- </el-checkbox-group> -->
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
					<!-- <el-button @click='print'>打印</el-button> -->
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	// import Bus from '../../../global/bus.js'
	// import { Bus } from 'bus'
	export default {
		components: {

		},
		props:{
			nvIsShow:Boolean,
			searchList:Array,
			customerCode:String,
			// fatherData:Array
		},
		data () {
			return {
				// // 指定一个key标识这一行的数据
				   getRowKey (row) {
										// console.log('需要标识',row)
										let datas=0
										datas=row.code+row.goodsVipId
										// console.log('需要标识de ',datas)
				     return datas
				   },
					 getRowKey1(val){
					 	// console.log(1232,val)
					 	return val.code
					 },
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
				multipleSelection:[]
			};
		},
		computed: {

		},
		watch:{
			
		},
		mounted() {
			// fatherData(val){
			// 	this.serverSelected=val
			// 	console.log('组件改变的值',val)
			// 	if(val){
			// 		val.forEach(row => {
			// 				this.$refs.multipleTable.toggleRowSelection(row,true);
			// 		});
			// 	}else{
			// 		this.$refs.multipleTable.clearSelection();
			// 	}
			// }
			
			
		},
		watch:{
			// checkboxGroup1:(val)=>{
			// 	console.log('变化',val)
			// }
			
			
		},
		
		
		methods: {
			handleCheckAllChange(val){
				console.log('勾选的',val)
			},
			
			print(){
				console.log(this.checkboxGroup1)
				console.log('答应',this.checkboxGroup1)
			},
			// handle(){
			// 	console.log(this.val)
			// },
			
			first(rows){
				this.$nextTick(()=>{
						rows.forEach(row => {
								this.$refs.multipleTable.toggleRowSelection(row,true);
						});
				})
		},
			
			
			
			getRowClassName({row, rowIndex}){
			   if (row.list.length == 0) {
			       return 'row-expand-cover';
			   }else{
					 return 'row-checkbox-cover'
				 }
			},
			
			
			cellcb(row){
			      if(row.list.length>0){
			        return "myCell"
			      }
			},
			
			
			//手风琴下拉
			toggleRowExpansion(idx,row){
				console.log('手风琴下拉列表',idx,row)
				this.secondList=row.list
			},
			
			
			/**
			 * 最后确认按钮
			 */
			confirm(){
				// this.serverSelected=
				// let arr =this.arr1.concat(this.arr2)
				// let arr = this.arr2
				let arr = this.checkboxGroup1
				this.checkboxGroup1.map(item => {
					item.serviceTime=item.serviceMinutes
				})
				console.log('%c最后提交的数组','color:#70ff57;font-size:20px;font-weight:bold',this.checkboxGroup1)
				this.$emit('sendNv',arr)
			},
			close(){
				this.$emit('closeNv',false)
			},
			
/**
		 * 搜索框弹窗
		 */
		// 勾选商品
		serverChecked(e){
			// this.arr1=e
			// this.serverSelected=this.arr1.concat(this.arr2)
			console.log('勾选选项',e,this.serverSelected)
		},
		
		//内部勾选选项
		serverChecked2(val){
			console.log('内部的勾选项',val,this.serverList)
			
			
			
			
			this.arr3=this.$refs.multipleTable.selection
			console.log('选择',this.$refs.multipleTable.selection,this.arr2)
			
			this.arr2=this.arr2.concat(this.arr3)
			
			
			console.log('%c内部勾选选项','color:#ff0000;font-size:20px;font-weight:bold',this.arr2)
		},
		
		// 选中二级分类
		handleClassify(val){
			console.log('点击二级分类',val)
			console.log('请求的cust',this.$props.customerCode)
			this.getVipList(val.code)
		},
		// 打开二级列表
		handleOpen(e){
		},
		// 关闭二级列表
		handleClose(e){
		},
		
		
		/**
		 * 请求会员卡服务信息
		 */
		getVipList(categoryCode){
			this.$http.get('/laborSynthesize/getVipGoods',{
				merchantCode:this.merchantCode,
				customerCode:this.$props.customerCode,
				// customerCode:'111',
				categoryCode,
				level:'3'
			})
			.then(res=>{
				console.log('请求的书距',res)
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
							 items.serviceMinutes=item.serviceMinutes
							 if(items.memberCardType==3){
								 items.price=item.standardPrice
								 // items.name=''
							 }else{
								 items.price=item.standardPrice
							 }
							 if(item.price==null){
							 	item.price=0
							 }
							 items.subtotalMoney=items.price
						 })
						 item.list.push({
							 
							 memberCardGoodsPrice: null,
							 code: item.code,
							 memberCardGoodsDiscount: null,
							 memberCardType: "0",
							 surplusCount: "10",
							 serviceDiscount: null,
							 cardBalance: null,
							 memberCardName: item.name,
							 customerMemberCardId: "107",
							 goodsDiscount: null,
							 goodsName:item.name,
							 goodsCount:1,
							 mapList:[],
							 goodsCome:2,
							 price:item.standardPrice,
							 subtotalMoney:item.price,
							 isGift:0,
					     goodsCode:item.code,
						 specification:item.specification,
						 brandName:item.brandName,
						 serviceMinutes:item.serviceMinutes
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
	this.$bus.$on('delRow',(val)=>{
	var that=this
		console.log('刷新',val)
		
			that.checkboxGroup1.map((del,idx) => {
				if(del.memberCardType+del.goodsCode+del.goodsName==val.memberCardType+val.goodsCode+val.goodsName){
					that.checkboxGroup1.splice(idx,1)
				}
			})
		
		console.log('值',this.checkboxGroup1)
	})
	this.merchantCode=this.$route.query.merchantCode
	// let arr =this.arr1.concat(this.arr2)
	// this.bus.$on('delRow',(val)=>{
	// 	// this.$refs.multipleTable.clearSelection();
	// 	// arr.map()
	// 	this.arr1.map((index,item) => {
	// 		if(item.memberCardType+item.code==val.memberCardType+val.code){
	// 			this.arr1.splice(index,1)
	// 		}
	// 	})
	// 	this.arr2.map((index,item) => {
	// 		if(item.memberCardType+item.code==val.memberCardType+val.code){
	// 			this.arr2.splice(index,1)
	// 		}
	// 	})
	// 	console.log('删除的val',val)
		// this.val=val
	// })
	// // this.fatherData.map(item => {
	// 	if(this.fatherData.length>0){
	// 			this.fatherData.forEach(row => {
	// 					this.$refs.multipleTable.toggleRowSelection(row,true);
	// 			});
	// 		}else{
	// 			this.$refs.multipleTable.clearSelection();
	// 		}
	// // })
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
myCell{
	display:none
}
/deep/ .row-expand-cover .el-table__expand-icon{visibility:hidden;}
/deep/.row-checkbox-cover .el-table-column--selection{visibility:hidden;}
</style>