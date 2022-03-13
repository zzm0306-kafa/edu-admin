<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="resourceData" style="width: 100%">
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
      </div>
    </el-card>
  </div>
</template>
<script>
import { getresourceList } from '@/services/resource'
export default {
  name: 'ListIndex',
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      resourceData: []
    }
  },
  created () {
    this.loadReasource()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    // 加载资源列表信息
    async loadReasource () {
      const { data } = await getresourceList({})
      if (data.code === '000000') {
        this.resourceData = data.data.records
      }
      console.log(data)
    },
    // 编辑资源功能
    handleEdit () {},
    // 删除资源功能
    handleDelete () {}
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
</style>
