import request from '@/utils/request'
export const getAllAds = params => {
  return request({
    method: 'get',
    url: '/front/ad/getAllAds',
    params
  })
}
