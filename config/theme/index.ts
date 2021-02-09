import { PaletteThemeConfig, ThemeConfig } from 'bumbag';
import IconConfig from './icons';

/**
 * Color Palette
 * https://coolors.co/e9d758-297373-ff8552-e6e6e6-39393a
 */
const palette: PaletteThemeConfig = {
  danger: '#da1717',
  info: '#1e67d5',
  primary: '#297373',
  secondary: '#E9D758',
  success: '#0a7d33',
  text: '#212121',
  warning: '#FF8552',

  // Custom Colors
  coral: '#FF8552',
  onyx: '#39393A',
  platinum: '#E6E6E6',
  oxfordBlue: '#001B2E',
};

const theme: ThemeConfig = {
  palette,
  Icon: IconConfig,
  Paragraph: {
    styles: {
      base: {
        marginTop: '0.75rem',
      },
    },
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
