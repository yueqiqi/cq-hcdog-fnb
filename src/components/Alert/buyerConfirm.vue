<!-- 挂账确认 -->
<template>
	<!-- <div class=''>
		<el-dialog title="挂账确认" center="" :visible.sync="buyerAlert" width="30%" :show-close='false'>
			<div>操作挂账后，工单中的内容不可修改，确定要对[{{carNumber}}]操作挂账么？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="buyerConfirm">确 定</el-button>
			</span>
		</el-dialog>
	</div> -->
	<div>
	    <!-- 挂账弹窗 -->
	    <!-- <el-button type="text" @click="dialog1 = true">挂账弹窗</el-button> -->
	    <el-dialog :visible.sync="buyerAlert" width="40%" title="挂账" center :close-on-click-modal="false" :before-close="handleDialogClose">
	      <div class="dialogContent">
	        <div class="dialogContentTop">
	          <span class="label">挂账选择</span>
	          <span class="labelDetail">请选择车牌号【{{carNumber}}】挂账类型</span>
	        </div>
	        <div class="dialogContentMiddle">
	          <div class="Item">
	            <el-radio v-model="radio" label="1" @change='radioChange'>单位挂账</el-radio>
	            <div style="display:inline" v-show="radio == 1">
	              <el-select v-model="unitValue" placeholder="请选择挂账单位" @focus='getComponys'>
	                <el-option
	                  v-for="item in options"
	                  :key="item.value"
	                  :label="item.label"
	                  :value="item"
	                >
	                </el-option>
	              </el-select>
	              <span class="handleBtn" @click="createUnit">新建挂账单位</span>
	            </div>
	          </div>
	          <div class="Item">
	            <el-radio v-model="radio" label="2" @change='radioChange'>个人挂账</el-radio>
	            <div style="display:inline" v-show="radio == 2">
	              <!-- <el-input placeholder="请输入手机号" v-model="phone">
	                <i slot="suffix" class="el-input__icon el-icon-search"></i>
	              </el-input> -->
								<el-select v-model="unitValue2" placeholder="请选择个人挂账用户" @focus="getPersonage">
								  <el-option
								    v-for="item in options2"
								    :key="item.value"
								    :label="item.label"
								    :value="item"
								  >
								  </el-option>
								</el-select>
	              <span class="handleBtn" @click="addPer">新建客户</span>
	            </div>
	          </div>
	          <div class="Item">
	            <span>预计结算日期：</span>
	            <el-date-picker
	              v-model="chooseDate"
	              type="date"
	              placeholder="选择日期"
	              class="chooseDate"
								format='yyyy-MM-dd'
								value-format='yyyy-MM-dd'
	            >
	            </el-date-picker>
	          </div>
	          <div class="SMSAlert">
	            短信提醒
	          </div>
	          <div class="Item">
	            <span class="openSMS">开启短信提醒：</span>
	            <el-radio v-model="SMS" label="1">是</el-radio>
	            <el-radio v-model="SMS" label="0">否</el-radio>
	          </div>
	          <div class="SMSTip">
	            短信提醒选择开启，会在预计结算日期当天上午09:00发送挂账待结算短信给车主
	          </div>
	        </div>
					<div  class="Item">
						<span style="vertical-align: top">短信提醒内容：</span>
						<div class="textarea">
							{{msg}}
						</div>
					</div>
	        <!-- <div class="Item" v-show="radio==1">
	          <span style="vertical-align: top">短信提醒内容：</span>
	          <div class="textarea">
	            <el-input
	              type="textarea"
	              :rows="2"
	              placeholder="请输入内容"
	              v-model="textarea"
	            >
	            </el-input>
	          </div>
	        </div> -->
	      </div>
	      <span slot="footer" class="dialog-footer">
	        <el-button @click="close">取 消</el-button>
	        <el-button type="primary" @click="buyerConfirm">确 定</el-button>
	      </span>
	    </el-dialog>
	    <!--新建挂账单位-->
	    <el-dialog title="新增挂账单位" :visible.sync="dialog2" width="40%" center :close-on-click-modal='false'>
	      <div class="createNewUnit">
	        <div>
	          <div class="label">*挂账单位名称</div>
	          <el-input v-model="newUnit.name" placeholder="请输入挂账单位名称"></el-input>
	        </div>
	        <div>
	          <div class="label">*联系人</div>
	          <el-input v-model="newUnit.people" placeholder="请输入单位联系人"></el-input>
	        </div>
	        <div>
	          <div class="label">*手机号</div>
	          <el-input v-model="newUnit.telphone" placeholder="请输入单位手机号"></el-input>
	        </div>
	        <div>
	          <div class="label">单位地址</div>
	          <el-input v-model="newUnit.address" placeholder="请输入单位地址"></el-input>
	        </div>
	        <div>
	          <div class="label">备注</div>
	          <el-input v-model="newUnit.remark" placeholder="请输入备注信息"></el-input>
	        </div>
	      </div>
	      <span slot="footer" class="dialog-footer">
	        <el-button @click="dialog2 = false">返回上一步</el-button>
	        <el-button type="primary" @click="newCompany">保 存</el-button>
	      </span>
	    </el-dialog>
			<newSelf ref='newSelf' :carNumber='carNumber' ></newSelf>
	  </div>
</template>

