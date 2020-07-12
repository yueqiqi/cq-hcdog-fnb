<template>
  <el-popover
    placement="bottom-start"
    trigger="click"
    popper-class="select-goods__wrap"
    width="700"
    v-model="showDialog"
    @hide="$emit('close', selectionList,type)"
  >
    <el-row type="flex">
<!--      <el-scrollbar
        v-show="!name"
        v-loading="categoryLoading"
        wrap-class="scrollbar-wrapper"
        class="scrollbar-height tree"
      >
        <el-tree
          highlight-current
          :expand-on-click-node="false"
          node-key="categoryCode"
          :data="categoryList"
          :props="treeProps"
          @node-click="curCategoryInfo = $event"
          ref="tree"
        />
      </el-scrollbar> -->
      <div class="line" v-show="!name" />
      <el-table
        v-loading="tableLoading"
        class="table"
        header-cell-class-name="table-header"
        cell-class-name="table-cell"
        height="300px"
        row-key="goodsCode"
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          reserve-selection
          align="center"
          width="45"
        />
        <el-table-column
          v-for="(item, index) in table"
          :key="index"
          show-overflow-tooltip
          align="center"
          :formatter="item.formatter"
          :prop="item.prop"
          :label="item.label"
        />
        <slot slot="append" name="append" />
      </el-table>
    </el-row>
    <div slot="reference">
      <el-input
			:disabled="dis"
			style="width: 300px;"
        @click.native="handleInputClick"
        v-model="name"
        @clear="
          clearList()
        "
        clearable
        :placeholder="placeholderText"
      >
			<el-button slot="append" icon="el-icon-search" @click.stop="showNoVip"></el-button></el-input>
    </div>
  </el-popover>
</template>

<script>
/**
 * api 需要替换
 * getGoodsTwoTypeList: 'api/goods/merchantGoods/listTwoCategory' // 商品分类列表
 * getGoodsListByCategory: 'api/goods/merchantGoods/listByCategory' // 根据商品分类获取商品列表
 * getGoodsListByName: 'api/goods/merchantGoods/listByName' // 根据商品条件获取商品列表
 *
 * merchantCode 需要替换
 *
 * 事件
 * close: 关闭弹窗事件，返回选中项
 * selectionChange: 表格选中项改变事件，返回选中项数组
 */
// import {
//   getGoodsTwoTypeList,
//   getGoodsListByCategory,
//   getGoodsListByName
// } from '@/api/Goods'
// import { UserModule } from '@/store/modules/User'
/**
 * 服务商品table 字段
 */
const serviceTable = [
  {
    prop: 'name',
    label: '服务名称'
  },
  {
    prop: 'twoCategoryName',
    label: '服务分类',
    formatter(row) {
      return `${row.twoCategoryName}${
        row.threeCategoryName ? '/' + row.threeCategoryName : ''
      }`
    }
  },
  {
    prop: 'standardPrice',
    label: '售价'
  }
]

/**
 * 实物商品table字段
 */
const goodsTable = [
  {
    prop: 'name',
    label: '商品名称'
  },
  {
    prop: 'brandName',
    label: '品牌'
  },
  {
    prop: 'specification',
    label: '规格'
  },
  {
    prop: 'inStock',
    label: '当前库存',
    formatter() {
      return '-'
    }
  },
  {
    prop: 'standardPrice',
    label: '售价'
  }
]
// const merchant=[
// 	{
// 	  prop: 'name',
// 	  label: '商品名称'
// 	},
// 	{
// 	  prop: 'brandName',
// 	  label: '品牌'
// 	},
// 	{
// 	  prop: 'specification',
// 	  label: '规格'
// 	},
// ]

/** 节流定时器 */
let throttle = null

