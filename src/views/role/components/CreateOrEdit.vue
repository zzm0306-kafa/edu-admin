<template>
  <div class="create-or-edit">
    <el-form>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="role.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit2">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAddRole, getRoleById } from '@/services/role'
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: [Number, String]
    }
  },
  name: 'CreateEdit',
  data () {
    return {
      role: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadRole()
    }
  },
  methods: {
    // 获取当前编辑框内容信息
    async loadRole () {
      const { data } = await getRoleById(this.roleId)
      if (data.code === '000000') {
        this.role = data.data
      }
    },
    onCancel () {
      // 设置取消状态，让父组件处理
      this.$emit('cancel')
      this.role = {}
    },
    // 添加角色信息
    async onSubmit2 () {
      const { data } = await getAddRole(this.role)
      if (data.code === '000000') {
        this.$emit('success')
        this.$message.success('添加成功')
        this.role = {}
      }
    }
  }
}
</script>
