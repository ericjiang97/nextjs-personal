import React from 'react';

import { Box, Image, Link, Paragraph } from 'bumbag';
import { RichText as CustomRichText } from 'prismic-reactjs-custom';
import { PrismicRichText } from 'prismic-reactjs-custom/dist/es/RichText.model';

interface PrismicRichTextWrapperProps {
  richText: PrismicRichText;
}

const PrismicRichTextWrapper: React.FC<PrismicRichTextWrapperProps> = ({ richText }) => {
  return (
    <>
      <CustomRichText
        richText={richText}
        paragraph={(props: any) => {
          return (
            <Paragraph marginY="1.25rem" color="#777">
              {props.children}
            </Paragraph>
          );
        }}
        image={(props: any) => {
          return (
            <Box width="100%" display="flex" justifyContent="center">
              <Image src={props.src} alt={props.alt} marginX="auto" {...props} />
            </Box>
          );
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
    </>
  );
};

export default PrismicRichTextWrapper;
