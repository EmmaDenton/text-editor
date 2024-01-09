const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'J.A.T.E',
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'service-worker.js',
    }),
    new WebpackPwaManifest({
      name: 'J.A.T.E',
      short_name: 'JATE',
      description: 'Just Another Text Editor',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: '/',
      icons: [
        {
          src: path.resolve('./src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
