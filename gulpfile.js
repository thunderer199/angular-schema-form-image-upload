var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var streamqueue = require('streamqueue');
var fs = require('fs');
var proxy = require('http-proxy-middleware');


gulp.task('default', ['minify', 'connect', 'watch']);

gulp.task('connect', function () {
  connect.server({
    root: ['demo', './'],
    livereload: true,
    middleware: function (connect, opt) {
      console.log(JSON.stringify(opt))
      return [proxy('/ws', {
        target: 'http://www.tomcat2.kvazar-micro.zp.ua/',
        changeOrigin:true
      })];
    }
  });
});

gulp.task('reload', ['minify'], function () {
  gulp.src('./dist/**/*.*').pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**', './demo/**'], ['reload']);
});

gulp.task('minify', function () {
  var files = JSON.parse(fs.readFileSync('sources.json', 'utf-8'));
  var stream = streamqueue({ objectMode: true },
    gulp.src(['src/templates/**/*.html']).pipe(templateCache({
      standalone: true,
      root: 'src/templates/',
    })),
    gulp.src(files)
  )
  .pipe(concat('image-url.js'))
  .pipe(gulp.dest('./dist'))
  .pipe(uglify())
  .pipe(rename('image-url.min.js'))
  .pipe(gulp.dest('./dist'));

  return stream;
});
