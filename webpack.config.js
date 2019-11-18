const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Manifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'public', 'index.html'),
      minify: true,
      favicon: path.join(__dirname, 'public', 'favicon.ico'),
    }),
    new Manifest({
      filename: 'manifest.json',
      name: 'Today\'s Movies',
      short_name: 'Today\'s Movies',
      start_url: '/',
      orientation: 'portrait',
      display: 'standalone',
      inject: true,
      ios: true,
      icons: [
        {
          src: './public/icon.png',
          sizes: [16, 32, 96, 128, 192, 256],
          destination: 'static/images',
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src/service-worker.js',
      exclude: [/static\/images\/icon_.*\.png/],
    }),
  ],
};
