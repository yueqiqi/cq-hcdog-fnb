<!-- 选择员工 -->
<template>
	<div class='chooseEmp'>
		<el-dialog :close-on-click-modal='false' center title="选择员工" :visible.sync="chooseEmp">
  <el-tabs :stretch='true' v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="选择销售" name="first">
			<el-row style="margin-left: 70px;">
				<el-checkbox-group v-model="checkList">
				<el-col style='' v-for="(item,index) in empListf" :key='index' :span="11">   
    <el-checkbox :label="item">{{item.employeeName}}</el-checkbox>
				</el-col>
				</el-checkbox-group>
			</el-row>
		</el-tab-pane>
    <el-tab-pane label="选择施工" name="second">
			<el-row style="margin-left: 70px;">
					<el-checkbox-group v-model="checkList2">
					<el-col style='' v-for="(item,index) in empLists" :key='index' :span="11">   
			<el-checkbox :label="item">{{item.employeeName}}</el-checkbox>
					</el-col>
					</el-checkbox-group>
				</el-row>
		</el-tab-pane>
  </el-tabs>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="close">取 消</el-button>
	    <el-button type="primary" @click="empConfirm">确 定</el-button>
	  </span>
	
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {

		},
		props:{
			chooseEmp:{
				type:Boolean,
			},
			empListf:{
				type:Array
			},
			empLists:{
				type:Array
			}
			
		},
		data () {
			return {
				checkList:[],
				checkList2:[],
			activeName:'first',
			// empList:['小王','小张','小李','前台','旺旺','麻辣香锅'],
			// empList2:['小李','前台','旺旺','麻辣香锅','小王','小张'],
			};
		},
		computed: {

		},
		methods: {
			// 确定按钮
			empConfirm(){
				this.$emit('empConfirm',this.checkList,this.checkList2)
				this.checkList=[]
				this.checkList2=[]
			},
			// 取消按钮
			close(){
				this.$emit('closeEmpAlert',this.$props.setCarshow,)
				this.checkList=[]
				this.checkList2=[]
			},
			handleClick(e){
				console.log(e)
			},
		},
mounted() {

},
created() {this.merchantCode=this.$route.query.merchantCode}, //生命周期 - 创建之后
	}
</script>

<style scoped>
/deep/ .el-dialog__header{
	background:#169bd5!important
}
/deep/ .el-dialog{
	border-radius: 24px;
}

</style>