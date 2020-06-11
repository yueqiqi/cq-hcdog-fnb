<template>
  <div>
<!--   <div>
      <el-button type="primary" @click="popShopServeVisible = true"
        >设置常用项目</el-button
      >
    </div>
    <div class="head">
      <span class="title">常用服务</span>
      <span class="discribe">在维修工单处常用项目模块使用</span>
    </div>
    <el-table
      :data="tableData1"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6' }"
    >
      <el-table-column prop="name" label="服务名称" align="center">
      </el-table-column>
      <el-table-column prop="twoCategoryName" label="服务二级分类" align="center">
      </el-table-column>
      <el-table-column prop="threeCategoryName" label="服务三级分类" align="center">
      </el-table-column>
      <el-table-column prop="standardPrice" label="销售价格/元" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDel(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="tableData2"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6' }"
    >
      <el-table-column prop="name" label="商品名称" align="center">
      </el-table-column>
      <el-table-column prop="twoCategoryName" label="商品二级分类" align="center">
      </el-table-column>
      <el-table-column prop="threeCategoryName" label="商品三级分类" align="center">
      </el-table-column>
      <el-table-column prop="brandName" label="品牌" align="center"> </el-table-column>
      <el-table-column prop="specification" label="规格" align="center"> </el-table-column>
      <el-table-column prop="snCode" label="条形码" align="center">
      </el-table-column>
      <el-table-column prop="oemCode" label="OEM编码" align="center">
      </el-table-column>
      <el-table-column prop="unit" label="单位" align="center"> </el-table-column>
      <el-table-column prop="standardPrice" label="销售价格/元" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDel(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table> -->
    <el-dialog
      :visible.sync="popShopServeVisible"
      center
      width="60%"
      title="选择服务和商品"
    >
      <div class="popShopServeLeft">
        <el-tabs
          v-model="popShopServeActive"
          @tab-click="popShopServeClick"
          :stretch="true"
        >
          <el-tab-pane label="服务" name="服务">
            <el-menu
              class="el-menu-vertical-demo"
              :unique-opened="true"
              style="width:30%"
              @select="ServeSelect"
            >
              <el-submenu
                :index="item.code"
                v-for="item in servesData"
                :key="item.code"
              >
                <template slot="title">
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                  :index="subitem.code"
                  v-for="subitem in item.mapList"
                  :key="subitem.code"
                  >{{ subitem.name }}</el-menu-item
                >
              </el-submenu>
            </el-menu>
            <el-table
              :data="tableData"
              style="width: 100%"
              height="360"
              :header-cell-style="{ background: '#eef1f6' }"
            >
              <el-table-column label="名称" prop="goodsName" width="170">
              </el-table-column>
              <el-table-column label="价格" prop="price"> </el-table-column>
              <el-table-column label="选择">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.selected"
                    @change="selectedClick(scope.row.selected, scope.row)"
                  ></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="商品" name="商品">
            <el-menu
              class="el-menu-vertical-demo"
              :unique-opened="true"
              style="width:30%"
              @select="ServeSelect"
            >
              <el-submenu
                :index="item.code"
                v-for="item in shopsData"
                :key="item.code"
              >
                <template slot="title">
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                  :index="subItem.code"
                  v-for="subItem in item.mapList"
                  :key="subItem.code"
                  >{{ subItem.name }}</el-menu-item
                >
              </el-submenu>
            </el-menu>
            <el-table
              :data="tableData"
              style="width: 100%"
              height="360"
              :header-cell-style="{ background: '#eef1f6' }"
            >
              <el-table-column label="名称" prop="goodsName" width="170">
              </el-table-column>
              <el-table-column label="价格" prop="price"> </el-table-column>
              <el-table-column label="选择">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.selected"
                    @change="selectedClick(scope.row.selected, scope.row)"
                  ></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <div class="inputSearch">
                <el-input placeholder="请输入搜索名称" v-model="searchContent" @keyup.enter.native="search">
                  <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
                </el-input>
              </div>
            </span>
            <div style="height:360px">
              <el-table
                :data="tableData"
                style="width: 560px"
                height="360"
                :header-cell-style="{ background: '#eef1f6' }"
                align="center"
              >
                 <el-table-column
                    prop="goodsName"
                    label="名称"
                    width="240"
                    align="center">
                 </el-table-column>
                  <el-table-column
                    prop="price"
                    label="价格"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="选择"
                    align="center"
                    >
                    <template slot-scope="scope">
                      <div >
                        <el-checkbox 
                        v-model="scope.row.selected" 
                        style="text-align:center"
                         @change="selectedClick(scope.row.selected, scope.row)"
                        ></el-checkbox>
                      </div>
                    </template>
                  </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="popShopServeRight">
        <div class="popShopServeRightHead">
          已选项目
        </div>
        <div class="selectedList">
          <div
            class="selectedItem"
            v-for="item in selectedGoods"
            :key="item.goodsCode"
          >
            <div>
              {{ item.type == "1" ? "【服务】" : "【商品】" }}
              {{ item.goodsName }}
            </div>
            <div class="del" @click="DelselectedGoods(item)">
              <div class="el-icon-close"></div>
            </div>
          </div>
        </div>
        <div class="twoBtn">
          <el-button @click="popShopServeVisible = false">取消</el-button>
          <el-button type="primary" @click="serveShopEnSure">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    tableData() {
      this.selectedGoods.forEach((items) => {
        this.initData.forEach((item) => {
          if (item.goodsCode == items.goodsCode){
            item.selected = true;
          }
        });
      });
      return this.initData;
    },
  },
  data() {
    return {
      tableData1: [
      ],
      tableData2: [
      ],
      searchContent:"普通洗车",//搜索的内容
      popShopServeVisible: false,
      popShopServeActive: "服务", //商品和服务弹窗中的Tab切换
      servesData: [], //一二级服务列表
      shopsData: [], //一二级商品列表
      initData: [], //三级的原始数据
      selectedGoods: [], //选中的商品或服务
      ensureSelect: [], //确定商品或服务
    };
  },
  methods: {
    //常用服务或商品删除
    // async handleDel(index, row) {
    //   console.log(index, row);
    //   console.log(row.code)
    //   let res=await this.$http.get('/system/setFastOrder',{
    //     merchantCode:this.Mcode,
    //     code:row.code,
    //   })
    //   console.log(res)
    // },
    //商品和服务弹窗中的Tab切换
    popShopServeClick() {
      this.initData = []; //初始化table三级数据
      if (this.popShopServeActive == "商品" && this.shopsData.length == 0) {
        this.$http
          .get("/LaborGoods/categoryList", {
            merchantCode: this.Mcode,
            parentCode: 0,
            oneCategoryCode: "S02",
          })
          .then((res) => {
            this.shopsData = res.data;
          });
      }
    },
    //当服务被选择时候返回的下标
    ServeSelect(key, keyPath) {
      this.getLevel3(key);
    },
    //获取三级数据
    getLevel3(key) {
      this.$http
        .get("/LaborGoods/findGoodsInfo", {
          merchantCode: this.Mcode,
          categoryCode: key,
          level: 3,
        })
        .then((res) => {
          let { data } = res
          data.forEach((item) => {
            item.selected = false
						item.goodsCome = 3;
						item.goodsCount = 1;
						item.num = item.goodsCount;
          })
          this.initData = data
          console.log(this.initData)
        });
    },
    //当选中状态发生改变时
    selectedClick(boolean, row) {
      //boolean为true时为选中，false为取消选中
      if (boolean) {
        this.selectedGoods.push(row);
      } else {
        this.DelselectedGoods(row); //调用 删除已选择项函数
      }
    },
    //删除已经选中的商品或服务
    DelselectedGoods(item) {
      let Len = this.selectedGoods.length - 1;
      for (Len; Len >= 0; Len--) {
        if (this.selectedGoods[Len].goodsCode == item.goodsCode) {
          this.selectedGoods.splice(Len, 1);
        }
      }
    },
    //商品和服务点击确定
     serveShopEnSure() {
      // let arr=[]
      // this.ensureSelect=JSON.parse(JSON.stringify(this.selectedGoods))
      // this.ensureSelect.forEach(item=>{
      //   arr.push(item.goodsCode)
      // })
      // let goodsCodes=arr.join(',')
      console.log('商品和服务点击确定',this.selectedGoods)
			this.$emit('onfirm',this.selectedGoods)
    },
    //模糊查询商品服务服务
    async search(){
      let res=await this.$http.get('/LaborGoods/listByCategoryForWork',{
        merchantCode:this.Mcode,
        condition:this.searchContent
      })
      if(res.successful){
        let searchData=res.data
        searchData.forEach(item=>{
          item.selected=false
        })
        this.initData=searchData
        console.log(this.initData)
      }
    },
    //获已经设置的常用项
    // async getUsuallyData(){
    //   let res=await this.$http.get('/system/fastOrderGoods',{
    //     merchantCode:this.Mcode
    //   })
    //   if(res.successful){
    //     let {data}=res
    //     this.tableData1=data.filter(item=>item.type==2)          //商品类型:1 - 实物商品; 2 - 服务商品; 3 - 虚拟商品; 4 - 实物+服务
    //     this.tableData2=data.filter(item=>item.type==1)
    //   }
    // },
    
  },
  created() {
    // this.$getCode() //获取商家编码操作人id
		this.Mcode=this.$route.query.merchantCode
    // this.getUsuallyData()  //获已经设置的常用项
    this.$http
      .get("/LaborGoods/categoryList",{
          merchantCode:this.Mcode,
          parentCode:0,
          oneCategoryCode:'S01'
        }
      )
      .then((res) => {
				console.log(123,res)
        this.servesData = res.data;
      });
  },
};
</script>

