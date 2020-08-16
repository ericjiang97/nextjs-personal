import matter from 'gray-matter';
import moment from 'moment';
import fs from 'fs';
import util from 'util';
import glob from 'glob';
import { StaticBlogPost, BlogPostFrontmatter } from '../../../types/StaticBlogPost';
import BlogList from '../../../components/BlogList';
import PageLayout from '../../../containers/layouts/PageLayout';
import HeroBase from '../../../components/HeroBase';
import { Button, Heading, Paragraph, Link } from 'bumbag';

const readFile = util.promisify(fs.readFile);

export default function BlogCategoryTemplate(props: { category: string; filteredPosts: StaticBlogPost[] }) {
  const description = `Blog posts which fall under the ${props.category} category`;
  const HomePageLinkProps = Link.useProps({ href: '/blog' });
  return (
    <PageLayout
      title={`Blog - Category: ${props.category}`}
      pageMeta={{
        description,
        endpoint: `/blog/category/${props.category}`,
      }}
      banner={
        <HeroBase backgroundImage="url('/images/joanna-kosinska-1_CMoFsPfso-unsplash.jpg')">
          <Heading>Blog - {props.category}</Heading>
          <Heading use="h3">Total Posts: {props.filteredPosts.length}</Heading>
          <Paragraph>{description}</Paragraph>
          <Button use={Link} palette="primary" {...HomePageLinkProps}>
            Back to Blog
          </Button>
          <Paragraph fontSize="0.8rem" marginTop="1rem">
            Photo by{' '}
            <Link
              href="https://unsplash.com/@joannakosinska?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              color="warning"
            >
              Joanna Kosinska
            </Link>{' '}
            on{' '}
            <Link
              href="https://unsplash.com/s/photos/blog?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              color="warning"
            >
              Unsplash
            </Link>
          </Paragraph>
        </HeroBase>
      }
    >
      <BlogList allPosts={props.filteredPosts} />
    </PageLayout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { category } = ctx.params;
  // get all .md files in the posts dir
  const allPosts = glob.sync('posts/*.md');

  const filteredPosts: StaticBlogPost[] = [];

  for (const post of allPosts) {
    const content = await readFile(post, 'utf8');
    const frontmatter = matter(content);
    if (frontmatter.data.category === category) {
      const filePath = post.split('/');
      const slug = filePath[filePath.length - 1].replace('.md', '');

      filteredPosts.push({ frontmatter: frontmatter.data as BlogPostFrontmatter, slug: `${slug}` });
    }
  }

  const sortedPosts = filteredPosts.sort((postA, postB) => {
    return moment(postB.frontmatter.date).isAfter(moment(postA.frontmatter.date)) ? 1 : -1;
  });

  return {
    props: { category, filteredPosts: sortedPosts },
  };
}

export async function getStaticPaths() {
  // get all .md files in the posts dir
  const allPosts = glob.sync('posts/*.md');

  const blogPosts = await Promise.all(
    allPosts.map((file: string) => {
      return readFile(file, 'utf8');
    }),
  );

  const paths = blogPosts.map((content: any) => {
    const frontmatter: any = matter(content);
    return `/blog/category/${frontmatter.data.category}`;
  });

  const uniquePaths = paths.filter((item, index) => {
    return paths.indexOf(item) === index;
  });

  return {
    fallback: false,
    paths: [...uniquePaths],
  };
}
