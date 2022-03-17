import request from '@/utils/request'
// 获取上一级菜单
export const getMenuInfo = (id = -1) => {
  return request({
    method: 'get',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}
// 添加菜单信息
export const crerateMenu = data => {
  return request({
    method: 'post',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}
// 获取菜单列表信息
export const getAllMenu = () => {
  return request({
    method: 'get',
    url: '/boss/menu/getAll'
  })
}
// 删除列表中菜单信息
export const deleteOneMenu = id => {
  return request({
    method: 'delete',
    url: `/boss/menu/${id}`
  })
}
// 获取所有菜单并按层级展示
export const getMenuNodeList = () => {
  return request({
    method: 'get',
    url: '/boss/menu/getMenuNodeList'
  })
}
