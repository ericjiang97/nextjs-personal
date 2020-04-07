import React from "react";
import { NextPageContext } from "next";
import fetch from "isomorphic-unfetch";

import { Post } from "../../types/wordpress_api";

const blogPostsRssXml = (blogPosts: Post[]) => {
  let latestPostDate: string = "";
  let rssItemsXml = "";
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.date);
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }
    rssItemsXml += `
      <item>
        <title>${post.title.rendered}</title>
        <link>
          ${`https://ericjiang.dev/blog/${post.slug}`}
        </link>
        
        <pubDate>${post.date}</pubDate>
        <description>
        <![CDATA[${post.uagb_excerpt}]]>
        </description>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = (blogPosts: Post[]) => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
  return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
        <title>Eric Jiang - Blog</title>
        <link>https://ericjiang.dev</link>
        <description>Software Engineer &#124; Maker of things</description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        <language>en-US</language>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

export default class Rss extends React.Component {
  static async getInitialProps({ res }: NextPageContext) {
    if (!res) {
      return;
    }
    const blogPosts = await fetch(
      "https://blog.ericjiang.dev/wp-json/wp/v2/posts?per_page=100"
    ).then((r) => r.json());
    res.setHeader("Content-Type", "text/xml");
    res.write(getRssXml(blogPosts));
    res.end();
  }
}
