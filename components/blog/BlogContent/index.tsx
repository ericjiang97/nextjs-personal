import React from 'react';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';

import { Blockquote, Container, Heading, Link, List, Paragraph, Table, TableBody, TableCell, TableHead } from 'bumbag';
import HighlightedCode from 'bumbag-addon-highlighted-code';

import BlogContentProps from './types';

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  return (
    <Container maxWidth="90vw" paddingX="0.5rem">
      <Markdown
        children={content}
        plugins={[gfm]}
        renderers={{
          code: ({ language, value }) => {
            return <HighlightedCode code={value} language={language} isBlock marginY="1rem" maxWidth="100%" />;
          },
          inlineCode: ({ language, value }) => (
            <HighlightedCode code={value} language={language} isBlock={false} display="inline" maxWidth="100vw" />
          ),
          blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
          link: ({ children, href }) => (
            <Link href={href} wordBreak="break-all">
              {children}
            </Link>
          ),
          list: ({ ordered, children }) => (
            <List listStylePosition="inside" isOrdered={ordered} listStyleType="disc">
              {children}
            </List>
          ),
          paragraph: ({ children }) => {
            return <Paragraph>{children}</Paragraph>;
          },
          table: ({ children }) => <Table>{children}</Table>,
          tableHead: ({ children }) => <TableHead>{children}</TableHead>,
          tableBody: ({ children }) => <TableBody>{children}</TableBody>,
          tableCell: ({ children }) => <TableCell>{children}</TableCell>,
          heading: ({ level, children }) => <Heading use={`h${level}`}>{children}</Heading>,
        }}
        escapeHtml
      />
    </Container>
  );
};

export default BlogContent;
