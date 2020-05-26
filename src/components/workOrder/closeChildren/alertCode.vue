<!-- 二维码 -->
<template>
	<div class='code'>
		<el-dialog center :close-on-click-modal='false' :before-close="close" title="提示" center :visible.sync="codeIsShow" width="30%">
			<div style="text-align: center;">
				<h1>¥{{price}}</h1>
				<div>
					<img style="width: 200px;hieght:200px;" :src="codeImg" alt="">
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {

		},
		props:{
			codeIsShow:Boolean,
			codeImg:String,
			price:Number,
		},
		data () {
			return {
				// price:'9527',
				// codeShow:true
			};
		},
		computed: {

		},
		watch:{
			
		},
		methods: {
			close(){
				this.$emit('closeCode')
			},
		},
mounted() {

},
created() {
	
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
.code /deep/ .el-dialog__header{
	background:#409eff!important
}
.code /deep/ .el-dialog{
	/* border-radius: 24px; */
}
.code /deep/ .el-dialog__title{
	color:#fff;
	/* font-weight: bold; */
	font-size: 18px;
}
.code /deep/ .el-dialog__headerbtn .el-dialog__close {
	color: #fff;
}
h1{
	color: #ff0000;
}
</style>