const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: '../client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // loader for webpack that allows you to use babel to transpile your js code from es6+ to es5
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // generates an HTML file for your application and automatically injects all your generated bundles into this file
      title: 'Development',
      template: '/public/index.html',
    }),
  ],
  devServer: {
    static: {
      // match the output path
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/build',
    },
    proxy: {
      '/api': {
        // request that  start with /api wil be intercepted by the development server
        // any requests that start with '/api' on the development server will be forwarded to 'http://localhost:3000'
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
