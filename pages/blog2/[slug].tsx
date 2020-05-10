import matter from 'gray-matter';
import moment from 'moment';
import glob from 'glob';

import ReactMarkdown from 'react-markdown';

import PageLayout from '../../containers/layouts/PageLayout';

import CodeBlock from '../../components/renderers/CodeBlock';
import HeadingBlock from '../../components/renderers/HeadingBlock';
import TextBlock from '../../components/renderers/TextBlock';
import { StaticBlogPost } from '../../types/StaticBlogPost';

export default function BlogTemplate(props: StaticBlogPost) {
  // Render data from `getStaticProps`
  const { frontmatter } = props;

  const { author, date, title, tags } = frontmatter;
  return (
    <PageLayout title={`Blog - ${title}`} isExperimental={true}>
      <div className="w-full text-gray-900">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <div className="w-full">
            <div className="w-full flex">
              <div>
                <h3 className="my-2">{`Published on ${moment(date).format('ddd Do MMM YYYY hh:mm a')}`}</h3>
                <h1 className="m-0 w-full pt-14 leading-tight text-4xl text-left font-bold">{title}</h1>
                <p className="my-3 mb-4 w-full pt-2 leading-tight text-lg text-left font-light">{`By ${author}`}</p>
                <div className="my-1">
                  {tags &&
                    tags.map((tag, index) => {
                      return (
                        <a
                          key={index}
                          href={`/blog2/tags/${tag}`}
                          className="inline-block border rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-1 my-1 hover:bg-brand hover:border-brand"
                        >
                          {tag}
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
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
