import React, { Component } from "react";
import fetch from "isomorphic-unfetch";

import Head from "next/head";

export default class extends Component {
  // Resolve promise and set initial props.
  static async getInitialProps({ query }) {
    const { post } = query;
    const res = await fetch(
      `https://blog.ericjiang.dev/wp-json/wp/v2/posts?slug=${post}`
    ).then((resp) => resp.json());
    const data = res[0];
    return data;
  }

  render() {
    const { title, content } = this.props;
    console.log(this.props);
    return (
      <div className="text-sans">
        <Head>
          <title>{`Blog - ${title.rendered}`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="w-full text-gray-900">
          <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
            <h1 className="m-0 w-full pt-14 leading-tight text-4xl text-left font-bold">
              {title.rendered}
            </h1>
            <p className="text-left my-4 text-m">
              I occassionally write on my blog about tech, projects, reviews...
              so here's some of them.
            </p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <div
            className="text-left my-4 text-m"
            dangerouslySetInnerHTML={{ __html: content.rendered }}
          />
        </div>
      </div>
    );
  }
}
