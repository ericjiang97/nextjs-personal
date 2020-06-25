import React from 'react';
import moment from 'moment';

import { StaticBlogPost } from '../types/StaticBlogPost';

interface BlogList {
  allPosts: StaticBlogPost[];
}

const BlogList: React.FC<BlogList> = ({ allPosts }) => {
  return (
    <div>
      {allPosts.map((post, index) => {
        return (
          <div className="w-full my-8" key={index}>
            <div className="text-xs">
              {moment(post.frontmatter.date).format('ddd Do MMM YYYY')} /{' '}
              <a
                // href={`/blog2/tags/${tag}`}
                className="font-semibold"
                style={{ color: '#f7a046' }}
              >
                {post.frontmatter.category}
              </a>{' '}
            </div>
            <a href={`./blog/${post.slug}`} className="underline">
              <h3 className="my-1 pt-1 leading-tight text-xl text-left font-semibold">{post.frontmatter.title}</h3>
            </a>
            <p className="my-1 pt-1 leading-tight text-sm text-left font-light">{post.frontmatter.summary}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
