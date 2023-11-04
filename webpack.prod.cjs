const { mergeWithRules, mergeWithCustomize, unique } = require('webpack-merge');
const common = require('./webpack.common.cjs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const configWithMergedPlugins = mergeWithCustomize({
  customizeArray: unique(
    'plugins',
    ['MiniCssExtractPlugin'],
    plugin => plugin.constructor && plugin.constructor.name
  ),
})(common, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
});

module.exports = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'replace',
    },
  },
})(configWithMergedPlugins, {
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
});
