<!-- 维修/保养项目(配件)--无会员卡 -->
<template>
	<div class='noVip'>
		<el-dialog :visible.sync="pnvIsShow" width="800px" :close-on-click-modal='false' :show-close='false'>
			<div style="padding: 15px; background: #409eff;">
				<el-row>
				<el-col :span="7" class="server" style="font-weight: bold;color: black;font-size: 18px;">服务名称</el-col>
				<el-col :span="3" style="font-weight: bold;color: black;font-size: 18px;" class="product">品牌</el-col>
				<el-col :span="3" style="font-weight: bold;color: black;font-size: 18px;" class="product">规格</el-col>
				<el-col :span="4" style="font-weight: bold;color: black;font-size: 18px;" class="product">当前库存</el-col>
				<el-col :span="4" style="font-weight: bold;font-size: 18px;color: black;" class="checked">售价</el-col>
				</el-row>
			</div>
			
			<div class="col">
				<el-row>
					<el-col :span="19">
						<el-table  ref="multipleTable"  :show-header="false" :data="serverList" @selection-change='serverChecked'  :row-key="getRowKeys" height="400">
							<el-table-column width="30" type="selection" :reserve-selection="true"></el-table-column>
							<el-table-column width= "200" prop="goodsName"></el-table-column>
							<el-table-column width= "" prop="title">
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
							<el-table-column align="center" prop="price">
								<template slot-scope="scope">
									¥{{scope.row.price}}
								</template>
							</el-table-column>
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
											<el-menu-item @click='handleClassify(list)' :index="list.mapList">{{list.name}}</el-menu-item>
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
		props:{
			pnvIsShow:Boolean,
			searchList:Array
		},
		data () {
			return {
				getRowKeys(row) {
				    return row.goodsCode;
				},
				// 是否显示弹窗
				searchShow:true,
				serverSelected:[],
				// 二级分类显示数组
				serverList:[],
			};
		},
		computed: {

		},
		methods: {
			/**
			 * 最后确认按钮
			 */
			confirm(){
				this.$emit('sendPnv',this.serverSelected)
			},
			close(){
				this.$emit('closePnv')
			},
			
/**
		 * 搜索框弹窗
		 */
		// 勾选商品
		serverChecked(e){
			console.log('勾选选项',e)
			this.serverSelected=e
		},
		// 选中二级分类
		handleClassify(e){
			console.log('二级分类',e)
			this.getThree(e.code,'3')
		},
		
		
		
		
		
		
		// 获取三级列表
		getThree(categoryCode,level){
			this.$http.get('/LaborGoods/findGoodsInfo',{
				merchantCode:this.merchantCode,
				categoryCode,
				level
			})
			.then(res=>{
				 console.log('请求弹窗树三级结果',res)
				 if(res.code == '10000'){
					 res.data.map(item=>{
						 item.goodsCome=3
						 item.goodsCount=1
					 })
					this.serverList=res.data
				}
			})
		},
		// 打开二级列表
		handleOpen(e){
		},
		// 关闭二级列表
		handleClose(e){
		},
		},
mounted() {

},
created() {
	this.merchantCode=this.$route.query.merchantCode
	this.$bus.$on('dl',(val)=>{
	var that=this
				this.$refs.multipleTable.toggleRowSelection(val,false)
	})
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
</style>