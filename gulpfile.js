var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var webpackConfig = require("./webpack.config.js");
var webpack = require("webpack");
var gutil = require("gulp-util");
var mocha = require('gulp-spawn-mocha');

var frontFolder = './src/front/**/*.ts';
var middleFolder = './src/middle/**/*.ts';
var backFolder = './src/back/**/*.ts';
var viewsFolder = './src/back/views/**/*.jade';
var tests = './src/**/*.test.ts';

gulp.task('default', ['nodemon']);

function compileForBackEnd(folder, destenation) {
    return gulp.src([folder, '!' + tests])
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: 'commonjs',
            target: 'es5'
        }))
        .js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destenation));
}

gulp.task('watch', ['compileClient', 'compileMiddle', 'compileServer', 'copyViews'], function () {
    gulp.watch(backFolder, ['compileServer']);
    gulp.watch(frontFolder, ['compileClient']);
    gulp.watch(viewsFolder, ['copyViews']);
    gulp.watch(middleFolder, ['compileMiddle', 'compileClient']);
});

gulp.task('nodemon', ['watch'], function () {
    nodemon({
        script: 'wwwroot/back/app.js',
        ignore: ['wwwroot/public/*']
    });
});

gulp.task('test', function () {
    return gulp.src(tests, {read: false})
        .pipe(mocha({
            compilers: 'ts:espower-typescript/guess'
        }, ''));

});

gulp.task('testWatch', function () {
    gulp.watch('./src/**/*.ts', ['test']);
});

gulp.task('copyViews', function () {
    return gulp.src([viewsFolder]).pipe(gulp.dest('./wwwroot/back/views'))
});

gulp.task('compileServer', function () {
    return compileForBackEnd(backFolder, './wwwroot/back');
});

gulp.task('compileClient', function (callback) {
    var myConfig = Object.create(webpackConfig);
    console.log(myConfig.resolve);
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('compileMiddle', function () {
    return compileForBackEnd(middleFolder, './wwwroot/middle');
});

