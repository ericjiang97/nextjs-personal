import React, { useEffect } from 'react';

import { Container, Heading, Image, Link, Paragraph } from 'bumbag';

import HeroBase from '../components/core/HeroBase';

import PageLayout from './layouts/PageLayout';
import { useRouter } from 'next/dist/client/router';

interface SunsetttedPageProps {
  currentPageName: string;
  currentEndpoint: string;
  newUrl: string;
}
const SunsetttedPage: React.FC<SunsetttedPageProps> = ({ currentEndpoint, currentPageName, newUrl }) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      // after 2 seconds
      router.push(newUrl);
    }, 5000);
  });
  return (
    <PageLayout
      title={`${currentPageName} - This page has been moved`}
      ignoreHorizontalPadding={true}
      banner={
        <HeroBase backgroundVariant="color" backgroundColor="primary600">
          <Container breakpoint="desktop">
            <Heading use="h3">This page has been sunsetted.</Heading>
            <Paragraph marginTop="1.25rem" fontSize="200">
              I'll move you along to the new page in around 5 seconds, if you don't get redirected, try clicking here:{' '}
              <Link color="secondary" href={newUrl}>
                {newUrl}
              </Link>
            </Paragraph>
            <Image src="/images/eric-shrug.png" />
          </Container>
        </HeroBase>
      }
      pageMeta={{
        endpoint: currentEndpoint,
        description: 'This page has been moved',
      }}
    ></PageLayout>
  );
};

export default SunsetttedPage;
