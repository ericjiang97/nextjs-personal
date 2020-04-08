import React, { Component, useState, useEffect } from "react";
import moment from "moment";

import Head from "next/head";
import { NextPage } from "next";
import ErrorPage from "next/error";

import { ApiRequest, Posts } from "../../types/wordpress_api";
import WordPressApiService from "../../services/WordPressApiService";

import Custom404 from "../404";
import { NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import BlogPostCard from "../../components/cards/BlogPostCard";

const BlogIndexPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resp, setResp] = useState<ApiRequest<Posts> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.param) {
      setCurrentPage(parseInt(router.query.pageNum as string));
    }
    fetchData();
  });

  const fetchData = async () => {
    const data = await WordPressApiService.getAllPosts(10, currentPage);
    setResp(data);
  };

  if (!resp) {
    return <ErrorPage statusCode={500} />;
  }
  console.log(currentPage);
  const { error, data } = resp;

  if (error) {
    if (error.statusCode === 404) return <Custom404 />;
    return <ErrorPage statusCode={error.statusCode} />;
  }
  if (!data) {
    return <Custom404 />;
  }
  const { posts, pageSize, maxPage, page } = data;
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
            posts.map((post) => {
              return <BlogPostCard post={post} key={post.id} />;
            })}
        </div>
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around items-center my-4">
          {page !== 1 && (
            <a
              className="bg-brand hover:bg-brand text-white font-bold py-2 px-4 rounded-full"
              href={`/blog?pageNum=${page - 1}`}
            >
              &larr;
            </a>
          )}
          {`Page ${page} of ${maxPage}`}{" "}
          {page !== maxPage && (
            <a
              className="bg-brand hover:bg-brand text-white font-bold py-2 px-4 rounded-full"
              href={`/blog?pageNum=${page + 1}`}
            >
              &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogIndexPage;
