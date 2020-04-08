import fetch from "isomorphic-unfetch";

import { ApiRequest, Post, Posts } from "../types/wordpress_api";

import SITE_CONFIG from "../config";

class WordPressApiService {
  static async getAllPosts(
    pageSize: number = 100,
    pageNumber: number = 1
  ): Promise<ApiRequest<Posts>> {
    const response = await fetch(
      `${SITE_CONFIG.urls.WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=${pageSize}&page=${pageNumber}`
    );
    const blogPosts: Post[] = await response.json();
    let pages: string = response.headers.get("X-WP-TotalPages") || "1";
    if (blogPosts.length === 0) {
      return { error: { statusCode: 404 }, data: null };
    }
    return {
      data: {
        posts: blogPosts,
        maxPage: parseInt(pages),
        pageSize,
        page: pageNumber,
      },
      error: null,
    };
  }

  static async getSinglePost(slug: string): Promise<ApiRequest<Post>> {
    const response = await fetch(
      `${SITE_CONFIG.urls.WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}`
    );
    const blogPosts: Post[] = await response.json();
    if (blogPosts.length === 0) {
      return { error: { statusCode: 404 }, data: null };
    }
    return { data: blogPosts[0], error: null };
  }
}

export default WordPressApiService;
