import React from 'react';
import { Container, Paragraph, Link } from 'bumbag';
import SocialStack from './SocialStack';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#EEE', color: '#555' }}>
      <Container padding="1rem" width="100vw" breakpoint="widescreen">
        <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 280, flex: 1 }}>
            <Paragraph fontSize="1.1rem" marginBottom="0.2rem">
              Copyright &copy; Eric Jiang 2016 - {new Date().getFullYear()}
            </Paragraph>
            <Paragraph marginTop="0">
              Powered by <Link href="https://vercel.com/">Vercel</Link>. Built in{' '}
              <Link href="https://nextjs.org/">NextJS</Link> with <Link href="https://bumbag.style/">Bumbag</Link>
            </Paragraph>
            <Paragraph marginTop="0.5rem" marginBottom="0">
              Find the code on <Link href="https://github.com/ericjiang97/nextjs-personal">GitHub</Link>
            </Paragraph>
            <Paragraph marginTop="0.5rem" marginBottom="0">
              Encoutering issues? <Link href="https://github.com/ericjiang97/nextjs-personal/issues">Submit a bug</Link>
            </Paragraph>
          </div>
          <SocialStack />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
