<!-- 营销管理 -->
<template>
	<div class='resStatistical' >
		<div style=" margin-left: 120px;"><h2 style="text-align: left;">营销管理/优惠券设置</h2></div>
		<div style="width: 100%; margin-bottom: 40px;"><hr /></div>
		<el-tabs style="padding-left: 20px;padding-right: 20px" v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="效果统计" name="first">
				<resStatistical></resStatistical>
			</el-tab-pane>
			<el-tab-pane label="发放优惠券" name="second">配置管理</el-tab-pane>
			<el-tab-pane label="设置活动券" name="third">角色管理</el-tab-pane>
			<el-tab-pane label="一体机优惠券管理" name="fourth">定时任务补偿</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import resStatistical from './resStatistical.vue';
	export default {
		components: {
		// 效果统计
		resStatistical,
		},
		data () {
			return {
			activeName: 'first'
			};
		},
		computed: {

		},
		methods: {
		 handleClick(tab, event) {
		        console.log(tab, event);
		      }
		},
mounted() {

},
created() {}, //生命周期 - 创建之后
	}
</script>

<style scoped>

</style>