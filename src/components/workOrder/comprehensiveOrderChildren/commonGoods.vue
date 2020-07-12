<!-- 常用服务商品 -->
<template>
	<div class="common">
		<div class="d-flex">
			<p class="title">常用服务商品</p>
			<el-button class="text" type="text" @click='setCommon'>设置常用服务商品</el-button>
		</div>
		<div class="d-flex">
			<div class="border-left">
				<p>服务</p>
				<p>(工时)</p>
			</div>
			<div class="border-right">
				<div v-for='(item,index) in server' :key='index'>
					<div @click="select1(item,index)" class="border" :class="item.selected?'selected':''">{{item.goodsName}}</div>
				</div>
			</div>
		</div>
		<div class="d-flex" style="margin-top: 20px;">
			<div class="border-left">
				<p>商品</p>
				<p>(配件)</p>
			</div>
			<div class="border-right">
				<div v-for='(item,index) in goods' :key='index'>
					<div @click="select2(item)" class="border" :class="item.selected?'selected':''">{{item.goodsName}}</div>
				</div>
			</div>
		</div>
		<setCommon ref='setCommon'></setCommon>
	</div>
</template>

<script>
import setCommon from './setCommon.vue'
export default {
	components: {
		setCommon
	},
	data() {
		return {
			list:[],
		};
	},
	computed:{
		goods(){
			return this.list.filter(val => {
				return val.type==2
			})||[]
		},
		server(){
			return this.list.filter(val => {
				return val.type==1
			})||[]
		},
		goodsSelected(){
			return this.goods.filter(val => {
				return val.selected==true
			})
		},
		serverSelected(){
			return this.server.filter(val => {
				return val.selected==true
			})
		},
	},
	methods: {
		setCommon(){
			this.$refs.setCommon.popShopServeVisible=true
		},
		select1(val,index){
			val.selected=!val.selected
			this.$emit('serverSelected',this.serverSelected,val.selected,val)
		},
		select2(val,index){
			val.selected=!val.selected
			this.$emit('goodsSelected',this.goodsSelected,val.selected,val)
		},
		getList(){
			this.$http
				.get('/LaborGoods/findLaborSynthesizeFastOrderGoods', {
					merchantCode: this.$route.query.merchantCode
				})
				.then(res => {
					if (res.code == '10000') {
						res.data.map(item => {
							item.memberCardType= '0',
							item.goodsCode = item.code;
							item.goodsCome = 3;
							item.price=item.standardPrice
							item.serviceTime=item.serviceMinutes
							item.goodsName=item.name
							item.goodsVipId = null;
							item.num = 1;
							item.isGift=0
							item.mapList=[]
							item.goodsCount = item.num;
							item.selected=false
							item.subtotalMoney=item.goodsCount*item.price
						});
						this.list=res.data
					}
				});
		},
	},
	created() {
		this.getList()
	}
};
</script>

<style scoped>
	.common{
		padding-top: 20px;
		background: #FFFFFF;
		border-radius: 15px;
		margin-top: 10px;
		padding-left: 36px;
		padding-right: 36px;
		padding-bottom: 20px;
		/* width: 100%; */
	}
	.title{
		font-size: 18px;
	}
	.d-flex{
		/* align-items: baseline; */
		/* flex: 1; */
	}
	.text{
		font-size: 12px;
		margin-left: 10px;
	}
	.border-left{
		border: 1px solid #DCDFE6;
		padding:10px 0px;
		text-align: center;
		width: 8%;
	}
	.border-right{
		border: 1px solid #DCDFE6;
		padding:10px 15px;
		display: flex;
		width: 100%;
		align-items: center;
		flex-wrap: wrap;
		
	}
	p{
		padding: 0;
		margin: 0;
	}
	.border{
		border: 1px solid #DCDFE6;
		padding:5px 20px;
		margin-right: 15px;
		cursor: default;
		margin-bottom: 10px;
	}
	.selected{
		background: #409EFF;
		border: 1px solid #409EFF;
		color: #fff;
	}
</style>
