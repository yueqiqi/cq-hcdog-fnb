<template>
  <el-dialog
    :title="(add ? '新增' : '编辑') + '客户信息'"
    :visible.sync="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
  >
    <el-row>
      <el-col :span="17" :offset="1">
        <el-form
          :model="infoForm"
          :rules="rules"
          ref="infoForm"
          label-width="16em"
        >
          <el-form-item label="客户性质:" prop="cusClass">
            <el-select v-model="infoForm.cusClass" placeholder="请选择客户性质">
              <el-option value="0" label="个人" />
              <el-option value="1" label="商家" />
              <el-option value="2" label="公司" />
              <el-option value="3" label="平台" />
            </el-select>
          </el-form-item>
          <el-form-item label="客户类型:" prop="cusType">
            <el-select v-model="infoForm.cusType" placeholder="请选择客户类型">
              <el-option value="0" label="一般客户" />
              <el-option value="1" label="大客户" />
              <el-option value="2" label="内部客户" />
              <el-option value="3" label="平台客户" />
            </el-select>
          </el-form-item>

          <el-form-item label="客户名称:" prop="name">
            <el-input v-model="infoForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="infoForm.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <template>
              <el-radio v-model="infoForm.sex" label="1">男</el-radio>
              <el-radio v-model="infoForm.sex" label="2">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="生日:">
            <el-date-picker
              v-model="infoForm.birthday"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择出生日期"
            />
          </el-form-item>
          <el-form-item label="客户标签:">
            <el-select
              v-model="infoForm.labelList"
              placeholder="请选择客户标签"
              :multiple="true"
            >
              <el-option
                v-for="item in labelList"
                :key="item.id"
                :label="item.labelName"
                :value="item.labelName"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              v-model="infoForm.remark"
              autocomplete="off"
              placeholder="请填写客户备注信息"
            />
          </el-form-item>

          <el-form-item label="所在城市:">
            <el-cascader
              v-model="area"
              :options="options"
              :props="{ value: 'code', label: 'name', children: 'child' }"
              ref="cascaderAddr"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item label="详细地址:" prop="address">
            <el-input v-model="infoForm.address" autocomplete="off" />
          </el-form-item>
          <el-form-item label="微信:">
            <el-input v-model="infoForm.wechatPhone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="QQ:">
            <el-input v-model="infoForm.qq" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="infoForm.email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="证件号码:" prop="idCard">
            <el-input v-model="infoForm.idCard" autocomplete="off" />
          </el-form-item>

          <div class="fontleft">
            身份证图片上传:<span class="color">(每张小于5M)</span>
          </div>
          <el-row>
            <el-col :span="5" :offset="10">正面</el-col>
            <el-col :span="5" :offset="4">反面</el-col>
          </el-row>
          <el-row :offset="5">
            <el-col :span="8" :offset="7">
              <el-upload
                class="avatar-uploader"
                :action="imageUrl"
                name="image"
                :show-file-list="false"
                :on-success="e => handleUploaderSuccess(e, 'idCardImg1')"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <img
                  v-if="infoForm.idCardImg1"
                  :src="infoForm.idCardImg1"
                  class="avatar"
                />
                <i v-else>
                  <img
                    src="@/assets/images/idCardPositive.png"
                    class="imageStyle"
                  />
                </i>
              </el-upload>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-upload
                class="avatar-uploader"
                :action="imageUrl"
                name="image"
                :show-file-list="false"
                :on-success="e => handleUploaderSuccess(e, 'idCardImg2')"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <img
                  v-if="infoForm.idCardImg2"
                  :src="infoForm.idCardImg2"
                  class="avatar"
                />
                <i v-else>
                  <img
                    src="@/assets/images/idCardVerso.png"
                    class="imageStyle"
                  />
                </i>
              </el-upload>
            </el-col>
          </el-row>
          <div class="fontleft">
            行驶证图片上传:<span class="color">(每张小于5M)</span>
          </div>
          <el-row>
            <el-col :span="5" :offset="10">正面</el-col>
            <el-col :span="5" :offset="4">反面</el-col>
          </el-row>
          <el-row :offset="5">
            <el-col :span="8" :offset="7">
              <el-upload
                class="avatar-uploader"
                :action="imageUrl"
                name="image"
                :show-file-list="false"
                :on-success="e => handleUploaderSuccess(e, 'driverLicenseImg1')"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <img
                  v-if="infoForm.driverLicenseImg1"
                  :src="infoForm.driverLicenseImg1"
                  class="avatar"
                />
                <i v-else>
                  <img
                    src="@/assets/images/driverPositive.png"
                    class="imageStyle"
                  />
                </i>
              </el-upload>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-upload
                class="avatar-uploader"
                :action="imageUrl"
                name="image"
                :show-file-list="false"
                :on-success="e => handleUploaderSuccess(e, 'driverLicenseImg2')"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <img
                  v-if="infoForm.driverLicenseImg2"
                  :src="infoForm.driverLicenseImg2"
                  class="avatar"
                />
                <i v-else>
                  <img
                    src="@/assets/images/driverVerso.png"
                    class="imageStyle"
                  />
                </i>
              </el-upload>
            </el-col>
          </el-row>
          <div class="fontleft">
            其他图片上传:<span class="color">(每张小于5M)</span>
          </div>
          <el-row>
            <el-col :span="8" :offset="7">
              <el-upload
                class="avatar-uploader"
                :action="imageUrl"
                name="image"
                :show-file-list="false"
                :on-success="e => handleUploaderSuccess(e, 'otherPictures1')"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <img
                  v-if="infoForm.otherPictures1"
                  :src="infoForm.otherPictures1"
                  class="avatar"
                />
                <i v-else>
                  <img
                    src="@/assets/images/otherPicture.png"
                    class="imageStyle"
                  />
                </i>
              </el-upload>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer">
      <el-row :gutter="12">
        <el-col :span="14">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="UpdateDetailsCustomerInfo"
            >保 存</el-button
          >
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { getCityList, getLabList, UpdateDetailsCustomer, isPhone } from '@/api'
import { validator } from '@/utils'
import { mapGetters } from 'vuex'
function removeEmptyChild(list) {
  const res = []
  for (const item of list) {
    const { child, ...other } = item
    if (child.length) {
      const val = other
      val.child = removeEmptyChild(child)
      res.push(val)
    } else {
      res.push(other)
    }
  }
  return res
}

