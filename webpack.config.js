const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const dotenv = require('dotenv').config();
const Dotenv = require('dotenv-webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      // {
      //   test: /\.(woff(2)|eot|ttf|otf|jpg|png|gif|svg|ico)$/,
      //   use: ['file-loader'],
      // },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      favicon: path.resolve(__dirname, './src/assets/favicon.ico'),
    }),
    new CleanWebpackPlugin(),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorPluginOptions: {
    //     preset: ['default', { discardComments: { removeAll: true } }],
    //   },
    //   canPrint: true,
    // }),
    // new MiniCssExtractPlugin({
    //   filename: '[name]-[hash].min.css',
    //   allChunks: true,
    // }),
    new webpack.NoEmitOnErrorsPlugin(),
    new TsconfigPathsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(dotenv.parsed),
    // }),
    new Dotenv(),
  ],
  devServer: {
    static: path.join(__dirname, './src'),
    port: 3001,
    hot: 'only',
    compress: true,
    open: true,
    historyApiFallback: true,
    allowedHosts: ['all'],
    client: {
      overlay: false,
    },
  },
};
