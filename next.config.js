const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

module.exports = withFonts();
module.exports = withCSS({});
module.exports = {
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
};
