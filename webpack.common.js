const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: ['babel-polyfill', 'isomorphic-fetch', './app/index.js'],
  },
  module: {
    rules: [
      {test: /\.(js)/, use: 'babel-loader', exclude: /node_modules/ },
      {test: /\.css/, use: ['style-loader', 'css-loader'] },
      {test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=100000' },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      title: 'Production'
    })
  ],
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
}
