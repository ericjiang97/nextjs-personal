export interface PageMeta {
  endpoint?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
}

interface MainLayoutProps {
  showHero?: boolean;
  pageTitle?: string;
  customHero?: React.ReactElement;
  pageMeta: PageMeta;
}
