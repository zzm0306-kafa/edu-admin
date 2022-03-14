import request from '@/utils/request'
// 获取资源列表信息
export const getresourceList = data => {
  return request({
    method: 'post',
    url: '/boss/resource/getResourcePages',
    data
  })
}
// 查询资源分类信息
export const getResourceCategoryId = (id) => {
  return request({
    method: 'get',
    url: '/boss/resource/category/getAll',
    params: {
      id
    }
  })
}
// 添加资源信息
export const createResource = data => {
  return request({
    method: 'post',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
// 删除资源信息
export const deleteResource = id => {
  return request({
    method: 'delete',
    url: `/boss/resource/${id}`
  })
}
