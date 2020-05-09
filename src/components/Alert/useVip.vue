<!-- 使用他人会员卡 -->
<template>
	<div class='useVip'>
		<el-dialog :close-on-click-modal='false' title="使用他人会员卡" center="" :visible.sync="usevip" width="30%" :show-close='false'>
			<div>
				<!-- <el-autocomplete style="width:100%"
				popper-class="my-autocomplete"
				  v-model="state"
					:clearable="true"
				  :fetch-suggestions="querySearch"
				  placeholder="请输入客户姓名、手机号、车牌号进行搜索"
				  @select="handleSelect">
				  <template slot-scope="{ item }">
						<el-row>
							<el-col :span='8'>{{item.cName}}</el-col>
							<el-col :span='8' >{{item.phone}}</el-col>
							<el-col :span='8'>{{item.carNum}}</el-col>
						</el-row>
				  </template>
				</el-autocomplete> -->
				<el-input placeholder="请输入客户姓名、手机号进行搜索" suffix-icon="el-icon-search" v-model="state" size="mini" @input='changeInput'></el-input>
				
				<el-table
				      :data="tableData"
				      style="width: 100%;background:#F2F2F2" v-show="showData"
							@row-click='rowClick'
							>
				      <el-table-column
				        prop="name"
				        label="客户姓名"
				        align="center"
								>
				      </el-table-column>
				      <el-table-column
				        prop="phone"
				        label="手机号"
								align="center"
				        >
				      </el-table-column>
				      <!-- <el-table-column
				        prop="plateNum"
				        label="车牌号"
								align="center"
								>
				      </el-table-column> -->
				    </el-table>
				
				
				<!-- <li class="content-box" v-for="(list,index) in filterData" :key="index" :title="list.comboName" :class="{active_jy:changeBlue == index}" @click="changeColor(list,index)">
				   <span>{{list.comboName}}</span>
				</li> -->
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="carConfirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props:{
			usevip:{
				type:Boolean,
			},
			vehicleId:String
		},
		components: {
				
		},
		data () {
			return {
				showData:false,
				// useVip:true,
				restaurants: [],
				state: '',
				tableData:[],
			};
		},
		computed: {

		},
		methods: {
			/**
			 * 表格点击
			 */
			rowClick(row){
				console.log('%c点击的行','color:#70ff57;font-size:20px;font-weight:bold',row)
				this.state=row.name+'/'+row.phone
				this.condition=row.customerCode
				this.showData=false
			},
			
			/**
			 * 模糊搜索
			 */
			changeInput(){
					this.$http.get('/LaborFastOrder/searchCustomer',{
						merchantCode:this.merchantCode,
						vehicleId:this.$props.vehicleId,
						keyWords:this.state,
					})
					.then(res=>{
						 console.log('%c请求模糊搜索结果','color:red;font-size:20px',res)
						 if(res.code == '10000'){
								this.showData=true
								this.tableData=res.data
						}else{
							alert(res.message)
					}
					})
				
			},
			
			
			
			close(){
				this.$emit('closeVipAlert',this.$props.usevip)
			},
			
			carConfirm(){
				this.$emit('vipConfirm',this.condition,this.state)
			
			},
			
			
			
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.cName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)||
					(restaurant.phone.toLowerCase().indexOf(queryString.toLowerCase()) === 0)||
					(restaurant.carNum.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },					
		handleSelect(item) {
			        console.log('点击',item);
							this.state=item.cName+'/'+item.phone+'/'+item.carNum
							this.otherName=item.cName
							this.otherPhone=item.phone
							this.otherCar=item.carNum
			      },
			handleIconClick(ev) {
				console.log('bi',ev);
			},
						
			loadAll(){
				return[
					{'cName':'张三','phone':'155280324555',carNum:'川Q1293'},
					{'cName':'李四','phone':'12320324555',carNum:'川A12333'},
					{'cName':'王麻子','phone':'15120324555',carNum:'川M18273'},
				]
			},
		},
mounted() {
 this.restaurants = this.loadAll();;
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
	border-radius: 24px;
}
/deep/ .el-dialog__title{
	color:#fff;
	/* font-weight: bold; */
	font-size: 18px;
	
}
</style>