import React, { Component, useEffect, useState } from "react";
import { NextPageContext } from "next";
import moment from "moment";

import Head from "next/head";
import ErrorPage from "next/error";
import WordPressApiService from "../../../services/WordPressApiService";
import {
  ApiRequest,
  Category,
  Posts,
  Post,
} from "../../../types/wordpress_api";
import Custom404 from "../../404";
import { useRouter } from "next/dist/client/router";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import BlogPostCard from "../../../components/cards/BlogPostCard";

const CategoryPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<ApiRequest<Category> | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [apiResponse, setApiResponse] = useState<ApiRequest<Posts> | null>(
    null
  );

  const router = useRouter();

  const fetchMorePosts = async () => {
    setCurrentPage(currentPage + 1);
    const resp: ApiRequest<Posts> = await WordPressApiService.getPostsByCategory(
      10,
      currentPage,
      router.query.id as string
    );
    if (resp.data) {
      const posts: Post[] = resp.data.posts as any;
      setPosts((prevState) => [...prevState, ...posts]);
      setApiResponse(resp);
    }
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMorePosts);

  useEffect(() => {
    async function getData() {
      const category = await WordPressApiService.getCategory(
        router.query.id as string
      );
      const resp: ApiRequest<Posts> = await WordPressApiService.getPostsByCategory(
        10,
        currentPage,
        router.query.id as string
      );
      if (resp.data) {
        const posts: Post[] = resp.data.posts as any;
        setPosts((prevState) => [...prevState, ...posts]);
        setApiResponse(resp);
      }
      setCategory(category);
    }
    getData();
  }, []);

  if (!category || !apiResponse) {
    return <div>Loading...</div>;
  }

  const { error, data } = category;
  if (error) {
    if (error.statusCode === 404) return <Custom404 />;
    return <ErrorPage statusCode={error.statusCode} />;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  if (apiResponse && apiResponse.error) {
    if (apiResponse.error.statusCode === 404) return <Custom404 />;
    return <ErrorPage statusCode={apiResponse.error.statusCode} />;
  }
  if (apiResponse && !apiResponse.data) {
    return <Custom404 />;
  }
  const { pageSize, maxPage, page } = apiResponse.data;

  return (
    <div>
      <h2>{`Category: ${data.name}`}</h2>
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
        {posts &&
          posts.length > 0 &&
          posts.map((post: Post, index) => {
            return <BlogPostCard post={post} key={index} />;
          })}
        {isFetching && maxPage > currentPage && (
          <span className="skeleton-box h-12 inline-block"></span>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
