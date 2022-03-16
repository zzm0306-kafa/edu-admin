<template>
  <div class="create-resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加资源信息</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="资源分类">
          <el-select v-model="ruleForm.categoryId" placeholder="请选择资源名称">
            <el-option
              v-for="item in categoryArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getResourceCategoryId, createResource } from '@/services/resource'
export default {
  name: 'CreateResource',
  // 接收父组件传值，判断是添加还是编辑
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ruleForm: {
        name: '',
        url: '',
        description: '',
        categoryId: ''
      },
      // 定义一个存储资源分类数组
      categoryArr: [],
      rules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入资源路径', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入资源介绍', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 加载添加资源中资源分类信息
    this.loadCatrgoryInfo()
  },
  methods: {
    // 添加资源信息
    async submitForm () {
      try {
        await this.$refs.ruleForm.validate()
        const { data } = await createResource(this.ruleForm)
        if (data.code === '000000') {
          this.$message.success('资源添加成功')
          this.$router.push({
            name: 'resource'
          })
        }
      } catch (err) {
        this.$message.info('信息不能为空')
      }
    },
    resetForm (ruleForm) {
      this.$refs[ruleForm].resetFields()
    },
    // 加载添加资源表单的分类下拉框信息
    async loadCatrgoryInfo () {
      const { data } = await getResourceCategoryId()
      this.categoryArr = data.data
    }
  }
}
</script>
<style lang="scss">
</style>
