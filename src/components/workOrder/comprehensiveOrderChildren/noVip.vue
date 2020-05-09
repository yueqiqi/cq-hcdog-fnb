<!-- 维修/保养项目(工时)--无会员卡 -->
<template>
	<div class='noVip'>
		<el-dialog :visible.sync="nvIsShow" width="800px" :close-on-click-modal='false' :show-close='false'>
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
						<el-table  ref="multipleTable"  :show-header="false" :data="serverList" @selection-change='serverChecked' >
							<el-table-column width="30" type="selection"></el-table-column>
							<el-table-column width= "230" prop="goodsName"></el-table-column>
							<el-table-column width= "260" prop="type"></el-table-column>
							<el-table-column prop="price">
								<template slot-scope="scope">
									¥{{scope.row.price}}
								</template>
							</el-table-column>
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
		props:{
			nvIsShow:Boolean,
			searchList:Array
		},
		data () {
			return {
				serverSelected:[],
				// 二级分类显示数组
				serverList:[],
// 搜索框弹窗一二级数据
			};
		},
		computed: {

		},
		methods: {
			/**
			 * 最后确认按钮
			 */
			confirm(){
				// console.log(this.serverSelected)
				this.$emit('sendNv',this.serverSelected)
			},
			close(){
				this.$emit('closeNv',false)
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
			this.getThree(e.code,'2')
		},
		// 打开二级列表
		handleOpen(e){
			console.log('打开二级列表',e)
		},
		// 关闭二级列表
		handleClose(e){
			console.log('关闭二级列表',e)
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
					this.serverList=res.data
				}
			})
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