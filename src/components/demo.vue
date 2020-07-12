<!-- 组件说明 -->
<template>
	<div class="">
		<chooseGoods></chooseGoods>
		<el-button @click="str='向子组件传值'">改变子组件值</el-button>
		<child :str='str' ref='child'></child>
		<el-button @click='changeChild'>调用子组件方法</el-button>
		
		<el-button @click.once="onceClick">只能点击一次</el-button>
		<h1>demo</h1>
		<el-button @click="can">生成自适应海报</el-button>
		<canvas id="myCanvas" width="" height=""></canvas>
		<el-button @click="fil">过滤null</el-button>
		<!-- 异步函数执行 -->
		<el-button @click="asyncs">异步函数调用</el-button>

		<el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>

		<el-button @click="del">合并去重</el-button>

		<el-input v-model="search"></el-input>
		<el-button type="pramise" @click="confirm">模糊搜索</el-button>
		<div v-for="(item, index) in list" :key="index">{{ item.name }}{{ item.phone }}{{ item.carNUm }}</div>

		<el-button @click="getSum">求和</el-button>
		<!-- //车牌号 -->
		<provice v-model="plateNumber"></provice>
		<el-button @click="carNum">输入的车牌号</el-button>

		<div>{{ s }}</div>

		<el-button @click="timeChange">时间转化时间戳</el-button>

		<el-table
			:data="tableData"
			style="width: 100%;margin-bottom: 20px;"
			row-key="id"
			@selection-change="handleSelectionChange"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<el-table-column type="selection"></el-table-column>
			<el-table-column v-for="(item, index) in tableList" :key="index" :label="item.label" :prop="item.prop"></el-table-column>

			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<!-- <el-button
		            @click="handleClick(scope.row)"
		            type="primary"
		            size="mini"
		            v-if="!scope.row.date"
		          >编辑</el-button>
		          <el-button
		            @click="downloadImg(scope.row)"
		            type="text"
		            size="small"
		            v-if="!scope.row.date"
		          >删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<hr />
		<hr />

		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="表单字体"><el-input v-model="form.fontSize"></el-input></el-form-item>
			<el-form-item :label="labelInfo"><el-color-picker v-model="form.fontColor"></el-color-picker></el-form-item>
			<el-form-item>
				<label slot="label"><span :style="{ color: form.fontColor, fontSize: form.fontSize + 'px' }">*车牌号</span></label>
				<el-input></el-input>
			</el-form-item>
		</el-form>
		<el-button @click="changea">变化</el-button>
		<div :style="{ color: form.fontColor, fontSize: form.fontSize + 'px' }">这是一段字体</div>

		<el-button @click="closeBag">闭包</el-button>
		<hr />
		<el-button @click="arrChange(1)">数组一</el-button>
		<el-button @click="arrChange(2)">数组二</el-button>
		<hr />
		<el-table :data="arr" style="width: 100%;margin-bottom: 20px;">
			<el-table-column prop="id"></el-table-column>
			<el-table-column prop="name"></el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, arr)" type="text" size="small">移除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-table :data="arr2" style="width: 100%;margin-bottom: 20px;">
			<el-table-column prop="id"></el-table-column>
			<el-table-column prop="name"></el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, arr2)" type="text" size="small">移除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-table :data="Allarr" style="width: 100%;margin-bottom: 20px;">
			<el-table-column prop="id"></el-table-column>
			<el-table-column prop="name"></el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, Allarr)" type="text" size="small">移除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import provice from './Alert/province.vue';
