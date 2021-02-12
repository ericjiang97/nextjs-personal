import moment from 'moment';
import React from 'react';

import { RichText } from 'prismic-reactjs';

import { NextPageContext } from 'next';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import SITE_CONFIG from '../../config';
import JsonFeed, { JsonFeedItem } from '../../types/JsonFeed';
import { getBlogPostContent } from '../../utils/prismic';

const getJsonFeed = async (blogPosts: ApiSearchResponse) => {
  const posts = await blogPosts;
  const items: JsonFeedItem[] = posts.results.map((post: any) => {
    const { uid, data } = post;
    const { title, published_time, summary } = data;
    return {
      id: uid,
      url: `${SITE_CONFIG.urls.BASE_URL}/blog/${uid}`,
      title: RichText.asText(title),
      date_published: moment(published_time).toISOString(),
      summary: RichText.asText(summary),
    };
  });
  const feed: JsonFeed = {
    items,
    version: 'https://jsonfeed.org/version/1',
    title: "Eric Jiang's Blog",
    author: {
      name: 'Eric Jiang',
      url: `${SITE_CONFIG.urls.BASE_URL}`,
    },
    home_page_url: `${SITE_CONFIG.urls.BASE_URL}/blog`,
    feed_url: `${SITE_CONFIG.urls.BASE_URL}/blog/feed.json`,
  };
  return feed;
};

export default class Rss extends React.Component {
  static async getInitialProps({ res }: NextPageContext) {
    if (!res) {
      return;
    }

    const posts = await getBlogPostContent();
    const feed = await getJsonFeed(posts);

    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(feed));
    res.end();
  }
}
