import { ThemeConfig, IconThemeConfig } from 'bumbag';
import { faCopy, faShare, faEdit, faSun, faMoon, faEnvelope, faRss } from '@fortawesome/free-solid-svg-icons';
import {
  faBootstrap,
  faLinkedin,
  faGithub,
  faTwitter,
  faFacebook,
  faFlickr,
  faGrunt,
  faJs,
  faReact,
} from '@fortawesome/free-brands-svg-icons';

const IconConfig: IconThemeConfig = {
  iconSets: [
    {
      icons: [faSun, faMoon, faEnvelope, faRss, faCopy, faShare, faEdit],
      prefix: 'solid-',
      type: 'font-awesome',
    },
    {
      icons: [faLinkedin, faGithub, faTwitter, faFacebook, faFlickr, faGrunt, faReact, faJs, faBootstrap],
      prefix: 'brand-',
      type: 'font-awesome',
    },
  ],
};

const theme: ThemeConfig = {
  Icon: IconConfig,
  palette: {
    danger: '#da1717',
    info: '#1e67d5',
    primary: '#574feb',
    success: '#0a7d33',
    text: '#212121',
    warning: '#ed9c22',
  },
};

export default theme;
