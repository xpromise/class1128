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
    .pipe(eslint.failAfterError());
})

// 语法转换
gulp.task('babel', () =>
  // 读取所有js文件
  gulp.src('src/js/*.js')
    // 进行语法转换
    .pipe(babel({
      presets: ['@babel/preset-env'] //此处需要修改，官网有误
    }))
    // 输出出去
    .pipe(gulp.dest('build/js'))
);

// 将commonjs的模块化语法转换成浏览器能识别语法
gulp.task('browserify', function() {
  // 只要放入口文件
  return gulp.src('build/js/app.js')
    .pipe(browserify())
    // 重命名文件
    .pipe(rename("built.js"))
    .pipe(gulp.dest('build/js'))
});

// 将less编译成css
gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./build/css'));
});


// 配置默认任务 --> 执行以上多个任务
gulp.task('js-dev', gulp.series('eslint', 'babel', 'browserify')); // 同步顺序执行，同一时间只能执行一个任务  速度慢
// gulp.task('default', gulp.parallel('eslint', 'babel', 'browserify')); // 异步执行，同一时间执行多个任务   速度快
gulp.task('default', gulp.parallel('js-dev', 'less'));