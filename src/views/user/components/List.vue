<template>
  <div class="user-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 表单查询 -->
        <el-form
          :inline="true"
          :model="filterParams"
          ref="filter-form">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="filterParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="filterParams.rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="isLoading"
            @click="handleReset"
          >重置</el-button>
          <el-button
            type="primary"
            @click="handleQuery"
            :disabled="isLoading"
          >查询</el-button>
        </el-form-item>
      </el-form>
      </div>
    <!-- 表格信息 -->
    <el-table
      :data="users"
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column
        prop="id"
        label="用户ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="头像"
        width="100">
        <template slot-scope="scope">
          <img width="30px" :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
          label="注册时间"
          prop="createTime"
      >
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFilter }}</span>
          </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="ENABLE"
            inactive-value="DISABLE"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleForbidUser(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleSelectRole(scope.row)"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出层 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="33%">
      <!-- 下拉菜单组件位置 -->
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocRole">确 定</el-button>
      </span>
    </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getUserPagesInfo, setforbidUser } from '@/services/user'
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role'
export default {
  name: 'UserList',
  data () {
    return {
    // 存储用户信息
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      isLoading: false,
      // 存储下拉列表角色信息
      roles: [],
      // 选中选项的 ID 组成的数组
      roleIdList: [],
      // 用于控制分配角色对话框是否显示
      dialogVisible: false,
      // 当前要进行角色分配的用户 ID
      currentRoleID: null
    }
  },
  created () {
    this.getUserPages()
  },
  methods: {
    // 加载用户列表信息
    async getUserPages () {
      this.isLoading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPagesInfo(this.filterParams)
      if (data.code === '000000') {
        this.users = data.data.records
        this.isLoading = false
      }
    },
    // 查询表单
    handleQuery () {
      this.filterParams.currentPage = 1
      this.getUserPages()
      this.isLoading = true
    },
    // 清除表单内容
    handleReset () {
      this.$refs['filter-form'].resetFields()
    },
    // 点击用户的分配角色按钮
    async handleSelectRole (userInfo) {
      this.currentRoleID = userInfo.id
      const { data } = await getAllRoles()
      this.dialogVisible = true
      if (data.code === '000000') {
        this.roles = data.data
      }
      // 请求当前用户的已分配角色信息,解构赋值
      const { data: data2 } = await getUserRoles(userInfo.id)
      if (data2.code === '000000') {
        this.roleIdList = data2.data.map(item => item.id)
      }
    },
    // 提交分配
    async handleAllocRole () {
      const { data } = await allocateUserRoles({
        userId: this.currentRoleID,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('分配角色成功')
        this.dialogVisible = false
      }
    },
    // 权限控制
    async handleForbidUser (userId) {
      const { date } = await setforbidUser(userId.id)
      console.log(date)
    }
  },
  filters: {
    dateFilter (date) {
      const dt = new Date(date)
      return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}  
      ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
    }
  }
}
</script>
