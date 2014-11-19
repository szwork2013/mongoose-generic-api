/******************
 * Gulp Dependencies
******************/

var gulp = require('gulp'); 						// Gulp
var server = require('gulp-develop-server');		// Run Node Server
var connect = require('gulp-connect'); 				// Live Reload & Watch index.html
var less = require('gulp-less'); 					// Less
var autoprefixer = require('gulp-autoprefixer'); 	// Scc Prefixer
var plumber = require('gulp-plumber');				// Like Compass
var uglify = require('gulp-uglify');				// Uglify Js File
var concat = require('gulp-concat');				// Concat Files






/******************
 * Statics
 ******************/
var appName = 'mongooseGenericApi';

var versions = {
	app: 'v0.0.1',
	script: 'v0.0.1',
	style: 'v0.0.1'
};

var paths = new function(){
	this.app = ['./app/'];
	this.server = ['./server.js'];
	this.scripts = [this.app + 'scripts/**/*.js'];
	this.vendors = ['./bower_components/'];
	this.styles  = [this.app + 'styles/**/*.less'];
	this.html = [this.app + '**/*.html'];
	this.dest = {
		script: this.app + 'dest',
		style: this.app + 'dest'
	};
};




/******************
 * Connect
 ******************/

gulp.task('connect',function(){
	connect.server({
		root: paths.app,
		livereload: true
	});
});



/******************
 * Scripts ( JS )
 ******************/

gulp.task('scripts',function(){
	gulp.src(paths.scripts)
			.pipe(plumber())
			.pipe(uglify())
			.pipe(concat('min.'+appName+'.'+versions.script+'.js'))
			.pipe(gulp.dest(paths.dest.script))
			.pipe(connect.reload());
});


/******************
 * Concat Bower-Components ( JS )
 ******************/

gulp.task('vendors',function(){
	gulp.src([paths.vendors+'angular/angular.js'])
			.pipe(plumber())
			.pipe(concat('min.vendors.js'))
			.pipe(gulp.dest(paths.dest.script))
			.pipe(connect.reload());
});


/******************
 * Styles ( LESS )
 ******************/
gulp.task('styles',function(){
	gulp.src(paths.styles)
			.pipe(plumber())
			.pipe(less())
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(gulp.dest(paths.dest.style))
			.pipe(connect.reload());
});

/******************
 * Html
 ******************/
gulp.task('html',function(){
	gulp.src(paths.html)
			.pipe(connect.reload());
});





/******************
 * Node Server
 ******************/
gulp.task('server:start',function(){
	server.listen({
		path: paths.server
	});
});

gulp.task('server:restart',function(){
	gulp.watch([paths.server],server.restart());
});



/******************
 * Gulp Watch
 ******************/
gulp.task('watch',function(){
	gulp.watch([paths.scripts],['scripts']);
	gulp.watch([paths.vendors],['vendors']);
	gulp.watch([paths.styles],['styles']);
	gulp.watch([paths.html],['html']);

});


/******************
 * Gulp Default
 ******************/
gulp.task('default',['connect','watch']);