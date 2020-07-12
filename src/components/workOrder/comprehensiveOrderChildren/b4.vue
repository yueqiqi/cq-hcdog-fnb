<!-- 综合开单--维修/保养商品(配件) -->
<template>
	<div class='b4'>
			<div class="font-big" style="padding-left: 36px;line-height: 60px;">维修/保养项目(配件)</div>
			<el-table  :data="manOur" :header-cell-style="{color:'#333',fontSize:'14px',fontWeight:'bold',fontSize:'16px',backgroundColor:'#d7d7d7'}" style="width: 100%" border>
				
			  <el-table-column align='center'  prop="goodsName" label="商品名称" width="180">
					<template slot-scope="scope">
						<div class="" style="display: flex;text-align: center;justify-content: center;">
						<div style="color:#0000FF">{{scope.row.isGift==1?'【赠品】':''}}</div>
						<div>{{ scope.row.goodsName }}</div>
						</div>
					</template>
				</el-table-column>
				
			  <el-table-column align='center' prop="brandName" label="品牌">
					<template slot-scope="scope">
						<span>{{scope.row.brandName||'--'}}</span>
					</template>
				</el-table-column>
			  <el-table-column align='center' prop="model" label="规格型号">
					<template slot-scope="scope">
						<span>{{scope.row.specification||'--'}}</span>
					</template>
				</el-table-column>
				
				<el-table-column align='center' prop="price" label="价格">
					<!-- <template slot-scope="scope">
						<el-input @change='manOurMoneyChange(scope.row.price,scope.row.goodsCount,scope.$index, manOur)' size='mini' v-model="scope.row.price" :disabled='dis'></el-input>
					</template> -->
				</el-table-column>
				<el-table-column align='center' prop="goodsCount" label="数量" width="130">
				<template slot-scope="scope">
					<!-- :disabled="scope.row.gift==1" -->
					<el-input-number style="width: 100%;" :min="1" size="mini" v-model="scope.row.goodsCount" @change="changeManOurNum(scope.row.price,scope.row.goodsCount,scope.$index, manOur)"  label="描述文字" :disabled="dis == false ? scope.row.isGift == 1 : dis"></el-input-number>
				</template>						
				</el-table-column>
				<el-table-column align='center' prop="0" label="已领数量">
					<template slot-scope="scope">
						<span>0</span>
					</template>
				</el-table-column>
				<el-table-column align='center' prop="0" label="库存数量">
					<template slot-scope="scope">
						<span>0</span>
					</template>
				</el-table-column>
				<!-- <el-table-column align='center' prop="deduct" label="提成业绩"></el-table-column> -->
				<el-table-column align='center' prop="subtotalMoney" label="小计">
				</el-table-column>
				
				<el-table-column align='center' prop="price" label="销售人员" width="180">
					<template slot-scope="scope">
						<div style="border:1px dashed #3f3fff;">
							<div style="position:relative;top:-4px;left:70px">
								<i @click="dis==false?setEmpAlert(scope.$index, manOur):''" class="el-icon-edit-outline"></i>
							</div>
							<div class="d-flex" style="flex-wrap: wrap;">
								<div>销售:</div>
							<div v-for="(item,index) in scope.row.mapList" :key='index' >
						<div style="margin-left:5px">{{item.employeeType==1?item.employeeName:''}}</div>
							</div>
							</div>
						</div>
					</template>
				</el-table-column>
				
				<el-table-column align='center' prop="remarks" label="备注">
					<template slot-scope="scope">
						<el-input  v-model="scope.row.remarks" placeholder='请输入备注' :disabled='dis'></el-input>
					</template>
				</el-table-column>
				<el-table-column align='center' prop="" label="操作">
					<template slot-scope="scope">
						<div><el-button @click.native.prevent="deleteRow(scope.$index, manOur)" style="color:red" type="text" size='small' :disabled='dis'>删除</el-button></div>
						<div v-if="scope.row.isGift==0&&scope.row.memberCardType==0"><el-button @click='set(scope.$index,manOur)' type="text" size='small' :disabled='dis'>设为赠品</el-button></div>
					</template>
				</el-table-column>
			</el-table>
			<div class="lastTimeRemark" style="margin-top: 20px;padding-left: 25px;padding-top: 20px;display: flex;">
				<el-input style="width: 250px;" placeholder="搜索商品/品牌/规格" @focus="showPartsNoVip" v-model="manOurSearch" :disabled='dis'>
					<el-button slot="append" icon="el-icon-search" @click='showPartsNoVip'></el-button>
				</el-input>
				<div>
					
				<!-- <selectGoods ref='selectGoods' :dis='dis' type='goods' @close='selectGoods' @selectionChange='selectGoods'></selectGoods> -->
				</div>
				<div>
					
				<el-button @click='openNp' style="margin-left: 15px;" type="text" :disabled='dis'>没搜到?新建商品</el-button>
				</div>
			</div>
			
			
			<!-- 选择销售施工弹窗 -->
			<emp :chooseEmp='empAlert' :empListf='empList1' :empLists='empList2'  @closeEmpAlert='closeEmpAlert'  @empConfirm="sendEmpData"></emp>
			<!-- // 打开维修/保养项目(配件)--无会员卡 -->
			<pnv :pnvIsShow='pnvIsShow' :searchList='pnvSearchList' :customerCode='this.$props.customerCode' @closePnv='closePnv' @sendPnv='sendPnv'></pnv>
			<!-- 打开新建商品 -->
			<newproduct :npIsShow='npIsShow' :searchList='options' @sendNp='sendNp' @saveNp='saveNp' @closeNp='closeNp'></newproduct>
	</div>
