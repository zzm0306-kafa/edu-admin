<template>
  <div class="create-or-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? "编辑菜单" : "添加菜单" }}</span>
      </div>
      <el-form
        :rules="rules"
        ref="form"
        :model="form"
        label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择活动区域">
            <!-- ⽆上级菜单选项 -->
            <el-option :value="-1" label="⽆上级菜单"></el-option>
            <el-option
              v-for="item in parentMenuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.orderNum"
            label="描述⽂字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getMenuInfo, crerateMenu } from '@/services/menu'
export default {
  name: 'CreateOrEdit',
  // 接收父组件传值，判断是添加还是编辑
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        href: [
          { required: true, message: '请输入路径', trigger: 'blur' }
        ]
      },
      // 存储上级菜单信息
      parentMenuList: []
    }
  },
  created () {
    // 加载上一级菜单信息
    this.loadInfo()
  },
  methods: {
    // 添加菜单
    async onSubmit () {
      try {
        // 表单名称和路径不能为空
        await this.$refs.form.validate()
        // 添加菜单请求
        const { data } = await crerateMenu(this.form)
        // 处理响应
        if (data.code === '000000') {
          this.$message.success('添加菜单成功')
          this.$router.push({
            name: 'menu'
          })
        }
      } catch (err) {
        this.$message.error('信息不能为空哦')
      }
      // const { data } = await crerateMenu(this.form)
      // if (data.code === '000000') {
      //   this.$message.success('提交成功')
      //   //  添加完成数据，跳转回菜单页面
      //   this.$router.push({
      //     name: 'menu'
      //   })
      // }
    },
    // 加载上级菜单信息方法
    async loadInfo () {
      // 检测路由是否存在id
      const id = this.$route.params.id || -1
      // 请求上一级菜单
      const { data } = await getMenuInfo(id)
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
        // 检测菜单数据是否存在menuInfo,如果有将数据传给form
        if (data.data.menuInfo) {
          this.form = data.data.menuInfo
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
