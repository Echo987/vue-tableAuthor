<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="菜单列表"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
        <el-checkbox :indeterminate="scope.row.isIndeterminate" v-model="scope.row.checkAll" @change="handleCheckAllChange(scope.$index, scope.row)">全选</el-checkbox>
      </template>
    </el-table-column>
    <el-table-column
      label="功能权限">
      <template slot-scope="scope">
        <el-checkbox-group v-model="scope.row.checked" @change="handleCheckedCitiesChange(scope.$index, scope.row)">
          <el-checkbox v-for="(interset,index) in scope.row.interset" :label="interset.description" :key="index">{{interset.description}}</el-checkbox>
        </el-checkbox-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '11',
        name: '权限列表',
        checkAll: false,
        address: '上海市普陀区金沙江路 1518 弄',
        checked: ['吃饭', '看电影'],
        isIndeterminate: true,
        interset: [{description: '吃饭'}, {description: '看电影'}, {description: '看书'}, {description: '旅游'}, {description: '健身'}]
      }, {
        date: '22',
        name: '操作',
        checked: [],
        checkAll: false,
        isIndeterminate: false,
        address: '上海市普陀区金沙江路 1517 弄',
        interset: [{description: '吃饭'}, {description: '看电影'}]
      }, {
        date: '33',
        name: '王小虎',
        checked: [],
        checkAll: false,
        isIndeterminate: false,
        address: '上海市普陀区金沙江路 1519 弄',
        interset: [{description: '吃饭'}, {description: '看电影'}, {description: '看书'}, {description: '旅游'}, {description: '健身'}]
      }, {
        date: '44',
        name: '王小虎',
        checked: [],
        checkAll: [],
        isIndeterminate: false,
        address: '上海市普陀区金沙江路 1516 弄',
        interset: [{description: '吃饭'}, {description: '看电影'}, {description: '看书'}, {description: '旅游'}, {description: '健身'}]
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleCheckAllChange (index, row) {
      console.log(index)
      console.log(row)
      // debugger
      if (row.checked.length && row.checked.length !== row.interset.length) {
        row.checked = row.interset
        row.checkAll = true
        row.isIndeterminate = false
      } else if (!row.checked.length) {
        row.checked = row.interset
        row.checkAll = true
        row.isIndeterminate = false
      } else {
        row.checked = []
        row.checkAll = false
        row.isIndeterminate = false
      }

      // if (!row.checked.length) {
      //   row.checked = []
      //   row.checkAll = false
      //   row.isIndeterminate = false
      // } else {
      //   row.checked = row.interset
      //   row.checkAll = true
      //   row.isIndeterminate = false
      // }
      // this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (index, row) {
      console.log(row)
      row.checkAll = row.checked.length === row.interset.length
      row.isIndeterminate = row.checked.length > 0 && row.checked.length < row.interset.length
      // console.log(value)
      // let Len = this.handleGetChecked()
      // console.log(Len)
      // let checkedCount = value.length

      // this.checkAll = checkedCount === this.cities.length
    }
    // handleGetChecked (row) {
    //   console.log(row)
    //   return row.interset
    // }
  }
}
</script>
<style>
 .el-table--enable-row-transition .el-table__body td{
   text-align: left;
 }
 .el-table--enable-row-transition .el-table__body tr{
   text-align: left;
 }
</style>