export default {
  props: {
		dis:{
			type:Boolean,
			default:false
		},
    /**
     * 搜索框类型，服务搜索 或者 商品搜索
     * 默认 service
     *
     * service: 服务
     * goods: 商品
     */
    type: {
      type: String,
      default: 'service',
      // required: true
    },
    placeholder: String
  },
  data() {
    return {
      /**
       * 当前选中分类
       */
      curCategoryInfo: {},

      /**
       * 显示选择商品弹窗
       */
      showDialog: false,

      /**
       * 搜索名称
       */
      name: '',

      /**
       * 表格数据
       */
      tableData: [],

      /**
       * 表格数据正在加载
       */
      tableLoading: false,

      /**
       * 商品分类列表
       */
      categoryList: [],

      /**
       * 分类正在加载
       */
      categoryLoading: false,

      /** 选中数据列表 */
      selectionList: [],

      /**
       * 树状分类 props
       */
      treeProps: {
        label: 'categoryName',
        children: 'children'
      }
    }
  },
  computed: {
    merchantCode() {
      return UserModule.merchantCode
    },
    placeholderText() {
      return this.placeholder || this.type === 'service'
        ? '搜索服务名称'
        : this.type === 'goods'
        ? '搜索商品名称、品牌、规格'
        : '搜索门店耗材'
    },
    table() {
      return this.type === 'service'
        ? serviceTable
        : this.type === 'goods'
        ? goodsTable
        : goodsTable
    }
  },
  watch: {
    ['curCategoryInfo.categoryCode'](value, oldValue) {
      if (this.curCategoryInfo && value !== oldValue) {
        this.getGoodsListByCategory(
          this.curCategoryInfo.categoryCode,
          this.curCategoryInfo.level
        )
      }
    },
    name(value) {
      if (!!value) {
        if (throttle) {
          clearTimeout(throttle)
        }
        throttle = setTimeout(() => {
          throttle = null
          this.getGoodsListByCategory()
        }, 500)
      } else {
        throttle && clearTimeout(throttle)
        if (Object.keys(this.curCategoryInfo).length) {
          this.getGoodsListByCategory(
            this.curCategoryInfo.categoryCode,
            this.curCategoryInfo.level
          )
        }
      }
    }
  },
  created() {
    // this.init()
  },
  methods: {
		clearList(){
			this.tableData = []
		},
		// selectRow(selection,row){
		// 	console.log(selection,row)
		// },
		showNoVip(){
			if(this.type=='service'){
				this.$parent.showNoVip()
			}else{
				this.$parent.showPartsNoVip()
			}
		},
    /** 初始化弹窗 */
    async init() {
      try {
        await this.getGoodsCategoryList()
        if (this.categoryList.length) {
          const category = this.categoryList[0]
          this.curCategoryInfo = category
          this.$refs.tree.setCurrentKey(category.categoryCode)
        }
      } catch (error) {
        console.log(error)
      }
    },

    /** 处理输入框清除事件 */
    handleInputClear() {
      this.getGoodsListByCategory(
        this.curCategoryInfo.categoryCode,
        this.curCategoryInfo.level
      )
    },

    /** 处理input框点击事件 阻止冒泡， 防止点击输入框关闭弹窗 */
    handleInputClick(e) {
      if (this.showDialog) {
        e.stopPropagation()
      }
    },

    /**
     * 商品分类列表
     */
    async getGoodsCategoryList() {
      try {
        this.categoryLoading = true
        const { data } =
				 // await getGoodsTwoTypeList({
     //      merchantCode: this.merchantCode,
     //      goodsType: this.type === 'service' ? 2 : 1
     //    })
				this.$http.get('/LaborGoods/listByCategoryForLaborSynthesize',{
					merchantCode:this.$route.query.merchantCode,
					type: this.type === 'service' ? 1 : 2,
					// oneCategoryCode:this.type==='service'?'S01':'S02'
					condition:this.name
				})
        this.tableData = data
        // await this.$nextTick()
        await this.$nextTick()
      } catch (error) {
        console.log(error)
      } finally {
        this.categoryLoading = false
      }
    },
    /**
     * 商品列表
     */
    async getGoodsListByCategory(categoryCode, level) {
      try {
        this.tableLoading = true
        // const { data } = await getGoodsListByCategory({
        //   merchantCode: this.merchantCode,
        //   categoryCode,
        //   level
        // })
        // this.tableData = data
        // await this.$nextTick()
				
				this.$http.get('/LaborGoods/listByCategoryForLaborSynthesize',{
					merchantCode:this.$route.query.merchantCode,
					type: this.type === 'service' ? 1 :(this.type=='merchant'?3: 2),
					// oneCategoryCode:this.type==='service'?'S01':'S02'
					condition:this.name
				}).then(res => {
					res.data.map(item => {
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
					})
					this.tableData = res.data
				})
				await this.$nextTick()
					
				// await this.$nextTick()
      } catch (error) {
        console.log(error)
      } finally {
        this.tableLoading = false
      }
    },

    /**
     * 根据商品名称 获取商品列表
     */
    async getGoodsListByName() {
      try {
        const { data } = await getGoodsListByName({
          merchantCode: this.merchantCode,
          name: this.name,
          goodsType: this.type === 'service' ? 2 : 1
        })
        this.tableData = data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 处理可选择项选择变化事件
     */
    handleSelectionChange(list = []) {
      this.selectionList = list
      this.$emit('selectionChange', list,this.type)
    },

    /**
     * 树状分类点击事件
     */
    categoryTreeClick(data) {
      this.curCategoryInfo = data
    }
  }
}
</script>

<style >
.select-goods__wrap {
  padding: 0;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>

<style  scoped>

.data-wrap {
  overflow: hidden;
  width: 700px;
  height: 300px;
  max-height: 300px;
  background: #fff;
}

.line {
  width: 1px;
  height: 300px;
  background-color: #cdcdcd;
}

.flex {
  overflow: hidden;
  flex: 1;
}

.footer-btn {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  text-align: right;
}

/* ::v-deep { */
  .table-header {
    padding: 8px 0;
    background: rgb(236, 245, 255);
    line-height: 1;
  }

  .table-cell {
    padding: 8px 0;
    line-height: 1;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
.noClick {
  pointer-events: none;
}
.scrollbar-height {
  height: 300px;
}
  .tree {
    flex-basis: 150px;
  }

  ::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
	/deep/ th .el-checkbox {
		display:none
	}
</style>
