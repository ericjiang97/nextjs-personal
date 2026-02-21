import { filter } from "@prismicio/client";
import { createClient } from "../../../../config/prismic";
import { Suspense } from "react";
import { BlogPosts } from "../../posts";
import CategoryLayout from "./CategoryLayout";
import MainLayout from "../../../../containers/MainLayout";
import SmallHeroBanner from "../../../../components/SmallHeroBanner";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const category = createClient().getByUID("category", uid);

  const title = `Blog - Category`;

  return (
    <Suspense
      fallback={
        <MainLayout
          pageTitle={title}
          customHero={
            <SmallHeroBanner
              title={title}
              description="I occasionally write on my blog about tech, projects, food, reviews (and will add photography and travel in the future)... so here's some of them."
            />
          }
          pageMeta={{
            description: title,
            endpoint: `/blog/categories`,
          }}
        >
          <div>Loading...</div>
        </MainLayout>
      }
    >
      <CategoryLayout category={category}></CategoryLayout>
    </Suspense>
  );
}

export const generateStaticParams = async () => {
  const client = createClient();

  const blogPosts = await client.getAllByType("category", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  const paths = blogPosts.map((post) => {
    return { uid: post.uid };
  });
  return paths;
};
