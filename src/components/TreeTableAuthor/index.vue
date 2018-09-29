<template>
<div>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>

         <el-checkbox-group  v-if="Array.isArray(scope.row[column.value])" v-model="scope.row.selectchecked" @change="handleCheckedCitiesChange(scope.$index, scope.row,scope.row[column.option])">
          <el-checkbox v-for="(interset) in scope.row[column.value]" :label="interset.id" :key="interset.id">{{interset.description}}</el-checkbox>
        </el-checkbox-group>

        <el-checkbox  v-else-if="scope.row.type===1"  :indeterminate="scope.row.isIndeterminate" v-model="scope.row.checkAll" @change="handleCheckAllChange(scope.$index, scope.row,scope.row[column.option])" >{{scope.row[column.value]}}</el-checkbox>
        <span v-else>{{scope.row[column.value]}}</span>
        <el-checkbox  v-if ="scope.row[column.act]"   :indeterminate="scope.row.isIndeterminate" v-model="scope.row.checkAll" @change="handleCheckAllChange1(scope.$index, scope.row,column.option)" >{{scope.row[column.act]}}</el-checkbox>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
  <footer>
    <el-button @click="getAuth">确定</el-button>
  </footer>
</div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval'
export default {
  name: 'treeTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 格式化数据源
    formatData: function () {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  created () {
    this.defaultSelcet()
  },
  methods: {
    showRow: function (row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function (trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow (index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    handleCheckAllChange (index, row, opt) {
      this.cc()

      if (row.selectchecked.length && row.selectchecked.length !== opt.length) {
        let arr = []
        opt.forEach(element => {
          arr.push(element.id)
        })
        row.selectchecked = arr
        row.checkAll = true
        row.isIndeterminate = false
      } else if (!row.selectchecked.length) {
        let arr = []
        opt.forEach(element => {
          arr.push(element.id)
        })
        row.selectchecked = arr
        row.checkAll = true
        row.isIndeterminate = false
      } else {
        row.selectchecked = []
        row.checkAll = false
        row.isIndeterminate = false
      }
    },
    handleCheckedCitiesChange (index, row, opt) {
      row.checkAll = row.selectchecked.length === opt.length
      row.isIndeterminate = row.selectchecked.length > 0 && row.selectchecked.length < opt.length
      this.cc()
    },
    handleCheckAllChange1 (index, row, opt) {
      if (row.children) {
        row.children.forEach(val => {
          let arr = []
          if (row.checkAll) {
            val[opt].forEach(element => {
              arr.push(element.id)
            })
            val.selectchecked = arr
            val.checkAll = true
            val.isIndeterminate = false
          } else {
            val.selectchecked = []
            val.checkAll = false
            val.isIndeterminate = false
          }
        })
      }
      this.cc()
    },
    defaultSelcet () {
      this.data.forEach(val => {
        if (val.children) {
          val.children.forEach(el => {
            if (el.selectchecked.length && el.selectchecked.length !== el[this.columns[0].option].length) {
              el.isIndeterminate = true
              el.checkAll = false
            } else if (el.selectchecked.length && el.selectchecked.length === el[this.columns[0].option].length) {
              el.isIndeterminate = false
              el.checkAll = true
            } else {
              el.isIndeterminate = false
              el.checkAll = false
            }
          })
          this.cc()
        }
      })
    },
    cc () {
      this.data.forEach(val => {
        let checkAllArr = []
        let isIndeterminateArr = []
        if (val.children) {
          val.children.forEach(el => {
            checkAllArr.push(el.checkAll)
            isIndeterminateArr.push(el.isIndeterminate)
          })
        }
        if (new Set(checkAllArr).size === 1) { // && new Set(isIndeterminateArr).size !== 1
          if (checkAllArr[0] && isIndeterminateArr[0] === false) {
            val.isIndeterminate = false
            val.checkAll = true
          } else if (checkAllArr[0] && new Set(isIndeterminateArr).size !== 1) {
            val.isIndeterminate = false
            val.checkAll = true
          } else if (!checkAllArr[0] && new Set(isIndeterminateArr).size !== 1) {
            val.isIndeterminate = true
            val.checkAll = false
          } else if (!checkAllArr[0] && new Set(isIndeterminateArr).size === 1) {
            if (!isIndeterminateArr[0]) {
              val.isIndeterminate = false
              val.checkAll = false
            } else {
              val.isIndeterminate = true
              val.checkAll = false
            }
          } else {
            val.isIndeterminate = false
            val.checkAll = false
          }
        } else {
          val.isIndeterminate = true
          val.checkAll = false
        }
      })
    },
    getAuth () {
      this.$emit('getAuth', this.data)
    }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  .el-table__body{
    text-align: left;
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  footer{
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }

  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }

</style>
