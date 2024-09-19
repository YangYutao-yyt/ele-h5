// 这个文件用来设置search的发送请求
import axios from './base'
// 引入定义的类型
import type { ISearchResultList } from '@/types'

export function fetchSearchData(key = '') {
  // 返回一个promise
  // 注意定义返回值类型
  // 为什么要定义两次：https://coding.imooc.com/learn/questiondetail/AKpB2PJgA9nYbv0E.html
  // 主要为了方便拦截器处理
  return axios.get<ISearchResultList, ISearchResultList>('home_search', {
    params: { _label_like: key }
  })
}
