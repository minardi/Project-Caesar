var gulp = require('gulp'),
    del = require('del'),
    jslint = require('gulp-jslint'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    pathfinder = require('./pathfinder'),
    clientPath = '../client/',
    qunit = require('gulp-qunit'),
	open = require('gulp-open'),
    publicPath = './public/';

gulp.task('build', function () {
    runSequence('clean', 
        'check-style', 
        'test', 
        'concat-minify',
        'modify-index');
});    

gulp.task('clean', function () {
    console.log('Clearing \'public\' folder...');
    del([publicPath + '/**/*']);
});
  
gulp.task('check-style', function () {
    return gulp.src(pathfinder.getPaths({
            'clientPath': clientPath,
            'fileName': 'index.html',
            'exclude': 'libs/'
        })) 
        .pipe(jslint({
            'node': true,
            'evil': true,
            'nomen': true,
            'errorsOnly': false
        }))
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('concat-minify', function () {
    console.log('Processing *.js...');
    gulp.src(pathfinder.getPaths({
        'clientPath': clientPath,
        'fileName': 'index.html',
        'exclude': 'libs/'
    }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(publicPath)); 
    console.log('Processing *.css...');
    gulp.src('../client/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(publicPath)); 
});

gulp.task('test', function () {
  	gulp.src('../tests/index.html')
	    .pipe(open());
	return gulp.src('../tests/index.html')
		.pipe(qunit());
});

gulp.task('modify-index', function () {
    pathfinder.clearAssets({
        'clientPath': clientPath,
        'publicPath': publicPath,
        'fileName': 'index.html',
        'assets': ['scripts.js','styles.css']
    });
});