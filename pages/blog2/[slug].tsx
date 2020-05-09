import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

import PageLayout from '../../containers/layouts/PageLayout';
import glob from 'glob';
import CodeBlock from '../../components/renderers/CodeBlock';
import HeadingBlock from '../../components/renderers/HeadingBlock';

interface BlogTemplateInterface {
  siteTitle: string;
  frontmatter: {
    title: string;
    author: string;
  };
  markdownBody: string;
}

export default function BlogTemplate(props: BlogTemplateInterface) {
  // Render data from `getStaticProps`
  return (
    <PageLayout title={props.siteTitle}>
      <div className="w-full text-gray-900">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <article>
            <h1 className="m-0 w-full pt-14 leading-tight text-4xl text-left font-bold">{props.frontmatter.title}</h1>
            <span className="my-3 w-full pt-24 leading-tight text-xl text-left font-semibold">
              By {props.frontmatter.author}
            </span>
            <hr />
            <div className="mt-2">
              <ReactMarkdown
                source={props.markdownBody}
                renderers={{
                  text: ({ children }) => <div className="my-2">{children}</div>,
                  heading: HeadingBlock,
                  code: CodeBlock,
                }}
              />
            </div>
          </article>
        </div>
      </div>
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
