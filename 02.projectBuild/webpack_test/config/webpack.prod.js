/*
  webpack的配置文件
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
// const WebpackMd5Hash = require('webpack-md5-hash'); // webpack4用不了~没有实现功能
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // 入口
  entry: {
    main: './src/js/app.js'
  }, //入口文件
  // 输出
  output: {
    filename: 'js/[name].[contenthash:8].js',  // 文件名称
    path: resolve(__dirname, '../dist'), // 输出的文件路径
    publicPath: '/' //所有输出文件的公共路径
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
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',  // 扩展css前缀
              'less-loader',
            ]
          },
          /*{
            test: /\.(png|jp(e?)g|gif|svg|webp)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,   // 如果图片小于8kb就做base64处理
                  // publicPath: './images', // 修改图片的url的路径
                  // outputPath: './images',  // 图片的输出路径
                  name: 'image/[name].[hash:8].[ext]'  // [hash:8] 就是hash值  [ext] 文件扩展名称
                }
              }
            ]
          },*/
          {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8 * 1024,  // 8kb大小以下的图片文件都用base64处理
                  name: 'images/[name].[hash:8].[ext]'
                }
              },
              {
                loader: 'img-loader',
                options: {
                  plugins: [
                    require('imagemin-gifsicle')({
                      interlaced: false
                    }),
                    require('imagemin-mozjpeg')({
                      progressive: true,
                      arithmetic: false
                    }),
                    require('imagemin-pngquant')({
                      floyd: 0.5,
                      speed: 2
                    }),
                    require('imagemin-svgo')({
                      plugins: [
                        { removeTitle: true },
                        { convertPathData: false }
                      ]
                    })
                  ]
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
              // outputPath: 'media/',
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以指定html为模板，创建新的html文件（有之前的结构，引入打包后生成的js、css等资源）
      minify: {
        removeComments: true,  // 移除注释
        collapseWhitespace: true,  // 移除空格/换行符
        removeRedundantAttributes: true, // 移除默认值的属性
        useShortDoctype: true,  // 使用html5的doctype
        removeEmptyAttributes: true, // 移除空的属性
        removeStyleLinkTypeAttributes: true, // 移除type="text/css"属性
        keepClosingSlash: true, // 给单标签加上结束符
        minifyJS: true, // 最小化script中js
        minifyCSS: true, // 最小化style中css
        minifyURLs: true, // 缩小url，使用相对路径
      }
    }),
    // 在输出打包资源之前，默认清除dist文件夹所有文件
    new CleanWebpackPlugin(),
    // 提取css成一个单独文件 -- webpack4
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",  // 文件名称
      // chunkFilename: "css/[id].[hash:8].css"
    }),
    // new WebpackMd5Hash(),
    new webpack.HashedModuleIdsPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    })
  ],
  // 模式
  mode: 'production',  //生产环境
}