import child from './demo2.vue';
import chooseGoods from './Alert/chooseGoods.vue';
export default {
	components: {
		provice,
		child,
		chooseGoods
	},
	data() {
		return {
			str:'一串文字',
			arr: [],
			arr2: [],
			img: '../assets/wx.png',
			code: '../assets/car.png',
			title1: '这是标题这是标题这是标题',
			title2: '这是副标题这是副标题这是副标题这是副标题',
			filter: {
				name: null,
				asd: [
					{
						label: '级别',
						prop: 'date'
					}
				],
				aa: null,
				lp: '',
				po: { a: 'aa' }
			},
			inputClass: 'inputClass',
			labelInfo: '控制label变化',
			form: {
				fontSize: '14',
				fontColor: '#666'
			},

			tableList: [
				{
					label: '级别',
					prop: 'date'
				},
				{
					label: '名称',
					prop: 'name'
				},
				{
					label: '别名',
					prop: 'alias'
				},
				{
					label: '操作员',
					prop: 'operator'
				},
				{
					label: '状态',
					prop: 'state'
				}
			],

			tableData: [
				{
					id: 1,
					date: '个人',
					children: [
						{
							id: 11,
							name: '第二根半价套餐',
							alias: '是兄弟就来割',
							operator: '铁手无情',
							state: '无痛'
						}
					]
				},
				{
					id: 2,
					date: '科室',
					children: []
				},

				{
					id: 3,
					date: '全院',
					children: [
						{
							id: 31,
							name: '第二根半价套餐',
							alias: '是兄弟就来割',
							operator: '铁手无情',
							state: '无痛'
						},
						{
							id: 41,
							name: '第二根半价套餐',
							alias: '是兄弟就来割',
							operator: '铁手无情',
							state: '无痛'
						}
					]
				}
			],

			//c车牌
			plateNumber: null,
			list: [],
			sums: [{ id: '1', num: 222 }, { id: '1', num: 1 }, { id: '1', num: 0 }],
			s: null,
			search: '',
			searchList: [
				{ name: '李磊', phone: '1008611', carNUm: '川A3C625' },
				{ name: '韩梅梅', phone: '1001011', carNUm: '渝AAAAAA' },
				{ name: '小明', phone: '15528034', carNUm: '川J12625' },
				{ name: '小红', phone: '1008611', carNUm: '川A3C625' }
			],

			value: null,
			options: [{ value: 1, label: '1-1', children: [{ value: 2, label: '2-1', children: [{ value: 3, label: '3-1' }] }] }]
		};
	},
	computed: {
		Allarr() {
			return this.arr.concat(this.arr2);
		},
	},
	methods: {
		changeChild(){
			this.$refs.child.look()
			console.log(this.$refs.child.look)
		},
		deleteRow(index, rows) {
			rows.splice(index, 1);
		},
		arrChange(val) {
			if (val == 1) {
				this.arr.push({ id: Math.random() * 10, name: (Math.round(Math.random() * 20901) + 19968).toString(16) });
			} else {
				this.arr2.push({ id: Math.random() * 20, name: (Math.round(Math.random() * 20901) + 19968).toString(16) });
			}
		},
		onceClick() {
			console.log('按钮只能点击一次');
		},
		can() {
			var myCanvas = document.getElementById('myCanvas');
			var ctx = myCanvas.getContext('2d');
			let img = new Image();
			var that = this;
			img.src = that.img;
			img.onload = () => {
				ctx.drawImage(img, 0, 0);
				ctx.save();
			};
		},
		fil() {
			// Object.keys(this.filter).forEach((key)=>{
			// 		 if(key==null){this.filter[key]=''}
			//      console.log(key,this.filter[key]);

			// });
			let filter = this.dealObjectValue(this.filter);
			console.log(filter);
		},
		dealObjectValue(obj) {
			//过滤null
			var param = {};
			if (obj === null || obj === undefined) return param;
			for (var key in obj) {
				if (obj[key] == null && obj[key] == undefined) {
					param[key] = '';
				} else if (obj[key] !== null && obj[key] !== undefined) {
					param[key] = obj[key];
				}
			}
			return param;
		},
		/**
		 * 异步函数
		 */

		asyncs() {
			const f1 = async () => {
				this.$api.list({ merchantCode: 31000001, pageNo: 1, pageSize: 10 }).then(res => {
					console.log('请求结果1111111', res);
				});
			};
			const f2 = () => {
				console.log(9876);
			};
			// console.log('函数',f1())
			f1().then(() => {
				// console.log('9999',val)
				f2();
			});
			//  async()=>{
			// 	 f1()
			// 	 f2()
			//  }
		},

		changea() {
			var d = document.getElementById('nav');
			d.style.color = 'red';
		},
		fontColorChange() {},
		fontSizeChange() {},

		//时间戳按钮
		timeChange() {
			console.log(this.getUnixTime('2020-1-20 10:00:00'));
		},

		handleSelectionChange(val) {
			console.log('选中的', val);
		},

		/**
		 * 车牌
		 */
		carNum() {
			console.log('车牌', this.plateNumber);
		},

		// 求和按钮
		getSum() {
			let num = 'num';
			this.s = this.sum(this.sums, 'id');
			// this.sums.map( item => {
			// 	this.s+=Number(item.num)
			// console.log(item.num)
			// })
		},

		// 模糊搜索
		confirm() {
			console.log(this.searchList, this.search);
			let arrs = this.fuzzySearch(this.searchList, this.search);
			console.log('%c搜索出来的数组', 'color:#70ff57;font-size:20px;font-weight:bold', arrs);
			this.list = arrs;
		},

		/**数组求和
		 * @param {Object} key 关键字
		 * @param {Object} arr 数组
		 */
		sum(arr, keys) {
			let total = 0;
			arr.map(item => {
				total += Number(item[keys]);
			});
			return total;
		},

		/**
		 * 模糊搜索
		 * @param {Object} list--搜索的数组
		 * @param {Object} keyWord--搜索关键字
		 */
		fuzzySearch(list, keyWord) {
			var reg = new RegExp(keyWord);
			var arr = [];
			console.log('关键字', reg, reg.test(list[0].name));
			for (var i = 0; i < list.length; i++) {
				if (reg.test(list[i].name) || reg.test(list[i].phone) || reg.test(list[i].carNUm)) {
					arr.push(list[i]);
				}
			}
			return arr;
		},

		/**转换时间戳
		 * @param {Object} dateStr--需要转换的时间戳
		 */
		getUnixTime(dateStr) {
			var newstr = dateStr.replace(/-/g, '/');
			var date = new Date(newstr);
			var time_str = date.getTime().toString();
			return time_str.substr(0, 10);
		},

		handleChange(val) {
			console.log(val, this.value);
		},

		// 获取一二级分类
		getTree(type) {
			this.$http
				.get('/LaborGoods/categoryList', {
					merchantCode: this.merchantCode,
					parentCode: '0',
					type
				})
				.then(res => {
					console.log('请求弹窗树状结果', res);
					if (res.code == '10000') {
						this.searchList = res.data;
					}
				});
		},

		// 获取三级列表
		getThree(categoryCode, level) {
			this.$http
				.get('/LaborGoods/findGoodsInfo', {
					merchantCode: this.merchantCode,
					categoryCode,
					level
				})
				.then(res => {
					console.log('请求弹窗树三级结果', res);
					if (res.code == '10000') {
						this.serverList = res.data;
					}
				});
		},

		del() {
			let arr1 = [{ name: '小明', id: 1, ch: 'we' }, { name: '小红', id: 2, ch: 'sdfssdfg' }];

			let arr2 = [{ name: '小军', id: 3, ch: 'sedf' }, { name: '韩梅梅', id: 4, ch: 'iop' }, { name: '小红', id: 2, ch: 'sdfssdfg' }];

			let arr3 = arr1.concat(arr2);
			// console.log('arrayts',this.arrayNew(arr3));
			// console.log('ads',this.deWeight(arr3))
			// console.log(this.twoArraysToOne(arr1,arr2))
			console.log('aasd', this.uniqs(arr3));
			// console.log(this.deWeight(arr3))
			console.log(this.deWeight(arr3));

			let arrNew = new Set(arr3); //通过set集合去重
			// console.log(Array.from(arrNew))
			// console.log(this.twoArraysToOne(arr1,arr2))
			let arr4 = this.deWeight(arr3);
			const newData = arr1.filter(l2 => arr2.findIndex(l1 => l2.id === l1.id) !== -1);
		},

		arrayNew(arr) {
			let array = [];
			for (let i = 0; i < arr.length; i++) {
				if (array.length == 0) {
					array.push(arr[i]);
				} else {
					let b = 0;
					for (let m = 0; m < array.length; m++) {
						if (arr[i].id == array[m].id) {
							b = 1;
							break;
						}
					}
					if (b == 0) {
						array.push(arr[i]);
					}
				}
			}
			return array;
		},

		//定义一个函数，传入两个数组，返回一个去重数组
		twoArraysToOne(arr1, arr2) {
			let arr3 = [];
			let arr4 = [];
			for (let k = 0; k < arr1.length; k++) {
				let count1 = 0;
				for (let l = 0; l < arr1.length; l++) {
					if (arr1[k] === arr1[l]) {
						count1++;
					}
				}
				if (count1 % 2 === 1) {
					//如果是奇数，说明是选中项,添加到数组中保存
					arr3.push(arr1[k]);
				}
			}
			for (let k = 0; k < arr2.length; k++) {
				let count2 = 0;
				for (let l = 0; l < arr2.length; l++) {
					if (arr2[k] === arr2[l]) {
						count2++;
					}
				}
				if (count2 % 2 === 1) {
					//如果是奇数，说明是选中项,添加到数组中保存
					arr4.push(arr2[k]);
				}
			}
			//分别去重
			arr3 = this.uniqs(arr3);
			arr4 = this.uniqs(arr4);
			return this.mergeArrayMerges(arr3, arr4);
		},

		mergeArrayMerges(array1, array2) {
			array1.map((v, index) => {
				if (v !== '') {
					let idx = array2.indexOf(v);
					if (idx > -1) {
						array2.splice(idx, 1);
					}
				}
			});
			array1 = array1.concat(array2);
			return array1;
		},

		/**
		 * @param {Object} 根据数组对象去重
		 */
		uniqs(array) {
			let temp = []; //一个新的临时数组
			for (let i = 0; i < array.length; i++) {
				if (temp.length == 0) {
					temp.push(array[i]);
				} else {
					let o = 0;
					for (let a = 0; a < temp.length; a++) {
						var obj = array[i];
						var obj1 = temp[a];
						if (JSON.stringify(obj1) === JSON.stringify(obj)) {
							o = 1;
							break;
						}
					}
					if (o == 0) {
						temp.push(array[i]);
					}
				}
			}
			return temp;
		},

		deWeight(arry) {
			let newAry = [];
			for (let i = 0; i < arry.length; i++) {
				if (newAry.indexOf(arry[i].id) == -1) {
					newAry.push(arry[i]);
				}
			}
			return newAry;
		},

		uniq(array) {
			var temp = [];
			var index = [];
			var l = array.length;
			for (var i = 0; i < l; i++) {
				for (var j = i + 1; j < l; j++) {
					if (array[i] === array[j]) {
						i++;
						j = i;
					}
				}
				temp.push(array[i]);
				index.push(i);
			}
			console.log(index);
			return temp;
		},

		MergeArray(arr1, arr2) {
			var _arr = new Array();
			for (var i = 0; i < arr1.length; i++) {
				_arr.push(arr1[i]);
			}
			for (var i = 0; i < arr2.length; i++) {
				var flag = true;
				for (var j = 0; j < arr1.length; j++) {
					if (arr2[i] == arr1[j]) {
						flag = false;
						break;
					}
				}
				if (flag) {
					_arr.push(arr2[i]);
				}
			}
			return _arr;
		},

		say(val) {
			alert(val);
		},
		closeBag() {
			// for(var i=0;i>-9;i++){
			// console.log( '123',this.$untils.getTableData('31000001',1,10))
			// }
		},
			nim(){
				return new Promise(async(resolve, reject) => {
				    try {
				        let res = await this.$api.list({ merchantCode: 31000001, pageNo: 1, pageSize: 10 })
				        console.log('请求结果11111', res)
				        console.log(11112)
				        console.log(22223)
				        resolve(res)
				    } catch (error) {
				        reject(error)
				    }
				})
			},
		async	nim2(){
				let res = await this.$api.list({ merchantCode: 31000001, pageNo: 1, pageSize: 10 })
				console.log('请求结果11111', res)
				console.log(11112)
				console.log(22223)
			},
			nm(){
				
			(function(){
				var num = 1
				 function a(){
					 console.log(num)
				 }
				 function b(){
					 console.log(num)
				 }
				 a()
				 b()
			})()
			}
	},
	mounted() {},
async	created() {
		// this.$api.list({ merchantCode: 31000001, pageNo: 1, pageSize: 10 }).then(res => {
		// 	console.log('请求结果1111111', res);
		// 	console.log(111)
		// });
		// console.log(2222)
		// this.nim().then(res => {
		// 	console.log(res)
			
		// })
		console.log(3333);
	await this.nim2()
		// this.nim2()
		// let that =this
	console.log(555)
			// console.log(555)
		
		// this.nm()
		// var that=this

		// this.$http
		// 	.get('/merchantAssemble/getAssemble', {
		// 		merchantCode: this.merchantCode
		// 	})
		// 	.then(res => {
		// 		console.log('获取拼团图片', res);
		// 		if (res.code === '10000') {
		// 			this.assembleImgList = res.data.assembleImgList;
		// 			this.assembleImgLists = res.data.shareImgList;
		// 		}
		// 		if (this.$route.query.clickStatus == 3) {
		// 			this.sets = true;
		// 		}
		// 	});
	},
	beforeMount() {}, //生命周期 - 挂载之前
	beforeUpdate() {}, //生命周期 - 更新之前
	updated() {}, //生命周期 - 更新之后
	beforeDestroy() {}, //生命周期 - 销毁之前
	destroyed() {}, //生命周期 - 销毁完成
	activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style scoped>
/* //@import url() */

/deep/ .inputClass label {
	font-size: 30px;
	color: rgb(24, 144, 255);
}
</style>
