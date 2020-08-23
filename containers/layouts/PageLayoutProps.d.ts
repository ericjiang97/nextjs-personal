export interface PageLayoutProps {
  title: string;
  pageMeta: PageMeta;
  banner?: JSX.Element | JSX.Element[];
  isExperimental?: boolean;
  ignoreHorizontalPadding?: boolean;
  inChildrenInContainer?: boolean;
}

export interface PageMeta {
  endpoint?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
}

export interface PageInnerProps {
  title?: string;
  pageMeta: PageMeta;
  banner?: JSX.Element | JSX.Element[];
  inChildrenInContainer?: boolean;
}
