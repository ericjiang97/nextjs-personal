import React from 'react';
import moment from 'moment';

import { RichText } from 'prismic-reactjs';
import { Box, Card, Heading, Image, Link, Paragraph, Tag } from 'bumbag';

import BlogCardProps from './types';
import LinkButton from '../../buttons/LinkButton';

const BlogCard: React.FC<BlogCardProps> = ({
  blogPostContent: blogContent,
  uid,
  cardProps,
  showSummary = true,
  showCoverImage = true,
  maxWordCount = undefined,
}) => {
  const { banner, title, summary, published_time, category, body } = blogContent;
  const categoryLinkProps = Link.useProps({ href: `/blog/categories/${category.uid}` });

  let displayedSummary = RichText.asText(summary);
  if (maxWordCount) {
    displayedSummary = displayedSummary
      ? `${displayedSummary.split(' ').splice(0, maxWordCount).join(' ')}...`
      : `${RichText.asText(body).split(' ').splice(0, maxWordCount).join(' ')}...`;
  }

  return (
    <Card {...cardProps} minWidth={280} borderRadius="1" standalone>
      {showCoverImage && banner && banner.url && (
        <Box display="flex" justifyContent="center">
          <Image src={banner.url} alt={`cover image for ${RichText.asText(title)}`} maxHeight="300px" />
        </Box>
      )}
      <Card.Header flexDirection="column" alignItems="start">
        <Tag use={Link} {...categoryLinkProps} palette="coral" size="small" marginY="0.5rem" color="textPrimary">
          {category.data.category_name}
        </Tag>
        <Card.Title fontPalette="primary">{RichText.asText(title)}</Card.Title>
      </Card.Header>
      <Card.Content>{showSummary && displayedSummary && <Paragraph>{displayedSummary}</Paragraph>}</Card.Content>
      <Card.Footer>
        <LinkButton href={`/blog/${uid}`}>Read Article</LinkButton>
        <Heading fontSize="150" marginTop="1.5rem" color="primary300">
          {`Published on ${moment(published_time).format('D MMM YYYY')}`}
        </Heading>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
