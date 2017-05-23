const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postCssPlugins = [
  require('postcss-import'),
  require('postcss-url'),
  require('postcss-filter-gradient'),
  require('postcss-cssnext'),
  require('postcss-extend')
];

module.exports = {
  entry: {
    index: ['isomorphic-fetch', './static/js/src/index.js']
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve('static/js/src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'react', 'es2015' ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                importLoaders: 1,
                localIdentName: '[name]-[local]-[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => postCssPlugins
              }
            }
          ]
        })
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'static/js/build'),
    filename: 'main.js',
    library: 'voltron',
    libraryTarget: 'var'
  }
};
