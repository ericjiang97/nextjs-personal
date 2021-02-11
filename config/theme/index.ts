import { ThemeConfig } from 'bumbag';

import IconConfig from './icons';
import PaletteConfig from './palette';

const theme: ThemeConfig = {
  palette: PaletteConfig,
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
