import matter from 'gray-matter';
import moment from 'moment';

import BlogList from '../../components/BlogList';

import PageLayout from '../../containers/layouts/PageLayout';
import HeroBase from '../../components/HeroBase';
import LinkButton from '../../components/LinkButton';

import { Heading, Paragraph, Link, Button } from 'bumbag';

const subHeading =
  "I occassionally write on my blog about tech, projects, reviews (and will add photography and travel in the future)... so here's some of them.";

const Index = ({ allPosts }) => {
  return (
    <PageLayout
      title={'Blog'}
      pageMeta={{
        description: subHeading,
        endpoint: '/blog',
      }}
      banner={
        <HeroBase backgroundImage="url(https://live.staticflickr.com/65535/49836502853_dd2b878f7b_b.jpg)">
          <Heading use="h3">Blog</Heading>
          <Paragraph>{subHeading}</Paragraph>
          <LinkButton href="/blog/feed.xml" palette="primary" iconBefore="solid-rss">
            RSS Feed
          </LinkButton>
        </HeroBase>
      }
    >
      <BlogList allPosts={allPosts} />
    </PageLayout>
  );
};

export default Index;

export async function getStaticProps() {
  // get posts & context from folder
  const configData = await import('../../config');
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

  return {
    props: {
      description: configData.default.site.description,
      allPosts: sortedPosts,
    },
  };
}
