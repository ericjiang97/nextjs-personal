import React, { Component } from "react";
import { NextPageContext } from "next";
import moment from "moment";
import fetch from "isomorphic-unfetch";

import Head from "next/head";
import ErrorPage from "next/error";

import { Post, ApiRequest } from "../../types/wordpress_api";
import Custom404 from "../404";

export default class extends Component<ApiRequest<Post>, null> {
  // Resolve promise and set initial props.
  static async getInitialProps({ query, res }: NextPageContext) {
    const { post } = query;
    const response = await fetch(
      `https://blog.ericjiang.dev/wp-json/wp/v2/posts?slug=${post}`
    );
    const blogPost = await response.json();
    if (blogPost.length === 0) {
      return { error: { statusCode: 404 }, data: null };
    }
    const data = blogPost[0];
    return { data };
  }

  render() {
    const { error, data } = this.props;

    if (error) {
      if (error.statusCode === 404) return <Custom404 />;
      return <ErrorPage statusCode={error.statusCode} />;
    }

    const { title, author_info, content, date } = data;

    const html = content.rendered;
    return (
      <div className="text-sans">
        <Head>
          <title>{`Blog - ${title.rendered}`}</title>
        </Head>

        <div className="w-full text-gray-900">
          <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
            <span className="text-left my-4 text-md">
              {`Published on ${moment(date).format("Do MMMM YYYY hh:mma")}.`}
            </span>
            <h1 className="m-0 w-full pt-14 leading-tight text-4xl text-left font-bold">
              {title.rendered}
            </h1>
            <h2 className="text-left my-4 text-xl">{`By ${author_info.display_name}`}</h2>
          </div>
        </div>
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <div
            className="text-left my-4 text-m p-2"
            dangerouslySetInnerHTML={{
              __html: html.replace("<p>", "<p className='mt-2'>"),
            }}
          />
        </div>
      </div>
    );
  }
}
