interface Author {
  name?: string;
  url?: string;
  avatar?: string;
}

export interface JsonFeedItem {
  id: string;
  url?: string;
  external_url?: string;
  title?: string;
  content_html?: string;
  content_text?: string;
  summary?: string;
  date_published?: string;
  date_modified?: string;
  tags?: string[];
}

export default interface JsonFeed {
  title: string;
  version: string;
  home_page_url?: string;
  feed_url?: string;
  author?: Author;
  items?: JsonFeedItem[];
}
