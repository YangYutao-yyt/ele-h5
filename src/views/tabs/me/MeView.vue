<!-- 这个是我的的组件 -->
<script setup lang="ts">
import type { ISuperCard } from '@/types'
import { fetchMePageData } from '@/api/me'
import { useAsync } from '@/use/useAsync'
import OpLoadingView from '@/Components/OpLoadingView.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { data, pending } = useAsync(fetchMePageData, {
  cards: [],
  superCard: {} as ISuperCard
})
const gotoLogin = () => {
  // router，通过路由切换页面
  router.push({
    name: 'login'
  })
}
</script>

<template>
  <div class="me-page op-fullscreen">
    <!-- 顶部栏 -->
    <div class="me-page__top">
      <!-- 用户头像 -->
      <img class="avatar" src="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
      <!-- 名称 -->
      <div class="name" @click="gotoLogin">请登录</div>
      <!-- 按钮 -->
      <div class="account op-then-border" @click="gotoLogin">账号登录</div>
    </div>
    <!-- 加载组件 -->
    <OpLoadingView :loading="pending" type="skeleton">
      <!-- 会员框 -->
      <div class="me-page__super-card">
        <div class="super-card__left">
          <div class="super-card__left__top">
            <img class="card-img" src="@/assets/imgs/me_page/super-card.png" />
            <div class="divider"></div>
            <div class="bean">吃货豆：</div>
            <div class="bean-count">{{ data.superCard.beanCount }}</div>
          </div>
        </div>
        <VanIcon name="arrow" size="14" color="rgb(212,189,178)"></VanIcon>
      </div>
      <div class="me-page__card" v-for="v in data.cards" :key="v.label">
        <div class="me-page__card__title">{{ v.label }}</div>
        <div class="me-page__card__items">
          <div class="me-page__card__item" v-for="cv in v.items" :key="cv.iconUrl">
            <VanIcon :name="cv.iconUrl" :size="v.size"></VanIcon>
            <div class="label">
              {{ cv.label }}
              <span v-if="cv.count" class="count"> {{ cv.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </OpLoadingView>
  </div>
</template>
<style lang="scss" scoped>
.me-page {
  background: var(--op-gray-bg-color);
  padding: 0 10px 75px 10px;

  &__top {
    padding: 10px;
    display: flex;
    align-items: center;
    background: rgb(244, 244, 244);

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .name {
      flex: 1;
      font-size: 15px;
      text-align: left;
    }

    .account {
      color: rgb(33, 179, 244);
      font-size: 8px;
      padding: 1px 10px;

      &:before {
        border-color: rgb(33, 179, 244);
        border-radius: 50px;
      }
    }
  }

  &__super-card {
    border-radius: 8px;
    background: rgb(42, 33, 46);
    color: rgb(253, 208, 159);
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 20px;
    margin-bottom: 15px;

    .super-card__left {
      flex: 1;

      &__top {
        display: flex;
        align-items: center;

        .card-img {
          width: 81px;
          height: 23px;
        }

        .divider {
          position: relative;
          width: 1px;
          height: 20px;
          margin: 0 10px;

          &:before {
            content: '';
            position: absolute;
            top: -50%;
            left: 0;
            width: 200%;
            height: 200%;
            transform: scale(0.5);
            background: rgb(253, 208, 159);
          }
        }

        .bean {
          font-size: 12px;
          font-weight: bold;
          align-items: baseline;
        }

        .bean-count {
          font-weight: bold;
          font-size: 22px;
          line-height: 22px;
        }
      }

      &__tips {
        font-size: 12px;
        margin-top: 6px;
        color: rgb(212, 189, 178);
      }
    }
  }

  &__card {
    background: white;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;

    &__title {
      font-weight: bold;
    }

    &__items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    &__item {
      margin-top: 10px;
      text-align: center;

      .label {
        font-size: 12px;
        color: gray;
        margin-top: 5px;
      }

      .count {
        font-weight: bold;
        color: black;
      }
    }
  }
}
</style>
