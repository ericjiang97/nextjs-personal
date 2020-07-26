import React from 'react';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { StaticBlogPost } from '../types/StaticBlogPost';
import { Card, Stack, Heading, Link } from 'bumbag';
import { Markdown } from 'bumbag-addon-markdown';

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
                width="100%"
              />
            )}
            <Card.Header>
              <Card.Title fontPalette="primary">{post.frontmatter.title}</Card.Title>
            </Card.Header>
            <Card.Content>
              <Heading use="h7">{moment(post.frontmatter.date).format('ddd Do MMM YYYY')}</Heading>
              <Markdown
                wrap={(children: any) => (
                  <Stack spacing="major-2" maxWidth="100%" width="100%">
                    {children}
                  </Stack>
                )}
                content={post.frontmatter.summary}
                elementProps={{ maxWidth: '100%' }}
              />
            </Card.Content>
            <Card.Footer>
              <Link href={`/blog/${post.slug}`}>Read Article</Link>
            </Card.Footer>
          </Card>
        );
      })}
    </Stack>
  );
};

export default BlogList;
