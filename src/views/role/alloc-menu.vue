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
      <el-button @click="onSet">清空</el-button>
      <el-button type="primary" @click="onSend">保存</el-button>
    </div>
    </el-card>
  </div>
</template>
<script>
// 引入分配菜单层级列表信息
import { getMenuNodeList, allocateRole, getRoleMenu } from '@/services/menu'
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
      },
      checkedKeys: []
    }
  },
  created () {
    // 获取菜单列表信息
    this.getMenuNode()
    // 获取分配菜单列表信息
    this.getRoleMenuList()
  },
  methods: {
    // 清空
    onSet () {
      this.$refs['menu-list'].setCheckedKeys([])
    },
    // 自己封装的用于数据筛选的方法（筛选出被选中菜单项的 ID）
    getCheckedKeys (menus) {
      // 遍历数据（将所有存在子节点的 node 排除，对子节点列表进行筛选）
      menus.forEach(menu => {
        // 未选中，结束
        if (!menu.selected) {
          return
        }
        // 检测是否存在子节点
        if (menu.subMenuList) {
          // 对子节点进行选中状态检测。结束
          return this.getCheckedKeys(menu.subMenuList)
        }
        // 说明为选中的叶子节点（不存在子节点的节点），存储 ID
        this.checkedKeys = [...this.checkedKeys, menu.id]
      })
    },
    // 分配菜单列表信息
    async getRoleMenuList () {
      const { data } = await getRoleMenu(this.roleId)
      if (data.code === '000000') {
        // 调用getCheckedKeys方法
        this.getCheckedKeys(data.data)
      }
    },
    // 保存分配菜单
    async onSend () {
      const { data } = await allocateRole({
        roleId: this.roleId,
        menuIdList: this.$refs['menu-list'].getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$message.success('分配菜单成功')
        this.$router.push({
          name: 'role'
        })
      }
    },
    async getMenuNode () {
      const { data } = await getMenuNodeList()
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
