<!-- 完工确认 -->
<template>
	<div class='completeConfirm'>
		<el-dialog title="完工确认" :close-on-click-modal='false' center="" :visible.sync="isShowFinish" width="30%" :show-close='false'>
			<el-input v-model="tel" placeholder="请输入需要通知的手机号" @change='inputTel'></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="noSend">不发送短信提醒</el-button>
				<el-button type="danger" @click="comConfirm" :disabled='dis'>发送短信提醒</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		components: {

		},
		props:{
			isShowFinish:{
			type:Boolean,
			},
			},
		data () {
			return {
				status:null,
				completeConfirm:true,
				tel:'',
				dis:true,
			};
		},
		computed: {

		},
		methods: {
			/**
			 * 手机号验证
			 */
			inputTel(val){
				let reg = /^1[3|4|5|7|8][0-9]\d{8}$/
				if(reg.test(val)){
					this.dis=false
				}else{
					this.$message.error('请输入正确的手机号')
					this.tel=''
					this.dis=true
				}
			},
			
			// 取消按钮
				close(){
					this.$emit('closeCompAlert')
				},
				
	// 不发送短信
			noSend(){
				this.$emit('noSend',this.status)
			},
			
			// 发送短信
		comConfirm(){
			this.$emit('compConfirm',this.status,this.tel)
		}
		},
mounted() {

},
created() {
	this.merchantCode=this.$route.query.merchantCode
}, //生命周期 - 创建之后
	}
</script>

<style scoped>
/deep/ .el-dialog__header{
	background:#169bd5!important
}
/deep/ .el-dialog{
	border-radius: 24px;
}
/deep/ .el-dialog__title{
	color:#fff;
	font-weight: bold;
	font-size: 20px;
}
</style>