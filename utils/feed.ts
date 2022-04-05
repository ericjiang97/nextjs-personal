import moment from "moment";
import { Feed } from "feed";

import * as prismicH from "@prismicio/helpers";

import { IPrismicDocumentRecord, Nullable } from "../types";

export const generateFeed = (posts: IPrismicDocumentRecord[]) => {
    let lastUpdated;
    const firstPostPublishedTime = prismicH.asDate(posts[0].data.published_time);
    if (firstPostPublishedTime) {
      lastUpdated = new Date(firstPostPublishedTime.toISOString());
    } else {
      lastUpdated = new Date();
    }
  
    const feed = new Feed({
      title: "Eric Jiang",
      description: "Engineer &#124; maker of things",
      id: "https://ericjiang.dev",
      copyright: "Copyright (C) Eric Jiang 2016 -",
      language: 'en-AU',
      feedLinks: {
        xml: "https://ericjiang.dev/blog/feed.xml",
        json: "https://ericjiang.dev/blog/feed.json",
      },
      author: {
        name: "Eric Jiang",
        email: "eric@ericjiang.dev",
        link: "https://ericjiang.dev",
      },
      updated: lastUpdated,
    });
  
    posts.forEach((post: IPrismicDocumentRecord) => {
      const { uid, data } = post;
      const { title, published_time, summary } = data;
  
      let _published_time;
  
      const _pub_time_iso = prismicH.asDate(published_time);
      if (_pub_time_iso) {
        _published_time = moment(_pub_time_iso.toISOString());
      } else {
        _published_time = moment();
      }
  
      feed.addItem({
        title: prismicH.asText(title) as string,
        description: prismicH.asText(summary) as string,
        date: _published_time.toDate(),
        link: `https://ericjiang.dev/blog/${uid}`,
      });
    });
  
    return feed;
  };