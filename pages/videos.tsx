import { Heading } from 'bumbag';
import React from 'react';
import PageLayout from '../containers/layouts/PageLayout';

export default function VideographyPage() {
  return (
    <PageLayout title="Videography" pageMeta={{ description: 'Page coming soon!' }}>
      <Heading use="h3">Videos</Heading>

      <div>
        {/**
         * TODO: Use Youtube API to embed videos from channel
         */}
      </div>
    </PageLayout>
  );
}
