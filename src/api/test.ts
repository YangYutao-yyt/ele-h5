// 引入前缀
import axios from './base'

export const fetchTest = () => {
  return axios.get('test')
  // 这里会合并请求的url /api/test
}
