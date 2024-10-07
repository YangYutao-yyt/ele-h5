export interface IShop {
  activitys: IActivity[]
  branch: string
  comments: string[]
  deliveryDistance: string
  deliveryStrategy: string
  deliveryStratingPrice: string
  deliveryTags: string[]
  deliveryTime: string
  id: string
  monthlyCount: number
  postUrl: string
  bgUrl: string
  score: number
  services: IService[]
  shopName: string
  tops: string[]
}

export interface IService {
  type: number
  label: string
}

export interface IActivity {
  type: number
  tips?: string
  infos?: string[]
}

export interface IShopDetail extends IShop {
  // 公告
  announcement: string
  discounts: IDiscount[]
  // 红包
  redbags: IRedbag[]
}

// 优惠
export interface IDiscount {
  // 不同的类型
  type: number
  label: string
  // 具体优惠的内容
  content: IDiscountContent[]
}

export interface IRedbag {
  type: number
  count: number
  if: string
}

export interface IDiscountContent {
  count: number
  if: number
  limit: number
  label: string
}
