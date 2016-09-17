var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');

gulp.task('buildBackend', function() {
  return gulp.src('./**/*.ts')
    .pipe(tslint({
      formatter: "prose"
    }))
    .pipe(sourcemaps.init())
    .pipe(ts(ts.createProject('./tsconfig.json')))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('.'));
});

gulp.task('buildCommon', function() {
  gulp.src("../common/**/*.ts")
    .pipe(tslint({
      formatter: "prose"
    }))
    .pipe(sourcemaps.init())
    .pipe(ts(ts.createProject('../common/tsconfig.json')))
    .pipe(gulp.dest("../common/"));
});

gulp.task('build', ['buildCommon', 'buildBackend']);