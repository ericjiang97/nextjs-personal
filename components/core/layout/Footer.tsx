import { Container, Heading, Icon, Link, Paragraph, Stack } from 'bumbag';
import React from 'react';

import ButtondownContainer from '../../../containers/ButtondownContainer';

import SITE_CONFIG from '../../../config';
import routes from '../../../config/routes';

const Footer = () => {
  return (
    <footer>
      <ButtondownContainer />
      <Container backgroundColor="oxfordBlue" color="white" minWidth="100%" breakpoint="widescreen">
        <Container
          paddingY="3rem"
          breakpoint="widescreen"
          display="flex"
          alignItems="center"
          flex="1"
          flexWrap="wrap"
          width="75%"
        >
          <Container>
            <Heading use="h4" fontWeight="400" marginBottom="1rem">
              Copyright &copy; Eric Jiang 2016 - {new Date().getFullYear()}
            </Heading>
            <Heading use="h6" marginY="0.75rem">
              Powered by{' '}
              <Link href="https://vercel.com/" color="secondary">
                Vercel
              </Link>{' '}
              &amp;{' '}
              <Link href="https://prismic.io/" color="secondary">
                Prismic
              </Link>
              . Built in{' '}
              <Link href="https://nextjs.org/" color="secondary">
                NextJS
              </Link>{' '}
              with{' '}
              <Link href="https://bumbag.style/" color="secondary">
                Bumbag
              </Link>
            </Heading>
            <Paragraph marginY="0.75rem" marginBottom="0">
              Find the code on{' '}
              <Link href="https://github.com/ericjiang97/nextjs-personal" color="secondary">
                GitHub
              </Link>
            </Paragraph>
            <Paragraph marginTop="0.5rem" marginBottom="0">
              Encoutering issues?{' '}
              <Link href="https://github.com/ericjiang97/nextjs-personal/issues/new" color="secondary">
                Submit an issue
              </Link>
            </Paragraph>
          </Container>
          <Stack
            flex={1}
            display="flex"
            justifyContent="space-evenly"
            marginTop="1rem"
            direction="horizontal"
            maxWidth="300px"
            minWidth="280px"
            width="100%"
          >
            <Link href={SITE_CONFIG.social.LINKEDIN} color="white">
              <Icon aria-label="LinkedIn" icon="brand-linkedin" fontSize="400" />
            </Link>
            <Link href={SITE_CONFIG.social.GITHUB} color="white">
              <Icon aria-label="GitHub" icon="brand-github" fontSize="400" />
            </Link>
            <Link href={SITE_CONFIG.social.TWITTER} color="white">
              <Icon aria-label="Twitter" icon="brand-twitter" fontSize="400" />
            </Link>
            <Link href="mailto:hello@ericjiang.dev" color="white">
              <Icon aria-label="Email" icon="solid-envelope" fontSize="400" />
            </Link>
            <Link href={SITE_CONFIG.social.FACEBOOK} color="white">
              <Icon aria-label="Facebook" icon="brand-facebook" fontSize="400" />
            </Link>
            <Link href={SITE_CONFIG.social.INSTAGRAM} color="white">
              <Icon aria-label="Instagram" icon="brand-instagram" fontSize="400" />
            </Link>
            <Link href={routes.RSS_FEED} color="white">
              <Icon aria-label="Feed" icon="solid-rss" fontSize="400" />
            </Link>
          </Stack>
        </Container>
      </Container>
    </footer>
  );
};

export default Footer;
