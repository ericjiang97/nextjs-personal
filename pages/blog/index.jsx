import matter from 'gray-matter';
import moment from 'moment';

import BlogList from '../../components/BlogList';

import PageLayout from '../../containers/layouts/PageLayout';

const Index = ({ allPosts }) => {
  return (
    <PageLayout title={'Blog'}>
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h1 className="m-0 w-full pt-14 leading-tight text-4xl text-center font-bold">Blog (experimental)</h1>
          <p className="text-center my-4 text-m">
            I occassionally write on my blog about tech, projects, reviews... so here's some of them.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
        <BlogList allPosts={allPosts} />
      </div>
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
