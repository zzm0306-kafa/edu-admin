<template>
  <div class="alloc-menu">
    <el-card>
      <el-tree
        ref="menu-list"
        node-key="id"
        :data="menus"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="checkedKeys"
        show-checkbox
    ></el-tree>
    <div class="btn">
      <el-button>清空</el-button>
      <el-button type="primary">保存</el-button>
    </div>
    </el-card>
  </div>
</template>
<script>
// 引入分配菜单层级列表信息
import { getResourceCategoryId } from '@/services/resource'
export default {
  name: 'AllocResource',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    this.getResourceList()
  },
  methods: {
    async getResourceList () {
      const { data } = await getResourceCategoryId(this.roleId)
      // console.log(data)
      if (data.code === '000000') {
        this.menus = data.data
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  margin: 20px;
}
</style>
