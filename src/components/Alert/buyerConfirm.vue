<!-- 挂账确认 -->
<template>
	<div class=''>
		<el-dialog title="挂账确认" center="" :visible.sync="buyerAlert" width="30%" :show-close='false'>
			<div>操作挂账后，工单中的内容不可修改，确定要对[{{carNumber}}]操作挂账么？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="buyerConfirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {

		},
			props:{
				buyerAlert:{
				type:Boolean,
				},
				carNumber:{
					type:String
				},
				},
		data () {
			return {
			};
		},
		computed: {

		},
		methods: {
			
			// 取消按钮
			close(){
				this.$emit('closeBuyerAlert')
			},
			// 确认按钮
		buyerConfirm(){
			console.log('确认挂账')
			this.$emit('buyerConfirm')
		}
		},
mounted() {

},
created() {}, //生命周期 - 创建之后
	}
</script>

<style scoped>
/deep/ .el-dialog__header{
	background:#409eff!important
}
/deep/ .el-dialog{
	border-radius: 24px;
}
/deep/.el-dialog__title,
	    .el-dialog__close {
	      color: #fff!important;
				font-size: 18px;
	    }
</style>