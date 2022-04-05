import React from "react";

import { NextPageContext } from "next";
import { createClient } from "../../config/prismic";
import { generateFeed } from "../../utils/feed";

export default class BlogFeedRss extends React.Component {
  static async getInitialProps({ res }: NextPageContext) {
    if (!res) {
      return;
    }
    const client = createClient();

    const posts = await client.getAllByType("blog-post", {
      orderings: {
        field: "document.last_publication_date",
        direction: "desc",
      },
    });

    res.setHeader("Content-Type", "text/xml");
    res.write(generateFeed(posts).rss2());
    res.end();
  }
}
