import { ThemeConfig } from 'bumbag';
import IconConfig from './icons';

const theme: ThemeConfig = {
  Icon: IconConfig,
  Paragraph: {
    styles: {
      base: {
        marginTop: '0.75rem',
      },
    },
  },
  palette: {
    danger: '#da1717',
    info: '#1e67d5',
    modes: {
      dark: {
        background: '#214252',
        text: 'white',
      },
    },
    primary: '#30475e',
    success: '#0a7d33',
    text: '#212121',
    warning: '#ed9c22',
  },
  fontMetrics: {
    default: {
      capHeight: 1433,
      ascent: 1974,
      descent: -426,
      lineGap: 0,
      unitsPerEm: 2000,
    },
    heading: {
      capHeight: 743,
      ascent: 984,
      descent: -273,
      lineGap: 0,
      unitsPerEm: 1000,
    },
  },
};

export default theme;
