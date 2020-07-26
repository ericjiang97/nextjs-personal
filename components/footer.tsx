import React from 'react';
import SITE_CONFIG from '../config';
import { Container, Paragraph, Text, Link, Icon } from 'bumbag';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="700px" padding="1rem">
        <Container flexDirection="row" display="flex" flexWrap="wrap">
          <Container flex={3} width="auto">
            <Paragraph marginBottom="0.2rem">Copyright &copy; Eric Jiang 2016 - {new Date().getFullYear()}</Paragraph>
            <Text fontSize="0.75rem" marginTop="0">
              Powered by <Link href="https://vercel.com/">Vercel</Link>. Built in{' '}
              <Link href="https://nextjs.org/">NextJS</Link> with <Link href="https://bumbag.style/">Bumbag</Link>
            </Text>
          </Container>
          <Container flex={1} display="flex" justifyContent="space-evenly" paddingY="0.5rem">
            <Link href={SITE_CONFIG.social.LINKEDIN}>
              <Icon aria-label="LinkedIn" icon="brand-linkedin" fontSize="500" />
            </Link>
            <Link href={SITE_CONFIG.social.GITHUB}>
              <Icon aria-label="GitHub" icon="brand-github" fontSize="500" />
            </Link>
            <Link href={SITE_CONFIG.social.TWITTER}>
              <Icon aria-label="Twitter" icon="brand-twitter" fontSize="500" />
            </Link>
            <Link href="mailto:hello@ericjiang.dev">
              <Icon aria-label="Email" icon="solid-envelope" fontSize="500" />
            </Link>
            <Link href={SITE_CONFIG.social.FACEBOOK}>
              <Icon aria-label="Facebook" icon="brand-facebook" fontSize="500" />
            </Link>
            <Link href={SITE_CONFIG.social.FLICKR}>
              <Icon aria-label="Flickr" icon="brand-flickr" fontSize="500" />
            </Link>
            <Link href="/blog/feed.xml">
              <Icon aria-label="Feed" icon="solid-rss" fontSize="500" />
            </Link>
          </Container>
        </Container>
      </Container>
    </footer>
  );
};

export default Footer;
