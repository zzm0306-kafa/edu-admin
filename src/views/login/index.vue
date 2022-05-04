<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      label-position="top"
      :rules="rules"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
        :loading="loadingchecked"
        @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import request from '@/utils/request'
// 引入处理json文件
// import qs from 'qs'
import { login } from '@/services/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      // 按钮进行加载变量
      loadingchecked: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '输入的是非法手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '请输入5~10位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      // 1.表单验证
      try {
        await this.$refs.form.validate()
        this.loadingchecked = true
        // 2.发送请求
        // const { data } = await request({
        //   method: 'post',
        //   url: '/front/user/login',
        //   // axios 的请求参数默认为 application/json 格式，⽽接⼝需要 x-www-form-urlencoded 格式，导致请求参数处理失败。
        //   data: qs.stringify(this.form)
        // })
        const { data } = await login(this.form)
        this.loadingchecked = false
        // 3.处理响应
        if (data.state === 1) {
          // 对用户信息存储
          this.$store.commit('setUser', data.content)
          // 4.通过路由跳转到首页
          // this.$router.push({
          //   name: 'home'
          // })
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          // 5.登录失败提示
          this.$message.error('登录失败')
        }
      } catch (err) {
        this.$message.error('信息不能为空哦')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
}
.el-button {
  width: 100%;
}
</style>
