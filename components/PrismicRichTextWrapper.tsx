import React from 'react';

import { RichText } from 'prismic-reactjs-custom';
import { PrismicRichText } from 'prismic-reactjs-custom/dist/es/RichText.model';
import { Image, Link, Paragraph } from 'bumbag';

interface PrismicRichTextWrapperProps {
  richText: PrismicRichText;
}

const PrismicRichTextWrapper: React.FC<PrismicRichTextWrapperProps> = ({ richText }) => {
  return (
    <RichText
      richText={richText}
      paragraph={(props: any) => {
        return (
          <Paragraph marginY="1.25rem" color="#777">
            {props.children}
          </Paragraph>
        );
      }}
      image={(props: any) => {
        return <Image width="100%" src={props.src} alt={props.alt} {...props} />;
      }}
      hyperlink={(props: any) => {
        return <Link {...props} />;
      }}
      preformatted={(props: any) => {
        return (
          <pre
            style={{
              maxWidth: '80vw',
              overflowY: 'scroll',
            }}
          >
            {props.children}
          </pre>
        );
      }}
    />
  );
};

export default PrismicRichTextWrapper;
