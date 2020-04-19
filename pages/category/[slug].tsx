import React, { Component } from 'react';
import { NextPageContext } from 'next';

import ErrorPage from 'next/error';

import { ApiRequest, Category } from '../../types/wordpress_api';
import PageLayout from '../../containers/layouts/PageLayout';
import WordPressApiService from '../../services/WordPressApiService';
import Custom404 from '../404';
import PostsCategoryContainer from '../../containers/PostsCategoryContainer';

export default class extends Component<{ category: ApiRequest<Category> }, null> {
  // Resolve promise and set initial props.
  static async getInitialProps({ query }: NextPageContext) {
    const { slug } = query;
    const category = await WordPressApiService.getCategoryBySlug(slug as string);

    return { category };
  }

  render() {
    const { error, data } = this.props.category;

    if (error) {
      if (error.statusCode === 404) return <Custom404 />;
      return <ErrorPage statusCode={error.statusCode} />;
    }

    if (!data) {
      return <Custom404 />;
    }

    return (
      <PageLayout title={`Category - ${data.name}`}>
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
          <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
            <h1 className="m-0 w-full pt-14 leading-tight text-4xl text-center font-bold">Blog</h1>
            <h3 className="my-2 w-full pt-14 leading-tight text-2xl text-center font-semibold">{`Category - ${data.name}`}</h3>
            <h4 className="my-1 w-full pt-14 leading-tight text-xl text-center font-semibold">{`Num of Posts: ${data.count}`}</h4>
            <p className="text-center my-4 text-m max-w-2xl">{`${data.description}`}</p>
          </div>
        </div>

        <PostsCategoryContainer categoryId={data.id.toString()} />
      </PageLayout>
    );
  }
}
