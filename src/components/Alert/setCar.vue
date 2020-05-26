<!-- 编辑车辆弹窗 -->
<template>
	<div class='setCar'>
		<el-dialog :close-on-click-modal='false' title="编辑车辆" center :visible.sync="setCarshow" width="30%" :show-close='false'>
			<div class="d-flex">
				  <!-- <el-select size="" v-model="carAbb" placeholder="无">
				    <el-option
				      v-for="item in carAbbs"
				      :key="item"
				      :label="item"
				      :value="item">
				    </el-option>
				  </el-select>
					<el-input v-model="carNum" placeholder="请输入车牌号"></el-input> -->
					<carNum v-model='plateNumber' style='width:100%'></carNum>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="carConfirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import carNum from './province.vue'
	export default {
		name: 'setCar',
		components: {
		carNum
		},
		// props:['setCarshow'],
		props:{
			setCarshow:{
			type:Boolean,
			}
		},
		data () {
			return {
				// setCarshows:this.$props[0],
				carAbb:'',
				carAbbs:['京', '湘', '津', '鄂', '沪', '粤', '渝', '琼', '翼', '川', '晋', '贵', '辽', '云', '吉', '陕', '黑', '甘', '苏', '青', '浙', '皖', '藏', '闽', '蒙', '赣', '桂', '鲁', '宁', '豫', '新'],
			setCar:true,
			carNum:'',
			plateNumber:'',
			};
		},
		computed: {

		},
		methods: {
			close(){
				this.$emit('closeCarAlert',this.$props.setCarshow,)
			},
			carConfirm(){
				// console.log(this.carAbb+this.carNum)
				// console.log('9876',this.$props.setCarshow)
				this.$emit('carConfirm',this.$props.setCarshow,this.plateNumber)
			}
		},
mounted() {
// console.log('1231243',this.setCarshows)
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
/deep/ .el-select .el-input__inner{
	width: 60px;
}
/deep/ .el-dialog__title{
	color:#fff;
	/* font-weight: bold; */
	font-size: 18px;
	
}
</style>