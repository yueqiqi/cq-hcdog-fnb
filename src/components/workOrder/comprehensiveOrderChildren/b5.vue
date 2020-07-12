<!--门店耗材 -->
<template>
	<div class='b5'>
			<div class="font-big" style="padding-left: 36px;line-height: 60px;">门店耗材<span style="margin-left: 38px;color:#666666;font-size: 14px;font-weight: 0;">注:材料中的商品只记录库存变化,不计入结算余额</span></div>
			<el-table  :data="manOur" :header-cell-style="{color:'#333',fontSize:'14px',fontWeight:'bold',fontSize:'16px',backgroundColor:'#d7d7d7'}" style="width: 100%" border>
				
				
			  <el-table-column align='center'  prop="title" label="材料名称" width="180">
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
				<el-table-column align='center' prop="goodsCount" label="数量" width="130">
				<template slot-scope="scope">
					<!-- :disabled="scope.row.gift==1" -->
					<el-input-number style="width: 100%;" :min="1" size="mini" v-model="scope.row.goodsCount" @change="changeManOurNum(scope.row.price,scope.row.goodsCount,scope.$index, manOur)"  label="描述文字" :disabled='dis'></el-input-number>
				</template>						
				</el-table-column>
				<el-table-column align='center' prop="geted" label="已领数量">
					<template slot-scope="scope">
						<span>0</span>
					</template>
				</el-table-column>
				<el-table-column align='center' prop="inventory" label="库存数量">
					<template slot-scope="scope">
						<span>0</span>
					</template>
				</el-table-column>

				
				
				<el-table-column align='center' prop="remarks" label="备注">
					<template slot-scope="scope">
						<el-input size='mini' v-model="scope.row.remarks" placeholder='请输入备注' :disabled='dis'></el-input>
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
					
				<!-- <merchant type="merchant" :dis="dis" ref='merchant' @close='selectMerchant' @selectionChange='selectMerchant'></merchant> -->
				</div>
				<div>
					
				<el-button @click='openNp' style="margin-left: 15px;" type="text" :disabled='dis'>没搜到?新建商品(配件)</el-button>
				</div>
			</div>
			
			
			
	<!-- // 打开维修/保养项目(配件)--无会员卡 -->
	<pnv :pnvIsShow='pnvIsShow' :searchList='pnvSearchList' @closePnv='closePnv' @sendPnv='sendPnv'></pnv>
	<newproduct :npIsShow='npIsShow' :searchList='options' @sendNp='sendNp' @saveNp='saveNp' @closeNp='closeNp'></newproduct>
	</div>
</template>

<script>
	import	newproduct from './newProduct.vue'
	import merchant from './select1.vue'
	// 打开维修/保养项目(配件)--无会员卡
	import pnv from './partsNoVip'
	export default {
		components: {
			pnv,
			newproduct,
			merchant
		},
	props:{
		dis:{
		type:Boolean,
		},
		manOur:{
			type:Array
		},
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
			empAlert:null,
			};
		},
		computed: {

		},
		methods: {
			selectMerchant(val,type){
				if(type=='merchant'){
					this.$parent.manOur3=this.uniqs(this.$parent.manOur3.concat(val));
				}
			},
			
			/**
			 * 获取新建服务分类的 一 二 三级列表
			 */
			getOptions(type){
				this.$http.get('/LaborGoods/threeCategoryList',{
					merchantCode:this.merchantCode,
					parentCode:'0',
					code:'S03',
					type,
				})
				.then(res=>{
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
			 * 维修/保养项目(配件)
			 */
			// 打开维修/保养项目(配件)--无会员卡
			showPartsNoVip(){
				console.log('%c打开维修/保养项目(配件)--无会员卡弹窗','color:lightgreen;font-weight:bold;background:red')
				this.pnvIsShow=true
				this.getTree('2')
			},
			
			// 获取一二级分类
			getTree(type){
				this.$http.get('/LaborGoods/categoryList',{
					merchantCode:this.merchantCode,
					parentCode:'0',
					oneCategoryCode:'S03',
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
				this.manOur=this.uniqs(this.manOur.concat(sendPnv))
				this.$emit('children',this.manOur)
				this.pnvIsShow=false
			},
			// 关闭弹窗
			closePnv(){
				this.pnvIsShow=false
			},
			// ==========================================================
			// =======================================================
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
		 * 维修/保养项目(工时)
		 */
		// 设为赠品
		set(index,rows){
			var totalPrice = 0;//临时总价
			rows[index].isGift=1
		},
		// 删除本行信息
		deleteRow(index, rows) {
			this.$bus.$emit('dl',rows[index])
			this.manOur.splice(index,1)
		},
		// 价格
		manOurMoneyChange(money,num,index,row){
			row[index].subtotalMoney=Number(money)*Number(num)
		},
		// 服务次数步进器
		changeManOurNum(money,num,index,row){
			row[index].subtotalMoney=Number(money)*Number(num)
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
.b5{
	background: #fff;border-radius:15px ;margin-top: 10px;padding-top: 10px;padding-bottom: 10px;
}
</style>
