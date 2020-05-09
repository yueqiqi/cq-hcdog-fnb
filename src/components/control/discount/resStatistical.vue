<!-- 效果统计 -->
<template>
	<div class='resStatistical'>
		<div class="header">
			
			
			<el-row style="text-align: center;">
			  <el-col :span="6">
					<div class="grid-content bg-purple">
						<div>领取次数</div>
						<div>{{getNum}}次</div>
					</div>
				</el-col>
			  <el-col :span="6">
			  	<div class="grid-content bg-purple">
			  		<div>使用数</div>
			  		<div>{{useNum}}次</div>
			  	</div>
			  </el-col>
			  <el-col :span="6">
			  	<div class="grid-content bg-purple">
			  		<div>拉新效果</div>
			  		<div>{{pullNew}}人</div>
			  	</div>
			  </el-col>
			  <el-col :span="6">
			  	<div class="grid-content bg-purple">
			  		<div>收益效果</div>
			  		<div>{{getMoney}}元</div>
			  	</div>
			  </el-col>
			</el-row>
			
			
			
		<!-- 	<div>
				<div>领取次数</div>
				<div>{{getNum}}次</div>
			</div>
			<div>
				<div>使用数</div>
				<div>{{useNum}}次</div>
			</div>
			<div>
				<div>拉新效果</div>
				<div>{{pullNew}}人</div>
			</div>
			<div>
				<div>收益效果</div>
				<div>{{getMoney}}元</div>
			</div> -->

		</div>
		
		<div class="body"></div>
		
		<div class="footer"></div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data () {
			return {
			// 收益效果
			getMoney:'0',
			// 拉新效果
			pullNew:'5',
			// 使用数
			useNum:'0',
			// 领取次数
			getNum:'7',
			};
		},
		computed: {

		},
		methods: {

		},
mounted() {

},
created() {}, //生命周期 - 创建之后
	}
</script>

<style scoped>
.header{
	height: 202px;
	border:1px solid #666666;
}
</style>