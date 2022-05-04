import request from '@/utils/request'
export const getSectionAndLesson = data => {
  return request({
    method: 'get',
    url: '/boss/course/section/getSectionAndLesson',
    params: data
    // params: {
    //   courseId
    // }
  })
}
