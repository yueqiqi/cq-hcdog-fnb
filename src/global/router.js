import Vue from 'vue'
import Router from 'vue-router'
import demo from '../components/demo'



import A4 from '../components/Alert/tree.vue';
// 选择员工弹窗
import noVip from '../components/workOrder/closeChildren/hint.vue'
// 工单列表
import orderList from '../components/workOrder/orderList.vue'
// 快捷开单
import quickOrder from '../components/workOrder/quickOrder.vue'
// 快捷开单--进行开单
import quickOrderBill from '../components/workOrder/quickOrderBill.vue'
// 综合开单
import comprehensiveOrder from '../components/workOrder/comprehensiveOrder.vue'
// 工单结算
import close from '../components/workOrder/close.vue'
// 工单结算--开单详情
import billdetail from '../components/workOrder/closeChildren/billdetail.vue'
// 工单结算--财务结算
import financialClose from '../components/workOrder/closeChildren/financialClose.vue'
//工单结算--结算单
import closeOrder from '../components/workOrder/table/finalStatement2.vue'
//工单结算--结算单
import closeOrders from '../components/workOrder/table/close2.vue'
// 工单结算--报价单
import offer from '../components/workOrder/table/quotation.vue'





/**
 * 营销管理
 */
import index from '@/components/control/discount/index.vue';
// 优惠券管理

import resStatistical from '@/components/control/discount/resStatistical.vue';

Vue.use(Router)
export default new Router({
    routes: [
			{ //demo
			    path: '/noVip',
			    name: 'noVip',
			    component: noVip
			},
			{ //demo
			    path: '/demo',
			    name: 'demo',
			    component: demo
			},
			{ //工单列表
			    path: '/',
			    name: 'orderList',
			    component: orderList
			},
			{ //快捷开单
			    path: '/quickOrder',
			    name: 'quickOrder',
			    component: quickOrder,
					// 需要被缓存
					 meta: {keepAlive: true },
					children:[]
			},
			{//快捷开单--进行开单
				path:'/quickOrderBill',
				name:'quickOrderBill',
				component:quickOrderBill,
				// meta: {keepAlive: true,isBack: false} // 判断是不是返回操作 },
				// beforeEnter:(to,from,next)=>{next('/orderList')}
			},
			{ //综合开单
			    path: '/comprehensiveOrder',
			    name: 'comprehensiveOrder',
			    component: comprehensiveOrder
			},
			{ //工单结算
			    path: '/close',
			    name: 'close',
			    component: close,
					meta: {
						keepAlive: true,
					}
			},
			{ //工单结算--开单详情
			    path: '/billdetail',
			    name: 'billdetail',
			    component: billdetail,
			},
			{ //工单结算--财务结算
			    path: '/financialClose',
			    name: 'financialClose',
			    component: financialClose
			},
			// 打印的a4
			{
			    path: '/A4',
			    name: 'A4',
			    component: A4
			},
			// 打印结算单
			{
				path:'/closeOrder',
				name:'closeOrder',
				component:closeOrder
			},
			// 打印结算单
			{
				path:'/closeOrders',
				name:'closeOrders',
				component:closeOrders
			},
			// 打印报价单
			{
				path:'/offer',
				name:'offer',
				component:offer
			},
			/**
			 * 营销管理
			 */
			{ 
			    path: '/index',
			    name: 'index',
			    component: index
			},
			{ //优惠券管理
			    path: '/resStatistical',
			    name: 'resStatistical',
			    component: resStatistical
			},
		],
		// mode: 'history',
		mode: 'hash',
		base: '/orderList/'
})
