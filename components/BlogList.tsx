import React from 'react';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { StaticBlogPost } from '../types/StaticBlogPost';
import { Card, Stack, Paragraph, Heading, Button } from 'bumbag';

interface BlogList {
  allPosts: StaticBlogPost[];
}

const BlogList: React.FC<BlogList> = ({ allPosts }) => {
  return (
    <Stack>
      {allPosts.map((post, index) => {
        return (
          <Card standalone key={index}>
            {post.frontmatter.coverImageUrl && (
              <LazyLoadImage
                effect="blur"
                src={post.frontmatter.coverImageUrl}
                alt={`cover image for ${post.frontmatter.title}`}
              />
            )}
            <Card.Header>
              <Card.Title fontPalette="primary">{post.frontmatter.title}</Card.Title>
            </Card.Header>
            <Card.Content>
              <Heading use="h7">{moment(post.frontmatter.date).format('ddd Do MMM YYYY')}</Heading>
              <Paragraph>{post.frontmatter.summary}</Paragraph>
            </Card.Content>
            <Card.Footer>
              <Button use="a" href={`/blog/${post.slug}`}>
                Read Article
              </Button>
            </Card.Footer>
          </Card>
        );
      })}
    </Stack>
  );
};

export default BlogList;