<script>
	import newSelf from './newSelf.vue'
	export default {
		components: {
			newSelf
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
				company:[],
				personage:[],
				msg:'',
				merchantCode:'',
				      dialog1: false, //挂账弹窗控制显示
				      dialog2: false, //新建挂账单位弹窗控制显示
				      radio: "1", //单位挂账1   个人挂账2  课更改为对应类型Id
				      SMS: "0", //短信提醒    是1 否0
				      chooseDate: "", //选择的日期
				      phone: "", //个人挂账的电话
				      textarea: "", //短信提示内容
				      unitValue: "", //选择的单位
				      unitValue2: "", //选择的单位
				      newUnit:{      //创建新单位的数据
				          name:'',
				          people:'',
				          telphone:'',
				          address:'',
				          remark:''
				      }
			};
		},
		computed: {
			options(){
				this.company.map(val => {
					val.value=val.id
					val.label=val.name
				})
				return this.company
			},
			options2(){
				this.personage.map(val => {
					val.value=val.code
					val.label=val.name+'/'+val.phone
				})
				return this.personage
			},
		},
		methods: {
			getComponys(){
				this.$http.get('/onAccount/onAccountList_T',{
					merChantCode:this.$route.query.merchantCode,
					pageNum:1,
					pageSize:999,
					name:'',
					vehicleCode:this.carNumber
				}).then(res => {
					this.company=res.data
				})
			},
			getPersonage(){//获取挂账人
				this.$http.get('/onAccount/getUserOnAccountList',{
					merchantCode:this.$route.query.merchantCode,
					plateNum:this.carNumber,
					condition:'',
				}).then(res => {
					this.personage=res.data
				})
			},
			handleDialogClose(){
				this.$parent.buyerAlert=false
			},
			addPer(){
				this.$refs.newSelf.dialogVisible=true
			},
			newCompany(){//新建挂账单位
			let params = {
				merchantCode:this.$route.query.merchantCode,
				name:this.newUnit.name,
				contactPerson:this.newUnit.people,
				contactPhone:this.newUnit.telphone,
				address:this.newUnit.address,
				remark:this.newUnit.remark,
				vehicleCode:this.carNumber,
				id:'',
			}
				this.$http.post('/onAccount/onAccount',params).then(res => {
					if(res.code='10000'){
						this.dialog2  = false
					}else{
						alert(res.message)
					}
				})
			},
			radioChange(val){
				console.log(val)
				if(val==2){
					this.unitValue=''
				}else{
					this.unitValue2=''
				}
				this.getMsg()
			},
			//新建挂账单位
			    createUnit() {
			      this.dialog2 = true;
			    },
			// 取消按钮
			close(){
				this.$emit('closeBuyerAlert')
			},
			getMsg(){
				this.$http.get('/system/getOnAcountSMSMessage',{
					merchantCode:this.$route.query.merchantCode,
					plateNumber:this.carNumber,
					onAccountType:this.radio==1?'2':'1'//挂账类型（1-个人、2-单位）
				}).then(res=>{
					this.msg=res.data
				})
			},
			// 确认按钮
		buyerConfirm(){
			let val = {
				onAccountType:this.radio==1?'2':'1',//挂账类型(挂账类型 1:单位 2:个人)
				onAccountId:this.radio==1?this.unitValue.id:this.unitValue2.code,//挂账单位id
				toPhone:this.radio==1?this.unitValue.contactPhone:this.unitValue2,//发送的手机号
				estimateBlanceTime:this.chooseDate,//预计结算时间
				flag:this.SMS,//是否发送短信
			}
			this.$emit('buyerConfirm',val)
			setTimeout(()=> {
				this.radio= "1", //单位挂账1   个人挂账2  课更改为对应类型Id
				this.SMS= "0", //短信提醒    是1 否0
				this.chooseDate= "", //选择的日期
				this.unitValue2= "", //个人挂账的电话
				this.textarea= "", //短信提示内容
				this.unitValue= "", //选择的单位
				this.newUnit={      //创建新单位的数据
						name:'',
						people:'',
						telphone:'',
						address:'',
						remark:''
				}
			}, 1000);
		}
		
		},
mounted() {

},
created() {
	this.getMsg()
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
/deep/.el-dialog__title,
	    .el-dialog__close {
	      color: #fff!important;
				font-size: 18px;
	    }
			/deep/ .el-dialog__header {
			  background: rgba(22, 155, 213, 1);
			}
			/deep/.el-dialog__title {
			  color: white;
			}
			/deep/.el-dialog__headerbtn .el-dialog__close {
			  color: white;
			}
			/deep/.el-input {
			  width: unset;
			}
			.dialogContentTop {
			  margin-bottom: 10px;
			}
			.dialogContentTop .label {
			  margin-right: 20px;
			}
			.dialogContentTop .labelDetail {
			  font-size: 12px;
			}
			.dialogContentMiddle .Item {
			  line-height: 50px;
			}
			.handleBtn {
			  color: #409eff;
			  cursor: pointer;
			  margin-left: 10px;
			}
			.chooseDate {
			  margin-left: 12px;
			  width: 220px;
			}
			.SMSAlert {
			  margin-top: 30px;
			}
			.openSMS {
			  margin-right: 10px;
			}
			.SMSTip {
			  color: #b1b1b1;
			  margin: 0 0 16px 100px;
			}
			.textarea {
			  display: inline-block;
			  width: 400px;
			}
			.createNewUnit > div {
			  text-align: center;
			  padding: 5px 0;
			}
			.createNewUnit > div /deep/ .el-input__inner {
			  width: 300px;
			}
			.createNewUnit .label {
			  width: 100px;
			  display: inline-block;
			  text-align: right;
			  margin-right: 20px;
			}
</style>