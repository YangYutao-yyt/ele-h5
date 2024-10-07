export interface IGood {
  cartCount: number
  checked: boolean
  discount: IGoodDiscount
  id: number
  imgUrl: string
  name: string
  oldPrice: number
  price: number
  rating: number
  sellCount: number
  tips: string
}

export interface IGoodDiscount {
  type: number
  limitCount: number
}

export interface IMenu {
  value: number
  label: string
  icon: string
  goods: IGood[]
}

export interface IMenuList {
  // 一个类型id
  shopId: number
  // 返回的数组
  data: IMenu[]
}
