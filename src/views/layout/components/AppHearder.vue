<template>
  <div class="app-header">
    <!-- 头部header导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <h3 v-for="(item,index) in $route.meta" :key="index">{{item}}</h3> -->
    <!-- 下拉列表信息 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :src="userInfo.portrait"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { getUser } from '@/services/user'
export default {
  name: 'AppHeader',
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      // 存储用户信息
      userInfo: {}
    }
  },
  methods: {
    // 加载用户信息
    async getUserInfo () {
      const { data } = await getUser()
      // 将data.content的值赋予userInfo
      this.userInfo = data.content
    },
    // 退出登录
    logout () {
      this.$confirm('确定要退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 1.将本地的setUser设为空
          this.$store.commit('setUser', null)
          // 2.清空后，跳转到login
          this.$router.push({ name: 'login' })
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
  // 定义header信息在右边
  justify-content: space-between;
}
//对下拉列表的小图标进行居中
.el-dropdown-link {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
