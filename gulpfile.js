var gulp = require('gulp');
var browserify = require('browserify');
var tsify = require('tsify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

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
        .pipe(gulp.dest('release/'));
});

gulp.task('buildBackend', function(){
    browserify({debug: true})
        .add(config.app.backend)
        .plugin(tsify, { target: 'es6' })
        .transform(babelify.configure({
            presets: ['es2015'],
            extentions: ['.ts', '.js']
        }))
        .bundle()
        .pipe(source('server.js'))
        .pipe(gulp.dest('release/'));
});
