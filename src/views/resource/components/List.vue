<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          :model="form"
          ref="form"
          class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input
              v-model="form.name"
              clearable
              placeholder="请输入资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input
              v-model="form.url"
              clearable
              placeholder="请输入资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select
              v-model="form.categoryId"
              clearable
              placeholder="选择资源分类">
              <el-option
                v-for="item in categoryIdlist"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="onReset"
            >重置
            </el-button>
            <el-button
              type="primary"
              :disabled="loading"
              @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 添加资源菜单 -->
      <el-button @click="$router.push({ name: 'create-resource' })">添加菜单</el-button>
      <!-- 显示资源列表信息 -->
        <el-table
          :data="resourceData"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="编号"
            width="180"
            type="index">
          </el-table-column>
          <el-table-column
            prop="name"
            label="资源名称">
          </el-table-column>
           <el-table-column
            prop="url"
            label="资源路径">
          </el-table-column>
           <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column
            label="添加时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createdTime | dateFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
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
      <!-- 添加分页 -->
      <el-pagination
        :disabled="loading"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getresourceList, getResourceCategoryId, deleteResource } from '@/services/resource'
export default {
  name: 'ListIndex',
  data () {
    return {
      form: {
        // 当前页号
        current: 1,
        // 每页条数，设置10条
        size: 10,
        // 资源名称名称
        name: '',
        // 分类categoryId
        categoryId: '',
        // 资源路径
        url: ''
      },
      // 存储资源分类信息
      categoryIdlist: [],
      // 设置总条数
      totalCount: 0,
      resourceData: [],
      // 数据加载显示
      loading: false
    }
  },
  created () {
    // 加载资源列表信息
    this.loadReasource()
    // 加载资源分类信息
    this.loadReasourceCategory()
  },
  methods: {
    // 清空搜索表单内容
    onReset () {
      this.$refs.form.resetFields()
    },
    onSubmit () {
      // 将当前页号恢复到1
      this.form.current = 1
      this.loadReasource()
    },
    // 资源分类信息
    async loadReasourceCategory () {
      const { data } = await getResourceCategoryId()
      this.categoryIdlist = data.data
    },
    // 随着条数改变，页数随之改变
    handleSizeChange (val) {
      // 将val同步给size
      this.form.size = val
      this.current = 1
      this.loadReasource()
    },
    // 随着页数变化时触发
    handleCurrentChange (val) {
      this.form.current = val
      this.loadReasource()
    },
    // 加载资源列表信息
    async loadReasource () {
      this.loading = true
      const { data } = await getresourceList(this.form)
      if (data.code === '000000') {
        this.resourceData = data.data.records
        this.totalCount = data.data.total
        this.loading = false
      }
    },
    // 编辑资源功能
    handleEdit (rowDate) {
      this.$router.push({
        name: 'resource-edit',
        params: {
          id: rowDate.id
        }
      })
    },
    // 删除资源功能
    handleDelete (rowDate) {
      this.$confirm('确定删除资源信息吗', '资源删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await deleteResource(rowDate.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadReasource()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
<style lang="scss">
  .el-pagination {
    padding-top: 20px;
  }
</style>
