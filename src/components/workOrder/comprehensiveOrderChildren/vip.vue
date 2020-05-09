<!-- 会员卡内项目 -->
<template>
	<div class='vip'>
		<el-dialog title="" :close-on-click-modal='false'  :visible.sync="vipPop" width="80%" @close='close' :show-close='false'>
			<div class='font-big' style="line-height: 60px;">会员卡内项目</div>
			<div   class="d-flex" id="d1">
				<!-- <div v-for="(item,index) in vipList" style="padding:0 10px;height: 40px;line-height: 40px;color: #fff;background:#b0b0b0;text-align: center;border-radius: 10px;margin-right: 10px;" :key='index' @click="vipChange(item,index)" :class="{active2:cur2==index}">		
					{{item.memberCardName}}
				</div> -->
				<el-tabs v-model="cur2" type="card" 	@tab-click="vipChange">
				  <el-tab-pane
				    v-for="(item,index) in vipList"
				    :key="index"
				    :label="item.memberCardName"
				    :name="item"
				  >
				  </el-tab-pane>
				</el-tabs>
				
				
				
			</div>
			<div style="width: 100%;height: 30px;line-height: 30px;text-align: center;font-size: 14px;color: #333;background:#F2F2F2 ;">全部服务{{serve}}折,全部商品{{product}}折,此处看添加卡内特殊优惠项目和赠送项目;如需添加其他项目,可在点击右上角关闭按钮后的页面添加.</div>
			<div style="color: #333;font-size: 18px;margin-top: 15px;height: 73px;">
				<!-- tabs -->
				<div>
				<el-col class="tabs" v-for="(item,index) in tabTitle" :key='index' :span="6"><p style="text-align: center;padding-bottom: 10px;" :class="{active:cur==index}" @click="tabChangess(index)">{{item}}</p></el-col>
				</div>
			</div>
			
			
			<el-row >
				<el-col :span="18">
					<!-- <div style="margin-top: 20px;">
						<el-select v-model="serverType" placeholder="请选择服务类型" @change="optionsChange">
						   <el-option v-for="item in options" :key="item" :label="item" :value="item">
						  </el-option>
						</el-select>
					</div> -->
					
					<div style="margin-top: 20px;">
						<el-table ref="multipleTable" :header-cell-style="{color:'#333',fontSize:'14px',background:'#f2f2f2'}" :data="list" style="width: 100%;" @selection-change="selectChange" :row-key="getRowKeys">
							<el-table-column prop="goodsName" label="服务名称"></el-table-column>
							<el-table-column prop="hour" label="所需工时"></el-table-column>
							<el-table-column prop="price" label="工时单价(个/元)"></el-table-column>
							<el-table-column prop="price" label="单价"></el-table-column>
							<el-table-column type="selection" prop="money" label="操作" :reserve-selection="true">
							</el-table-column>
						</el-table>
					</div>
				</el-col>
				
				<el-col :span="6">
					<h4>已选项目({{chooseList.length}})</h4>
					<div class="d-spb" style="margin-left: 10px;" v-for="(item,index) in chooseList" :key='index'>
						<div class="d-flex">
							<div>[{{item.choose}}]</div>
							<div>{{item.goodsName}}</div>
						</div>
						<div><i @click="delSelected(item.goodsCode)" class="el-icon-close"></i></div>
					</div>
				</el-col>
			</el-row>
			
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
		props:{
			vipPop:Boolean,
			vipList:Array,
			arr:Array,
			customerCode:String
		},
		data () {
			return {
				listType:'specialService',
				otherVipList:[],
				// 已选项目
				chooseList:[],
				// tab选项
				cur:-1,
				cur2:-1,
				tabTitle:['特殊优惠项目--服务','特殊优惠项目--商品','赠送--服务','赠送--商品'],
				// 数据
				list:[],
				// 服务类型
				serverType:'',
				options:[],
				// 服务打折
				serve:10,
				// 商品打折
				product:'10',
				card:'会员卡',
				num:'300',
			};
		},
		computed: {

		},
		watch:{
			arr(val){
				this.list = val
			}
		},
		methods: {
			getRowKeys(row) {
			    return row.vips;
			},
			
			
			// 关闭按钮
			close(){
				this.$emit('closeVipPop')
			},
			// 确定按钮
			confirm(){
				this.chooseList.map(item => {
					item.goodsCount=1
					item.num=item.goodsCount
				})
				console.log('选择的')
				this.$emit('confirmVipPop',this.chooseList)
			},
			
			
			
			
			
			// 删除已选择的商品
			delSelected(val){
				let idx
				console.log('删除商品下表',val)
				this.list.map((item,index) => {
					if(val == item.goodsCode){
						idx=index
					}
				})
				this.$refs.multipleTable.toggleRowSelection(this.list[idx],false)
			},
			
			/**
			 * 会员卡内的商品
			 */
			getList(vipId){
				this.$http.get('/laborSynthesize/getOtherVipGoods',{
					merchantCode:this.merchantCode,
					vipId,
					// customerCode:this.$props.customerCode
					customerCode:'3100000100106'
				})
				.then(res=>{
					 console.log('%c请求会员卡内商品结果','color:red;font-size:20px',res)
					 if(res.code == '10000'){
							this.otherVipList=res.data
					}else{
						 alert(res.message)
				}
				})
			},
			/**
			 * @param {Object} 会员卡改变
			 */
			vipChange(val){
				console.log('选中行下把你',val)
				this.cur=-1
				this.getList(val.name.customerMemberCardId)
				this.cur2=val.index
			},
			
			
			/**
			 * tab选项改变
			 */
			tabChangess(e){
				this.cur=e
				let arr1=[]
				let arr2=[]
				let arr3=[]
				let arr4=[]
				let options1=[]
				let options2=[]
				let options3=[]
				let options4=[]
				// 特殊优惠项目--服务
				this.otherVipList.specialService.map(item => {
					item.vips=item.goodsComeVipId+1
				})
				arr1=this.otherVipList.specialService
				// 特殊优惠项目--商品
				this.otherVipList.specialGoods.map(item => {
					item.vips=item.goodsComeVipId+2
				})
				arr2 = this.otherVipList.specialGoods
				// 赠送--服务
				this.otherVipList.freeService.map(item => {
					item.vips=item.goodsComeVipId+3
				})
				arr3 = this.otherVipList.freeService
				// 赠送--商品
				this.otherVipList.freeGoods.map(item => {
					item.vips=item.goodsComeVipId+4
				})
				arr4 = this.otherVipList.freeGoods
				// 特殊优惠--服务下拉框
				options1=this.otherVipList.specialServiceClass
				// 特殊优惠--商品下拉框
				options2 = this.otherVipList.specialGoodsClass
				// 赠送--服务 下拉框
				options3 = this.otherVipList.freeServiceClass
				// 赠送--商品 下拉框
				options4 = this.otherVipList.freeGoodsClass
				
				if(e==0){
					arr1.map(item => {
						item.choose='特殊优惠项目--服务'
					})
					this.list = arr1
					this.options=options1
					this.listType='specialService'
				}else if(e==1){
					arr2.map(item => {
						item.choose='特殊优惠项目--商品'
					})
					this.list = arr2
					this.options=options2
					this.listType='specialGoods'
				}else if(e == 2){
					arr3.map(item => {
						item.choose='赠送--服务'
					})
					this.list = arr3
					this.options=options3
					this.listType='freeService'
				}else if(e == 3){
					arr1.map(item => {
						item.choose='赠送--商品'
					})
					this.list = arr4
					this.options=options4
					this.listType='freeGoods'
				}
				
			},
		// 勾选的选项
		selectChange(val){
			console.log('勾选的val',val)
			this.chooseList=val
		},


optionsChange(val){
	console.log('’=选择的下拉框',val)
	let arr1=[]
	let arr2=[]
	let arr3=[]
	let arr4=[]
	if(this.listType=='specialService'){
		this.otherVipList.specialService.map(item => {
			if(item.twoCategoryName == val){
				arr1.push(item)
			}
		})
		this.list = arr1
	}else if(this.listType=='specialGoods'){
		this.otherVipList.specialGoods.map(item => {
			if(item.twoCategoryName == val){
				arr2.push(item)
			}
		})
		this.list = arr2
	}else if(this.otherVipList.freeService){
		this.otherVipList.freeService.map(item => {
			if(item.twoCategoryName == val){
				arr3.push(item)
			}
		})
		this.list = arr3
	}else if(this.otherVipList.freeGoods){
		this.otherVipList.freeGoods.map(item => {
			if(item.twoCategoryName == val){
				arr4.push(item)
			}
		})
		this.list = arr4
	}
},



	// 去重
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
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
	ul p{
		/* clear: both; */
		list-style: none;
		float: left;
		width:400px;height:30px;
		background:#f2f2f2 ;
		line-height: 30px;
		margin-right:5px;
		color:rgba(51,51,51,0.65)
	}
.tabs .active{
	background: #fff;
	border-bottom: 2px solid rgb(24, 144, 255);
	color: rgb(24, 144, 255);
}
.active2{
	background:#169BD5  !important;
}
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
	color: #fff;
	background-color: #409EFF;
	font-size: 14px;
}
</style>