export default {
  components: {},
  props: {
    visible: Boolean,
    add: Boolean,
    info: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    },
    ...mapGetters(['merchantCode'])
    // changePhone() {
    //   return !!(
    //     this.originalPhone && this.storeForm.phone != this.originalPhone
    //   )
    // }
  },
  data() {
    return {
      area: [],
      /**原始手机号 */
      originalPhone: '',
      infoForm: {
        cusClass: '0',
        cusType: '0',
        name: '',
        merchantCode: '',
        phone: '',
        qq: '',
        wechatPhone: '',
        email: '',
        idCard: '',
        birthday: '',
        address: '',
        cityCode: '',
        cityName: '',
        districtCode: '',
        provinceCode: '',
        provinceName: '',
        idCardImg1: '',
        idCardImg2: '',
        driverLicenseImg1: '',
        driverLicenseImg2: '',
        otherPictures1: ''
      },
      date: '',
      options: [],
      labelList: [],
      imageUrl: `${process.env.VUE_APP_BASE_API}/oss/image/toOss`,
      rules: {
        name: {
          required: true,
          message: '客户名称不能为空',
          trigger: 'blur'
        },
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        sex: {
          required: true,
          message: '请选择性别',
          trigger: 'blur'
        },
        address: {
          max: 50,
          message: '请填写地址，不超过50个字',
          trigger: 'blur'
        },
        idCard: [
          {
            max: 18,
            message: '长度不超过18位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    if (!this.add) {
      this.infoForm = { ...this.info }
      this.originalPhone = this.info.phone
      this.area = [
        this.infoForm.provinceCode,
        this.infoForm.cityCode,
        this.infoForm.districtCode
      ]
    }
    this.getCityInfoList()
    this.getLabInfoList()
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleUploaderSuccess(response, type) {
      console.log(response)
      this.infoForm[type] = response.data.url
    },
    handleChange(value) {
      console.log(value)
      console.log(this.area)
      const province = this.options.find(v => v.code === value[0])
      const city = province.child.find(v => v.code === value[1])
      console.log(city)
      const district = city.child.find(v => v.code === value[2])
      console.log(province.name, city.name, district.name)
      this.infoForm.cityName = city.name
      this.infoForm.cityCode = city.code
      this.infoForm.provinceCode = province.code
      this.infoForm.provinceName = province.name
      this.infoForm.districtCode = district.code
      this.infoForm.districtName = district.name
      console.log(this.$refs['cascaderAddr'].getCheckedNodes()[0])
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
    },
    /**
     * 获取级联城市名称
     */
    async getCityInfoList() {
      try {
        const { data } = await getCityList()
        this.options = removeEmptyChild(data)
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * 获取客户标签列表信息
     */
    async getLabInfoList() {
      try {
        const { data } = await getLabList({ ...this.$route.params, type: '1' })
        this.labelList = data
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * 新增客户/
     * 编辑详情页客户信息
     */
    async UpdateDetailsCustomerInfo() {
      try {
        await validator(this.$refs.infoForm)
        if (this.originalPhone != this.infoForm.phone) {
          const { data } = await isPhone({
            phone: this.infoForm.phone,
            merchantCode: this.merchantCode,
            customerCode: this.$route.params.code
          })
          // if (data.exit) {
          //   await this.$confirm('您修改的手机号已存在，请确认是否修改', '提示')
          // } else {
          if (!this.add) {
            await this.$confirm('您是否更新为当前手机号', '提示')
          }
          // }
          console.log(data)
        }
        await UpdateDetailsCustomer({
          ...this.infoForm,
          birthday: this.infoForm.birthday
            ? this.infoForm.birthday + ' 00:00:00'
            : undefined,
          merchantCode: this.$route.params.merchantCode
        })
        this.$emit('modify', this.infoForm)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
div >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
div >>> .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
div >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 120px;
  display: block;
}
.color {
  color: #409eff;
  font-weight: normal;
}
.fontleft {
  padding-left: 50px;
  font-weight: bold;
}
.imageStyle {
  width: 150px;
  height: 110px;
}
</style>
