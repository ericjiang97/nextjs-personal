import React from 'react';
import matter from 'gray-matter';
import moment from 'moment';

const blogPostsRssXml = (blogPosts) => {
  let latestPostDate = '';
  let rssItemsXml = '';
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.frontmatter.date);
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.frontmatter.date;
    }
    rssItemsXml += `
      <item>
        <title>${post.frontmatter.title}</title>
        <link>
          ${`https://ericjiang.dev/blog/${post.slug}`}
        </link>

        <pubDate>${moment(post.frontmatter.date).toISOString()}</pubDate>
        <description>
        <![CDATA[${post.frontmatter.summary}]]>
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
    const posts = ((context) => {
      const keys = context.keys();
      const values = keys.map(context);

      const data = keys.map((key, index) => {
        // Create slug from filename
        const filePath = key.split('/');
        const slug = filePath[filePath.length - 1].replace('.md', '');

        const value = values[index];

        // Parse yaml metadata & markdownbody in document
        const document = matter(value.default);

        return {
          frontmatter: document.data,
          markdownBody: document.content,
          slug,
        };
      });
      return data;
    })(require.context('../../posts', true, /\.md$/));

    const sortedPosts = posts.sort((a, b) => {
      return moment(b.frontmatter.date) - moment(a.frontmatter.date);
    });

    res.setHeader('Content-Type', 'text/xml');
    res.write(getRssXml(sortedPosts));
    res.end();
  }
}
