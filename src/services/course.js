import request from '@/utils/request'
// 课程分页信息
export const getQueryCourses = data => {
  return request({
    method: 'post',
    url: '/boss/course/getQueryCourses',
    data
  })
}
// 课程上下架状态改变
export const changeCourse = data => {
  return request({
    method: 'get',
    url: '/boss/course/changeState',
    params: data
  })
}
// 添加课程
export const getsaveOrUpdateCourse = data => {
  return request({
    method: 'post',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}
// 上传图片
export const uploadCourse = (data, onUploadProgress) => {
  return request({
    method: 'post',
    url: '/boss/course/upload',
    data,
    // Axios 将 HTML5 新增的上传进度事件：progres
    onUploadProgress
  })
}
// 通过课程Id获取课程信息
export const getCourseById = courseId => {
  return request({
    method: 'get',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
