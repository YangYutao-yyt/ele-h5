// .d.ts 是什么意思，这个表示这种文件是 typescript 的类型文件，是专门来定义 typescript 的类型的。
//第二个问题是为什么可以省略 .d.ts 后缀，因为这个跟省略 .js .ts 的文件后缀是类似的，
//.d.ts 也是可以省略的，框架会自动查找到 home.d.ts 文件
export interface ISearchRecomment {
  value: number
  label: string
}

export interface ISearchResultList {
  list: ISearchResult[]
}

export interface ISearchResult {
  type: number
  label: string
  resultCount: number
}
