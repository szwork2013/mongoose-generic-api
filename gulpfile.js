
var gulp = require('gulp'),
		watch = require('gulp-watch'),
		less = require('gulp-less'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		imagemin = require('gulp-imagemin'),
		prefix = require('gulp-autoprefixer'),
		livereload = require('gulp-livereload'),
		connectLivereload = require('connect-livereload'),
		git = require('gulp-git'),
		express = require('express');

var serverPort = process.env.DEVSERVER_PORT || 7000;
var livereloadPort = process.env.LIVERELOAD_PORT || 35730;

var paths = {
	scripts: ['app/assets/scripts/*.js'],
	images: ['app/assets/images/**/*.{svg,png,jpg}'],
	styles: ['app/assets/styles/*.scss'],
	html: 	['app/*.html']
};

gulp.task('scripts', function () {
	return gulp.src(paths.scripts)
			.pipe(concat('main.js'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('app/assets/build'));
});


gulp.task('less', function () {
	gulp.src(paths.styles)
			.pipe(less())
			.pipe(prefix())
			.pipe(gulp.dest('styles'))
});

gulp.task('imagemin', function () {
	gulp.src(paths.images)
			.pipe(imagemin())
			.pipe(gulp.dest('images'));
});

gulp.task('serve', ['less'], function () {
	var server = express();
	server.use(connectLivereload({
		port: livereloadPort
	}));
	server.use(express.static('.'));
	server.listen(serverPort);
});

gulp.task('watch', function () {
	var lrserver = livereload(livereloadPort);

	gulp.watch(paths.scripts, ['scripts']);

	gulp.src(paths.styles)
			.pipe(watch())
			.pipe(less())
			.pipe(prefix())
			.pipe(gulp.dest('styles'))
			.pipe(lrserver);

	gulp.src([].concat(paths.images, paths.html))
			.pipe(watch())
			.pipe(lrserver);
});

gulp.task('publish', function () {
	git.push('origin', 'master:gh-pages')
			.end();
});

gulp.task('default', ['scripts', 'serve', 'watch']);