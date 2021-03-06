interface ContentObject {
  //This property is always present
  rendered: string;
  //This property is only present in some contexts
  raw?: string;
  // Is the Content Protected
  protected: boolean;
}

export interface ApiError {
  statusCode: number;
}

export type ApiRequest<T> =
  | {
      error: ApiError;
      data: null;
    }
  | {
      error: null;
      data: T;
    };

export interface Posts {
  pageSize: number;
  page: number;
  maxPage: number;
  posts: Post[];
}

export interface Post {
  id: number;
  slug: string;
  date: string;
  date_gmt: string;
  title: {
    //This property is always present
    rendered: string;
    //This property is only present in some contexts
    raw?: string;
  };
  author_info: {
    display_name: string;
    author_link: string;
  };
  content: ContentObject;
  excerpt: ContentObject;
  uagb_excerpt: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  categories: number[];
}

export interface Category {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy:
    | "category"
    | "post_tag"
    | "nav_menu"
    | "link_category"
    | "post_format";
  parent: number;
}
