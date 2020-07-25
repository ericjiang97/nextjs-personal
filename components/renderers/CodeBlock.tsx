import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import icons from '../icons';
import { Container, Button } from 'bumbag';

interface CodeBlockProps {
  language: Language;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <Container marginY="0.5rem" display="flex" flexDirection="row">
      <Container flex={3}>
        <Highlight {...defaultProps} code={value} language={language as Language} theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className}`} style={style}>
              <Container overflowX="scroll" padding="0.25rem">
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </Container>
            </pre>
          )}
        </Highlight>
      </Container>
      <Container padding="0.25rem">
        <Container maxWidth="6rem" backgroundColor="primary" color="white" padding="0.25rem" borderRadius="0.25rem">
          {language}
        </Container>
        <CopyToClipboard text={value}>
          <Button palette="primary" maxWidth="6rem" flex="1" marginY="0.25rem">
            <icons.Copy className="fill-current h-5 w-5 mx-2" />
          </Button>
        </CopyToClipboard>
      </Container>
    </Container>
  );
};

export default CodeBlock;
