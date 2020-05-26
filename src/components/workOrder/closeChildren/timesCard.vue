<!-- 维修/保养项目(配件)--有会员卡 -->
<template>
	<div class='noVip'>
		<el-dialog :visible.sync="timersCardShow" width="1000px" :close-on-click-modal='false' :show-close='false'>
			<div style="padding: 15px; background: #999999;">
				<el-row>
				<el-col :span="7" class="server" style="font-weight: bold;color: #fff;font-size: 18px;">服务名称</el-col>
				<el-col :span="3" style="font-weight: bold;color: #fff;font-size: 18px;" class="product">品牌</el-col>
				<el-col :span="3" style="font-weight: bold;color: #fff;font-size: 18px;" class="product">规格</el-col>
				<el-col :span="4" style="font-weight: bold;color: #fff;font-size: 18px;" class="product">数量</el-col>
				<el-col :span="4" style="font-weight: bold;font-size: 18px;color: #fff;" class="checked">售价</el-col>
				</el-row>
			</div>
			
			<div class="col">
				<el-row>
					<el-col :span="19">
						<el-table  :data="serverList"  @expand-change="toggleRowExpansion" :show-header="false"  >
							<el-table-column type="expand" @click='showSecond(scope.$index)'>
								<template slot-scope="props">
									<el-table :data='secondList' @selection-change="serverChecked" :show-header="false">
										<el-table-column align="right" type="selection"></el-table-column>
										<el-table-column width="400">
											<template slot-scope="scope">
												<span>{{scope.row.type==1?'储值卡':'次卡'}}</span>
												<span style="margin-left: 20px;">{{scope.row.title}}</span>
												<span style="margin-right: 10px;">{{scope.row.price}}</span>
												<span v-if="scope.row.surplus>0">余次{{scope.row.surplus}}</span>
												<span v-if="scope.row.surplus==0">余额:{{scope.row.balance}}</span>
											</template>
										</el-table-column>
										
										<el-table-column align="right">
											<template slot-scope="scope">
												<el-input-number v-model="scope.row.num" :min="1" :max="10" label="" size="mini"></el-input-number>
											</template>
										</el-table-column>
										
										<el-table-column align="right">
											<template slot-scope="scope">
												<div class="d-flex" style="justify-content: center;">
												<div>¥{{scope.row.price}}</div>
												<div v-if="scope.row.num!=''" style="width: 35px;margin-left: 5px;border-radius: 7px;text-align: center;line-height: 20px;height: 20px;background:#169BD5 ;color: #fff;">{{scope.row.num}}折</div>
												</div>
											</template>
										</el-table-column>
									</el-table>
								</template>
							</el-table-column>
							<el-table-column  width= "170" prop="title"></el-table-column>
							<el-table-column  width= "" prop="title"></el-table-column>
							<el-table-column  width= "" prop="title"></el-table-column>
							<el-table-column  width= "" prop="type"></el-table-column>
							<el-table-column align="center"  prop="price">
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
									<el-submenu :index="item.title" >
										<template slot="title">
											<span>{{item.title}}</span>
										</template>
										<el-menu-item-group v-for="(list,idx) in item.sLev" :key='idx'>
											<el-menu-item @click='handleClassify' :index="list">{{list}}</el-menu-item>
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
			timersCardShow:Boolean,
		},
		
		data () {
			return {
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
// 搜索框弹窗一二级数据
			searchList:[
				{
					title:'洗车美容',
					sLev:['洗车','打蜡','镀膜','底盘清洁护理']
				},
				{
					title:'装潢改装',
					sLev:['玻璃贴膜',],
				},
				{
					title:'保养养护',
					sLev:['常规保养','发动机系统','发动机清理','底盘清洁护理']
				},
				{
					title:'洗车美容',
					sLev:['洗车','打蜡','镀膜','底盘清洁护理']
				}
			],
			};
		},
		computed: {

		},
		methods: {
			
			
			//手风琴下拉
			toggleRowExpansion(row){
				console.log('1928781924',row)
			  this.secondList=[{type:1,title:'会员卡',price:'300',balance:'30',surplus:'0',num:''},{type:2,title:'洗车卡',price:'200',balance:'0',surplus:'7',num:'3'}],
				this.secondList2=[{type:1,title:'会员卡',price:'300',balance:'30',surplus:'0',num:'10'}]
			},
			/**
			 * 最后确认按钮
			 */
			confirm(){
				// console.log(this.serverSelected)
				// console.log(this.checkList)
				this.$emit('confirmTimers')
			},
			// 取消按钮
			close(){
				this.$emit('closeTimers')
			},
			// 数状展示
			showSecond(index){
				console.log('1231223')
				console.log('展示',index)
			},
/**
		 * 搜索框弹窗
		 */
		// 勾选商品
		serverChecked(e){
			console.log('勾选选项',e)
			this.checkList=e
			// this.serverSelected=e
		},
		// 选中二级分类
		handleClassify(e){
			console.log('二级分类',e)
			this.serverList=[
				{title:'手工清洗外观(5座)',type:'洗车/精洗',price:23,},
				{title:'普通洗车(SUV及7座)',type:'洗车/精洗',price:21}]
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
created() {}, //生命周期 - 创建之后
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
</style>