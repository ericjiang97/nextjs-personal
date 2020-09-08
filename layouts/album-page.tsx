import React from 'react';
import PageLayout from '../containers/layouts/PageLayout';
import { Heading, Paragraph, Container, styled } from 'bumbag';
import HeroBase from '../components/HeroBase';
import LinkButton from '../components/LinkButton';

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
  min-width: 280px;
  padding: 0.75rem 0.9rem;
`;

// This function must be named otherwise it disables Fast Refresh.
const DocsPage: React.FC<FrontMatterAlbum> = ({ children, frontMatter }) => {
  // React hooks, for example `useState` or `useEffect`, go here.
  const endpoint = `/${frontMatter.__resourcePath.replace(/\.mdx$/, '')}`;

  const fullUri = `https://ericjiang.dev${endpoint}`;
  return (
    <PageLayout
      title={`Photo - ${frontMatter.title}`}
      pageMeta={{
        endpoint,
        description: frontMatter.description,
      }}
      banner={<HeroBase backgroundImage={`url(${frontMatter.albumImage})`}></HeroBase>}
    >
      <Container display="flex" flexWrap="wrap">
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
      <Container>
        <LinkButton iconBefore="brand-facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${fullUri}`}>
          Share on Facebook
        </LinkButton>
        <LinkButton
          iconBefore="brand-twitter"
          href={`https://twitter.com/intent/tweet?text=Check out this album by Eric Jiang! ${fullUri}`}
        >
          Tweet this
        </LinkButton>
      </Container>
    </PageLayout>
  );
};

export default DocsPage;
