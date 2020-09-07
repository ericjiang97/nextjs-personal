const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withMdxEnhanced = require('next-mdx-enhanced');

module.exports = withCSS(
  withFonts(
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
  ),
);
