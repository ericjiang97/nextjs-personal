import React from 'react';
import PageLayout from '../containers/layouts/PageLayout';

export default function VideographyPage() {
  return (
    <PageLayout title="Videography">
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-bold">Videography</h1>
          <p className="text-center my-4 text-m">This Page is Coming Soon.</p>
        </div>
      </div>

      <div>
        {/**
         * TODO: Use Youtube API to embed videos from channel
         */}
      </div>
    </PageLayout>
  );
}
