import matter from 'gray-matter';
import moment from 'moment';
import glob from 'glob';

import { Heading, Label, Paragraph, Container, Icon } from 'bumbag';

import HeroBase from '../../components/core/HeroBase';
import LinkButton from '../../components/buttons/LinkButton';
import BlogContent from '../../components/blog/BlogContent';
import { BlogCategoryLink } from '../../components/blog/BlogList';
import PageLayout from '../../containers/layouts/PageLayout';
import ShareModal from '../../components/modals/ShareModal';

import { StaticBlogPost } from '../../types/StaticBlogPost';

import SITE_CONFIG from '../../config';

export default function BlogTemplate(props: StaticBlogPost) {
  // Render data from `getStaticProps`
  const { frontmatter, slug } = props;

  const { author, date, title, summary, category, coverImageUrl, preview } = frontmatter;
  return (
    <PageLayout
      title={`Blog - ${title}`}
      ignoreHorizontalPadding={true}
      banner={
        <>
          {preview && (
            <Container
              backgroundColor="primary"
              color="white"
              width="100vw"
              maxWidth="100vw"
              paddingX="1rem"
              paddingY="1.5rem"
              display="flex"
              alignItems="center"
            >
              <Icon icon="solid-info-circle" marginRight="1.5rem" />
              <Paragraph marginTop="0">
                This is a <strong>preview</strong> article used for testing and sharing purposes, please DO NOT share
                this article until it has been published.
              </Paragraph>
            </Container>
          )}
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
        </>
      }
      pageMeta={{
        description: summary,
        endpoint: `/blog/${slug}`,
      }}
    >
      <BlogContent content={props.markdownBody} />
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
