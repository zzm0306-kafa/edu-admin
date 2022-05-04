<template>
  <div class="coures-list">
    <el-card>
      <!-- 表单查询区域 -->
      <div slot="header">
        <span>课程查询</span>
      </div>
      <el-form :inline="true" :model="filterParams" class="demo-form-inline">
        <el-form-item label="课程名称" prop="courseName">
          <el-input
            v-model="filterParams.courseName"
            placeholder="请输入查询课程"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="filterParams.status" placeholder="活动区域">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="isLoading" @click="handleReset">重置</el-button>
          <el-button :disabled="isLoading" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 课程列表信息区域 -->
    <el-card style="margin-top: 20px">
      <div slot="header">
        <span>查询结果:</span>
        <el-button
          style="float: right; margin-top: -10px"
          @click="$router.push({
            name: 'create-course'
          })">添加课程</el-button>
      </div>
      <el-table
        :data="courses"
        v-loading="isLoading"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column prop="id" label="课程ID" width="100"> </el-table-column>
        <el-table-column prop="courseName" label="课程名称" width="230">
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="sortNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="状态名称">
            <template slot-scope="scope">
              <span>{{ scope.row.status | statusFilter }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="status" label="上架状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStatusLoading"
              @change="onStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              @click="
                $router.push({
                  name: 'course-edit',
                  params: {
                    courseId: scope.row.id,
                  },
                })
              "
              >编辑</el-button
            >
            <el-button
              @click="
                $router.push({
                  name: 'course-section',
                  params: {
                    courseId: scope.row.id,
                  },
                })
              "
              >内容管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页区域 -->
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="totalCount"
      :disabled="isLoading"
      :page-size="20"
      :current-page="filterParams.currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import { getQueryCourses, changeCourse } from '@/services/course'
export default {
  // inject: ['reload'],
  name: 'CouresList',
  data () {
    return {
      filterParams: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 20,
        statusName: ''
      },
      courses: [],
      totalCount: 0,
      // 加载状态
      isLoading: false
    }
  },
  created () {
    // 加载课程信息
    this.loadCourse()
  },
  methods: {
    // 修改课程上下架
    async onStateChange (course) {
      // course.isStatusLoading = true
      const { data } = await changeCourse({
        courseId: course.id,
        status: course.status
      })
      if (data.code === '000000') {
        this.$message.success(`${course.status === 1 ? '上架成功' : '下架成功'}`)
        course.isStatusLoading = false
      }
    },
    // 加载课程列表信息
    async loadCourse () {
      const { data } = await getQueryCourses(this.filterParams)
      this.isLoading = true
      if (data.code === '000000') {
        data.data.records.forEach(item => {
          item.isStatusLoading = false
        })
        this.courses = data.data.records
        this.totalCount = data.data.total
        this.isLoading = false
      }
    },
    // 重置
    handleReset () {},
    // 查询
    onSubmit () {
      this.loadCourse()
      this.isLoading = false
    },
    // 分页
    handleCurrentChange (page) {
      this.filterParams.currentPage = page
      this.loadCourse()
    }
  },
  filters: {
    statusFilter (status) {
      return status === 1 ? '上架' : '下架'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
