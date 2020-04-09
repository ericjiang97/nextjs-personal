import React, { Component, useState, useEffect } from "react";
import moment from "moment";

import Head from "next/head";
import { NextPage } from "next";
import ErrorPage from "next/error";

import { ApiRequest, Posts, Post } from "../../types/wordpress_api";
import WordPressApiService from "../../services/WordPressApiService";

import Custom404 from "../404";
import { NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import BlogPostCard from "../../components/cards/BlogPostCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const BlogIndexPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const fetchMorePosts = async () => {
    setCurrentPage(currentPage + 1);
    const resp: ApiRequest<Posts> = await WordPressApiService.getAllPosts(
      10,
      currentPage + 1
    );
    if (resp.data) {
      const posts: Post[] = resp.data.posts as any;
      setPosts((prevState) => [...prevState, ...posts]);
      setApiResponse(resp);
    }
  };
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMorePosts);

  const [posts, setPosts] = useState<Post[]>([]);
  const [apiResponse, setApiResponse] = useState<ApiRequest<Posts> | null>(
    null
  );

  /**
   * Logic Block
   */
  useEffect(() => {
    async function getData() {
      if (router.query.param) {
        setCurrentPage(parseInt(router.query.pageNum as string));
      }
      const resp: ApiRequest<Posts> = await WordPressApiService.getAllPosts(
        10,
        currentPage
      );
      if (resp.data) {
        const posts: Post[] = resp.data.posts as any;
        setPosts((prevState) => [...prevState, ...posts]);
        setApiResponse(resp);
      }
    }
    getData();
  }, []);

  /**
   * Render Page Block
   */

  if (!apiResponse) {
    return <div>Loading...</div>;
  }
  const { error, data } = apiResponse;

  if (error) {
    if (error.statusCode === 404) return <Custom404 />;
    return <ErrorPage statusCode={error.statusCode} />;
  }
  if (!data) {
    return <Custom404 />;
  }
  const { pageSize, maxPage, page } = data;
  return (
    <div className="text-sans">
      <Head>
        <title>Blog - Eric Jiang</title>
      </Head>

      <div className="w-full text-gray-900">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
          <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
            <h1 className="m-0 w-full pt-14 leading-tight text-4xl text-center font-bold">
              Blog
            </h1>
            <p className="text-center my-4 text-m">
              I occassionally write on my blog about tech, projects, reviews...
              so here's some of them.
            </p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          {posts &&
            posts.length > 0 &&
            posts.map((post: Post, index) => {
              return <BlogPostCard post={post} key={index} />;
            })}
          {isFetching && maxPage > currentPage && (
            <div className="pt-4 px-5 pb-6 mt-2 mb-2 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500">
              <h2>Loading More Posts...</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogIndexPage;
