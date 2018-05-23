const htmlPlugin = require('html-webpack-plugin');
const extractPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: [
    './src/tab.js',
    './src/example.js'
  ],
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }

    ]
  },
  plugins: [
    new htmlPlugin({
      template: './src/example.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new extractPlugin('./src/example.css')
  ],
  devServer: {
  	contentBase: path.join(__dirname, "example"),
  	  compress: true,
  	  port: 9000,
  	  open: true

  }
};