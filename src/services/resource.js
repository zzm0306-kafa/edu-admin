import request from '@/utils/request'
// 获取资源列表信息
export const getresourceList = data => {
  return request({
    method: 'post',
    url: '/boss/resource/getResourcePages',
    data
  })
}
