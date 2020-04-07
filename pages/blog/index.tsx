import React, { Component } from "react";
import moment from "moment";
import fetch from "isomorphic-unfetch";

import Head from "next/head";
import { Post } from "../../types/wordpress_api";

export default class extends Component<{ posts: Post[] }, {}> {
  // Resolve promise and set initial props.
  static async getInitialProps() {
    // Make request for posts.
    const resp = await fetch(
      "https://blog.ericjiang.dev/wp-json/wp/v2/posts"
    ).then((r) => r.json());

    // Return response to posts object in props.
    return {
      posts: resp,
    };
  }

  render() {
    const { posts } = this.props;
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
                I occassionally write on my blog about tech, projects,
                reviews... so here's some of them.
              </p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
            {posts.map((post) => {
              return (
                <div
                  className="pt-4 px-5 pb-6 mt-2 mb-2 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500"
                  key={post.slug}
                >
                  <h2 className="m-0 w-full pt-14 leading-tight text-xs mb-2 text-left">
                    {`${moment(post.date).format("DD MMM YYYY hh:mma")}`}
                  </h2>
                  <h2 className="m-0 w-full pt-14 leading-tight text-xl text-left mb-3">
                    {post.title.rendered}
                  </h2>
                  <div
                    className="mb-6"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  ></div>
                  <a
                    className="m-0 text-brand text-md font-semibold"
                    href={`/blog/${post.slug}`}
                  >
                    Read more &rarr;
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
