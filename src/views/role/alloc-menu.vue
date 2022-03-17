<template>
  <div class="alloc-menu">
    <el-card>
      <el-tree
        :data="menus"
        :props="defaultProps"
        default-expand-all
        show-checkbox
        @node-click="handleNodeClick"
    ></el-tree>
    </el-card>
  </div>
</template>
<script>
// 引入分配菜单层级列表信息
import { getMenuNodeList } from '@/services/menu'
export default {
  name: 'AllocMenu',
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
      }
    }
  },
  created () {
    this.getMenuNode()
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    async getMenuNode () {
      const { data } = await getMenuNodeList()
      console.log(data)
      if (data.code === '000000') {
        this.menus = data.data
      }
    }
  }
}
</script>
