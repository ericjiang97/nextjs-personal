/**
 * Prismic Quick Utils
 */
import Prismic from 'prismic-javascript';
import { client } from '../config/prismic';

export const getBlogPostContent = async (additionalQuery?: string[]) => {
  const prismicQuery = [
    Prismic.Predicates.at('document.type', 'blog-post'),
    Prismic.Predicates.at('my.blog-post.preview', false),
  ];
  if (additionalQuery) {
    prismicQuery.push(...additionalQuery);
  }
  return await client.query(prismicQuery, {
    fetchLinks: ['category.uid', 'category.category_name'],
    orderings: '[my.blog-post.published_time desc]',
  });
};
