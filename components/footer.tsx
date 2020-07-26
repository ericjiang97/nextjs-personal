import React from 'react';
import SITE_CONFIG from '../config';
import { Container, Paragraph, Text, Link, Stack, Icon } from 'bumbag';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="700px">
        <Stack orientation="horizontal" display="flex">
          <Container flex={3}>
            <Paragraph marginBottom="0.5rem">Copyright &copy; Eric Jiang 2016 - {new Date().getFullYear()}</Paragraph>
            <Text fontSize="0.75rem" marginTop="0">
              Powered by <Link href="https://vercel.com/">Vercel</Link>. Built in{' '}
              <Link href="https://nextjs.org/">NextJS</Link> with <Link href="https://bumbag.style/">Bumbag</Link>
            </Text>
          </Container>
          <Container flex={1}>
            <Stack orientation="horizontal">
              <Link href={SITE_CONFIG.social.LINKEDIN} >
                <Icon aria-label="LinkedIn" icon="brand-linkedin" />
              </Link>
              <Link href={SITE_CONFIG.social.GITHUB}>
                <Icon aria-label="GitHub" icon="brand-github" />
              </Link>
              <Link href={SITE_CONFIG.social.TWITTER}>
                <Icon aria-label="Twitter" icon="brand-twitter" />
              </Link>
              <Link href="mailto:hello@ericjiang.dev">
                <Icon aria-label="Email" icon="solid-envelope" />
              </Link>
              <Link href={SITE_CONFIG.social.FACEBOOK}>
                <Icon aria-label="Facebook" icon="brand-facebook" />
              </Link>
              <Link href={SITE_CONFIG.social.FLICKR}>
                <Icon aria-label="Flickr" icon="brand-flickr" />
              </Link>
              <Link href="/blog/feed.xml">
                <Icon aria-label="Feed" icon="solid-rss" />
              </Link>
            </Stack>
          </Container>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
