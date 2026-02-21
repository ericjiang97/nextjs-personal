"use client";

import { PrismicDocument } from "@prismicio/client";
import { use } from "react";
import BlogCard from "../../components/cards/BlogCard";

export function BlogPosts({ posts }: { posts: Promise<PrismicDocument[]> }) {
  const allPosts = use(posts);

  return (
    <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-1 lg:gap-x-5 lg:gap-y-12">
      {allPosts.map((post: PrismicDocument) => {
        return <BlogCard post={post} key={post.uid} />;
      })}
    </div>
  );
}
