/*
  webpack的配置文件
 */
const { resolve } = require('path');

module.exports = {
  // 入口
  entry: './src/js/app.js', //入口文件
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
        test: /\.(png|jp(e?)g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,   // 如果图片小于8kb就做base64处理
              publicPath: '../build/images', // 修改图片的url的路径
              outputPath: './images',  // 图片的输出路径
              name: '[hash:8].[ext]'  // [hash:8] 就是hash值  [ext] 文件扩展名称
            }
          }
        ]
      }
    ]
  },
  // plugins
  plugins: [],
  // 模式
  mode: 'development'  //开发环境
}