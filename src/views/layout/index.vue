<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <!-- 引⼊ AddAside 组件 -->
      <app-aside></app-aside>
    </el-aside>
    <!-- 内容区 -->
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHearder'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
}
</script>
<style lang="scss">
.el-container {
  height: 100vh;
  min-width: 980px;
}
.el-aside {
  background-color: rgb(84, 92, 100);
}
.el-header {
  background-color:#fff;
}
.el-main {
  background-color: #e9eef3;
}
</style>
