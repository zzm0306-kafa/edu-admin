import request from '@/utils/request'
import qs from 'qs'
// import store from '@/store'
// 对用户接口进行封装
export const login = data => {
  return request({
    method: 'post',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}
// 用户信息展示
export const getUser = () => {
  return request({
    method: 'get',
    url: '/front/user/getInfo'
  })
}
// 用户分页列表信息
export const getUserPagesInfo = data => {
  return request({
    method: 'post',
    url: '/boss/user/getUserPages',
    data
  })
}
// 禁用用户
export const setforbidUser = data => {
  return request({
    method: 'post',
    url: '/boss/user/forbidUser',
    data
  })
}
