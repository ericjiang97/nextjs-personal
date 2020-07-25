import React from 'react';
import PageLayout from '../containers/layouts/PageLayout';
import { Heading } from 'bumbag';

export default function VideographyPage() {
  return (
    <PageLayout title="Videography">
      <Heading use="h3">Videos</Heading>

      <div>
        {/**
         * TODO: Use Youtube API to embed videos from channel
         */}
      </div>
    </PageLayout>
  );
}
