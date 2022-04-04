import MainLayout from "../../containers/MainLayout";
import { PrismicDocument } from "@prismicio/types";
import { createClient } from "../../config/prismic";
import { GetStaticProps, NextPageContext } from "next";
import SmallHeroBanner from "../../components/SmallHeroBanner";

interface BlogPageProps {
  page: PrismicDocument<Record<string, any>, string, string>[];
}

function BlogPage(props: BlogPageProps) {
  return (
    <MainLayout
      pageTitle="Blog"
      customHero={
        <SmallHeroBanner
          title="Blog"
          description="I occassionally write on my blog about tech, projects, food, reviews (and will add photography and travel in the future)... so here's some of them."
        />
      }
    >
      Stuff
      <pre>{JSON.stringify(props.page, null, 2)}</pre>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getAllByType("blog-post", {
    orderings: {
      field: "data.published_time",
      direction: "desc",
    },
  });

  console.log(page);

  return {
    props: { page }, // Will be passed to the page component as props
  };
};

export default BlogPage;
