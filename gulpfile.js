var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var appName = 'mongooseGenericApi';

var versions = {
	app: 'v0.0.1',
	script: 'v0.0.1',
	style: 'v0.0.1'
};

var paths = new function(){
	this.app = ['./app/'];
	this.scripts = [this.app + 'scripts/**/*.js'];
	this.styles  = [this.app + 'styles/**/*.less'];
	this.dest = {
		script: this.app + 'dest/script',
		style: this.app + 'dest/style'
	};
};

gulp.task('scripts',function(){
	gulp.src('paths.scripts')
			.pipe(uglify())
			.pipe(concat('min.'+appName+'.'+versions.script+'.js'))
			.pipe(gulp.dest(paths.dist.script));
});