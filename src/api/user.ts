import type { IAuth, ILoginInfo } from '@/types'
import axios from './base'

export const auth = ({ username, password }: ILoginInfo) => {
  return axios.post<IAuth, IAuth>('auth', {
    username,
    password
  })
}
