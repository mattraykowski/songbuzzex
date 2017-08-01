const path = require('path');
const webpack = require('webpack');
var publicPath = 'http://localhost:4001/';

const ENTRIES = [
  // Polyfill ES6 functionality for Sagas, etc.
  'babel-polyfill',
  path.join(__dirname, 'src', 'index.js'),
];

module.exports = {
  devtool: 'eval',
  entry: {
    app: ENTRIES,
  },
  output: {
    path: path.join(__dirname, '..', 'priv', 'static', 'js'),
    filename: '[name].bundle.js',
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
        ],
      },
      {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
      {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader']},
      {test: /\.(woff|woff2)$/, use: ['url-loader?prefix=font\&limit=100000']},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=100000&mimetype=application/octet-stream']},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=100000&mimetype=image/svg+xml']}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    modules: [
      __dirname,
      'node_modules',
      'js',
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      phoenix: path.join(__dirname, '..', 'deps', 'phoenix', 'priv', 'static', 'phoenix.js')
    }
  },
  devServer: {
    hot: true,
    overlay: true,
    port: 4001,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
  // postcss: {}
};
