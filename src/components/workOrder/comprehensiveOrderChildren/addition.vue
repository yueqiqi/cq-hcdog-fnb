<!-- 添加附加费用 -->
<template>
	<div class=''>
		<el-dialog @close='close' title="附加费用" :close-on-click-modal='false' center="" :visible.sync="isShowAddition" width="40%">
			<el-input v-model="add" maxlength='10' placeholder='请输入附加费类别,不超过10字'>
				<el-button slot="append" @click='adds' type='primary' style="background: #409eff;color:#fff;border-top-left-radius: 0;border-bottom-left-radius: 0;border:1px solid #409eff">添 加</el-button>
			</el-input>
			<div class="d-flex" style="align-items: center;">
				<h3>附加费列表</h3>
				<span style="color: #b2baca;">(最多创建10个,当前总计: <span style="color: #fea022;">{{addlists.length}}个</span>)</span>
			</div>
			<el-table :header-cell-style="{color:'#333',fontSize:'14px',fontWeight:900,background:'#f1f4f5'}" :data="addlists">
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column prop="name" width="300" label="附加费名称">
					<template slot-scope="scope">
						<div v-if="scope.row.showSet">{{scope.row.name}}</div>
						<el-input v-if="!scope.row.showSet" v-model='scope.row.name'></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="操作">
					<template slot-scope="scope">
						<el-button v-if="scope.row.showSet==true" type='text' @click='set(scope.$index, scope.row)'>编辑</el-button>
						<el-button v-if="!scope.row.showSet" type='text' @click='save(scope.$index, scope.row)'>保存</el-button>
						<el-button type='text' @click='del(scope.$index, addlists)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {

		},
		props:{
			isShowAddition:Boolean,
			addlists:Array
		},
		data () {
			return {
				all:'3',
				add:'',
			};
		},
		computed: {
		},
		methods: {
			
			
			
			// 编辑
			set(index,row){
				console.log('编辑',row)
				row.showSet=false
				row.showSave=true
				this.$set(this.$props.addlists,index,row)
			},
			// 保存
			save(index,row){
				row.showSet=true
				row.showSave=false
				this.$http.get('/laborSynthesize/editAdditional',{
					merchantCode:this.merchantCode,
					name:row.name,
					id:row.id
				})
				.then(res=>{
					 console.log('%c请求结果','color:red;font-size:20px',res)
					 if(res.code == '10000'){
							this.$set(this.$props.addlists,index,row)
					}else{
						 alert(res.message)
				}
				})
			},
			// 删除
			del(index,row){
				this.$http.get('/laborSynthesize/deleteAdditional',{
					merchantCode:this.merchantCode,
					name:row[index].name,
					id:row[index].id
				})
				.then(res=>{
					 console.log('%c请求删除结果','color:red;font-size:20px',res)
					 if(res.code == '10000'){		
						row.splice(index,1)
					}else{
						 alert(res.message)
				}
				})
			},
			
			
			getlists(){
				this.$http.get('/laborSynthesize/getAdditional',{
					merchantCode:this.merchantCode
				})
				.then(res=>{
					 if(res.code == '10000'){
					this.lists=res.data
						 res.data.map(item => {
							 item.showSet=true
							 item.showSave=false
						 })
					this.addlists=res.data
					console.log('打开的弹框',this.addlists)
					}else{
						 alert(res.message)
				}
				})
			},
			
			
		adds(){
			
			if(this.add!=''){
			this.$http.get('/laborSynthesize/addAdditional',{
				name:this.add,
				merchantCode:this.merchantCode
			})
			.then(res=>{
				 console.log('%c请求结果','color:red;font-size:20px',res)
				 if(res.code == '10000'){
					// this.addlists.push({name:this.add,showSet:true,showSave:false})
					this.getlists()
					this.add=''
					
				}else{
					 alert(res.message)
			}
			})
			}else{
				alert('请输入附加费类别')
			}
		},
		
		close(){
			this.$emit('close',this.addlists)
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
/deep/ .el-dialog__header{
	background:#409eff!important
}
/deep/ .el-dialog{
	border-radius: 15px;
}
/deep/.el-dialog__close {
	      color: #fff!important;
	    }
/deep/ .el-dialog__title{
	color:#fff;
	/* font-weight: bold; */
	font-size: 18px;
}
</style>