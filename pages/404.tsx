import React from 'react';
import PageLayout from '../containers/layouts/PageLayout';
import { Image, Heading, Paragraph, Text } from 'bumbag';

const Strike: React.FC<{ children: string }> = ({ children }) => {
  return <Text style={{ textDecoration: 'line-through' }}>{children}</Text>;
};

export default function Custom404() {
  return (
    <PageLayout title="404" pageMeta={{ description: '404: Droids Not found' }}>
      <Heading use="h3">
        404 - <Strike>Droids</Strike> Page Not Found
      </Heading>
      <Image width="100%" src="/images/hello_there.webp" />
      <Heading use="h4">
        Hello there. <Strike>These are not the droids</Strike> This is not the page, you are looking for.
      </Heading>
      <Paragraph>
        What are you doing?? Either you're here by accident... or are you trying to find hidden features? 🤔
      </Paragraph>
    </PageLayout>
  );
}
