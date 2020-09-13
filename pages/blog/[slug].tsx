import matter from 'gray-matter';
import moment from 'moment';
import glob from 'glob';
import { Markdown } from 'bumbag-addon-markdown';
import { DiscussionEmbed } from 'disqus-react';

import PageLayout from '../../containers/layouts/PageLayout';

import { StaticBlogPost } from '../../types/StaticBlogPost';
import ShareModal from '../../components/ShareModal';
import SITE_CONFIG from '../../config';
import { Heading, Label, Paragraph, Container, Stack } from 'bumbag';
import HeroBase from '../../components/HeroBase';
import { BlogCategoryLink } from '../../components/BlogList';
import LinkButton from '../../components/LinkButton';

export default function BlogTemplate(props: StaticBlogPost) {
  // Render data from `getStaticProps`
  const { frontmatter, slug } = props;

  const { author, date, title, summary, category, coverImageUrl } = frontmatter;
  return (
    <PageLayout
      title={`Blog - ${title}`}
      ignoreHorizontalPadding={true}
      banner={
        <HeroBase backgroundImage={`url(${coverImageUrl})`}>
          <BlogCategoryLink category={category} />
          <Heading use="h3">{title}</Heading>
          <Container marginY="1rem">
            <Label>By</Label>
            <Paragraph>{author}</Paragraph>
            <Label>Published on</Label>
            <Paragraph>{moment(date).format('ddd Do MMM YYYY')}</Paragraph>
          </Container>
        </HeroBase>
      }
      pageMeta={{
        description: summary,
        endpoint: `/blog/${slug}`,
        imageUrl: coverImageUrl,
      }}
    >
      <Markdown
        wrap={(children: any) => (
          <Stack spacing="major-2" maxWidth="100%" width="100%">
            {children}
          </Stack>
        )}
        content={props.markdownBody}
        elementProps={{ img: { maxWidth: '100%' }, p: { wordWrap: 'break-word' } }}
      />
      <hr style={{ marginTop: '1rem', marginBottom: '0.75rem' }} />
      <Container marginY="1rem" display="flex" flexWrap="wrap" justifyContent="space-between">
        <ShareModal title={title} slug={`/blog/${slug}`} />
        <LinkButton
          href={`${SITE_CONFIG.urls.REPO_URL}/tree/main/posts/${slug}.md`}
          palette="secondary"
          iconBefore="solid-edit"
        >
          Submit an edit
        </LinkButton>
      </Container>
      <Container>
        <DiscussionEmbed
          shortname={SITE_CONFIG.disqus.shortname}
          config={{
            url: `https://ericjiang.dev/blog/${slug}`,
            identifier: slug,
            title: frontmatter.title,
            language: 'en_AU',
          }}
        />
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const content = await import(`../../posts/${slug}.md`);
  const config = await import('../../config');
  const data = matter(content.default);

  return {
    props: {
      frontmatter: data.data,
      markdownBody: data.content,
      siteTitle: config.default.site.title,
      slug: `${slug}`,
    },
  };
}

export async function getStaticPaths() {
  // get all .md files in the posts dir
  const blogs = glob.sync('posts/*.md');

  // remove path and extension to leave filename only
  const blogSlugs = blogs.map((file) => {
    const filePath = file.split('/');
    return filePath[filePath.length - 1].replace('.md', '');
  });

  // create paths with `slug` param
  const paths = blogSlugs.map((slug) => {
    return `/blog/${slug}`;
  });

  return {
    fallback: false,
    paths: [...paths],
  };
}
