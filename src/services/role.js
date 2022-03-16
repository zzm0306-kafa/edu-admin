import request from '@/utils/request'
// 查询角色列表信息
export const getRoleAll = data => {
  return request({
    method: 'post',
    url: '/boss/role/getRolePages',
    data
  })
}
// 删除角色信息
export const deleteRole = id => {
  return request({
    method: 'delete',
    url: `/boss/role/${id}`
  })
}
// 添加角色信息
export const getAddRole = data => {
  return request({
    method: 'post',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
// 获取角色id来判断更新
export const getRoleById = id => {
  return request({
    method: 'get',
    url: `/boss/role/${id}`
  })
}
