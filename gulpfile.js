var gulp = require('gulp');
var browserify = require('browserify');
var tsify = require('tsify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gTypescript = require('gulp-typescript');
var gBabel = require('gulp-babel');

var config = {

    app: {
        frontend: 'frontend/app.ts',
        backend: 'backend/server.ts'
    }

};

gulp.task('buildFrontend', function(){
    browserify({debug: true})
        .add(config.app.frontend)
        .plugin(tsify, { target: 'es6' })
        .transform(babelify.configure({ 
            presets: ['es2015', 'react'],
            extensions: ['.ts', '.js']
        }))
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('release/public/'));
});

gulp.task('buildBackend', function(){

    var project = gTypescript.createProject('./tsconfig.json');

    return gulp.src('backend/server.ts')
        .pipe(gTypescript(project))
        .pipe(gBabel({
            plugins: ['transform-es2015-modules-commonjs']
        }))
        .pipe(gulp.dest('release/'));
});
