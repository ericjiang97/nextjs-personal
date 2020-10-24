import React from 'react';
import moment from 'moment';

import { RichText } from 'prismic-reactjs';
import { RichText as CustomRichText } from 'prismic-reactjs-custom';
import { Container, Heading, Icon, Image, Label, Link, Paragraph, Tag } from 'bumbag';

import HeroBase from '../../components/core/HeroBase';
import ShareModal from '../../components/modals/ShareModal';

import PageLayout from '../../containers/layouts/PageLayout';
import Custom404 from '../404';

import { client } from '../../config/prismic';
import { PrismicBlogCategory, PrismicBlogPost } from '../../types/PrismicBlogPost';

export default function Post({
  uid,
  data,
  error,
}: {
  uid: string;
  data: PrismicBlogPost<PrismicBlogCategory>;
  error: string;
}) {
  if (error) {
    return <Custom404 />;
  }
  const { title, author, preview, published_time, category } = data;

  const categoryLinkProps = Link.useProps({ href: `/blog/categories/${category.id}` });

  return (
    <PageLayout
      title={`Blog - ${RichText.asText(title)}`}
      ignoreHorizontalPadding={true}
      banner={
        <>
          {preview && (
            <Container
              backgroundColor="primary"
              color="white"
              width="100vw"
              maxWidth="100vw"
              paddingX="1rem"
              paddingY="1.5rem"
              display="flex"
              alignItems="center"
            >
              <Icon icon="solid-info-circle" marginRight="1.5rem" />
              <Paragraph marginTop="0">
                This is a <strong>preview</strong> article used for testing and sharing purposes, please DO NOT share
                this article until it has been published.
              </Paragraph>
            </Container>
          )}
          <HeroBase backgroundImage={`url('${data.banner && data.banner.url}')`}>
            <Container>
              <Container marginY="1rem">
                <Tag use={Link} {...categoryLinkProps}>
                  {category.data.category_name}
                </Tag>
              </Container>
              <Heading use="h3">{RichText.asText(title)}</Heading>
              <Container marginY="1.5rem">
                <Label>By</Label>
                <Paragraph>{RichText.asText(author)}</Paragraph>
                <Label>Published on</Label>
                <Paragraph>{moment(published_time).format('ddd Do MMM YYYY')}</Paragraph>
              </Container>
            </Container>
          </HeroBase>
        </>
      }
      pageMeta={{
        endpoint: `/blog/${uid}`,
      }}
    >
      <Container maxWidth="100%">
        <CustomRichText
          richText={data.body}
          paragraph={(props: any) => {
            return <Paragraph marginY="1.25rem" {...props} />;
          }}
          image={(props: any) => {
            return <Image width="100%" {...props} />;
          }}
          hyperlink={(props: any) => {
            return <Link {...props} />;
          }}
        />
      </Container>
      <Container marginY="1rem" display="flex" flexWrap="wrap" justifyContent="space-between">
        <ShareModal title={RichText.asText(title)} slug={`/blog/${uid}`} />
      </Container>
    </PageLayout>
  );
}

export async function getServerSideProps({ params }: { params: { uid: string } }) {
  const { uid } = params;
  const blogPost = await client.getByUID('blog-post', uid, { fetchLinks: ['category.uid', 'category.category_name'] });
  if (!blogPost) {
    return {
      props: {
        error: 'Not Found',
      },
    };
  }
  const data = blogPost.data as PrismicBlogPost<PrismicBlogCategory>;

  return {
    props: { uid, data },
  };
}
