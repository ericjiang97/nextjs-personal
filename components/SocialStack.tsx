import SITE_CONFIG from '../config';
import { Icon, Link } from 'bumbag';

const SocialStack = () => {
  return (
    <div
      style={{
        minWidth: 280,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        padding: '0.5rem 0',
      }}
    >
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
  );
};

export default SocialStack;
