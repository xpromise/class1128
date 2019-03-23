/*
  所有构建工具都是基于nodejs平台运行
 */
// 引入gulp
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

// 注册任务
/*
  开发套路：
    1. 去https://gulpjs.com/plugins/搜相关的插件  gulp-xxx
    2. 打开插件的npm仓库 看文档使用
    3. 下载并引入gulp插件
    4. 配置插件任务
 */

// 语法检查
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
      presets: ['@babel/preset-env']
    }))
    // 输出出去
    .pipe(gulp.dest('build'))
);

