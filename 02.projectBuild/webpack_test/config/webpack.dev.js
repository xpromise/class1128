/*
  webpack的配置文件
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // 入口
  entry: ['./src/js/app.js', './src/index.html'], //入口文件
  // 输出
  output: {
    filename: './js/[name].js',  // 文件名称
    path: resolve(__dirname, 'build') // 输出的文件路径
  },
  // loader
  module: {
    rules: [
      // 写所有的loader的配置
      {
        enforce: "pre",   // 提前检测
        test: /\.js$/,
        exclude: /node_modules/,  // 排除指定文件夹的文件
        include: resolve(__dirname, "src/js"),  // 只包含指定文件
        loader: "eslint-loader"
      },
      {
        // https://www.webpackjs.com/configuration/module/#rule-oneof 所有文档
        oneOf: [ // 只执行一个loader
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.less$/,   // 检测指定正则的文件，只有满足条件才有使用下面的loader处理
            use: [{  // 执行顺序，从后面到前面
              loader: "style-loader" // 将css代码塞入到style标签中
            }, {
              loader: "css-loader" // 将css以commonjs的模块化导入到js代码中
            }, {
              loader: "less-loader" // 将less编译为css
            }]
          },
          {
            test: /\.(png|jp(e?)g|gif|svg|webp)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,   // 如果图片小于8kb就做base64处理
                  publicPath: './images', // 修改图片的url的路径
                  outputPath: './images',  // 图片的输出路径
                  name: '[hash:8].[ext]'  // [hash:8] 就是hash值  [ext] 文件扩展名称
                }
              }
            ]
          },
          {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader'
            }
          },
          {
            loader: 'file-loader',
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.less$/],  // 处理非js、非html、非json、非less的其他资源
            options: {
              outputPath: 'media/',
              name: '[hash:8].[ext]',
            },
          }
        ]
      }
    ]
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以指定html为模板，创建新的html文件（有之前的结构，引入打包后生成的js、css等资源）
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // 模式
  mode: 'development',  //开发环境
  // 开发服务器，自动编译、自动打开浏览器、自动刷新
  devServer: {
    contentBase: './build',  //要运行的项目根目录
    open: true,  // 自动打开浏览器
    port: 3000,
    hot: true // 开启模块热替换功能
  },
}