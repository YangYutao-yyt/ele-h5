import axios from 'axios'
import { showDialog } from 'vant'

const instance = axios.create({
  // 用于设置请求前缀，每个用这个实例创建的请求的url前面都会带上api
  baseURL: '/api'
})

// 设置拦截器
instance.interceptors.response.use((response) => {
  const { data: _data } = response
  const { data, code, msg } = _data
  // 通过code是否等于0来判断成功还是失败
  if (code !== 0) {
    //注意这里的 showDialog，是vant组件库中的弹窗
    showDialog({
      message: msg
    }).then(() => {
      // 关闭弹窗的逻辑
    })
    return Promise.reject(msg)
  }
  return data
})

export default instance
