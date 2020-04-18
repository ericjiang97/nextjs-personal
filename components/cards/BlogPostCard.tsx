import React from 'react';
import moment from 'moment';
import { Post } from '../../types/wordpress_api';

const BlogPostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div
      className="pt-4 px-5 pb-6 mt-2 mb-2 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500 break-all"
      key={post.slug}
    >
      <h2 className="m-0 w-full pt-14 leading-tight text-xs mb-2 text-left">
        {`${moment(post.date).format('DD MMM YYYY hh:mma')}`}
      </h2>
      <h2 className="m-0 w-full pt-14 leading-tight text-xl text-left mb-3">
        {post.title.rendered}
      </h2>
      <div
        className="mb-6"
        dangerouslySetInnerHTML={{
          __html: post.excerpt.rendered,
        }}
      ></div>
      <a
        className="m-0 text-brand text-md font-semibold"
        href={`/blog/${post.slug}`}
      >
        Read more &rarr;
      </a>
    </div>
  );
};

export default BlogPostCard;
