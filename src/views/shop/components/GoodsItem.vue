<script setup lang="ts">
import type { IGood } from '@/types'
import { useRouter } from 'vue-router'
import CartControl from './CartControl.vue'

interface IProps {
  data: IGood
}
const props = defineProps<IProps>()
const router = useRouter()
// 跳转到商品详情页
const gotoGoods = () => {
  router.push({
    name: 'goods',
    params: { id: props.data.id }
  })
}
</script>
<template>
  <div class="shop-goods-item" @click="gotoGoods">
    <img class="img" v-lazy="data.imgUrl" />
    <div class="content">
      <div class="name">{{ data.name }}</div>
      <div class="tips op-ellipsis" v-if="data.tips">{{ data.tips }}</div>
      <div class="extra">
        <span class="count">月售{{ data.sellCount }}份</span>
        <span>评分{{ data.rating }}</span>
      </div>
      <div class="price">
        <div class="now">
          ￥<span>{{ data.price }}</span>
        </div>
        <div class="old">￥{{ data.oldPrice }}</div>
      </div>
      <!-- 购物车添加和删除的组件 -->
      <div class="cart-control-wrapper">
        <CartControl :data="data"></CartControl>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shop-goods-item {
  display: flex;
  font-size: 12px;
  margin-bottom: 20px;

  .img {
    width: 85px;
    height: 85px;
    border-radius: 5px;
  }

  .content {
    flex: 1;
    margin-left: 10px;
    position: relative;

    .name {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 4px;
    }

    .tips {
      width: 180px;
      color: gray;
      margin-bottom: 4px;
    }

    .extra {
      color: gray;
      margin-bottom: 4px;

      .count {
        margin-right: 6px;
      }
    }

    .price {
      display: flex;
      align-items: baseline;
      margin-top: 18px;

      .now {
        color: red;
        margin-right: 4px;

        span {
          font-size: 18px;
        }
      }

      .old {
        color: gray;
        text-decoration: line-through;
      }
    }

    .cart-control-wrapper {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
