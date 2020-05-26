<!-- 支付弹窗 -->
<template>
	<div class='hint'>
		<el-dialog center :close-on-click-modal='false' title="提示" center :before-close="close" :visible.sync="notice" width="25%">
			<div style="text-align: center;">
				<h3>您选择了线下支付方式，请确认已收到客户钱款后再确认完成支付</h3>
				<div class="d-flex" style="align-items: center;">
				<div>结算时间：</div>
				<div style="width: 70%;height: 30px;background:#f2f2f2 ;line-height: 30px;border-radius: 10px;">{{date}}</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-row>
					<el-col :span="12"><div style="border-right: 0.5px solid #bcbcbc;"><el-button type='text' style="color: #999;font-weight: bold;" @click="close">未收到钱款</el-button></div></el-col>
					<el-col :span="12"><div style="border-left: 0.5px solid #bcbcbc;"><el-button type="text" style="color: #0000FF;font-weight: bold;" :disabled="onceClick" @click="confirm">已收款，确认</el-button></div></el-col>
				</el-row>
			    
			    
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {

		},
		props:{
			notice:Boolean,
			onceClick:Boolean
		},
		data () {
			return {
				date:'2019-10-31 10:00:00',
				hintShow:true
			};
		},
		computed: {

		},
		methods: {
			//收到
			confirm(){
				this.$emit('rec')
			},
			//未收到
			close(){
				this.$emit('unrec')
			},
		},
mounted() {

},
created() {
	var mydate = new Date();
	var onedate = mydate.toLocaleString('chinese', { hour12: false }); 
	this.date=onedate.replace(/\//g, '-')
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
.hint /deep/ .el-dialog__header{
	background:#169bd5!important
}
.hint /deep/ .el-dialog{
	/* border-radius: 24px; */
}
.hint /deep/ .el-dialog__title{
	color:#fff;
	font-weight: bold;
	font-size: 20px;
}
.hint /deep/ .el-dialog__headerbtn .el-dialog__close {
	color: #fff;
}
h2{
	color: #ff0000;
}
.hint /deep/ .el-dialog__footer{
	padding: 0;
	border-top:1px solid #bcbcbc;
	margin-top: 15px;
}
</style>