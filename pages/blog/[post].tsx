import React, { Component } from "react";
import { NextPageContext } from "next";
import moment from "moment";

import Head from "next/head";
import ErrorPage from "next/error";

import { Post, ApiRequest, Category } from "../../types/wordpress_api";
import Custom404 from "../404";
import WordPressApiService from "../../services/WordPressApiService";

export default class extends Component<
  { post: ApiRequest<Post>; category: ApiRequest<Category> },
  null
> {
  // Resolve promise and set initial props.
  static async getInitialProps({ query }: NextPageContext) {
    const { post } = query;
    const postData: ApiRequest<Post> = await WordPressApiService.getSinglePost(
      post as string
    );
    let categoryInfo;
    if (postData.data) {
      categoryInfo = await WordPressApiService.getCategory(
        postData.data.categories[0].toString()
      );
    }
    return { post: postData, category: categoryInfo };
  }

  render() {
    const { error, data } = this.props.post;

    const categoryInfoError = this.props.category.error;
    const categoryInfoData = this.props.category.data;

    if (error) {
      if (error.statusCode === 404) return <Custom404 />;
      return <ErrorPage statusCode={error.statusCode} />;
    }
    if (categoryInfoError) {
      if (categoryInfoError.statusCode === 404) return <Custom404 />;
      return <ErrorPage statusCode={categoryInfoError.statusCode} />;
    }

    if (!data || !categoryInfoData) {
      return <Custom404 />;
    }

    const { title, author_info, content, date, uagb_excerpt } = data;

    const { name, id } = categoryInfoData;

    const html = content.rendered;
    return (
      <div className="text-sans">
        <Head>
          <title>{`Blog - ${title.rendered}`}</title>
          <meta name="description" content={uagb_excerpt} />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
            <a
              className="text-left my-4 text-xs underline"
              href={`/category/${id}`}
            >{`${name}`}</a>
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
