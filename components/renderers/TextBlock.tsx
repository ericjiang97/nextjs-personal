import React from 'react';
import TweetEmbed from 'react-tweet-embed';
import useDarkTheme from '../../hooks/useDarkTheme';
import { Container, Paragraph } from 'bumbag';

const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
const twitterRegex = /http(?:s?):\/\/twitter\.com\/.*\/status(?:es)?\/([^\/\?]+)/;

const TextBlock: React.FC = ({ children }) => {
  const { darkTheme } = useDarkTheme();

  const body = children as string;
  if (youtubeRegex.test(body)) {
    const youtubeLink = body.match(youtubeRegex);
    return (
      <Container>
        <Paragraph>{children}</Paragraph>
        {body && youtubeLink && (
          <Container>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeLink[1]}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Container>
        )}
      </Container>
    );
  }

  if (twitterRegex.test(body)) {
    const tweet = body.match(twitterRegex);
    return (
      <Container marginY="0.75rem">
        <Paragraph>{children}</Paragraph>
        {body && tweet && <TweetEmbed id={tweet[1]} options={{ theme: darkTheme ? 'dark' : 'light' }} />}
      </Container>
    );
  }

  return (
    <Paragraph display="inline" marginY="1rem">
      {children}
    </Paragraph>
  );
};

export default TextBlock;
