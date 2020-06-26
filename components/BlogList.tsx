import React from 'react';
import moment from 'moment';

import { StaticBlogPost } from '../types/StaticBlogPost';

interface BlogList {
  allPosts: StaticBlogPost[];
}

const BlogList: React.FC<BlogList> = ({ allPosts }) => {
  return (
    <div className="flex flex-wrap justify-evenly">
      {allPosts.map((post, index) => {
        return (
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-surface my-2 mx-2 flex flex-col " key={index}>
            {post.frontmatter.coverImageUrl && (
              <div>
                <img src={post.frontmatter.coverImageUrl} alt={`cover image for ${post.frontmatter.title}`} />
              </div>
            )}
            <div className="flex-1 mt-2 p-4">
              <a href={`./blog/${post.slug}`}>
                <h3 className="my-1 pt-1 leading-tight text-xl text-left font-semibold">{post.frontmatter.title}</h3>
              </a>
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
              <p className="my-1 pt-1 leading-tight text-sm text-left font-light">{post.frontmatter.summary}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
