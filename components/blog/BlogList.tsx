import React from 'react';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { StaticBlogPost } from '../../types/StaticBlogPost';
import { Card, Stack, Heading, Link, Tag, Button } from 'bumbag';
import { Markdown } from 'bumbag-addon-markdown';

interface BlogList {
  allPosts: StaticBlogPost[];
}

export const BlogCategoryLink: React.FC<{ category: string }> = ({ category }) => {
  const LinkProps = Link.useProps({ href: `/blog/category/${category}`, color: 'white' });
  return (
    <Tag palette="info" use={Link} {...LinkProps}>
      {category}
    </Tag>
  );
};

const ReadArticleButton: React.FC<{ slug: string }> = ({ slug }) => {
  const LinkProps = Link.useProps({ href: `/blog/${slug}` });
  return (
    <Button palette="primary" use={Link} {...LinkProps} aria-label="read article button">
      Read Article
    </Button>
  );
};

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
            <Card.Header flexDirection="column" alignItems="start">
              <BlogCategoryLink category={post.frontmatter.category} />
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
              <ReadArticleButton slug={post.slug} />
            </Card.Footer>
          </Card>
        );
      })}
    </Stack>
  );
};

export default BlogList;
