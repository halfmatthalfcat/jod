var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function() {
  return gulp.src('server.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(ts.createProject('./tsconfig.json')))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('..'));
});