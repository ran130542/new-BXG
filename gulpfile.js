var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var htmlreplace = require('gulp');



/*html的处理*/
gulp.task('html', () => {
  gulp.src(['src/**/*.html', './index.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
})


/*less的处理*/
gulp.task('less', () => {
  gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(cleancss())
    .pipe(gulp.dest('dist/css'))
})


/*第三方js的处理*/
var otherjs = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/bootstrap/dist/js/bootstrap.js',
  'node_modules/art-template/lib/template-web.js',
  'node_modules/jquery-form/dist/jquery.form.min.js'
]
gulp.task('otherjs', () => {
  gulp.src(otherjs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('dist/js'))
})


/*myself的js*/
var jsModules = [
  // 首页
  'src/js/index.js',
  // 用户
  'src/js/user/login.js',
  'src/js/user/repass.js',
  'src/js/user/profile.js',
  // 讲师
  'src/js/teacher/add.js',
  'src/js/teacher/edit.js',
  'src/js/teacher/list.js',
  // 课程
  'src/js/course/add.js',
  'src/js/course/edit1.js',
  'src/js/course/edit2.js',
  'src/js/course/edit3.js',
  'src/js/course/list.js',
  // 学科分类
  'src/js/category/add.js',
  'src/js/category/edit.js',
  'src/js/category/list.js'
];
gulp.task('js', () => {
  jsModules.forEach(function (jspath) {
    var patharr = jspath.split('/');
    var jsname = patharr.pop();
    patharr.shift();
    browserify(jspath, { debug: true }).bundle()
      .pipe(source(jsname))
      .pipe(buffer())
      .pipe(gulp.dest('dist/' + patharr.join('/')))
  })
})

gulp.task('build', () => {
  gulp.run(['html', 'less', 'otherjs', 'js'])
})
gulp.task('default', () => {
  gulp.run('build')
  gulp.watch(['src/**/*.html', 'index.html'], function () {
    gulp.run('html');
  });
  gulp.watch(['src/**/*.less'], function () {
    gulp.run('less');
  });
  gulp.watch(['src/**/*.js'], function () {
    gulp.run('js');
  });
})