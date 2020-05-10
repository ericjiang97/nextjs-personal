import matter from 'gray-matter';
import moment from 'moment';
import glob from 'glob';

import ReactMarkdown from 'react-markdown';

import PageLayout from '../../containers/layouts/PageLayout';

import CodeBlock from '../../components/renderers/CodeBlock';
import HeadingBlock from '../../components/renderers/HeadingBlock';
import TextBlock from '../../components/renderers/TextBlock';

interface BlogTemplateInterface {
  siteTitle: string;
  frontmatter: {
    title: string;
    date: string;
    author: string;
    summary?: string;
  };
  markdownBody: string;
}

export default function BlogTemplate(props: BlogTemplateInterface) {
  // Render data from `getStaticProps`
  return (
    <PageLayout title={props.siteTitle} isExperimental={true}>
      <div className="w-full text-gray-900">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <div>
            <h3 className="my-2">{moment(props.frontmatter.date).format('ddd DD MMM YYYY hh:mm a')}</h3>
            <h1 className="m-0 w-full pt-14 leading-tight text-4xl text-left font-bold">{props.frontmatter.title}</h1>
            <p className="my-3 mb-4 w-full pt-2 leading-tight text-lg text-left font-light">
              {`By ${props.frontmatter.author}`}
            </p>
            <hr />
            <div className="mt-2">
              <ReactMarkdown
                source={props.markdownBody}
                renderers={{
                  text: TextBlock,
                  heading: HeadingBlock,
                  code: CodeBlock,
                  link: ({ href, children }) => (
                    <a href={href} target="_blank" className="inline-block mx-1 underline text-brand">
                      {children}
                    </a>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
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
