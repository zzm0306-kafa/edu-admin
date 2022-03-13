<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'create-menu' })"
          >添加菜单</el-button
        >
      </div>
      <!-- 通过表格形式进行展示菜单列表信息 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="菜单名称"> </el-table-column>
        <el-table-column prop="level" label="菜单级数"> </el-table-column>
        <!-- <el-table-column prop="href" label="路径"> </el-table-column> -->
        <el-table-column prop="icon" label="前端图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getAllMenu, deleteOneMenu } from '@/services/menu'
export default {
  name: 'MenuIndex',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    // 显示table里面菜单内容
    this.loadAllMenu()
  },
  methods: {
    // 删除菜单
    handleDelete (rowData) {
      // 添加删除提示功能
      this.$confirm('确定删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 这个根据id值删除，是通过scope.row来传递的
          const { data } = await deleteOneMenu(rowData.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenu()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑菜单
    handleEdit (rowData) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: rowData.id
        }
      })
    },
    // 获取菜单列表所有信息
    async loadAllMenu () {
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.tableData = data.data
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
