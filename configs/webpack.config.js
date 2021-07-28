const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const { webpack } = require("webpack");

module.exports = {
  target: 'web',
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    clean: true,
    publicPath: '/',
    path: path.resolve('build'),
    filename: 'js/bundle.[contenthash:8].js',
    chunkFilename: 'js/[contenthash:8].chunk.js',
    // 'asset/resource' 模块输出目录
    assetModuleFilename: 'images/[name][ext][query]',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/chunk.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve('public/index.html'),
      templateParameters: { env: 'test' },
    }),
    new CopyPlugin({
      patterns: [{
        from: 'public/images/',
        to: 'images/',
      }],
    }),
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      images: path.resolve('src/assets/images'),
      style: path.resolve('src/assets/style'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMaps: true,
            plugins: ['@babel/plugin-transform-async-to-generator'],
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  corejs: 3,
                  useBuiltIns: 'usage',
                  targets: {
                    chrome: 59,
                    edge: 13,
                    firefox: 50,
                  },
                }
              ],
            ],
          },
        },
      },{
        test: /\.(png|gif|jpe?g)$/i,
        type: 'asset/resource',
      }, {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  // devtool: 'eval-source-map',
  optimization: {
    moduleIds: 'named',
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  devServer: {
    // contentBase: path.resolve('build'),
    // clientLogLevel: 'debug',
    // index: 'index.html',
    // injectClient: true,
    // overlay: true,
    historyApiFallback: true,
    liveReload: false,
    port: 9000,
    open: true,
    hot: true,
  },
  externalsType: 'script',
  externals: {
    react: ['https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js', 'React'],
    'react-dom': ['https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js', 'ReactDOM'],
  },
};
