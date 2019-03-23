## 1、Gulp介绍
* 中文主页: http://www.gulpjs.com.cn/
* gulp是与grunt功能类似的**前端项目构建**工具, 也是基于Nodejs的自动**任务运行器**
* 能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的
  合并、压缩、检查、监听文件变化、浏览器自动刷新、测试等任务
* gulp更高效(异步多任务), 更易于使用, 插件高质量

## 2、重要API介绍
* gulp.src(filePath/pathArr) 
  * 用于读取文件
* gulp.dest(dirPath/pathArr)
  * 用于向文件夹中输出文件
* gulp.task(name, [deps], fn) 
  * 定义一个任务
* gulp.watch() 
  * 监视文件的变化

## 3、创建一个简单的应用gulp_test
* 项目目录
  ```
  |- dist
  |- build
  |- src
    |- js
    |- less
    |- index.html
  |- gulpfile.js ----- gulp配置文件：gulp运行时读取配置信息的文件
  |- package.json
    {
      "name": "gulp_test",
      "version": "1.0.0"
    } 
  ```
* 安装gulp
  * npm install gulp-cli -g 全局安装
  * npm install gulp --save-dev 局部安装
* 配置编码: gulpfile.js
  ```
  //引入gulp模块
  var gulp = require('gulp');
  //定义任务
  gulp.task('任务名', function() {
    // 将你的任务的任务代码放在这
  });
  //定义默认任务
  gulp.task('default', '任务')
  ```
* 构建命令: `gulp`

## 4、js文件语法检查
* 准备工作：创建js文件
  * src/js/module1.js
  * src/js/module2.js
  * src/js/module3.js
  * src/js/main.js
* 下载插件:
  * npm install gulp-eslint --save-dev
* 配置编码
  ```
  const gulp = require('gulp');
  const eslint = require('gulp-eslint');
  
  gulp.task('eslint',() => {
    return gulp.src(['./src/js/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
  })
  ```
* 在package.json中配置eslint的检查项
  ```
  "eslintConfig": {
    "parserOptions": {
      "ecmaVersion": 7,
      "sourceType": "module",
      "ecmaFeatures": {
        "module": true
      }
    }
  },
  "extends": "eslint:recommended"  //eslint推荐配置，开发先不使用
  ```
* 运行指令: `gulp eslint`

## 5、js语法转换
* 下载插件:
  * npm install --save-dev gulp-babel @babel/core @babel/preset-env
* 配置编码
  ```
  const babel = require('gulp-babel');
  
  gulp.task('babel', () => {
    return gulp.src('src/js/*.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(gulp.dest('build/js'))
  });
  ```
* 运行指令: `gulp babel`

## 6、将commonjs模块化转换浏览器能识别的语法
* 下载插件:
  * npm install --save-dev gulp-browserify gulp-rename
* 配置编码
  ```
  const browserify = require('gulp-browserify');
  const rename = require('gulp-rename');
  
  gulp.task('browserify', () => {
    return gulp.src('build/js/main.js')
      .pipe(browserify())
      .pipe(rename('built.js'))
      .pipe(gulp.dest('build/js'))
  });
  ```
* 运行指令: `gulp browserify`

## 7、注册默认任务
* gulp.task('default', gulp.series('eslint', 'babel', 'browserify'));  //顺序执行
* gulp.task('default', gulp.parallel('eslint', 'babel', 'browserify'));  //并行执行
* 运行指令: `gulp`

## 8、处理less文件
* 准备工作：创建less文件
  * src/less/test1.less
  * src/less/test2.less
* 下载插件:
	* npm install gulp-less --save-dev 
* 配置编码
  ```
  const less = require('gulp-less');
  
  gulp.task('less', () => {
    return gulp.src('./src/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('./build/css'));
  });
  
  gulp.task('js-dev', gulp.series('eslint', 'babel', 'browserify'));  //顺序执行
  gulp.task('build', gulp.parallel('js-dev', 'less'));  //并行执行
  ```
* 运行指令: `gulp build` 

## 9、自动编译代码
* 下载插件
  * npm install gulp-livereload --save-dev
* 配置编码:
  ```
  const livereload = require('gulp-livereload');
            
  //所有的任务最后加上
  .pipe(livereload());
  
  gulp.task('watch', function() {
    livereload.listen();
    
    gulp.watch('src/less/*.less', gulp.series('less'));
    gulp.watch('src/js/*.js', gulp.series('js'));
  });
  
  gulp.task('start', gulp.series('build', 'watch'));
  ```
* 运行指令: `gulp start`

## 10、自动打开/更新页面（热更新）
* 下载插件
  * npm install gulp-connect open --save-dev
* 配置编码
  ```
  //在gulp.watch中配置服务器的选项
  connect.server({
      root : 'dist/', //提供服务的根路径
      livereload : true, //是否实时刷新
      port : 5000 //开启端口号
   });
  // 自动开启链接
  open('http://localhost:5000');
  ```
* 运行指令: `gulp start`  

> 以上就是gulp开发环境的配置，可以在内存中自动打包文件并有自动编译运行、热更新等功能。
  
## 11、压缩JS
* 下载插件:
	* npm install --save-dev gulp-uglify
* 配置编码
	```
	const uglify = require('gulp-uglify');
	const rename = require('gulp-rename');
	
	gulp.task('uglify', function() {
	  return gulp.src('./build/js/built.js')
	    .pipe(uglify())
	    .pipe(rename('dist.min.js'))
	    .pipe(gulp.dest('./dist/js/'))
	});
	
	gulp.task('js-prod', gulp.series('js-dev', 'uglify'));  //顺序执行
	```
* 运行指令: `gulp js-prod`

## 12、压缩css
* 下载插件
	* npm install gulp-clean-css less-plugin-autoprefix --save-dev 
* 配置编码
	```
	gulp.task('css', function () {
	  return gulp.src('./src/less/*.less')
	    .pipe(less({
	      plugins: [autoprefix] //自动扩展样式的兼容性前缀
	    }))  //将less文件转换成css文件
	    .pipe(concat('dist.min.css'))  //合并css文件
	    .pipe(cleanCSS({compatibility: 'ie8'}))  //压缩css文件
	    .pipe(gulp.dest('./dist/css'))
	});
	```
* 运行指令: `gulp css`	
	
## 13、压缩html
* 下载插件:
  * npm install gulp-htmlmin --save-dev
* 配置编码
  ```
  var htmlmin = require('gulp-htmlmin');
  //压缩html任务
  gulp.task('html', function() {
    return gulp.src('index.html')
      .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(gulp.dest('dist'))
  });
  
  gulp.task('prod', gulp.parallel('js-prod', 'css', 'html')); //并行执行
  ```
* 修改页面引入
  ```
  <link rel="stylesheet" href="css/dist.min.css">
  <script type="text/javascript" src="js/dist.min.js"></script>
  ```
* 运行指令: `gulp prod`

> 以上就是gulp生产环境的配置，可以生成打包后的文件。