<style scoped>
.head {
  padding: 20px 0 14px 0;
}
.head .title {
  font-weight: bolder;
  font-size: 20px;
}
.head .discribe {
  font-size: 14px;
  color: #808080;
  margin-left: 30px;
}
/deep/ .gutter {
  background: #eef1f6;
}

/deep/ .el-dialog__header {
  display: block !important;
  background: #409eff;

  padding: 20px;
}
/deep/  .el-dialog__title {
  color: white !important;
}
/deep/ .el-dialog__close.el-icon.el-icon-close {
  color: white;
  font-size: 18px;
}
.probabilityIcon {
  display: inline-block;
  position: absolute;
  font-size: 20px;
  right: 10px;
  height: 30px;
  top: 50%;
  margin-top: -15px;
}
.selectedList{
  height: 320px;
  overflow-y: scroll;
}
.giftNameDetail {
  padding: 6px 20px;
  border: 1px solid #cdcdcd;
  width: 150px;
  text-align: center;
}
.popSetDiscount {
  overflow: hidden;
}
.popDiscountLeft {
  width: 45%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #cdcdcd;
}
.popDiscountRight {
  width: 55%;
  box-sizing: border-box;
  float: right;
}
/deep/ .el-input__inner {
  padding: 10px 20px;
  box-sizing: border-box;
}
.searchDiscountInputDiv,
.checkedTitle {
  height: 50px;
  line-height: 50px;
  padding: 10px 20px;
}
.searchDiscountInputDiv {
  background: #cdcdcd;
}
/deep/ .el-dialog__footer {
  text-align: right;
}
.checkListDiv {
  height: 360px;
  overflow: scroll;
}
.checkListDiv .elcheckbox {
  position: relative;
}
/deep/.el-checkbox {
  width: 100%;
  height: 28px;
  line-height: 28px;
}
/deep/ .el-checkbox__input {
  position: absolute;
  right: 20px;
  top: 7px;
}
/deep/ .el-checkbox__label {
  padding-left: 20px;
}
.popDiscountRight .checkedList {
  height: 360px;
}
.popDiscountRight .checkedList > div {
  padding: 0 20px;
  height: 28px;
  line-height: 28px;
  position: relative;
}
.popDiscountRight .checkedList > div .el-icon-close {
  position: absolute;
  right: 0;
  top: 7px;
}
.checkListDiv,
.checkedList {
  min-height: 200px;
}
.popSetDiscount .footerButton {
  padding-right: 20px;
  text-align: right;
}
/deep/ .el-dialog__header {
  display: none;
}
/deep/ .el-dialog__body {
  overflow: hidden;
}
.popShopServeLeft {
  float: left;
  width: 70%;
}
.popShopServeRight {
  float: right;
  width: 30%;
}
.popShopServeRightHead {
  height: 40px;
  line-height: 40px;
  position: relative;
}
.popShopServeRightHead .closeIcon {
  position: absolute;
  top: -5px;
  right: 0;
  font-size: 20px;
  cursor: pointer;
}
.popShopServeRight .twoBtn {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 20px 30px 0;
}
/deep/ .el-menu-item {
  min-width: auto;
  width: 100%;
}
.popShopServeLeft .shopServeDetailList {
  width: 70%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  height: 500px;
}
.shopServeDetailList {
  width: 100%;
}

.el-tab-pane {
  display: flex;
}
/deep/ .el-table .cell {
  text-align: center !important;
}

/deep/ .el-table-column--selection.is-leaf .el-checkbox {
  display: none !important;
}

.selectedItem {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}
.selectedItem .del {
  cursor: pointer;
}
/deep/ .el-menu-vertical-demo.el-menu {
  height: 360px;
  overflow: scroll;
}
/deep/ .el-input__inner{
  padding: 0 25px;
  border-radius: 20px;
}
.inputSearch{
  padding-bottom: 10px;
}
/deep/ .el-tabs__nav.is-top.is-stretch{
  height: 48px;
}
</style>
