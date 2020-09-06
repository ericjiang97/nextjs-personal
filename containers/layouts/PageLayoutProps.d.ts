export interface PageLayoutProps extends PageInnerProps {
  isExperimental?: boolean;
  ignoreHorizontalPadding?: boolean;
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
  isChildrenPadded?: boolean;
  backgroundImageUri?: string;
}
