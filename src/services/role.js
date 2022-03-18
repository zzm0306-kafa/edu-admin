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
// 获取所有角色
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}
// 给用户分配角色
export const allocateUserRoles = data => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
// 查询用户角色
export const getUserRoles = userId => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
