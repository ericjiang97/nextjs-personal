import React, { useState, useEffect } from 'react';

import ErrorPage from 'next/error';

import { ApiRequest, Posts, Post } from '../types/wordpress_api';
import WordPressApiService from '../services/WordPressApiService';

import { useRouter } from 'next/dist/client/router';
import BlogPostCard from '../components/cards/BlogPostCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import PageLayout from '../containers/layouts/PageLayout';

const NotFoundContainer: React.FC = () => {
  return <div>No Posts in this Category.</div>;
};

interface PostsCategoryContainer {
  categoryId: string;
}

const PostsCategoryContainer: React.FC<PostsCategoryContainer> = ({ categoryId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const router = useRouter();

  const fetchMorePosts = async () => {
    setCurrentPage(currentPage + 1);
    const resp: ApiRequest<Posts> = await WordPressApiService.getPostsByCategory(10, currentPage + 1, categoryId);
    if (resp.data && maxPage < currentPage) {
      const posts: Post[] = resp.data.posts as any;

      setPosts((prevState) => {
        return [...prevState, ...posts];
      });
      setApiResponse(resp);
      setMaxPage(resp.data.maxPage);
    }
  };
  const [isFetching] = useInfiniteScroll(fetchMorePosts);

  const [posts, setPosts] = useState<Post[]>([]);
  const [apiResponse, setApiResponse] = useState<ApiRequest<Posts> | null>(null);

  /**
   * Logic Block
   */
  useEffect(() => {
    async function getData() {
      if (router.query.param) {
        setCurrentPage(parseInt(router.query.pageNum as string, 10));
      }
      const resp: ApiRequest<Posts> = await WordPressApiService.getPostsByCategory(10, currentPage, categoryId);
      if (resp.data) {
        const posts: Post[] = resp.data.posts as any;
        setPosts((prevState) => {
          return [...prevState, ...posts];
        });
        setApiResponse(resp);
        setMaxPage(resp.data.maxPage);
      }
    }
    getData();
  }, []);

  /**
   * Render Page Block
   */

  if (!apiResponse) {
    return (
      <PageLayout title="Loading Blog...">
        <span className="skeleton-box h-64 inline-block"></span>
      </PageLayout>
    );
  }
  const { error, data } = apiResponse;

  if (error) {
    if (error.statusCode === 404) return <NotFoundContainer />;
    return <ErrorPage statusCode={error.statusCode} />;
  }
  if (!data) {
    return <NotFoundContainer />;
  }
  return (
    <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
      {posts &&
        posts.length > 0 &&
        posts.map((post: Post, index) => {
          return <BlogPostCard post={post} key={index} />;
        })}
      {isFetching && maxPage > currentPage && <span className="skeleton-box h-12 inline-block"></span>}
    </div>
  );
};

export default PostsCategoryContainer;
