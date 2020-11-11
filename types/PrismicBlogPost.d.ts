import { RichTextBlock } from 'prismic-reactjs';

export type PrismicDocumentTypes = 'blog-post';

export interface PrismicImage {
  dimensions: { width: number; height: number };
  alt: string;
  copyright: string;
  url: string;
}

export interface PrismicBlogPost<T> {
  title: RichTextBlock[];
  author: RichTextBlock[];
  preview: boolean;
  published_time: string;
  summary: RichTextBlock[];
  body: any;
  banner?: PrismicImage;
  category: PrismicBlogPostCategory<T>;
}

export interface PrismicBlogPostCategory<T> {
  id: string;
  type: 'category';
  tags: string[];
  slug: string;
  lang: string;
  uid: string;
  link_type: 'Document';
  isBroken: false;
  data: T;
}

export interface PrismicBlogCategory {
  id: string;
  category_name: string;
}

export interface PrismicQueryResults<T> {
  page: number;
  results_per_page: number;
  results_size: number;
  total_pages: 1;
  next_page: null;
  prev_page: null;
  results: T[];
}
