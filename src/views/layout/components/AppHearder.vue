<template>
  <div class="app-header">
    <!-- 头部header导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>广告管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下拉列表信息 -->
    <el-dropdown>
      <span class="el-dropdown-link">
         <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户信息</el-dropdown-item>
        <el-dropdown-item divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'AppHeader'
}
</script>
<style lang="scss">
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
