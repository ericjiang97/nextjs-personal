import React from 'react';
import moment from 'moment';

import { RichText } from 'prismic-reactjs';
import { Card, Heading, Image, Link, Paragraph, Tag } from 'bumbag';

import BlogCardProps from './types';
import LinkButton from '../../buttons/LinkButton';

const BlogCard: React.FC<BlogCardProps> = ({ blogPostContent: blogContent, uid, cardProps, showSummary = true }) => {
  const { banner, title, summary, published_time, category } = blogContent;
  const categoryLinkProps = Link.useProps({ href: `/blog/categories/${category.uid}` });
  return (
    <Card {...cardProps} minWidth={280} standalone>
      {banner && banner.url && (
        <Image src={banner.url} alt={`cover image for ${RichText.asText(title)}`} width="100%" />
      )}
      <Card.Header flexDirection="column" alignItems="start">
        <Card.Title fontPalette="primary">{RichText.asText(title)}</Card.Title>
        <Tag use={Link} {...categoryLinkProps} palette="primary" variant="tint" size="small" marginY="0.5rem">
          {category.data.category_name}
        </Tag>
      </Card.Header>
      <Card.Content>
        <Heading use="h7">{moment(published_time).format('ddd Do MMM YYYY')}</Heading>
        {showSummary && <Paragraph>{RichText.asText(summary)}</Paragraph>}
      </Card.Content>
      <Card.Footer>
        <LinkButton href={`/blog/${uid}`}>Read Article</LinkButton>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