</template>

<script>
	// 选择员工弹窗
	import emp from '../../Alert/chooseEmp.vue';
	// 打开维修/保养项目(配件)--无会员卡
	import pnv from './partsUseVip'
	import selectGoods from './select1.vue'
	// 打开新建服务
	import newproduct from './newProduct.vue'
	export default {
		components: {
			newproduct,
			pnv,
			selectGoods,
		emp,
		},
			props:{
				Elist:{
					type:Array
				},
				dis:{
				type:Boolean,
				},
				manOur:{
					type:Array
				},
				customerCode:{
					type:String,
					// default
				}
			},
		data () {
			return {
				// 新建商品弹窗
				npIsShow:false,
				options:null,
			// 打开维修/保养项目(配件)--无会员卡弹窗
			pnvIsShow:false,
			// 弹窗一级分类
				pnvSearchList:[],
			/**
			 * 维修/保养(工时)
			 */
			// 搜索
			manOurSearch:'',
			// 选择销售施工弹窗的下标
			chooseEmpidx:null,
			// 选择销售施工弹窗
			empList1:[],
			empList2:[],
			empAlert:null,
			};
		},
		computed: {
		// this.manOur
		},
		methods: {
			selectGoods(val,type){
				console.log('type',type)
				if(type=='goods'){
					this.$parent.manOur2=this.uniqs(this.$parent.manOur2.concat(val));
				}
			},
			/**
			 * 获取新建服务分类的 一 二 三级列表
			 */
			getOptions(type){
				this.$http.get('/LaborGoods/threeCategoryList',{
					merchantCode:this.merchantCode,
					parentCode:'0',
					code:'S02',
					type,
				})
				.then(res=>{
					 console.log('%c请求新建服务分类的 一 二 三级列表结果','color:red;font-size:20px',res)
					 if(res.code == '10000'){
						 res.data.map(item => {
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
						this.options=res.data
					}else{
						 alert(res.message)
				}
				})
			},
			
			
			/**
			 * @param {Object} 新建商品
			 */
			openNp(){
				this.npIsShow = true
				this.getOptions('2')
			},
			// 取消新建
			closeNp(){
				this.npIsShow = false
			},
			// 保存并且继续新建
			saveNp(){
				
			},
			// 确认新建
			sendNp(){
				this.npIsShow = false
			},
			
			
			
			/**
			 * 维修/保养项目(配件)
			 */
			showPartsNoVip(){
				console.log('%c打开维修/保养项目(配件)--弹窗','color:lightgreen;font-weight:bold;background:red')
				this.pnvIsShow=true
				this.getTree('2')
			},
			// 获取一二级分类
			getTree(type){
				this.$http.get('/LaborGoods/categoryList',{
					merchantCode:this.merchantCode,
					parentCode:'0',
					oneCategoryCode:'S02',
					type,
				})
				.then(res=>{
					 console.log('请求弹窗树状结果',res)
					 if(res.code == '10000'){
							this.pnvSearchList=res.data
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
							this.options=res.data
					}
				})
			},
			
			// 接收参数
			sendPnv(sendPnv){
				// sendPnv.map(item=>{
				// 	item.num=1
				// 	item.isGift=0
				// 	item.subtotalMoney=item.goodsCount*item.price
				// 	item.mapList=[]
				// })
				sendPnv.map(item => {
					if(item.price==null){
						item.price=0
					}
					item.subtotalMoney=item.price*item.goodsCount
				})
				console.log('%c确认按钮','color:#70ff57;font-size:20px;font-weight:bold',sendPnv)
				this.manOur=this.uniqs(this.manOur.concat(sendPnv))
				this.$emit('children',this.manOur)
				this.pnvIsShow=false
			},
			// 关闭弹窗
			closePnv(){
				this.pnvIsShow=false
			},
			// ==========================================================
			
			
		// 设为赠品
		set(index,rows){
			var totalPrice = 0;//临时总价
			this.manOur[index].subtotalMoney=0
			this.manOur[index].goodsCount=1
			this.$set(this.manOur[index],'isGift',1)
		},
		// 删除本行信息
		deleteRow(index, rows) {
			this.$bus.$emit('delRows',this.manOur[index])
			// this.manOur[index].goodsCount=1
			this.$set(this.manOur[index],'goodsCount',1)
			this.$set(this.manOur[index],'isGift',0)
			// rows[index].goodsCount=1
			rows.splice(index,1)
		},
		
		//确定按钮
		sendEmpData(checkList,checkList2){
			this.empAlert=false
			let mapList=[]
			checkList.map(item=>{
				mapList.push(item)
			})
			checkList2.map(item=>{
				mapList.push(item)					
			})
			let that=this
			console.log('%c111','font-size:100px')
			that.manOur[that.chooseEmpidx].mapList=mapList
			console.log(this.manOur)
			this.$emit('children',this.manOur)
		},
		 // 关闭弹窗
		 closeEmpAlert(){
			 this.empAlert=false
		 },
		 // 显示弹窗
		setEmpAlert(index,row){
			this.empAlert=true,
			this.chooseEmpidx=index
			this.$http.get('/LaborFindByGoods/findByGoods',{
				merchantCode:this.merchantCode,
				goodsCode:row[index].goodsCode
			})
			.then(res=>{
				 console.log('请求选择员工弹窗结果',res)
				 if(res.code == '10000'){
						// if()
						let e1=[]
						let e2=[]
						res.data.map(item=>{
							if(item.employeeType==1){
								e1.push(item)
							}else{
								e2.push(item)
							}
						})
						this.empList1=this.deWeight(e1)
						this.empList2=this.deWeight(e2)
				}
			})
		},
		// 价格
		manOurMoneyChange(money,num,index,row){
			row[index].subtotalMoney=Number(money)*Number(num)
		},
		// 服务次数步进器
		changeManOurNum(money,num,index,row){
			row[index].subtotalMoney=Number(money)*Number(num)
			this.$emit('children',this.manOur)
		},
		
		//去重
		 deWeight(arry){
		 	   let newAry = [];
		 	   for (let i = 0; i<arry.length; i++) {
		 	      if (newAry.indexOf(arry[i]) === -1) {
		 	        newAry.push(arry[i]);
		 	      }
		 	   }
		 	   return newAry;
		 },
		 uniqs(array){
		     let temp = []; //一个新的临时数组
		     for(let i = 0; i < array.length; i++){
		 			if(temp.length==0){
		 				temp.push(array[i])
		 			}else{							
		 				let o = 0;
		 				for(let a = 0; a < temp.length;a ++){
		 					var obj = array[i];
		 					var obj1 = temp[a];
		 					if(JSON.stringify(obj1)===JSON.stringify(obj)){
		 						o = 1;
		 						break;
		 					}
		 				}
		 				if(o == 0){
		 					temp.push(array[i]);
		 				}		       
		 			}
		     }
		     return temp;
		 },
		},
mounted() {

},
created() {
	this.merchantCode=this.$route.query.merchantCode
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
.b4{
	background: #fff;border-radius:15px ;margin-top: 10px;padding-top: 10px;padding-bottom: 10px;
}
</style>
