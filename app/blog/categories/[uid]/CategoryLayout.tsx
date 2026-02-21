import { PrismicDocument } from "@prismicio/types";
import React, { Suspense, use } from "react";
import MainLayout from "../../../../containers/MainLayout";
import SmallHeroBanner from "../../../../components/SmallHeroBanner";
import { createClient } from "../../../../config/prismic";
import { filter } from "@prismicio/client";
import { BlogPosts } from "../../posts";

declare interface CategoryLayoutProps {
  category: Promise<PrismicDocument>;
}

export default function CategoryLayout({
  category,
  children,
}: React.PropsWithChildren<CategoryLayoutProps>) {
  const categoryData = use(category);

  const title = `Blog - Category - ${categoryData.data.category_name}`;

  const posts = createClient().getAllByType("blog-post", {
    filters: [filter.at("my.blog-post.category", categoryData.id)],
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  return (
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
        endpoint: `/blog/categories/${categoryData.uid}`,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
          <BlogPosts posts={posts} />
        </div>
      </Suspense>
    </MainLayout>
  );
}
