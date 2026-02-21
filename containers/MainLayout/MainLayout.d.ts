export declare interface PageMeta {
  endpoint?: string
  description?: string
  keywords?: string[]
  imageUrl?: string
}

export declare interface MainLayoutProps {
  pageTitle?: string
  customHero?: React.ReactElement
  pageMeta: PageMeta
  showProgress?: boolean
  progress?: number
}
