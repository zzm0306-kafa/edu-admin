import request from '@/utils/request'
import qs from 'qs'
// 对用户接口进行封装
export const login = data => {
  return request({
    method: 'post',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}
