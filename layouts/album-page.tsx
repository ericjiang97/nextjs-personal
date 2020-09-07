import React from 'react';
import PageLayout from '../containers/layouts/PageLayout';
import { Heading, Paragraph, Container, styled } from 'bumbag';
import HeroBase from '../components/HeroBase';

export interface FrontMatterAlbum {
  frontMatter: {
    title: string;
    subheading?: string;
    album: string;
    description: string;
    albumImage: string;
    __resourcePath: string;
  };
}

const HeadingContainer = styled.div`
  flex: 1;
`;

// This function must be named otherwise it disables Fast Refresh.
const DocsPage: React.FC<FrontMatterAlbum> = ({ children, frontMatter }) => {
  // React hooks, for example `useState` or `useEffect`, go here.
  console.log(frontMatter);
  return (
    <PageLayout
      title={`Photo - ${frontMatter.title}`}
      pageMeta={{
        description: frontMatter.description,
        endpoint: `/albums/${frontMatter.__resourcePath.replace(/\.mdx$/, '')}`,
      }}
      banner={<HeroBase backgroundImage={`url(${frontMatter.albumImage})`}></HeroBase>}
    >
      <Container display="flex">
        <HeadingContainer>
          <Heading use="h3">{frontMatter.title}</Heading>
          {frontMatter.subheading && (
            <Heading use="h5" fontWeight="400">
              {frontMatter.subheading}
            </Heading>
          )}
        </HeadingContainer>
        <HeadingContainer>
          <Paragraph>{frontMatter.description}</Paragraph>
        </HeadingContainer>
      </Container>
      {children}
    </PageLayout>
  );
};

export default DocsPage;
