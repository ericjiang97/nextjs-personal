import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import icons from '../icons';

interface CodeBlockProps {
  language: Language;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <p className="my-2">
      <Highlight {...defaultProps} code={value} language={language as Language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} py-2 px-2 relative z-0`} style={style}>
            <div className="overflow-x-scroll py-2">
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-between flex-wrap">
              <div
                className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                style={{ maxWidth: '6rem' }}
              >
                {language}
              </div>
              <CopyToClipboard text={value}>
                <button
                  className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                  style={{ maxWidth: '6rem' }}
                >
                  <icons.Copy className="fill-current h-5 w-5 mx-2" />
                </button>
              </CopyToClipboard>
            </div>
          </pre>
        )}
      </Highlight>
    </p>
  );
};

export default CodeBlock;
