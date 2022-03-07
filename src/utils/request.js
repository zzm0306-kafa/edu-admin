import axios from 'axios'
// 创建axios
const request = axios.create({
  // timeout: 2000
})
// 创getBaseURL方法来处理不同用户url
function getBaseURL (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagounews.com'
  } else {
    return 'http://edufront.lagounews.com'
  }
}
// 创建拦截器
request.interceptors.request.use((config) => {
  // 判断拦截在不同的前台和后台的url
  config.baseURL = getBaseURL(config.url)
  return config
})
export default request
