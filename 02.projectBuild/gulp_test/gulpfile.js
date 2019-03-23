/*
  所有构建工具都是基于nodejs平台运行
 */
// 引入gulp
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const less = require('gulp-less');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const open = require("open");
const uglify = require('gulp-uglify');
const LessAutoprefix = require('less-plugin-autoprefix');
// https://github.com/browserslist/browserslist
const autoprefix = new LessAutoprefix({ browsers: ["cover 99.5%", "not dead"] });
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');

// 注册任务
/*
  开发套路：
    1. 去https://gulpjs.com/plugins/搜相关的插件  gulp-xxx
    2. 打开插件的npm仓库 看文档使用
    3. 下载并引入gulp插件
    4. 配置插件任务
 */

// 语法检查  必须有一个eslint的配置文件
gulp.task('eslint', function () {
  // 读取所有的js文件， 返回值就是一个可读流
  return gulp.src(['src/js/*.js'])
    // 对流中的文件/数据进行语法检查
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(livereload());
})

// 语法转换
// babel能将es6模块化语法转换为commonjs模块化语法
// 能将es6及其以上的语法转换为es5及其以下的语法
gulp.task('babel', () =>
  // 读取所有js文件
  gulp.src('src/js/*.js')
    // 进行语法转换
    .pipe(babel({
      presets: ['@babel/preset-env'] //此处需要修改，官网有误
    }))
    // 输出出去
    .pipe(gulp.dest('build/js'))
    .pipe(livereload())
);

// 将commonjs的模块化语法转换成浏览器能识别语法
gulp.task('browserify', function() {
  // 只要放入口文件
  return gulp.src('build/js/app.js')
    .pipe(browserify())
    // 重命名文件
    .pipe(rename("built.js"))
    .pipe(gulp.dest('build/js'))
    .pipe(livereload());
});

// 压缩js代码
gulp.task('uglify', function () {
  return gulp.src('./build/js/built.js')
    .pipe(uglify())
    .pipe(rename('dist.min.js'))
    .pipe(gulp.dest('dist/js'))
})

// 将less编译成css
gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});

// 压缩css
gulp.task('css', function () {
  return gulp.src('./src/less/*.less')
    .pipe(concat('dist.min.css'))
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
});

// 压缩html
gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true, // 去除空格
      removeComments: true // 去掉注释
    }))
    .pipe(gulp.dest('dist'));
});

// 自动化 --> 自动编译  --> 自动刷新浏览器（热更新） --> 自动打开浏览器
gulp.task('watch', function() {
  livereload.listen();
  // 开启服务器
  connect.server({
    name: 'Dev App',
    root: ['build'],
    port: 3000,
    livereload: true  //热更新
  });
  // 打开浏览器
  open('http://localhost:3000');
  
  // 监视指定文件，一旦文件发生变化，就执行后面的任务
  gulp.watch('src/less/*.less', gulp.series('less'));
  gulp.watch('src/js/*.js', gulp.series('js-dev'));
});

// 配置默认任务 --> 执行以上多个任务
gulp.task('js-dev', gulp.series('eslint', 'babel', 'browserify')); // 同步顺序执行，同一时间只能执行一个任务  速度慢
gulp.task('js-prod', gulp.series('js-dev', 'uglify'));
// gulp.task('default', gulp.parallel('eslint', 'babel', 'browserify')); // 异步执行，同一时间执行多个任务   速度快
gulp.task('build', gulp.parallel('js-dev', 'less'));
// 生产环境的指令: gulp prod
gulp.task('prod', gulp.parallel('js-prod', 'css', 'html'));
// 开发环境的指令： gulp start
gulp.task('start', gulp.series('build', 'watch'));
