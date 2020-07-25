import matter from 'gray-matter';
import moment from 'moment';
import glob from 'glob';
import { Markdown } from 'bumbag-addon-markdown';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import PageLayout from '../../containers/layouts/PageLayout';

import { StaticBlogPost } from '../../types/StaticBlogPost';
import ShareModal from '../../components/ShareModal';
import SITE_CONFIG from '../../config';
import { Heading, Label, Paragraph, Container, Button, Stack } from 'bumbag';

export default function BlogTemplate(props: StaticBlogPost) {
  // Render data from `getStaticProps`
  const { frontmatter, slug } = props;

  const { author, date, title, category, coverImageUrl } = frontmatter;
  return (
    <PageLayout title={`Blog - ${title}`} ignoreHorizontalPadding={true}>
      <Label color="secondary">{category}</Label>
      <Heading use="h3">{title}</Heading>
      {coverImageUrl && <LazyLoadImage src={coverImageUrl} alt={`banner for ${title}`} width="100%" effect="blur" />}
      <Container display="flex" justifyContent="space-around" marginY="1rem">
        <div>
          <Label>By</Label>
          <Paragraph>{author}</Paragraph>
        </div>
        <div>
          <Label>Published on</Label>
          <Paragraph>{moment(date).format('ddd Do MMM YYYY')}</Paragraph>
        </div>
      </Container>
      <Markdown wrap={(children: any) => <Stack spacing="major-2">{children}</Stack>} content={props.markdownBody} />
      <hr style={{ marginTop: '1rem', marginBottom: '0.75rem' }} />
      <Container marginY="1rem" display="flex" flexWrap="wrap" justifyContent="space-between">
        <ShareModal title={title} slug={slug} />
        <a href={`${SITE_CONFIG.urls.REPO_URL}/tree/main/posts/${slug}.md`}>
          <Button palette="secondary">Submit an edit</Button>
        </a>
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
