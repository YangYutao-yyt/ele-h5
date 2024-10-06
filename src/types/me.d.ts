export interface IMeInfo {
  cards: ICard[]
  superCard: ISuperCard
}

export interface ICard {
  label: string
  // 图标的大小
  size: number
  items: IItem[]
}

export interface IItem {
  count: number
  // 图标url
  iconUrl: string
  // icon下面的文案
  label: string
}

export interface ISuperCard {
  beanCount: number
  tips: string
}
