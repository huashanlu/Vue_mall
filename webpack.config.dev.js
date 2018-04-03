const HtmlWebpackPlugin = require('html-webpack-plugin');

// import webpack from 'webpack';
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js', //打包的入口文件
  //开发阶段先不用配置出口文件
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|woff|eot|svg|jpg|gif|png)$/,
        use: [{
          loader: 'url-loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({ //全局导入jquery
      $: "jquery",
      jQuery: "jquery",
    })
  ]
}