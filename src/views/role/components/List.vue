<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 表单查询 -->
        <span>筛选搜索</span>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="输入搜索:">
            <el-input v-model="form.name" placeholder="角色名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="loading">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 添加菜单 -->
      <el-button @click="handleAdd">添加菜单</el-button>
      <!-- 角色列表展示 -->
      <el-table
        :data="roleData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
      >
        <el-table-column prop="id" label="编号" width="180" type="index">
        </el-table-column>
        <el-table-column prop="name" label="角色名称"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dateFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
           <div>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配菜单</el-button>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配资源</el-button>
            </div>
            <div>
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="isEdit ? '编辑角色' : '添加角色'"
        :visible.sync="dialogVisible"
        v-if='dialogVisible'
        width="30%"
      >
      <!-- 将添加与编辑功能单独封装到组件中 -->
      <create-or-edit
        :is-edit="isEdit"
        :role-id="roleId"
        @success="handleSuccess"
        @cancel="handleCancel"
      ></create-or-edit>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getRoleAll, deleteRole } from '@/services/role'
import CreateOrEdit from './CreateOrEdit'
export default {
  name: 'RoleIndex',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      form: {
        name: '',
        size: 10000
      },
      // 存储角色数据
      roleData: [],
      // 控制加载信息
      loading: false,
      // 控制提示框
      dialogVisible: false,
      // 控制对话框的功能状态
      isEdit: false,
      // 获取当前编辑信息
      roleId: ''
    }
  },
  created () {
    this.loadRoleInfo()
  },
  methods: {
    // 点击添加按钮触发
    handleAdd () {
      this.dialogVisible = true
      this.isEdit = false
    },
    // 监听子组件取消状态
    handleCancel () {
      this.dialogVisible = false
    },
    // 监听子组件的添加状态，成功时触发
    handleSuccess () {
      this.dialogVisible = false
      this.loadRoleInfo()
    },
    // 编辑功能
    handleEdit (role) {
      this.isEdit = true
      this.dialogVisible = true
      this.roleId = role.id
    },
    // 删除信息
    handleDelete (row) {
      this.$confirm('要删除这条信息吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await deleteRole(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadRoleInfo()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 加载角色列表信息
    async loadRoleInfo () {
      this.loading = true
      const { data } = await getRoleAll(this.form)
      if (data.code === '000000') {
        this.roleData = data.data.records
        this.loading = false
      }
    },
    onSubmit () {
      this.loadRoleInfo()
    }
  },
  filters: {
    dateFilter (date) {
      const dt = new Date(date)
      return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
