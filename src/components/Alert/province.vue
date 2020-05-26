<template>
  <div class="wrapper">
    <el-input
      :placeholder="!this.province ? '请先选择省简称' : '请输入内容'"
      :readonly="!this.province"
      maxlength="8"
      v-model="plateOther"
    >
      <el-button slot="prepend" @click.stop="showKeyborad = !showKeyborad">
        <span class="title" :class="{ placeholder: !province }">{{
          province || '省简称'
        }}</span>
        <i class="el-icon-caret-bottom el-icon--right" />
        <el-row
          v-show="showKeyborad"
          type="flex"
          justify="space-around"
          class="plate-number-wrapper"
        >
          <div
            class="item"
            :class="{ active: province === item }"
            v-for="(item, index) in provincialAbbrev"
            :key="index"
            @click.stop="
              province = item
              showKeyborad = false
            "
          >
            {{ item }}
          </div>
        </el-row>
      </el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      /**
       * 车牌号省简称
       */
      province: '',

      /**
       * 是否显示车牌号键盘
       */
      showKeyborad: false,

      /**
       * 除车牌号省简称以外的内容
       */
      plateOther: '',
      /**
       * 省简称列表
       */
      provincialAbbrev: provincialAbbrev
    }
  },
  computed: {
    plateNumber: {
      get() {
        return this.province + this.plateOther
      },
      set(value) {
        if (value.length > 1) {
          const [province, ...other] = value.split('')
          this.province = province
          this.plateOther = other.join('')
        } else {
          this.province = value
        }
      }
    }
  },
  watch: {
    value(val) {
      if (this.plateNumber !== val) {
        this.plateNumber = val
      }
    },
    plateNumber(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.plateNumber = this.value
    document.addEventListener('click', () => {
      this.showKeyborad = false
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', () => {})
  }
}
const provincialAbbrev = [
  '皖',
  '苏',
  '浙',
  '沪',
  '闽',
  '赣',
  '鄂',
  '湘',
  '桂',
  '琼',
  '京',
  '津',
  '冀',
  '晋',
  '新',
  '蒙',
  '辽',
  '吉',
  '黑',
  '川',
  '渝',
  '云',
  '贵',
  '藏',
  '陕',
  '甘',
  '宁',
  '青',
  '鲁',
  '豫',
  '粤',
  '港',
  '澳',
  '台',
  '警',
  '领',
  '使',
  '学',
  '军',
  'WJ'
]
</script>

<style scoped>
.wrapper {
  position: relative;
}

.placeholder {
  color: #c2c2c2;
}

.title {
  display: inline-block;
  text-align: center;
  width: 3em;
}

.plate-number-wrapper {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  z-index: 10;
  flex-wrap: wrap;
  width: 290px;
  padding: 0 5px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;

}

::v-deep {
  
}
.el-input-group__prepend {
    color: #413839;
    background-color: #fff;
  }

.active {
      color: #fff;
      background-color: #409eff;
    }


  .item {
    margin: 7px 2px;
    width: 30px;
    height: 26px;
    line-height: 26px;
    color: #413839;
    border-radius: 5px;
    box-shadow: 0 0 3px 1px #dcdfe6;
  }

</style>
