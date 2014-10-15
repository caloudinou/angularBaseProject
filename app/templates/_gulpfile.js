'use strict';

// Include Gulp
var gulp = require('gulp');

// Include Plugins
var uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-ruby-sass'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	styles = require('gulp-cssmin'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	jshint = require('gulp-jshint'),
	imageopt = require('gulp-webp'),
	compress = require('gulp-gzip');

// Git pull, commit, push


// Minify JS files
gulp.task('scripts', function(){
	return gulp.src('dev/vendors/**/*.js')
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('prod/vendors/js'))
		.pipe(notify({ message: 'Scripts files minified' }));
});

// Lint Js files
gulp.task('lint', function(){
	return gulp.src('dev/components/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(notify({ message: 'Scripts files linted' }));
});

// Minify Css files
gulp.task('styles', function(){
	return gulp.src('dev/styles/compiled/*.css')
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('prod/styles'))
		.pipe(notify({ message: 'Css files minified' }));
});

// Compile Sass files
gulp.task('sass', function(){
	return gulp.src('dev/styles/*.scss')
		.pipe(sass({style : 'expanded'}))
		.on('error', function(err){ console.log(err.message); })
		.pipe(gulp.dest('dev/styles/compiled'))
		.pipe(notify({ message: 'Sass files compiled' }));
});

// Optimization Images
gulp.task('images', function(){
	return gulp.src('dev/assets/images/*')
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(webp())
		.pipe(gulp.dest('prod/assets/images'))
		.pipe(notify({ message: 'Images optimized' }));
});

// Compress all the files to PROD
gulp.task('compress', function(){
	return gulp.src('dev')
		.pipe(gzip())
		.pipe(gulp.dest('prod'))
		.pipe(notify({ message: 'All files compressed' }));
});


// Watch files for changes
gulp.task('watch', function(){
	livereload.listen();

	gulp.watch('dev/styles/*.scss', ['sass']).on('change', livereload.changed);
	gulp.watch('dev/assets/images/*').on('change', livereload.changed);
	gulp.watch('dev/components/**/*.js').on('change', livereload.changed);
});

// Dev tasks
gulp.task('default', ['watch']);

// Preprod tasks
gulp.task('preprod', ['lint', 'scripts', 'styles', 'images']);

// Prod tasks
gulp.task('prod', ['compress']);