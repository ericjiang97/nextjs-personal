const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withMdxEnhanced = require('next-mdx-enhanced');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withPWA = require('next-pwa');

module.exports = withPlugins([
  optimizedImages(),
  withCSS(),
  withFonts(),
  withPWA({
    pwa: {
      dest: 'public',
    },
  }),
  withMdxEnhanced({
    layoutPath: 'layouts',
    defaultLayout: true,
    fileExtensions: ['mdx'],
    remarkPlugins: [],
    rehypePlugins: [],
    usesSrc: false,
    extendFrontMatter: {
      process: (mdxContent, frontMatter) => {},
      phase: 'prebuild|loader|both',
    },
    reExportDataFetching: false,
  })({
    webpack: function (config) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      });
      config.node = {
        fs: 'empty',
      };
      return config;
    },
  }),
]);
