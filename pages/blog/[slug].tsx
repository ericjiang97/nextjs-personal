import matter from 'gray-matter';
import moment from 'moment';
import glob from 'glob';

import ReactMarkdown from 'react-markdown';

import PageLayout from '../../containers/layouts/PageLayout';

import CodeBlock from '../../components/renderers/CodeBlock';
import HeadingBlock from '../../components/renderers/HeadingBlock';
import TextBlock from '../../components/renderers/TextBlock';
import { StaticBlogPost } from '../../types/StaticBlogPost';
import ShareModal from '../../components/ShareModal';
import SITE_CONFIG from '../../config';

export default function BlogTemplate(props: StaticBlogPost) {
  // Render data from `getStaticProps`
  const { frontmatter, slug } = props;

  const { author, date, title, category, coverImageUrl } = frontmatter;
  return (
    <PageLayout title={`Blog - ${title}`} ignoreHorizontalPadding={true}>
      <div className="w-full text-gray-900">
        <div className="mx-auto py-auto pb-2 flex flex-col justify-around">
          <div className="w-full">
            <div className="flex flex-1 flex-col p-4">
              <a
                // href={`/blog2/tags/${tag}`}
                className="font-semibold"
                style={{ color: '#f7a046' }}
              >
                {category}
              </a>
              <h1 className="m-0 w-full pt-14 leading-tight text-4xl text-left font-bold">{title}</h1>
            </div>
            <div className="flex flex-wrap flex-1 justify-between mt-4 px-6">
              <div>
                <strong className="font-light text-sm font-bold">By</strong>
                <p className="mb-3 mb-4 w-full pb-1 leading-tight text-md text-left font-medium">{author}</p>
              </div>
              <div>
                <strong className="font-light text-sm font-bold">Published on</strong>
                <p className="mb-3 mb-4 w-full pb-1 leading-tight text-md text-left font-medium">
                  {moment(date).format('ddd Do MMM YYYY')}
                </p>
              </div>
            </div>
            <div className="my-3 w-full">
              {coverImageUrl && <img src={coverImageUrl} alt={`banner for ${title}`} className="w-full" />}
            </div>

            <div className="mt-2 p-4">
              <ReactMarkdown
                source={props.markdownBody}
                renderers={{
                  blockquote: ({ children }) => (
                    <blockquote className="max-w-lg m-auto italic border-l-solid border-l-2 border-brand pl-4 my-2">
                      {children}
                    </blockquote>
                  ),
                  code: CodeBlock,
                  heading: HeadingBlock,
                  image: ({ src, alt }) => <img src={src} alt={alt} className="m-auto self-center" />,
                  link: ({ href, children }) => (
                    <a href={href} target="_blank" className="inline underline text-brand break-all">
                      {children}
                    </a>
                  ),
                  // paragraph: ({ children }) => <p className="my-2 inline-block whitespace-normal">{children}</p>,
                  text: TextBlock,
                }}
              />
            </div>
            <hr className="my-2" />
            <div className="my-2 flex flex-wrap justify-between p-4">
              <ShareModal title={title} slug={slug} />
              <a
                href={`${SITE_CONFIG.urls.REPO_URL}/tree/main/posts/${slug}.md`}
                className="bg-transparent border border-brand hover:bg-brand text-gray-500 hover:text-white font-bold py-2 px-4 rounded-full"
              >
                Submit an edit
              </a>
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
