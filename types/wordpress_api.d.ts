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

export interface ApiRequest<T> {
  error?: ApiError;
  data: T;
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
}
