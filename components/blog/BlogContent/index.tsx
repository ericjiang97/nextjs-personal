import { Blockquote, Link, List, Paragraph, Table, TableBody, TableCell, TableHead } from 'bumbag';
import React from 'react';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import HighlightedCode from 'bumbag-addon-highlighted-code';

interface BlogContentProps {
  content?: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  return (
    <React.Fragment>
      <Markdown
        children={content}
        plugins={[gfm]}
        renderers={{
          code: ({ language, value }) => {
            console.log({ language, value });
            return <HighlightedCode code={value} language={language} isBlock marginY="1rem" />;
          },
          inlineCode: ({ language, value }) => <HighlightedCode code={value} language={language} />,
          blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
          link: ({ children, href }) => <Link href={href}>{children}</Link>,
          list: ({ ordered, children }) => (
            <List listStylePosition="inside" isOrdered={ordered} listStyleType="disc">
              {children}
            </List>
          ),
          paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
          table: ({ children }) => <Table>{children}</Table>,
          tableHead: ({ children }) => <TableHead>{children}</TableHead>,
          tableBody: ({ children }) => <TableBody>{children}</TableBody>,
          tableCell: ({ children }) => <TableCell>{children}</TableCell>,
        }}
        escapeHtml
      />
    </React.Fragment>
  );
};

export default BlogContent;
