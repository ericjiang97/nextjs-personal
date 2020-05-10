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
          <div className="w-full my-4" key={index}>
            <div className="my-1 text-xs">{moment(post.frontmatter.date).format('ddd Do MMM YYYY')}</div>
            <a href={`./blog2/${post.slug}`} className="underline">
              <h3 className="my-1 pt-2 leading-tight text-xl text-left font-semibold">{post.frontmatter.title}</h3>
            </a>
            <h4 className="my-1 pt-2 leading-tight text-lg text-left font-semibold">{post.frontmatter.author}</h4>
            <p className="my-1 pt-2 leading-tight text-medium text-left font-light">{post.frontmatter.summary}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
