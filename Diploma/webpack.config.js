const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    open: true,
    inline: true,
    contentBase: './dist',
    historyApiFallback: true,
    port: 9000,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  devtool: 'source-map',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpeg|gif|ttf|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', { loader: 'sass-loader', options: {} }]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(jpg)$/,
        use: {
          loader: 'url-loader',
        },
      }
    ]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "js/bundle.js",
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};