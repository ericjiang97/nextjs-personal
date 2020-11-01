/**
 * Prismic Quick Utils
 */
import Prismic from 'prismic-javascript';
import { client } from '../config/prismic';

export const getBlogPostContent = async (
  additionalQuery?: string[],
  showPreview: boolean = false,
  maxResultSize: number = 100,
) => {
  const prismicQuery = [
    Prismic.Predicates.at('document.type', 'blog-post'),
    Prismic.Predicates.at('my.blog-post.preview', showPreview),
  ];
  if (additionalQuery) {
    prismicQuery.push(...additionalQuery);
  }
  return await client.query(prismicQuery, {
    fetchLinks: ['category.uid', 'category.category_name'],
    orderings: '[my.blog-post.published_time desc]',
    pageSize: maxResultSize,
  });
};

export const searchPrismic = async (searchString: string, maxResultSize: number = 100) => {
  const result = await client.query(
    [Prismic.Predicates.at('document.type', 'blog-post'), Prismic.Predicates.fulltext('document', searchString)],
    {
      fetchLinks: ['category.uid', 'category.category_name'],
      pageSize: maxResultSize,
    },
  );
  return result;
};
