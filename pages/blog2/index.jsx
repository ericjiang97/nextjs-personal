import BlogList from '../../components/BlogList';
import PageLayout from '../../containers/layouts/PageLayout';
import matter from 'gray-matter';

const Index = ({ title, allBlogs }) => {
  return (
    <PageLayout title={title}>
      <section>
        <BlogList allBlogs={allBlogs} />
      </section>
    </PageLayout>
  );
};

export default Index;

export async function getStaticProps() {
  const configData = await import('../../config'); //get posts & context from folder
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.');
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

  return {
    props: {
      title: configData.default.site.title,
      description: configData.default.site.description,
    },
  };
}
