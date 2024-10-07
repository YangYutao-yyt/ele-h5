import type { IUserInfo } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@/use/useLocalStorage'

// 默认的初始值
const getDefaultUserInfo: () => IUserInfo = () => ({
  id: '',
  avatar: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
  nickname: '请登录'
})

export interface IUserState {
  userInfo: IUserInfo
  token: string
}

export const useUserStore = defineStore('user', () => {
  const {
    value: $userInfo,
    setValue: $setUserInfoValue,
    removeItem: $removeUserInfoItem
  } = useLocalStorage('userInfo', getDefaultUserInfo())

  const { setValue: $setTokenValue, removeItem: $removeTokenItem } = useLocalStorage('token', '')

  const state = ref({
    userInfo: getDefaultUserInfo(),
    token: ''
  })

  const getUserInfo = computed(() => {
    // 如果state的内容是空的
    if (!state.value.userInfo || !state.value.userInfo.id) {
      // 调用localstorage的数据
      state.value.userInfo = $userInfo.value
    }
    return state.value.userInfo
  })

  const setInfo = ({ token, userInfo }: IUserState) => {
    state.value.userInfo = userInfo

    state.value.token = token
    $setUserInfoValue(userInfo)
    $setTokenValue(token)
  }

  const removeInfo = () => {
    state.value.userInfo = getDefaultUserInfo()
    state.value.token = ''
    $removeUserInfoItem()
    $removeTokenItem()
  }
  return {
    state,
    getUserInfo,
    setInfo,
    removeInfo
  }
})
