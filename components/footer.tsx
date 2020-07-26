import React from 'react';
import Icons from '../components/icons';
import SITE_CONFIG from '../config';
import { Container, Paragraph, Text, Link, Stack } from 'bumbag';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="700px">
        <Stack orientation="horizontal" display="flex">
          <Container flex="1">
            <Paragraph marginBottom="0.5rem">Copyright &copy; Eric Jiang 2016 - {new Date().getFullYear()}</Paragraph>
            <Text fontSize="0.75rem">
              Powered by <Link href="https://vercel.com/">Vercel</Link>. Built in{' '}
              <Link href="https://nextjs.org/">NextJS</Link> with <Link href="https://bumbag.style/">Bumbag</Link>
            </Text>
          </Container>
          <Container maxWidth="30%">
            <Stack orientation="horizontal">
              <Link href={SITE_CONFIG.social.LINKEDIN}>
                <Icons.LinkedIn style={{ fill: 'currentColor', height: '1rem' }} />
              </Link>
              <Link href={SITE_CONFIG.social.GITHUB}>
                <Icons.GitHub style={{ fill: 'currentColor', height: '1rem' }} />
              </Link>
              <Link href={SITE_CONFIG.social.TWITTER}>
                <Icons.Twitter style={{ fill: 'currentColor', height: '1rem' }} />
              </Link>
              <Link href="mailto:hello@ericjiang.dev">
                <Icons.Gmail style={{ fill: 'currentColor', height: '1rem' }} />
              </Link>
              <Link href={SITE_CONFIG.social.FACEBOOK}>
                <Icons.Facebook style={{ fill: 'currentColor', height: '1rem' }} />
              </Link>
              <Link href={SITE_CONFIG.social.FLICKR}>
                <Icons.Flickr style={{ fill: 'currentColor', height: '1rem' }} />
              </Link>
              <Link href="/blog/feed.xml">
                <Icons.Rss style={{ fill: 'currentColor', height: '1rem' }} />
              </Link>
            </Stack>
          </Container>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
