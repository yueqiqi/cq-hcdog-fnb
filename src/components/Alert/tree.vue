<!-- 树状table -->
<template>
	<div class=''>
		<el-dialog :visible.sync="nvShow" width="850px" :close-on-click-modal='false' :show-close='false'>
			<div style="padding: 15px; background: #999999;">
				<el-row>
				<el-col :span="8" class="server" style="font-weight: bold;color: black;font-size: 18px;">服务名称</el-col>
				<el-col :span="8" style="font-weight: bold;color: black;font-size: 18px;" class="product">服务分类</el-col>
				<el-col :span="8" style="font-weight: bold;font-size: 18px;color: black;" class="checked">售价</el-col>
				</el-row>
			</div>
			
			<div class="col">
				<el-row>
					<el-col :span="19">
						<!-- <el-table  :data="serverList" :show-header="false" @selection-change='serverChecked' ref="table" :row-key="getRowKey1"  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
							
							<el-table-column width="30" type="selection" :reserve-selection="true"></el-table-column>
							<el-table-column type="expand" :reserve-selection="true">
								<template slot-scope="scope">
									<el-table :data='scope.row.list' :row-key="getRowKey" ref="multipleTable" @selection-change="serverChecked2" :show-header="false">
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
									</el-table>

								</template>
							
								
							</el-table-column>
	
							<el-table-column  width= "230" prop="name"></el-table-column>
							<el-table-column  width= "260" prop="type"></el-table-column>
							<el-table-column  prop="price">
								<template slot-scope="scope">
									<span v-if="scope.row.list.length==0">
										¥{{scope.row.standardPrice}}
									</span>
									<span v-if="scope.row.list.length>0">
										有会员卡
									</span>	
								</template>
							</el-table-column>
						</el-table> -->
						<!-- :row-key="getRowKey1" -->
						<el-table :data='serverList' :show-header="false" @selection-change='serverChecked' ref="table"  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
						<!-- 	<el-table-column
							  v-for="(item,index) in tableList"
							  :key="index"
							  :label="item.label"
							  :prop="item.prop"
							></el-table-column> -->
							
							<el-table-column prop='name'></el-table-column>
							<el-table-column prop='memberCardType'>
								<template slot-scope="scope" v-if="scope.row.memberCardType">
									<span v-if="scope.row.memberCardType!=0" style="margin-left: 20px;">{{scope.row.memberCardName}}</span>
									<span v-if="scope.row.memberCardType==3&&scope.row.memberCardType!=0">(余次{{scope.row.surplusCount}})</span>
									<span v-if="scope.row.memberCardType!=3&&scope.row.memberCardType!=0" style="margin-left: 10px;">余额:{{scope.row.cardBalance}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="price"></el-table-column>
							
						</el-table>
					</el-col>
					<!-- 右边一二级菜单 -->
					<el-col  :span="5">
						<div style="text-align: left;" class="grid-content bg-purple">
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
	export default {
		components: {

		},
		data () {
			return {
				tableList: [
				        {
				          label: "级别",
				          prop: "name"
				        },
				        {
				          label: "名称",
				          prop: "memberCardType"
				        },
				        {
				          label: "别名",
				          prop: "price"
				        },
				      ],
				
				
				
nvShow:true,
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
					 	// return val.code
					 },
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
				searchList:[]
			};
		},
		computed: {

		},
		methods: {
			handleCheckAllChange(){},
			getTree(){
				this.$http.get('/LaborGoods/categoryList',{
					merchantCode:this.merchantCode,
					parentCode:'0',
					type:1,
				})
				.then(res=>{
					 console.log('请求弹窗树状结果',res)
					 if(res.code == '10000'){
							this.nvSearchList=res.data
							res.data.map(item=>{
								item.value=item.code+','+item.name
								item.label=item.name
								item.mapList.map(items=>{
									items.value=items.code+','+items.name
									items.label=items.name
									if(items.children){
										items.children.map(ch=>{
											ch.value=ch.code+','+ch.name
											ch.label=ch.name
										})
									}else{
										items.children=[]
									}
								})
								item.children=item.mapList
							})
							this.searchList=res.data
							console.log('%c商品模板','color:#70ff57;font-size:20px;font-weight:bold',this.options)
					}
				})
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
							let arr =this.arr1.concat(this.arr2)
							
							console.log('%c最后提交的数组','color:#70ff57;font-size:20px;font-weight:bold',arr)
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
						this.arr1=e
						// this.serverSelected=this.arr1.concat(this.arr2)
						console.log('勾选选项',e,this.serverSelected)
					},
					
					//内部勾选选项
					serverChecked2(val){
						let arr4 = []
						this.arr3=arr4.concat(val)
						// arr4=
						this.arr2=this.arr2.concat(this.arr3)
						
						console.log('%c内部勾选选项','color:#ff0000;font-size:20px;font-weight:bold',val,this.serverSelected,this.arr2)
					},
					
					// 选中二级分类
					handleClassify(val){
						console.log('点击二级分类',val)
						// console.log('请求的cust',this.$props.customerCode)
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
							customerCode:this.customerCode,
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
										 if(items.memberCardType==3){
											 items.price=item.standardPrice
										 }else{
											 items.price=items.memberCardGoodsPrice
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
										 memberCardType: '0',
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
								     goodsCode:item.code
									 })
									 item.children=item.list
									 item.children.map(itemw => {
										 if(itemw.memberCardType==1){
											 itemw.name='通用储值卡'
										 }else if(itemw.memberCardTypew == 2 ){
											 itemw.name='限定储值卡'
										 }else if(itemw.memberCardType==3){
											 itemw.name='次卡'
										 }else if(itemw.memberCardType==4){
											 itemw.name='默认卡'
										 }else{
											 itemw.name='卡外'
										 }
									 })
								 })
								// res.data.map(item => {
								// 	item.children=item.list
								// })
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
	this.merchantCode=this.$route.query.merchantCode
	this.getTree()
	this.customerCode='3100000100069'
}, //生命周期 - 创建之后
	}
</script>

<style scoped>

</style>