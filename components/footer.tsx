import React from 'react';
import SITE_CONFIG from '../config';
import { Container, Paragraph, Text, Link, Icon } from 'bumbag';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="700px" padding="1rem">
        <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 280, flex: 1 }}>
            <Paragraph marginBottom="0.2rem">Copyright &copy; Eric Jiang 2016 - {new Date().getFullYear()}</Paragraph>
            <Text fontSize="0.75rem" marginTop="0">
              Powered by <Link href="https://vercel.com/">Vercel</Link>. Built in{' '}
              <Link href="https://nextjs.org/">NextJS</Link> with <Link href="https://bumbag.style/">Bumbag</Link>
            </Text>
          </div>
          <div style={{ minWidth: 280, display: 'flex', justifyContent: 'space-evenly', padding: '0.5rem 0' }}>
            <Link href={SITE_CONFIG.social.LINKEDIN}>
              <Icon aria-label="LinkedIn" icon="brand-linkedin" fontSize="400" />
            </Link>
            <Link href={SITE_CONFIG.social.GITHUB}>
              <Icon aria-label="GitHub" icon="brand-github" fontSize="400" />
            </Link>
            <Link href={SITE_CONFIG.social.TWITTER}>
              <Icon aria-label="Twitter" icon="brand-twitter" fontSize="400" />
            </Link>
            <Link href="mailto:hello@ericjiang.dev">
              <Icon aria-label="Email" icon="solid-envelope" fontSize="400" />
            </Link>
            <Link href={SITE_CONFIG.social.FACEBOOK}>
              <Icon aria-label="Facebook" icon="brand-facebook" fontSize="400" />
            </Link>
            <Link href={SITE_CONFIG.social.FLICKR}>
              <Icon aria-label="Flickr" icon="brand-flickr" fontSize="400" />
            </Link>
            <Link href={SITE_CONFIG.social.INSTAGRAM}>
              <Icon aria-label="Instagram" icon="brand-instagram" fontSize="400" />
            </Link>
            <Link href="/blog/feed.xml">
              <Icon aria-label="Feed" icon="solid-rss" fontSize="400" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
