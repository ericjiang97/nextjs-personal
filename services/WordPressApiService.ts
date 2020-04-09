import fetch from "isomorphic-unfetch";

import { ApiRequest, Post, Posts, Category } from "../types/wordpress_api";

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

  static async getCategory(categoryId: string): Promise<ApiRequest<Category>> {
    const response = await fetch(
      `${SITE_CONFIG.urls.WORDPRESS_URL}/wp-json/wp/v2/categories/${categoryId}`
    );
    console.log(response);
    if (!response.ok) {
      return { error: { statusCode: response.status }, data: null };
    }
    const category: Category = await response.json();
    return { data: category, error: null };
  }

  static async getPostsByCategory(
    pageSize: number = 100,
    pageNumber: number = 1,
    category: string
  ): Promise<ApiRequest<Posts>> {
    const response = await fetch(
      `${SITE_CONFIG.urls.WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=${pageSize}&page=${pageNumber}&category=${category}`
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
}

export default WordPressApiService;
