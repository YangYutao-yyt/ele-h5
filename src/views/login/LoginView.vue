<script setup lang="ts">
import type { ILoginInfo } from '@/types'
import { ref } from 'vue'
import { useAuth } from '@/use/useAuth'

const username = ref('')
const password = ref('')
// 回到上个页面
const onClickLeft = () => history.back()

const { login } = useAuth()
// 登录,data是传入的账号密码
const onSubmit = async (data: ILoginInfo) => {
  await login(data)
  onClickLeft()
}
</script>
<template>
  <div class="login-page op-fullscreen">
    <VanNavBar title="请登录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <VanForm class="login-page__form" @submit="onSubmit">
      <VanCellGroup inset>
        <VanField
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <VanField
          v-model="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </VanCellGroup>
      <div style="margin: 16px">
        <VanButton round block type="primary" native-type="submit">提交</VanButton>
      </div>
    </VanForm>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  .login-page__form {
    margin-top: 100px;
  }
}
</style>
