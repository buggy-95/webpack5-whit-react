const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    clean: true,
    publicPath: '/',
    path: path.resolve('build'),
    filename: 'js/bundle.[contenthash:8].js',
    chunkFilename: 'js/[contenthash:8].chunk.js',
    // 'asset/resource' 模块输出目录
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve('public/index.html'),
      templateParameters: { env: 'test' },
    }),
    new CopyPlugin({
      patterns: [{
        context: 'public/',
        from: 'images/',
        to: 'images/',
      }],
    }),
    // new CopyPlugin({
    //   patterns: [{
    //     from: 'public',
    //     to: 'assets',
    //     globOptions: {
    //       ignore: ['**/index.html'],
    //     },
    //   }],
    // }),
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
                  targets: { node: 12 },
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
          'less-loader',
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
  optimization: { moduleIds: 'named' },
  devServer: {
    contentBase: path.resolve('build'),
    historyApiFallback: true,
    clientLogLevel: 'debug',
    index: 'index.html',
    injectClient: true,
    liveReload: false,
    overlay: true,
    port: 9000,
    open: true,
    hot: true,
  },
};
