import { createClient } from "../../../config/prismic";
import Content from "./content";

export default async function BlogPage() {
  return (
    <Content />
  );
};

export async function generateStaticParams() {
  const client = createClient();

  const blogPosts = await client.getAllByType("blog-post", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  const paths = blogPosts.map((post) => {
    return { uid: post.uid };
  });
  return paths;
}
