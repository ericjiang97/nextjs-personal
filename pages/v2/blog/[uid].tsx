import React from 'react';
import moment from 'moment';
import Prismic from 'prismic-javascript';

import { RichText } from 'prismic-reactjs';
import { Container, Heading, Label, Paragraph } from 'bumbag';

import HeroBase from '../../../components/core/HeroBase';
import PageLayout from '../../../containers/layouts/PageLayout';

import { client } from '../../../config/prismic';

export default function Post({ data, uid }: { data: any; uid: string }) {
  return (
    <PageLayout
      title={`Blog - ${data.title}`}
      ignoreHorizontalPadding={true}
      banner={
        <>
          <HeroBase backgroundImage={`url('${data.banner}')`}>
            <Heading use="h3">{RichText.asText(data.title)}</Heading>
            <Container marginY="1rem"></Container>
            <Container marginY="1rem">
              <Label>By</Label>
              <Paragraph>{RichText.asText(data.author)}</Paragraph>
              <Label>Published on</Label>
              <Paragraph>{moment(data.published_time).format('ddd Do MMM YYYY')}</Paragraph>
            </Container>
          </HeroBase>
        </>
      }
      pageMeta={{
        endpoint: `/blog/${uid}`,
      }}
    >
      <Container>{RichText.render(data.body)}</Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params }: { params: { uid: string } }) {
  const { uid } = params;
  const { data } = await client.getByUID('blog-post', uid, {});
  return {
    props: { data, uid },
  };
}

export async function getStaticPaths() {
  const { results } = await client.query(Prismic.Predicates.at('document.type', 'blog-post'));

  const paths = results.map((post) => {
    return {
      params: {
        uid: post.uid,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
