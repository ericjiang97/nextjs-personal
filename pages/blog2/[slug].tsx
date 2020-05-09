import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import PageLayout from '../../containers/layouts/PageLayout';
import glob from 'glob';

interface BlogTemplateInterface {
  siteTitle: string;
  frontmatter: {
    title: string;
  };
  markdownBody: string;
}

export default function BlogTemplate(props: BlogTemplateInterface) {
  // Render data from `getStaticProps`
  return (
    <PageLayout title={props.siteTitle}>
      <article>
        <h1>{props.frontmatter.title}</h1>
        <div>
          <ReactMarkdown source={props.markdownBody} />
        </div>
      </article>
    </PageLayout>
  );
}

export async function getStaticProps({ ...ctx }) {
  console.log(ctx);
  const { slug } = ctx.params;
  const content = await import(`../../posts/${slug}.md`);
  const config = await import('../../config');
  const data = matter(content.default);

  return {
    props: {
      siteTitle: config.default.site.title,
      frontmatter: data.data,
      markdownBody: data.content,
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
    return `/blog2/${slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}
