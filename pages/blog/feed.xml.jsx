import React from 'react';
import moment from 'moment';

import { RichText } from 'prismic-reactjs';

import { getBlogPostContent } from '../../utils/prismic'

const blogPostsRssXml = (posts) => {
  let latestPostDate = '';
  let rssItemsXml = '';
  posts.results.forEach((post) => {
    const { uid, data } = post;
    const { title, published_time, summary } = data;

    const postDate = Date.parse(published_time);
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = published_time;
    }
    rssItemsXml += `
      <item>
        <title>${RichText.asText(title)}</title>
        <link>
          ${`https://ericjiang.dev/blog/${uid}`}
        </link>

        <pubDate>${moment(published_time).toISOString()}</pubDate>
        <description>
        <![CDATA[${RichText.asText(summary)}]]>
        </description>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = (blogPosts) => {
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
  static async getInitialProps({ res }) {
    if (!res) {
      return;
    }

    const posts = await getBlogPostContent()

    res.setHeader('Content-Type', 'text/xml');
    res.write(getRssXml(posts));
    res.end();
  }
}
